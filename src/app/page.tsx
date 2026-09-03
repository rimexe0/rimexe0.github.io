import ItemsCard from "@/components/ItemsCard";
import IntroMotion from "./intro-motion";
import Logo from "@/components/logo";
import FpsMeter from "./fps-meter";
import {
  ItemsCardContent,
  ItemsCardLink,
  ItemsCardTech,
} from "@/components/ItemsCard";
export default function Home() {
  return (
    <div className="min-h-screen ">
      <IntroMotion />
      <div id="logopart" className="mx-auto w-3 pt-4">
        <h1 className="logo flex justify-center">
          <span className="text-wrapper  ">
            <Logo />
          </span>
        </h1>
        <div className="flex justify-center">
          <FpsMeter />
        </div>
      </div>
      <div className="flex justify-evenly flex-wrap ">
        <div
          id="projetcspart"
          className="homepage-entry mb-10"
        >
          <ItemsCard title="Projects" number={1}>
            <ItemsCardContent
              title="Meva"
              desc="Local-first media library for collecting, tagging, and searching media."
              number={1}
            >
              <div className="flex">
                <ItemsCardTech
                  title="Rust"
                  className="border-[1.5px] border-[#dea584] bg-[#dea584] text-black rounded-none"
                />
                <ItemsCardTech
                  title="React"
                  className="border-[1.5px] border-[#61dafb] bg-[#61dafb] text-black rounded-none"
                />
                <ItemsCardTech
                  title="Electron"
                  className="border-[1.5px] border-[#47848f] bg-[#47848f] text-white rounded-none"
                />
              </div>

              <div>
                <ItemsCardLink
                  title="Coming soon(hopefully)"
                  link=""
                  className="bg-black border-[1.5px] border-black text-white"
                  rainbow
                />
              </div>
            </ItemsCardContent>
            <ItemsCardContent
              title="DuckedUpChat"
              desc="Self-hosted chat app for communities, with web, desktop, and Android clients."
              number={2}
            >
              <div className="flex">
                <ItemsCardTech
                  title="Rust"
                  className="border-[1.5px] border-[#dea584] bg-[#dea584] text-black rounded-none"
                />
                <ItemsCardTech
                  title="React"
                  className="border-[1.5px] border-[#61dafb] bg-[#61dafb] text-black rounded-none"
                />
                <ItemsCardTech
                  title="Tauri"
                  className="border-[1.5px] border-[#ffc131] bg-[#ffc131] text-black rounded-none"
                />
              </div>
              <div>
                <ItemsCardLink
                  title="preview"
                  link="https://ducked-up-chat-desktop.vercel.app"
                  className="bg-black border-[1.5px] border-black text-white"
                />
              </div>
            </ItemsCardContent>
            <ItemsCardContent
              title="not."
              desc="Fast local Markdown scratchpad for macOS with a global shortcut."
              number={3}
            >
              <div className="flex">
                <ItemsCardTech
                  title="Rust"
                  className="border-[1.5px] border-[#dea584] bg-[#dea584] text-black rounded-none"
                />
                <ItemsCardTech
                  title="Tauri"
                  className="border-[1.5px] border-[#ffc131] bg-[#ffc131] text-black rounded-none"
                />
              </div>
              <div className="flex">
                <ItemsCardLink
                  title="github"
                  link="https://github.com/rimexe0/not"
                  className="bg-black border-[1.5px] border-black text-white"
                />
              </div>
            </ItemsCardContent>
            <ItemsCardContent
              title="Githubers"
              desc="Self-hosted GitHub Projects watcher with agent runs and local-model summaries."
              number={4}
            >
              <div className="flex">
                <ItemsCardTech
                  title="Next.js"
                  className="border-[1.5px] border-white bg-white text-black rounded-none"
                />
                <ItemsCardTech
                  title="TypeScript"
                  className="border-[1.5px] border-[#3178c6] bg-[#3178c6] text-white rounded-none"
                />
              </div>
              <div className="flex">
                <ItemsCardLink
                  title="github"
                  link="https://github.com/rimexe0/Githubers"
                  className="bg-black border-[1.5px] border-black text-white"
                />
              </div>
            </ItemsCardContent>
            <ItemsCardContent
              title="Wooter Hall Keypad"
              desc="Web Serial configurator and firmware for a two-key Hall-effect keypad."
              number={5}
            >
              <div className="flex">
                <ItemsCardTech
                  title="React"
                  className="border-[1.5px] border-[#61dafb] bg-[#61dafb] text-black rounded-none"
                />
                <ItemsCardTech
                  title="Web Serial"
                  className="border-[1.5px] border-[#4285f4] bg-[#4285f4] text-white rounded-none"
                />
              </div>
              <div className="flex">
                <ItemsCardLink
                  title="github"
                  link="https://github.com/rimexe0/wooter"
                  className="bg-black border-[1.5px] border-black text-white"
                />
                <ItemsCardLink
                  title="website"
                  link="https://wooter.rime.cyou"
                  className="bg-black border-[1.5px] border-black text-white"
                />
              </div>
            </ItemsCardContent>
          </ItemsCard>
        </div>
        <div id="aboutpart" className="homepage-entry mb-10">
          <ItemsCard title="About" number={2}>
            <ItemsCardContent
              title="Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir Emir"
              desc="Webdevmaxxer. graduated from IEU"
              number={1}
              className="text-white"
            >
              <div className="flex">
                <ItemsCardTech
                  title="coffee"
                  className="border-[1.5px] border-[#6c4c35] bg-[#6c4c35] text-white rounded-none"
                />
                <ItemsCardTech
                  title="lofi"
                  className="border-[1.5px] border-[#b7719c] bg-[#b7719c] text-white rounded-none"
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
                  link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="bg-[#728900] border-[1.5px] border-[#728900] text-white "
                />
              </div>
            </ItemsCardContent>
          </ItemsCard>
        </div>
      </div>
    </div>
  );
}
