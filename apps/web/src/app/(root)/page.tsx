import { Connect } from "@/components/common/connect";
import Projects from "@/components/common/projects";
import Bento from "@/components/home/bento";
import Designali from "@/components/home/designali";
import Hero from "@/components/home/hero";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below

  return (
    <main className="">
      <Hero />
      <Bento />
      <Projects />
      <Connect />
      <Designali />
    </main>
  );
}
