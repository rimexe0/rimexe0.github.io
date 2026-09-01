import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function Projects() {
  function ProjectsCardCarousel() {
    return (
      <Carousel
        id="projects"
        className="grow min-h-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="min-h-full ">
          <CarouselItem className=" ">
            <div className="min-h-[500px] border-2 border-slate-700 rounded-lg p-3 bg-slate-600/30 ">
              <span className="flex justify-between">
                <h1 className="text-4xl">Mise</h1>
                <div className="links">
                  <a href="">
                    <i className="bi bi-github"></i>
                  </a>
                  <a href="">Website</a>
                </div>
              </span>
              <p>
                A restaurant accounting program made with laravel+livewire+react
              </p>
              <div className="w-[80%] mx-auto helllo">
                <ProjectCardImagesCarousel>
                  <ProjectCardImageImages
                    img="/img/mise1.png"
                    alt="mise 1st pic"
                  />
                  <ProjectCardImageImages
                    img="/img/mise2.png"
                    alt="mise 2nd pic"
                  />
                  <ProjectCardImageImages
                    img="/img/mise3.png"
                    alt="mise 3rd pic"
                  />
                </ProjectCardImagesCarousel>
              </div>
            </div>
          </CarouselItem>
          {/* <CarouselItem className="h-full grow">...</CarouselItem> */}
          {/* <CarouselItem className="h-full grow">...</CarouselItem> */}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }
  function ProjectCardImagesCarousel({ children }: any) {
    return (
      <Carousel
        id="mise-images"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="">{children}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }
  function ProjectCardImageImages({ img, alt }: { img: string; alt: string }) {
    return (
      <CarouselItem className="">
        <div className="eh"></div>
        <img
          src={img}
          alt={alt}
          className="w-full rounded-lg shadow-md border-2 border-slate-300"
        />
      </CarouselItem>
    );
  }
  function ProjectsCard() {
    return (
      <div
        className="
    w-[90%] h-[90%] 
    mx-auto
    p-2
    "
      >
        <div className="images min-h-[500px] h-full flex m-2">
          <ProjectsCardCarousel />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-5xl">Projects</h1>
      <div className="w-full h-full">
        <ProjectsCard />
      </div>
    </div>
  );
}
