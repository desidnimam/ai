"use client";

import React from "react";
import { Textarea } from "@designali/ui/textarea";

const WordCounter = () => {
  const [value, setValue] = React.useState("");
  const words = value.match(/\S+/g)?.length || 0;
  const chars = value.length || 0;
  const charsWithoutSpaces = value.replaceAll(" ", "").length || 0;
  const paragraphs =
    value.split("\n").filter((paragraph) => paragraph !== "").length || 0;

  return (
    <div className="mx-auto my-10 flex max-w-5xl flex-col items-center justify-center md:my-20">
      <p className="lg:text-md my-6 text-center text-xs font-light uppercase tracking-widest text-slate-600 dark:text-slate-400">
        Word Counter
      </p>
      <div className=" grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="h-20 w-full rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
          <div className="text-2xl font-bold">{words}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            words
          </div>
        </div>
        <div className="h-20 w-full rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
          <div className="text-2xl font-bold">{chars}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            characters
          </div>
        </div>
        <div className="h-20 w-full rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
          <div className="text-2xl font-bold">{charsWithoutSpaces}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            characters without spaces
          </div>
        </div>
        <div className="h-20 w-full rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
          <div className="text-2xl font-bold">{paragraphs}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            paragraphs
          </div>
        </div>
      </div>

      <Textarea
        className="mt-2 h-36"
        placeholder="Type here ..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default WordCounter;
