"use server";

import { cookies } from "next/headers";

import prisma from "@/lib/prisma";

const HOME_PAGE_SLUG = "home";

const VIEW_COOKIE_PREFIX = "pv_";
const VIEW_COOKIE_MAX_AGE = 60 * 60 * 24;

export async function trackAndGetPageViews(
  slug: string = HOME_PAGE_SLUG,
): Promise<number> {
  try {
    const cookieStore = cookies();
    const cookieName = `${VIEW_COOKIE_PREFIX}${slug}`;
    const hasRecentView = cookieStore.get(cookieName)?.value === "1";

    if (!hasRecentView) {
      const counter = await prisma.pageViewCounter.upsert({
        where: { slug },
        create: { slug, count: 1 },
        update: { count: { increment: 1 } },
      });

      cookieStore.set(cookieName, "1", {
        maxAge: VIEW_COOKIE_MAX_AGE,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });

      return counter.count;
    }

    const counter = await prisma.pageViewCounter.findUnique({
      where: { slug },
    });

    return counter?.count ?? 0;
  } catch {
    return 0;
  }
}
