import Chat from "@/components/common/chat";
import { Connect } from "@/components/common/connect";
import Projects from "@/components/common/projects";
import Bento from "@/components/home/bento";
import CallToActionSection from "@/components/home/cta-section";
import Dash from "@/components/home/dash";
import Designali from "@/components/home/designali";
import Hero from "@/components/home/hero";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below

  return (
    <main className="">
      <Hero />
      <Bento />
      <Dash />
      <CallToActionSection />
      <Projects />
      <Connect />
      <Designali />
      <Chat />
    </main>
  );
}
