import type { Metadata } from "next";
import { CarouselSpacing } from "@/components/common/carousel";
import Projects from "@/components/common/projects";

import { Work } from "./Work";

export const metadata: Metadata = {
  title: "Portfolio - Ali Imam",
  description: "Explore the latest news and updates from the community",
};

export default function Portfolio() {
  return (
    <main>
      <div className="mx-auto mt-40 max-w-3xl px-4 sm:px-6 md:max-w-7xl ">
        <p className="lg:text-md my-2 text-center text-xs font-light uppercase tracking-widest text-slate-600 dark:text-slate-400">
          Welcome to My Portfolio
        </p>
        <div className="flex flex-col items-center px-8">
          <h3 className="inline-flex items-baseline bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 bg-clip-text pb-1 text-center font-bold text-transparent dark:bg-gradient-to-r dark:from-slate-600 dark:via-slate-200 dark:to-slate-600 dark:bg-clip-text">
            <span className="text-3xl tracking-tighter md:text-5xl">
              {" "}
              Crafting Aesthetics, Shaping Brands
            </span>
          </h3>
          <hr className="mx-auto my-4 mb-16 h-1 w-6 rounded border-0 bg-ali"></hr>
        </div>
        <div className="mb-10">
          <Projects />
        </div>
      </div>
      <CarouselSpacing />
      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 md:max-w-7xl ">
        <Work />
      </div>
    </main>
  );
}
