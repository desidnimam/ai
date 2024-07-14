import AIConverter from "@/components/tools/aiconverter";
import WordCounter from "@/components/tools/wordcount";
import PageTitle from "@/src/components/mdx/page-title";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below

  return (
    <main className="mx-auto mt-20 max-w-7xl px-6 md:mt-40">
      <PageTitle
        title="Tools"
        description={`You can use any without any cost.`}
      />
      <AIConverter />
      <WordCounter />
    </main>
  );
}
