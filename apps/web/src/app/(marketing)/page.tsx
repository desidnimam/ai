import { Connect } from "@/components/common/connect";
import Bento from "@/components/home/bento";
import Hero from "@/components/home/hero";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below

  return (
    <main className="">
      <Hero />
      <Bento />
      <Connect />
    </main>
  );
}
