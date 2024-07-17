import Image from "next/image";
import About from "@/components/about/about";
import { Experience } from "@/components/about/experience";
import { Connect } from "@/components/common/connect";
import ImageZoom from "@/components/common/image-zoom";
import Logos from "@/components/common/logos";
import { Icons } from "@/src/components/icons";
import { cn } from "@designali/ui";

import { Avegra } from "../../fonts";

export default function HomePage() {
  return (
    <main className="py-16">
      <div className="mx-auto mt-40 max-w-3xl px-6 md:max-w-5xl">
        <div className="relative mx-auto mt-10 flex h-[28rem] max-w-sm flex-col items-start border border-slate-100 p-4 dark:border-slate-900">
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
              className="h-[404px] object-cover "
            />
            <div className="relative -mt-24 bg-gradient-to-b from-black/0 to-black text-white">
              <h1
                className={cn(
                  Avegra.className,
                  "z-20 items-center text-center text-[70px] ",
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
