import Image from "next/image";
import About from "@/components/about/about";
import { Experience } from "@/components/about/experience";
import Items from "@/components/about/items";
import { Connect } from "@/components/common/connect";
import ImageZoom from "@/components/common/image-zoom";
import Logos from "@/components/common/logos";
import { Icons } from "@/src/components/icons";
import { cn } from "@designali/ui";

import { Avegra } from "../../fonts";

export default function HomePage() {
  return (
    <main className="">
      <div className="mx-auto mt-28 max-w-3xl px-6 md:mt-40 md:max-w-5xl">
        <div className="relative mx-auto mt-10 flex h-[336px] max-w-[250px] flex-col items-start border border-slate-100 p-4 dark:border-slate-900 md:h-[28rem] md:max-w-sm">
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
          <ImageZoom>
            <Image
              src="/ali.jpg"
              alt="Your Image"
              height={1000}
              width={1000}
              className="h-[300px] object-cover md:h-[404px] "
            />
            <div className="relative -mt-14 bg-gradient-to-b from-black/0 to-black text-white md:-mt-24">
              <h1
                className={cn(
                  Avegra.className,
                  "z-20 items-center text-center text-[40px] md:text-[70px]",
                )}
              >
                Ali Imam
              </h1>{" "}
            </div>
          </ImageZoom>
        </div>
        <div className="mx-auto mt-20 max-w-3xl md:max-w-5xl ">
          <About />
          <Experience />
          <div className="flex flex-col items-center">
            <h3 className="mt-6 inline-flex items-baseline bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 bg-clip-text pb-1 text-center font-bold text-transparent dark:bg-gradient-to-r dark:from-slate-600 dark:via-slate-200 dark:to-slate-600 dark:bg-clip-text">
              <span className="text-2xl md:text-4xl">AI Dashboard</span>
            </h3>
            <hr className="bg-aired mx-auto my-4 h-1 w-6 rounded border-0"></hr>
          </div>
          <p className="mx-auto max-w-3xl px-6 text-center text-sm leading-5 text-slate-600 dark:text-slate-400">
            This is my personal dashboard, built with Next.js API routes
            deployed as serverless functions. I use this dashboard to track
            various metrics across platforms like YouTube and more.
          </p>

          <h1 className="my-6 mt-12 text-center text-xs font-semibold uppercase tracking-[.3em] text-slate-400 ">
            Worked with Brands Like
          </h1>
          <Logos />
        </div>
      </div>
      <Connect />
    </main>
  );
}
