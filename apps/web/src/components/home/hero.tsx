"use client";

// this is a client component
import { useEffect } from "react";
import Link from "next/link";

import "@/styles/text.css";

import { cn } from "@designali/ui";
import { buttonVariants } from "@designali/ui/button";

import { renderCanvas } from "../common/render";
import { TypeWriter } from "../common/type";
import { Icons } from "../icons";

const Hero = () => {
  const talkAbout = [
    "Photoshop",
    "Illustrator",
    "After Effects",
    "Premiere Pro",
    "Cinema 4D",
    "Autodesk Maya",
    "Visual Studio Code",
    "Corel Draw",
    "ZBrush",
  ];

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section id="home">
      <div className="animation-delay-8 animate-fadeIn mt-20 flex flex-col items-center justify-center px-4 text-center md:mt-20">
        <div className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-20">
          <div className="relative flex items-center whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs leading-6 text-slate-600 ring-1 ring-slate-200 dark:bg-black dark:text-slate-400 dark:ring-slate-800">
            <Icons.shapes className="h-5 p-1" /> Introducing Products.
            <a
              href="/products"
              rel="noreferrer"
              className="ml-1 flex items-center font-semibold hover:text-ali "
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
            <div className="relative mx-auto h-full max-w-6xl border border-slate-200 p-6 [mask-image:radial-gradient(200rem_24rem_at_center,white,transparent)] dark:border-slate-800 md:p-12">
              <h1 className="flex select-none flex-col px-3 py-2 text-center text-5xl font-semibold leading-none tracking-tight md:flex-col md:text-8xl lg:flex-row lg:text-8xl ">
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
                A design agency with a touch of magic.
              </h1>
            </div>
          </div>

          <h1 className="mt-8 text-2xl md:text-2xl">
            Welcome to my creative playground! I&#39;m{" "}
            <span className="font-bold text-ali">Ali </span>
          </h1>

          <p className="md:text-md mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-slate-600 dark:text-slate-400 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
            I craft enchanting visuals for brands, and conjure design resources
            to empower others. I have a knowledge of tools like{" "}
            <TypeWriter strings={talkAbout} />.
          </p>
          <div className="grid flex-wrap items-center justify-center gap-3 md:flex">
            <Link
              href="/products"
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "lg",
                }),
              )}
            >
              Start Designing
              <span className="sr-only">Buy now</span>
            </Link>
            <Link
              href="/designs"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
              )}
            >
              Get a Demo
              <span className="sr-only">Buy now</span>
            </Link>
          </div>
        </div>
      </div>
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
    </section>
  );
};

export default Hero;
