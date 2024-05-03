import { delay, easeInOut, motion, stagger } from "framer-motion";
import React from "react";
const variants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 1,
      easeInOut,
      delay: i * 0.1,
    },
  }),
  hidden: {
    opacity: 0,
    y: 50,
  },
};
const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
const ItemsCard = ({ title, children, number }: any) => {
  return (
    <div
      className="
      
     min-h-[15rem]
     w-[20rem]
     border-primary
     border-2
     rounded-[1rem]
     py-3
     flex
     flex-col
     bg-slate-400/10
     transition-all
     hover:shadow-2xl
     "
    >
      <h1 className="text-3xl px-3 font-semibold  ">{title}</h1>
      <motion.div
        custom={number}
        initial="hidden"
        animate="visible"
        variants={variants}
        className="flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  );
};
export const ItemsCardContent = ({ title, desc, children, number }: any) => {
  return (
    <motion.div
      custom={number}
      variants={variants}
      initial="hidden"
      animate="visible"
      className="my-2  "
    >
      <div className="mx-1">
        <h4 className="text-xl">{title}</h4>
        <p>{desc}</p>
        <div className="flex my-2 justify-between">{children}</div>
      </div>
    </motion.div>
  );
};
export const ItemsCardLink = ({ title, link, className }: any) => {
  return (
    <div>
      <a
        className={
          "p-1  rounded-tl-md rounded-br-md mx-0.5 transition-shadow hover:shadow-md " +
          className
        }
        target="_blank"
        href={link}
      >
        {title}
      </a>
    </div>
  );
};
export const ItemsCardTech = ({ title, className }: any) => {
  return (
    <div>
      <span
        className={
          "box-content p-1 rounded-tr-md rounded-bl-md  mx-0.5 " + className
        }
      >
        {title}
      </span>
    </div>
  );
};
export default ItemsCard;
