"use client";

import * as React from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { cn } from "@designali/ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@designali/ui/navigation-menu";

export function Menu() {
  return (
    <div className="hidden px-4 lg:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About AI
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href={"/products"}>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            </Link>

            <NavigationMenuContent>
              <ul className="mx-auto grid max-w-5xl gap-3 md:px-6 lg:grid-cols-4">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="hover:bg-ali flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/products/graaadients"
                    >
                      <Icons.gradient strokeWidth={1} className="h-8 w-8" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Graaadients
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        +1000 abstract gradient elements and backgrounds for
                        your amazing design projects.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="hover:bg-ali flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/products/3dicons"
                    >
                      <Icons.box strokeWidth={1} className="h-8 w-8" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        3D Icons
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        +100 3D icons and shapes elements and backgrounds for
                        your amazing design projects.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="hover:bg-ali flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/products"
                    >
                      <Icons.shapes strokeWidth={1} className="h-8 w-8" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Shapes
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        +1000 abstract shapes elements and backgrounds for your
                        amazing design projects.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  All gradients are 100% free.
                </ListItem>
                <ListItem href="/" title="Installation">
                  Download. Edit. Upload.
                </ListItem>
                <ListItem href="/" title="Styles">
                  Download full pack
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/blogs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Blogs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/designs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Designs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md  p-4 leading-none text-slate-600 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:text-slate-400",
            className,
          )}
          {...props}
        >
          <div className="text-xs hover:text-black hover:dark:text-white">
            {title}
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
