"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { useRef } from "react";

export default function Background() {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [imgRow, setImgRow] = React.useState<JSX.Element[]>([]);
  const Logo = () => {
    // const img = document.createElement("img");
    // img.src = "/logo.png";
    // img.width = 100;
    // img.height = 100;
    // img.classList.add("mb-[90px]", "ml-3");
    // return img;
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt={""}
          className="mb-[90px] ml-3"
        />
      </motion.div>
    );
  };
  const bg1 = useRef<HTMLDivElement>(null);
  const bg2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const widthAmount = Math.ceil(window.innerWidth / 100);
    const heightAmount = Math.ceil(window.innerHeight / 100);
    console.log(widthAmount, heightAmount);
    for (let i = 0; i < (widthAmount + heightAmount) * 5; i++) {
      // bg1.current?.appendChild(logo());
      // bg2.current?.appendChild(logo());
      setImgRow((prev) => [...prev, <Logo key={i + Math.random()} />]);
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
    <div className="">
      <div className="opacity-[0.50] absolute" id="noise"></div>
      <div className="h-[100dvh] w-[100%] overflow-hidden absolute">
        <div className="w-full -rotate-12 -translate-x-56 -translate-y-28  relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={
              "w-[140%] h-[140%] flex flex-wrap absolute mix-blend-multiply "
            }
            style={{ transform: `translate(${x}px, ${y}px)` }}
            ref={bg1}
          >
            {imgRow}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-[130%] flex flex-wrap absolute translate-y-[100px] mix-blend-multiply"
            style={{ transform: `translate(${-x}px, ${-y + 100}px)` }}
            ref={bg2}
          >
            {imgRow}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
