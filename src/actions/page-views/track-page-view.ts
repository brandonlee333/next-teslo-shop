"use server";

import { cookies } from "next/headers";

import prisma from "@/lib/prisma";

const HOME_PAGE_SLUG = "home";

const VIEW_COOKIE_PREFIX = "pv_";
const VIEW_COOKIE_MAX_AGE = 60 * 60 * 24;

function viewCookieName(slug: string) {
  return `${VIEW_COOKIE_PREFIX}${slug}`;
}

export async function getPageViewCount(
  slug: string = HOME_PAGE_SLUG,
): Promise<number> {
  try {
    const counter = await prisma.pageViewCounter.findUnique({
      where: { slug },
    });
    return counter?.count ?? 0;
  } catch {
    return 0;
  }
}

/** Invoked from the client so Set-Cookie is allowed (not during RSC render). */
export async function recordPageView(
  slug: string = HOME_PAGE_SLUG,
): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const cookieName = viewCookieName(slug);
    if (cookieStore.get(cookieName)?.value === "1") {
      return false;
    }

    await prisma.pageViewCounter.upsert({
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

    return true;
  } catch {
    return false;
  }
}
