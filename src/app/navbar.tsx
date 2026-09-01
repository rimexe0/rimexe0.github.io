"use client";
import anime from "animejs";
import { useEffect } from "react";
export default function Navbar() {
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
  useEffect(() => {
    const animetion = anime({
      targets: ".nav-link",
      translateY: ["1.1em", 0],
      translateX: ["3em", 0],
      opacity: [0, 1],
      translateZ: 0,
      rotateZ: [31, 0],
      scale: [1.3, 1],
      duration: 1200,
      easing: "spring(1, 80, 10, 0)",
      delay: (el, i) => 50 * i,
    });
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
