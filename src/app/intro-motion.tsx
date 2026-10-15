"use client";

import { animate, stagger } from "motion";
import { useEffect, useLayoutEffect } from "react";

const EASE_OUT = [0.019, 0.791, 0.352, 1.009] as const;

// Transition names of the cards on the previous page. A card whose name was
// also on the previous page morphs in the view transition, so we leave it
// alone instead of fading it in.
let previousNames = new Set<string>();
let currentNames = new Set<string>();
let currentPath = "";

export default function IntroMotion() {
  // Client-side navigation: fade this page's cards in on the real page, so
  // they keep their backdrop blur. This runs before the browser captures the
  // new page for the view transition.
  useLayoutEffect(() => {
    if (location.pathname !== currentPath) {
      previousNames = currentNames;
      currentNames = new Set(
        [...document.querySelectorAll<HTMLElement>("[data-vt]")].map(
          (el) => el.dataset.vt!
        )
      );
      currentPath = location.pathname;
    }

    if (!document.documentElement.classList.contains("intro-done")) {
      return;
    }

    const fading = [
      ...document.querySelectorAll<HTMLElement>(
        ".homepage-entry .card-shell, #logopart"
      ),
    ].filter((el) => !previousNames.has(el.dataset.vt ?? ""));
    const animation = animate(
      fading,
      { opacity: [0, 1] },
      { duration: 0.25, ease: EASE_OUT }
    );
    return () => animation.stop();
  }, []);

  useEffect(() => {
    // Only play the entrance on the first load.
    const root = document.documentElement;
    if (root.classList.contains("intro-done")) {
      return;
    }

    const logoLetters = document.querySelectorAll<HTMLElement>(".logo .letter");
    const entries = document.querySelectorAll<HTMLElement>(".homepage-entry");
    // Fade the cards themselves, not their wrappers: a see-through wrapper
    // turns off the card's backdrop blur until the fade ends.
    const cards = document.querySelectorAll<HTMLElement>(
      ".homepage-entry .card-shell"
    );
    const contentEntries = document.querySelectorAll<HTMLElement>(
      ".card-entry-content"
    );

    const animations = [
      animate(
        logoLetters,
        {
          x: ["3em", 0],
          y: ["1.1em", 0],
          opacity: [0, 1],
          rotate: [45, 0],
          scale: [1.3, 1],
        },
        {
          type: "spring",
          mass: 1,
          stiffness: 80,
          damping: 10,
          velocity: 0,
          delay: stagger(0.05),
        }
      ),
      animate(
        entries,
        { y: [100, 0] },
        { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      ),
      animate(
        cards,
        { opacity: [0, 1] },
        { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      ),
      animate(
        contentEntries,
        { y: [100, 0], opacity: [0, 1], scale: [0.94, 1], rotateY: [-12, 0] },
        {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: stagger(0.08, { startDelay: 0.18 }),
        }
      ),
    ];

    Promise.all(animations.map((animation) => animation.finished)).then(() => {
      root.classList.add("intro-done");
    });

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, []);

  return null;
}
