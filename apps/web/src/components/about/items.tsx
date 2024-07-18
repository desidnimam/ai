/**
 * Inspired by: https://fig.io
 */
"use client";

import Counter from "@/components/common/countnumber";
import { api } from "@/trpc/react";
import { ArrowRightIcon, PencilIcon, StarIcon } from "lucide-react";

import { Icons } from "../icons";
import { Link } from "../ui/link";

interface Card {
  icon: React.ReactNode;
  title: string;
  link: string;
  value: number | undefined;
  linkText: string;
  gradient: {
    startColor: string;
    endColor: string;
  };
  suffix?: string;
}

const Items = () => {
  const viewsQuery = api.views.getCount.useQuery();

  const data: Card[] = [
    {
      title: "Blog Total Views",
      link: "https://designali.in/blogs",
      value: viewsQuery.data.views,
      icon: "",
      linkText: "Blogs",
      gradient: {
        startColor: "#ff0f7b",
        endColor: "#f945ff",
      },
    },
  ];

  return (
    <div className="mb-4 mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data.map((item) => {
        const {
          icon,
          link,
          title,
          value,
          linkText,
          gradient: { startColor, endColor },
          suffix,
        } = item;

        return (
          <Link
            key={item.title}
            href={link}
            className="group relative overflow-hidden rounded-lg border p-4 transition-colors hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900"
          >
            <div className="flex flex-col items-center justify-center gap-2 transition-transform group-hover:-translate-y-24 group-focus:-translate-y-24">
              <div className="flex items-center gap-2 text-5xl font-bold">
                {value === 0 || value !== undefined ? (
                  <>
                    <span>{icon}</span>
                    <div
                      style={{
                        background: `linear-gradient(122.25deg, ${startColor} 12.16%, ${endColor} 70.98%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <Counter value={Number(value)} />
                      {suffix ? <span>{` ${suffix}`}</span> : null}
                    </div>
                  </>
                ) : (
                  "--"
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {title}
              </div>
            </div>
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 translate-y-24 items-center gap-1 text-2xl font-bold opacity-0 transition group-hover:-translate-y-1/2 group-hover:opacity-100 group-focus:-translate-y-1/2 group-focus:opacity-100">
              {linkText}
              <ArrowRightIcon className="size-6" />
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Items;
