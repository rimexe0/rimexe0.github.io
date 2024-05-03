"use client";
import ItemsCard from "@/components/ItemsCard";
import Logo from "@/components/logo";
import {
  ItemsCardContent,
  ItemsCardLink,
  ItemsCardTech,
} from "@/components/ItemsCard";
export default function Home() {
  return (
    <div className="min-h-screen ">
      <div id="logopart" className="mx-auto w-3 pt-4">
        <h1 className="logo flex justify-center">
          <span className="text-wrapper  ">
            <Logo />
          </span>
        </h1>
      </div>
      <div className="flex justify-evenly flex-wrap ">
        <div id="projetcspart" className="mb-10">
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
        </div>
        <div id="aboutpart" className="mb-10">
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
        </div>
      </div>
    </div>
  );
}
