"use client";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import React, { useEffect, type JSX } from "react";
import { useRef } from "react";

export default function Background() {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [imgRow, setImgRow] = React.useState<JSX.Element[]>([]);
  const pauseTimer = useRef<number | undefined>(undefined);
  const leftScroll = useMotionValue(0);
  const rightScroll = useMotionValue(-112);
  const scrollRate = useRef(1);
  const targetScrollRate = useRef(1);
  const Logo = () => {
    return (
      <div>
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt={""}
          className="mb-[90px] ml-3"
        />
      </div>
    );
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const widthAmount = Math.ceil(window.innerWidth / 100);
      const heightAmount = Math.ceil(window.innerHeight / 100);
      const logoCount = (widthAmount + heightAmount) * 5;

      setImgRow(
        Array.from({ length: logoCount }, (_, index) => <Logo key={index} />)
      );
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const update = (event: MouseEvent) => {
      setX((event.clientX - window.innerWidth / 2) / 50);
      setY((event.clientY - window.innerHeight / 2) / 50);
    };

    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  }, []);

  useAnimationFrame((_time, delta) => {
    const easingDuration = targetScrollRate.current === 0 ? 180 : 220;
    const easingFactor = 1 - Math.exp((-5 * delta) / easingDuration);
    const nextRate =
      scrollRate.current +
      (targetScrollRate.current - scrollRate.current) * easingFactor;

    scrollRate.current =
      Math.abs(targetScrollRate.current - nextRate) < 0.005
        ? targetScrollRate.current
        : nextRate;

    const distance = (112 / 4000) * scrollRate.current * delta;
    const wrapOffset = (value: number) => {
      const remainder = value % 112;
      return remainder > 0 ? remainder - 112 : remainder;
    };

    leftScroll.set(wrapOffset(leftScroll.get() - distance));
    rightScroll.set(wrapOffset(rightScroll.get() + distance));
  });

  return (
    <div className="">
      <div className="opacity-[0.50] absolute" id="noise"></div>
      <div className="h-[100dvh] w-[100%] overflow-hidden absolute pointer-events-none">
        <div
          className="w-full relative"
          style={{ transform: "translate(-224px, -112px) rotate(-12deg)" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-[140%] h-[140%] absolute mix-blend-multiply"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <motion.div
              className="w-full flex flex-wrap"
              style={{ x: leftScroll }}
            >
              {imgRow}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-[130%] absolute"
            style={{ transform: `translate(${-x}px, ${-y + 100}px)` }}
          >
            <motion.div
              className="w-full flex flex-wrap"
              style={{ x: rightScroll }}
            >
              {imgRow}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
