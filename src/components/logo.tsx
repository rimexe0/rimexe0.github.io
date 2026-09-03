"use client";
import { animate, spring, stagger } from "animejs";
import { useEffect, useRef } from "react";

const Logo = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = rootRef.current?.querySelectorAll(".letter");

    if (!letters?.length) {
      return;
    }

    const animation = animate(letters, {
      y: { from: "1.1em", to: 0 },
      x: { from: "3em", to: 0 },
      opacity: { from: 0, to: 1 },
      rotate: { from: 45, to: 0 },
      scale: { from: 1.3, to: 1 },
      duration: 1000,
      ease: spring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 }),
      delay: stagger(50),
    });

    return () => {
      animation.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="relative  mb-10">
        <span
          className="center letters flex text-8xl  transition-all text-black absolute"
        >
          <span className="letter ">r</span>
          <span className="letter ">i</span>
          <span className="letter ">m</span>
          <span className="letter ">e</span>
          {/* <span className="letter ">x</span> */}
          {/* <span className="letter ">e</span> */}
        </span>
        <span
          className="center letters flex text-8xl transition-all -translate-x-1 -translate-y-1"
        >
          <span className="letter ">r</span>
          <span className="letter ">i</span>
          <span className="letter ">m</span>
          <span className="letter ">e</span>
          {/* <span className="letter ">x</span> */}
          {/* <span className="letter ">e</span> */}
        </span>
      </div>
    </div>
  );
};

export default Logo;
