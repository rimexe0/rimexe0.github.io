"use client";

import React from "react";
import { generateColor } from "./helpers/helping";
import { motion } from "motion/react";
const ItemsCard = ({ title, children, number }: any) => {
  return (
    <div
      className="
      
     card-shell
     min-h-[5rem]
     w-[20rem]
     border-black
     border-2
     border-dashed
     pt-3
     flex
     flex-col
     transition-all
     backdrop-blur
     "
      style={{
        background: generateColor(title),
        boxShadow: "10px 10px 0px 0px rgba(0,0,0,0.75)",
      }}
    >
      <h1 className="text-3xl px-3 font-semibold  text-black">{title}</h1>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
export const ItemsCardContent = ({ title, desc, children, number }: any) => {
  return (
    <motion.div
      className="my-2  text-black border-0 "
      whileHover={{
        scale: 1.01,
        boxShadow: "10px 10px 0px 0px rgba(0,0,0,0.75)",
        border: "2px dashed black",
        transition: { duration: 0.3 },
      }}
    >
      <div className="card-entry-content mx-1 text-black">
        <h4 className="text-xl text-black text-nowrap">{title}</h4>
        <p className="">{desc}</p>
        <div className="flex my-2 justify-between">{children}</div>
      </div>
    </motion.div>
  );
};
export const ItemsCardLink = ({ title, link, className, rainbow = false }: any) => {
  return (
    <div>
      <a
        className={
          "p-1  rounded-tl-md rounded-br-md mx-0.5 transition-shadow hover:shadow-md text-xs " +
          className
        }
        target="_blank"
        href={link}
      >
        {rainbow ? <span className="rainbow-scroll-right">{title}</span> : title}
      </a>
    </div>
  );
};
export const ItemsCardTech = ({ title, className }: any) => {
  return (
    <div>
      <span
        className={
          "box-content p-1 rounded-tr-md rounded-bl-md  mx-0.5 text-xs " + className
        }
      >
        {title}
      </span>
    </div>
  );
};
export default ItemsCard;
