"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { recordPageView } from "@/actions/page-views/track-page-view";

export function PageViewTracker() {
  const router = useRouter();

  useEffect(() => {
    recordPageView().then((recorded) => {
      if (recorded) {
        router.refresh();
      }
    });
  }, [router]);

  return null;
}
