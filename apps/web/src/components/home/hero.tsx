"use client";

// this is a client component
import Link from "next/link";
import { cn } from "@designali/ui";
import { buttonVariants } from "@designali/ui/button";

import "@/styles/text.css";

import { Icons } from "../icons";

const Hero = () => {
  return (
    <section id="home">
      <div className="animation-delay-8 animate-fadeIn mt-20 flex flex-col items-center justify-center px-4 text-center md:mt-20">
        <div className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-20">
          <div className="relative flex items-center whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs leading-6 text-slate-600 ring-1 ring-slate-200 dark:bg-black dark:text-slate-400 dark:ring-slate-800">
            <Icons.shapes className="h-5 p-1" /> Introducing 3Dicons.
            <a
              href="/products/3dicons"
              rel="noreferrer"
              className="hover:text-ali ml-1 flex items-center font-semibold "
            >
              <div className="absolute inset-0 flex " aria-hidden="true" />
              Explore{" "}
              <span aria-hidden="true">
                <Icons.arrowright className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>

        <div className=" mb-10 mt-4 md:mt-6">
          <div className="px-2">
            <div className="relative h-full w-full border border-slate-200 [mask-image:radial-gradient(200rem_24rem_at_center,white,transparent)] dark:border-slate-800">
              <h1 className="tracking-tightest flex select-none flex-col px-3 py-2 text-center text-7xl font-extrabold leading-none sm:text-8xl md:flex-col lg:flex-row">
                <Icons.plus
                  strokeWidth={0.5}
                  className="text-aired absolute -left-4 -top-4 h-8 w-8"
                />
                <Icons.plus
                  strokeWidth={0.5}
                  className="text-aired absolute -bottom-4 -left-4 h-8 w-8"
                />
                <Icons.plus
                  strokeWidth={0.5}
                  className="text-aired absolute -right-4 -top-4 h-8 w-8"
                />
                <Icons.plus
                  strokeWidth={0.5}
                  className="text-aired absolute -bottom-4 -right-4 h-8 w-8"
                />

                <span
                  data-content="Coffee."
                  className="before:animate-gradient-background-1 relative before:absolute before:bottom-4 before:left-0 before:top-0 before:z-0  before:w-full before:px-2 before:content-[attr(data-content)]  sm:before:top-0"
                >
                  <span className="from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                    Coffee.
                  </span>
                </span>
                <span
                  data-content="Think."
                  className="before:animate-gradient-background-2 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
                >
                  <span className="from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                    Think.
                  </span>
                </span>
                <span
                  data-content="Create."
                  className="before:animate-gradient-background-3 relative before:absolute before:bottom-1 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
                >
                  <span className="from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                    Create.
                  </span>
                </span>
              </h1>
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-semibold md:text-2xl">
            Welcome to my creative playground! I&#39;m{" "}
            <span className="text-ali font-bold">Ali </span>
          </h1>

          <p className="md:text-md mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-slate-600 dark:text-slate-400 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
            I craft enchanting visuals for brands, and conjure design resources
            to empower others. I have a knowledge of tools like .
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/pricing" className="">
              See Pricing
              <span className="sr-only">Buy now</span>
            </Link>
            <Link href="/designs" className="">
              Start Learning
              <span className="sr-only">Buy now</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
