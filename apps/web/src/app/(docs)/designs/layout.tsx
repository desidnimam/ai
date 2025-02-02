import { DocsSidebarNav } from "@/components/mdx/doc/sidebar-nav";
import { docsConfig } from "@/config/docs";
import { ScrollArea } from "@designali/ui/scroll-area";

export const metadata = {
  title: "Design - Ali Imam",
  description:
    "This section includes end-to-end guides for developing Next.js 13 apps.",
};

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex-1 px-6 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
      <aside className="fixed top-24 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-slate-400 dark:border-slate-600 md:sticky md:block">
        <ScrollArea className="h-full pr-6">
          <DocsSidebarNav items={docsConfig.sidebarNav} />
        </ScrollArea>
      </aside>
      {children}
    </div>
  );
}
