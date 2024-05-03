import React from "react";
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
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
export const ItemsCardContent = ({ title, desc, children, number }: any) => {
  return (
    <div className="my-2  ">
      <div className="mx-1">
        <h4 className="text-xl">{title}</h4>
        <p>{desc}</p>
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
