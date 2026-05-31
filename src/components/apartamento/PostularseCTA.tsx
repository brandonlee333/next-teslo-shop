import Link from "next/link";
import { IoCloudUploadOutline } from "react-icons/io5";

export const PostularseCTA = () => {
  return (
    <section className="max-w-2xl mx-auto px-5 pb-16 pt-4">
      <div className="rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600 p-1 shadow-xl shadow-rose-500/30">
        <div className="rounded-[14px] bg-white px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="mb-5 text-sm font-medium uppercase tracking-wider text-rose-600">
            ¿Te gustó el apartamento?
          </p>
          <Link
            href="/upload"
            className="group inline-flex w-full max-w-lg items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 px-6 py-5 text-base font-bold text-white shadow-lg shadow-rose-500/40 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-500/50 active:scale-[0.98] sm:text-lg"
          >
            <IoCloudUploadOutline className="h-7 w-7 shrink-0 transition-transform group-hover:scale-110" />
            <span>Si me interesa, quiero postularme (subir documentos)</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
