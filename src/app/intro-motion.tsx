"use client";

import { animate, stagger } from "motion";
import { useEffect } from "react";

export default function IntroMotion() {
  useEffect(() => {
    const logoLetters = document.querySelectorAll<HTMLElement>(".logo .letter");
    const entries = document.querySelectorAll<HTMLElement>(".homepage-entry");
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
        { y: [100, 0], opacity: [0, 1] },
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

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, []);

  return null;
}
