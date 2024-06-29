import type { DocsConfig, GuidesConfig } from "@/components/mdx/doc/types";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Designs",
      href: "/designs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/designs",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Logo",
          href: "/designs/openfile/logo",
        },
      ],
    },
  ],
};

export const guidesConfig: GuidesConfig = {
  mainNav: [
    {
      title: "Designs",
      href: "/designs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/guides",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Logo",
          href: "/guides/logo",
        },
      ],
    },
  ],
};
