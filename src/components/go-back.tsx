"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { ItemsCardLink } from "@/components/ItemsCard";

// Pages visited in this tab, so "back" returns to where you came from.
// If you opened a page directly, there is nothing to go back to, so we go up
// to the fallback page and replace the current one. Otherwise going back from
// the fallback would return to this page, and the two would loop.
// We navigate forward instead of using router.back(), because history
// navigation skips the view transition.
const visited: string[] = [];

export function HistoryTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (visited.at(-2) === pathname) {
      visited.pop();
    } else if (visited.at(-1) !== pathname) {
      visited.push(pathname);
    }
  }, [pathname]);
  return null;
}

function useGoBack(fallback: string) {
  const router = useRouter();
  return useCallback(() => {
    const previous = visited.at(-2);
    if (previous) {
      router.push(previous);
    } else {
      visited.pop();
      router.replace(fallback);
    }
  }, [router, fallback]);
}

export function BackButton({ fallback }: { fallback: string }) {
  const goBack = useGoBack(fallback);
  return (
    <ItemsCardLink
      title="← back"
      link={fallback}
      className="bg-black border-[1.5px] border-black text-white"
      internal
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        goBack();
      }}
    />
  );
}

// Esc or a click outside the cards goes back.
export function CloseOnOutside({ fallback }: { fallback: string }) {
  const goBack = useGoBack(fallback);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") goBack();
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".card-shell, nav")) goBack();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [goBack]);
  return null;
}
