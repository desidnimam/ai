/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import { DocsPageHeader } from "@/components/mdx/doc/page-header";
import { DashboardTableOfContents } from "@/components/mdx/doc/toc";
import Mdx from "@/components/mdx/layers";
import { getTableOfContents } from "@/lib/toc";
import { allGuides } from "contentlayer/generated";

import "@/styles/mdx.css";

import { Separator } from "@designali/ui/separator";

interface GuidePageProps {
  params: {
    slug: string[];
  };
}

async function getGuideFromParams(params: { slug: any }) {
  const slug = params.slug?.join("/");
  const guide = allGuides.find((guide) => guide.slugAsParams === slug);

  if (!guide) {
    null;
  }

  return guide;
}

export async function generateStaticParams(): Promise<
  GuidePageProps["params"][]
> {
  return allGuides.map((guide) => ({
    slug: guide.slugAsParams.split("/"),
  }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await getGuideFromParams(params);

  const toc = await getTableOfContents(guide.body.raw);

  return (
    <main className="relative py-6 lg:grid lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_260px]">
      <div>
        <DocsPageHeader heading={guide.title} text={guide.description} />
        <Mdx code={guide.body.code} />
        <Separator className="my-8" />
        <div className="flex py-6 lg:py-10">
          <Link href="/guides" className="">
            See all guides
          </Link>
        </div>
      </div>

      <div className="hidden text-sm xl:block">
        <div className="sticky top-24 -my-10 h-[calc(100vh-3.5rem)] overflow-y-auto border-l border-slate-400 px-12 py-12 dark:border-slate-600">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
