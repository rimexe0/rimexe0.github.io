"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { generateColor } from "@/components/helpers/helping";

const pages = [
  { href: "/", title: "home" },
  { href: "/blog", title: "blog" },
];

export default function SideNav() {
  const pathname = usePathname();
  // Hidden on home: it slides out to the right, and back in on other pages.
  const hidden = pathname === "/";
  return (
    <nav
      inert={hidden}
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1 p-1 border-2 border-dashed border-ink backdrop-blur transition-[translate] duration-300 ease-[var(--ease-out)] ${
        hidden ? "translate-x-[calc(100%+2rem)]" : ""
      }`}
      style={{
        background: generateColor("nav"),
        boxShadow: "6px 6px 0px 0px rgba(0,0,0,0.75)",
      }}
    >
      {pages.map((page) => {
        const active =
          page.href === "/" ? pathname === "/" : pathname.startsWith(page.href);
        return (
          <Link
            key={page.href}
            href={page.href}
            className={`[writing-mode:vertical-rl] px-1 py-2 text-sm ${
              active ? "bg-black text-white" : "text-ink hover:bg-ink/10"
            }`}
          >
            {page.title}
          </Link>
        );
      })}
    </nav>
  );
}
