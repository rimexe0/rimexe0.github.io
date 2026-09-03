"use client";
import { animate, stagger } from "motion";
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
    const links = document.querySelectorAll<HTMLElement>(".nav-link");
    const animation = animate(
      links,
      {
        y: ["1.1em", 0],
        x: ["3em", 0],
        opacity: [0, 1],
        rotate: [31, 0],
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
    );

    return () => {
      animation.stop();
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
