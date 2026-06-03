"use server";
import prisma from "@/lib/prisma";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  // Obtener la información de los productos
  // Nota: recuerden que podemos llevar 2+ productos con el mismo ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // Los totales de tax, subtotal, y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error('Uno de los productos del carrito ya no está disponible');

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Crear la transacción de base de datos
  try {

    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        //  Acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error('Error al procesar la cantidad de un producto');
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity // no hacer
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en las existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error('No hay inventario suficiente para uno de los productos');
        }
      });

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar, si el price es cero, entonces, lanzar un error

      // 3. Crear la direccion de la orden
      // Address
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });


    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    }


  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'No se pudo completar el pedido. Intenta de nuevo.';
    const userFacingMessages = [
      'Uno de los productos del carrito ya no está disponible',
      'Error al procesar la cantidad de un producto',
      'No hay inventario suficiente para uno de los productos',
    ];
    return {
      ok: false,
      message: userFacingMessages.includes(message)
        ? message
        : 'No se pudo completar el pedido. Intenta de nuevo.',
    };
  }
};
