import type { ValidIcon } from "@/components/dash-icons";

export interface Page {
  title: string;
  description: string;
  href: string;
  icon: ValidIcon;
  disabled?: boolean;
  segment: string;
  children?: Page[];
}

export const settingsPagesConfig: Page[] = [
  {
    title: "General",
    description: "General settings for the workspace.",
    href: "/settings",
    icon: "cog",
    segment: "general",
  },
  {
    title: "Team",
    description: "Team settings for the workspace.",
    href: "/settings/team",
    icon: "users",
    segment: "team",
  },
  {
    title: "API Token",
    description: "API token settings for the workspace.",
    href: "/settings/api-token",
    icon: "key",
    segment: "api-token",
  },
  {
    title: "Billing",
    description: "Billing settings for the workspace.",
    href: "/settings/billing",
    icon: "credit-card",
    segment: "billing",
  },
  {
    title: "Appearance",
    description: "Appearance settings for the workspace.",
    href: "/settings/appearance",
    icon: "sun",
    segment: "appearance",
  },
  {
    title: "User",
    description: "Profile settings for the user.",
    href: "/settings/user",
    icon: "user",
    segment: "user",
  },
];

export const monitorPagesConfig: Page[] = [
  {
    title: "Overview",
    description: "Dashboard with all the metrics and charts.",
    href: "/monitors/[id]/overview",
    icon: "line-chart",
    segment: "overview",
  },
  {
    title: "Response logs",
    description: "Data table with all response details.",
    href: "/monitors/[id]/data",
    icon: "table",
    segment: "data",
  },
  {
    title: "Settings",
    description: "Edit section for the monitor.",
    href: "/monitors/[id]/edit",
    icon: "cog",
    segment: "edit",
  },
];

export const statusPagesPagesConfig: Page[] = [
  {
    title: "Settings",
    description: "Edit section for the status page.",
    href: "/status-pages/[id]/edit",
    icon: "cog",
    segment: "edit",
  },
  {
    title: "Domain",
    description: "Where you can see the domain settings.",
    href: "/status-pages/[id]/domain",
    icon: "globe",
    segment: "domain",
  },
  {
    title: "Subscribers",
    description: "Where you can see all the subscribers.",
    href: "/status-pages/[id]/subscribers",
    icon: "users",
    segment: "subscribers",
  },
  {
    title: "Maintenance",
    description: "Where you can see all the maintenance.",
    href: "/status-pages/[id]/maintenances",
    icon: "hammer",
    segment: "maintenances",
  },
];

const incidentPagesConfig: Page[] = [
  {
    title: "Overview",
    description: "Timeline with all the actions.",
    href: "/incidents/[id]/overview",
    icon: "file-clock",
    segment: "overview",
  },
];

export const statusReportsPagesConfig: Page[] = [
  {
    title: "Overview",
    description: "Overview of the status report.",
    href: "/status-reports/[id]/overview",
    icon: "megaphone",
    segment: "overview",
  },
  {
    title: "Settings",
    description: "Edit section for the status report.",
    href: "/status-reports/[id]/edit",
    icon: "cog",
    segment: "edit",
  },
];

export const notificationsPagesConfig: Page[] = [
  {
    title: "Settings",
    description: "Edit section for the notifications.",
    href: "/notifications/[id]/edit",
    icon: "cog",
    segment: "edit",
  },
];

export type PageId = (typeof pagesConfig)[number]["segment"];

export const pagesConfig = [
  {
    title: "Overview",
    description: "Check all the responses in one place.",
    href: "/overview",
    icon: "activity",
    segment: "overview",
    children: monitorPagesConfig,
  },
  {
    title: "Playground",
    description: "All your incidents.",
    href: "/playground",
    icon: "siren",
    segment: "playground",
    children: incidentPagesConfig,
  },
  {
    title: "Products",
    description: "All your incidents.",
    href: "/products",
    icon: "siren",
    segment: "products",
    children: incidentPagesConfig,
  },
  {
    title: "Orders",
    description: "Where you can see all the pages.",
    href: "/orders",
    icon: "panel-top",
    segment: "orders",
    children: statusPagesPagesConfig,
  },
  {
    title: "Mails",
    description: "Where you can see all the notifications.",
    href: "/mails",
    icon: "bell",
    segment: "mails",
    children: notificationsPagesConfig,
  },
  {
    title: "Billing",
    description: "Get speed insights for your application.",
    href: "/billing",
    icon: "ratio",
    segment: "billing",
  },
  {
    title: "Settings",
    description: "Your workspace settings",
    href: "/settings",
    icon: "cog",
    segment: "settings",
    children: settingsPagesConfig,
  },
] as const satisfies readonly Page[];

export const adminConfig = [
  {
    title: "Overview",
    description: "Check all the responses in one place.",
    href: "/overview",
    icon: "activity",
    segment: "overview",
    children: monitorPagesConfig,
  },
  {
    title: "Products",
    description: "All your incidents.",
    href: "/products",
    icon: "siren",
    segment: "products",
    children: incidentPagesConfig,
  },
  {
    title: "Orders",
    description: "Where you can see all the pages.",
    href: "/orders",
    icon: "panel-top",
    segment: "orders",
    children: statusPagesPagesConfig,
  },
  {
    title: "Users",
    description: "Where you can see all the notifications.",
    href: "/users",
    icon: "bell",
    segment: "users",
    children: notificationsPagesConfig,
  },
  {
    title: "Settings",
    description: "Your workspace settings",
    href: "/settings",
    icon: "cog",
    segment: "settings",
    children: settingsPagesConfig,
  },
] as const satisfies readonly Page[];

export const marketingPagesConfig = [
  {
    href: "/blog",
    title: "Blog",
    description: "All the latest articles and news from OpenStatus.",
    segment: "blog",
    icon: "book",
  },
  {
    href: "/play",
    title: "Playground",
    description: "All the latest tools build by OpenStatus.",
    segment: "play",
    icon: "toy-brick",
  },
  {
    href: "/changelog",
    title: "Changelog",
    description: "All the latest features, fixes and work to OpenStatus.",
    segment: "changelog",
    icon: "newspaper",
  },
  {
    href: "/pricing",
    title: "Pricing",
    description: "The pricing for OpenStatus.",
    segment: "pricing",
    icon: "credit-card",
  },
  {
    href: "https://docs.openstatus.dev",
    description: "The documentation for OpenStatus.",
    title: "Docs",
    segment: "docs",
    icon: "book",
  },
] as const satisfies readonly Page[];

export function getPageBySegment(
  segment: string | string[],
  currentPage: readonly Page[] = pagesConfig,
): Page | undefined {
  if (typeof segment === "string") {
    const page = currentPage.find((page) => page.segment === segment);
    return page;
  }
  if (Array.isArray(segment) && segment.length > 0) {
    const [firstSegment, ...restSegments] = segment;
    const childPage = currentPage.find((page) => page.segment === firstSegment);
    if (childPage.children) {
      return getPageBySegment(restSegments, childPage.children);
    }
    return childPage;
  }
  return undefined;
}
