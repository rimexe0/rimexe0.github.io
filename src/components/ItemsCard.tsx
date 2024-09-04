import React from "react";
import { generateColor } from "./helpers/helping";
const ItemsCard = ({ title, children, number }: any) => {
  return (
    <div
      className="
      
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
        background: generateColor(),
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
    <div className="my-2  text-black">
      <div className="mx-1 text-black">
        <h4 className="text-xl text-black">{title}</h4>
        <p className="">{desc}</p>
        <div className="flex my-2 justify-between">{children}</div>
      </div>
    </div>
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
