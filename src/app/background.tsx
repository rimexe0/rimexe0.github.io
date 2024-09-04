"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRef } from "react";

export default function Background() {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const logo = () => {
    const img = document.createElement("img");
    img.src = "/logo.png";
    img.width = 100;
    img.height = 100;
    img.classList.add("mb-[90px]", "ml-3");
    return img;
  };
  const bg1 = useRef<HTMLDivElement>(null);
  const bg2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const widthAmount = Math.ceil(window.innerWidth / 100);
    const heightAmount = Math.ceil(window.innerHeight / 100);
    console.log(widthAmount, heightAmount);
    for (let i = 0; i < (widthAmount + heightAmount) * 3; i++) {
      bg1.current?.appendChild(logo());
      bg2.current?.appendChild(logo());
    }
  }, []);
  useEffect(() => {
    const update = (e: MouseEvent) => {
      const xval = e.clientX - window.innerWidth / 2;
      const yval = e.clientY - window.innerHeight / 2;
      setX(xval === 0 ? 0 : xval / 50);
      setY(yval === 0 ? 0 : yval / 50);
    };
    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  }, [setX, setY]);
  return (
    <div className="opacity-[0.25]" id="noise">
      <div className="w-full -rotate-12 -translate-x-44 -translate-y-24">
        <motion.div
          className={"w-[130%] flex flex-wrap absolute mix-blend-multiply "}
          style={{ transform: `translate(${x}px, ${y}px)` }}
          ref={bg1}
        ></motion.div>
        <div
          className="w-[130%] flex flex-wrap absolute translate-y-[100px] mix-blend-multiply"
          style={{ transform: `translate(${-x}px, ${-y + 100}px)` }}
          ref={bg2}
        ></div>
      </div>
    </div>
  );
}
