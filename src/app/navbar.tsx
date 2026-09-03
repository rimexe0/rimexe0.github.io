"use client";
import { animate, spring, stagger } from "animejs";
import { useEffect } from "react";

function NavLink({
  name,
  active = false,
}: {
  name: string;
  active: boolean;
}) {
  return (
    <a
      href={"#" + name}
      className={
        "opacity-0 nav-link text-3xl mx-3 " + (active ? " font-bold" : "")
      }
    >
      {name}
    </a>
  );
}

export default function Navbar() {
  useEffect(() => {
    const animation = animate(".nav-link", {
      y: { from: "1.1em", to: 0 },
      x: { from: "3em", to: 0 },
      opacity: { from: 0, to: 1 },
      rotate: { from: 31, to: 0 },
      scale: { from: 1.3, to: 1 },
      duration: 1200,
      ease: spring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 }),
      delay: stagger(50),
    });

    return () => {
      animation.revert();
    };
  }, []);
  return (
    <div className=" absolute left-10  z-30">
      <div className="rotate-90 origin-left">
        <div className="items flex flex-row ms-[50%]">
          <NavLink name="home" active={true} />
          <NavLink name="projects" active={false} />
          <NavLink name="about" active={false} />
        </div>
      </div>
    </div>
  );
}
