// "use client";
import anime from "animejs";
// import React, { useEffect, useRef } from "react";

const Logo = () => {
  // const mainTextRef = useRef<HTMLHeadingElement>(null);
  // useEffect(() => {
  // if (mainTextRef.current && mainTextRef.current.textContent) {
  //   mainTextRef.current.innerHTML = mainTextRef.current.textContent.replace(
  //     /\S/g,
  //     "<span class='letter '>$&</span>"
  //   );
  // }

  // console.log("hihi");
  // anime({
  //   targets: ".logo .letter",
  //   translateY: ["1.1em", 0],
  //   translateX: ["3em", 0],
  //   opacity: [0, 1],
  //   translateZ: 0,
  //   rotateZ: [45, 0],
  //   scale: [1.3, 1],
  //   duration: 1000,
  //   easing: "spring(1, 80, 10, 0)",
  //   delay: (el, i) => 50 * i,
  // });
  // }, []);
  return (
    <div>
      {" "}
      <span
        // ref={mainTextRef}
        className="center letters flex text-8xl mb-10 transition-all"
      >
        <span className="letter ">r</span>
        <span className="letter ">i</span>
        <span className="letter ">m</span>
        <span className="letter ">e</span>
        <span className="letter ">x</span>
        <span className="letter ">e</span>
      </span>
    </div>
  );
};

export default Logo;
