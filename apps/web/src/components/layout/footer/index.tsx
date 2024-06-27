"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";

import ThemeToogle from "./theme";

export interface Menus {
  text: string;
  href: string;
  target: string;
}

export const items: Menus[] = [
  {
    text: "About AI",
    href: "/about",
    target: "",
  },
  {
    text: "Gallery",
    href: "/gallery",
    target: "",
  },
  {
    text: "Portfolio",
    href: "/portfolio",
    target: "",
  },
  {
    text: "Products",
    href: "/products",
    target: "",
  },
  {
    text: "Graaadients",
    href: "/products/graaadients",
    target: "",
  },
  {
    text: "3D Icons",
    href: "/products/3dicons",
    target: "",
  },
  {
    text: "Designs",
    href: "/designs",
    target: "",
  },
  {
    text: "Coding",
    href: "/guides",
    target: "",
  },
  {
    text: "Blogs",
    href: "/blogs",
    target: "",
  },
  {
    text: "Contact",
    href: "/contact",
    target: "",
  },
  {
    text: "Terms",
    href: "/terms",
    target: "",
  },
  {
    text: "Privacy",
    href: "/privacy",
    target: "",
  },
];

const Underline = `hover:-translate-y-1 border border-slate-100 dark:border-slate-900 rounded-xl p-2.5 transition-transform text-slate-600 hover:border-slate-200 dark:hover:border-slate-800 hover:text-ali hover:dark:text-ali dark:text-slate-400 `;

export function Footer() {
  return (
    <footer className="border-ali/50 mx-auto mt-20 w-full border-t px-2 sm:px-4">
      <div className="-mt-10 flex flex-wrap justify-center gap-8 ">
        <Link href="/">
          <p className="flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-black">
            <Icons.Logo className="mb-2 w-10" />
          </p>
        </Link>
      </div>

      <div className="mx-auto max-w-4xl ">
        <div className="mt-4 flex flex-wrap justify-center gap-x-10 gap-y-6 p-8">
          {items.map((Menus) => (
            <figure key={Menus.text}>
              <div className="text-sm text-slate-600 hover:text-black dark:text-slate-400 hover:dark:text-white md:text-xs">
                <span className="">
                  <Link href={Menus.href} target={Menus.target}>
                    {Menus.text}
                  </Link>
                </span>
              </div>
            </figure>
          ))}
          <Link
            href="/Ali-CV.pdf"
            target="_blank"
            className="text-slate-600 hover:text-black dark:text-slate-400 hover:dark:text-white"
            download={true}
          >
            <p className="text-sm md:text-xs">Download CV</p>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          <Link
            href="tel:+919650133705"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <Icons.phone strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:contact@aliimam.in"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <Icons.mail strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            href="https://wa.me/message/6XOEA2NCD5OFB1"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <Icons.whatsapp className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/aliimam.in/"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <Icons.instagram strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com/aliimam_in"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <Icons.twitterx className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.facebook.com/aliimam.in"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <Icons.facebook className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/aliimam-in/"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <Icons.linked className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.youtube.com/@aliimam_in"
            rel="noreferrer"
            target="_blank"
            className={Underline}
          >
            <Icons.youtube className="h-5 w-5" />
          </Link>
        </div>
        <ThemeToogle />
      </div>

      <div className="d mx-auto mb-10 mt-10 flex  flex-col justify-between text-center md:max-w-5xl">
        <div className="flex flex-row items-center justify-center gap-1 text-slate-600 dark:text-slate-400">
          <span> © </span>
          <span>{new Date().getFullYear()}</span>
          <span>Made with</span>
          <Icons.heart className="text-ali mx-1 h-4  w-4 animate-pulse" />
          <span> by </span>
          <span className="hover:text-ali dark:hover:text-ali cursor-pointer font-bold text-black dark:text-white">
            <a href="/">Ali Imam</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
