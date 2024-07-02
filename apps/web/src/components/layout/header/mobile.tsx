"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@designali/ui/accordion";
import { Disclosure, Transition } from "@headlessui/react";

import { Icons } from "../../icons";

const navigation = [
  { name: "About AI", href: "/about", current: true },
  { name: "Products", href: "/products", current: true },
  { name: "Portfolio", href: "/portfolio", current: true },
  { name: "Pricing", href: "/pricing", current: true },
  { name: "Blogs", href: "/blogs", current: true },
  { name: "Designs", href: "/designs", current: true },
];

const helps = [
  { name: "Contact", href: "/contact", current: true },
  { name: "Privacy", href: "/privacy", current: true },
  { name: "Terms", href: "/terms", current: true },
];

export default function Navbar() {
  return (
    <Disclosure as="nav" className="w-full">
      {({ open }) => (
        <>
          <header className="">
            <div className="fixed right-2 top-2 flex flex-1 items-center justify-end">
              <div className="mr-2 flex transition ease-in-out md:px-8 lg:hidden">
                <Disclosure.Button className="items-center justify-center p-2 text-center text-slate-600 dark:text-slate-400">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <Icons.close
                      strokeWidth={1.5}
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icons.menu
                      strokeWidth={1.5}
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Disclosure.Panel className="mx-auto px-6 md:max-w-3xl lg:hidden">
                  <div className="flex flex-col py-3 ">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="text-md py-2 font-semibold"
                        aria-current={item.current ? "page" : undefined}
                      >
                        <p className="flex items-center gap-2">
                          <span>{item.name}</span>
                        </p>
                      </Disclosure.Button>
                    ))}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Others</AccordionTrigger>
                        <AccordionContent>
                          {helps.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="text-md flex px-4 py-2 font-semibold"
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <div className="mt-6"></div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          </header>
        </>
      )}
    </Disclosure>
  );
}
