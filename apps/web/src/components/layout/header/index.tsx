"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";

import { Menu } from "./navmenu";
import { LoginButton } from "./sign-in";
import { ThemeToggle } from "./themetoggle";
import { UserNav } from "./user-nav";

export function Header() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-100/60 backdrop-blur-md backdrop-filter hover:bg-slate-50 dark:bg-slate-900/60 hover:dark:bg-slate-950">
      <div className="mx-auto flex items-center md:px-20">
        <div className="mx-auto flex h-14 max-w-5xl flex-1 items-center">
          <Link
            href="/"
            className="flex items-center justify-center px-6 lg:flex"
          >
            <Logo className="w-7" />
          </Link>
          <Menu />
          <div className="mx-auto flex h-12 flex-1 items-center justify-end gap-2">
            <div className="flex items-center justify-center gap-2 px-3">
              <ThemeToggle />
              <LoginButton />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex flex-1 items-center"></div>
    </nav>
  );
}
