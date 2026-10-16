"use client";

import React, { ViewTransition } from "react";
import { generateColor } from "./helpers/helping";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { blurBehindMorph, morphsIntoCard } from "@/lib/morph-blur";
// Cards with the same name on two pages morph into each other.
// The title is an <h2> unless the page needs it as its main <h1>.
const ItemsCard = ({
  title,
  children,
  number,
  className,
  action,
  lead,
  name,
  titleAs: Title = "h2",
}: any) => {
  const transitionName =
    name ?? "card-" + String(title).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <ViewTransition
      name={transitionName}
      share="morph"
      default="none"
      onShare={(instance) =>
        blurBehindMorph(instance, morphsIntoCard(instance) ? "none" : "out")
      }
    >
      <div
        className={cn(
          `
     card-shell
     min-h-[5rem]
     w-[20rem]
     border-ink
     border-2
     border-dashed
     pt-3
     flex
     flex-col
     transition-all
     backdrop-blur
     `,
          className
        )}
        style={{
          background: generateColor(title),
        }}
        data-vt={transitionName}
      >
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            {lead}
            <Title className="text-3xl font-semibold  text-ink">{title}</Title>
          </div>
          {action}
        </div>
        <div className="flex flex-col">{children}</div>
      </div>
    </ViewTransition>
  );
};
export const ItemsCardContent = ({ title, desc, children, number }: any) => {
  return (
    <motion.div
      className="my-2  text-ink border-0 "
      whileHover={{
        scale: 1.01,
        boxShadow: "10px 10px 0px 0px rgba(0,0,0,0.75)",
        border: "2px dashed var(--color-ink)",
        transition: { duration: 0.3, ease: [0.019, 0.791, 0.352, 1.009] },
      }}
    >
      <div className="card-entry-content mx-1 text-ink">
        <h4 className="text-xl text-ink text-nowrap">{title}</h4>
        <p className="">{desc}</p>
        <div className="flex my-2 justify-between">{children}</div>
      </div>
    </motion.div>
  );
};
export const ItemsCardLink = ({
  title,
  link,
  className,
  rainbow = false,
  internal = false,
  onClick,
}: any) => {
  const linkClassName =
    "p-1  rounded-tl-md rounded-br-md mx-0.5 transition-shadow hover:shadow-md text-xs " +
    className;
  const content = rainbow ? (
    <span className="rainbow-scroll-right">{title}</span>
  ) : (
    title
  );
  return (
    <div>
      {internal ? (
        <Link className={linkClassName} href={link} onClick={onClick}>
          {content}
        </Link>
      ) : (
        <a className={linkClassName} target="_blank" href={link}>
          {content}
        </a>
      )}
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
