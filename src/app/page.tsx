"use client";
import anime from "animejs";
import { useEffect, useRef } from "react";
import Projects from "./projects";
import ItemsCard from "@/components/ItemsCard";
import {
  ItemsCardContent,
  ItemsCardLink,
  ItemsCardTech,
} from "@/components/ItemsCard";
import { easeInOut, motion } from "framer-motion";
export default function Home() {
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        easeInOut,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
    },
  };
  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (mainTextRef.current && mainTextRef.current.textContent) {
      mainTextRef.current.innerHTML = mainTextRef.current.textContent.replace(
        /\S/g,
        "<span class='letter '>$&</span>"
      );
    }

    console.log("hihi");
    anime({
      targets: ".logo .letter",
      translateY: ["1.1em", 0],
      translateX: ["3em", 0],
      opacity: [0, 1],
      translateZ: 0,
      rotateZ: [45, 0],
      scale: [1.3, 1],
      duration: 1000,
      easing: "spring(1, 80, 10, 0)",
      delay: (el, i) => 50 * i,
    });
  }, []);
  return (
    <div className="min-h-screen ">
      <div id="logopart" className="mx-auto w-3 pt-4">
        <h1 className="logo flex justify-center">
          <span className="text-wrapper  ">
            <span
              ref={mainTextRef}
              className="center letters flex text-8xl mb-10"
            >
              rimexe
            </span>
          </span>
        </h1>
      </div>
      <div className="flex justify-evenly flex-wrap ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          id="projetcspart"
          className="mb-10"
        >
          <ItemsCard title="Projects" number={1}>
            <ItemsCardContent
              title="Mise Restaurant"
              desc="restaurant management and accounting program that has a nice ui"
              number={1}
            >
              <div className="flex">
                <ItemsCardTech
                  title="php"
                  className="border-[1.5px] border-white text-white rounded-none"
                />
                <ItemsCardTech
                  title="Laravel"
                  className="border-[1.5px] border-white text-white rounded-none"
                />
              </div>
              <div>
                <ItemsCardLink
                  title="coming soon"
                  link="link"
                  className="bg-black border-[1.5px] border-black text-white"
                />
              </div>
            </ItemsCardContent>
            <ItemsCardContent
              title="oasis scraper"
              desc="Simple program that gets oasis weekly schedule and sends it to google calendar"
              number={2}
            >
              <div className="flex">
                <ItemsCardTech
                  title="javascript"
                  className="border-[1.5px] border-white text-white rounded-none"
                />
              </div>
              <div>
                <ItemsCardLink
                  title="github"
                  link="https://github.com/rimexe0/oasis-scraper"
                  className="bg-black border-[1.5px] border-black text-white"
                />
              </div>
            </ItemsCardContent>
            <ItemsCardContent
              title="GameAge"
              desc="vanilla php site where it shows
variety of games in steam like ui
"
              number={3}
            >
              <div className="flex">
                <ItemsCardTech
                  title="php"
                  className="border-[1.5px] border-white text-white rounded-none"
                />
              </div>
              <div className="flex">
                <ItemsCardLink
                  title="github"
                  link="https://github.com/rimexe0/gameAge"
                  className="bg-black border-[1.5px] border-black text-white"
                />
                <ItemsCardLink
                  title="website"
                  link="http://odevsite.great-site.net"
                  className="bg-black border-[1.5px] border-black text-white"
                />
              </div>
            </ItemsCardContent>
            <ItemsCardContent
              title="rimexe.tech"
              desc="literally this site itself "
              number={4}
            >
              <div className="flex">
                <ItemsCardTech
                  title="Nextjs"
                  className="border-[1.5px] border-white text-white rounded-none"
                />
              </div>
              <div className="flex">
                <ItemsCardLink
                  title="github"
                  link="https://github.com/rimexe0/rimexe0.github.io"
                  className="bg-black border-[1.5px] border-black text-white"
                />
              </div>
            </ItemsCardContent>
          </ItemsCard>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 0.5 * 33 }}
          id="aboutpart"
          className="mb-10"
        >
          <ItemsCard title="About" number={2}>
            <ItemsCardContent
              title="Emir Ozturk"
              desc="Fullstack web developer graduated from IEU"
              number={1}
            >
              <div className="flex">
                <ItemsCardTech
                  title="coffee"
                  className="border-[1.5px] border-white text-white rounded-none"
                />
                <ItemsCardTech
                  title="lofi"
                  className="border-[1.5px] border-white text-white rounded-none"
                />
              </div>
              <div className="flex">
                <ItemsCardLink
                  title="github"
                  link="https://github.com/rimexe0"
                  className="bg-black border-[1.5px] border-black text-white"
                />
                <ItemsCardLink
                  title="linkedin"
                  link="https://www.linkedin.com/in/rimexe/"
                  className="bg-[#005889] border-[1.5px] border-[#005889] text-white"
                />
                <ItemsCardLink
                  title="portfolio"
                  link="/cv.pdf"
                  className="bg-[#728900] border-[1.5px] border-[#728900] text-white"
                />
              </div>
            </ItemsCardContent>
          </ItemsCard>
        </motion.div>
      </div>
    </div>
  );
}
