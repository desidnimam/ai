import Hero from "@/components/home/hero";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below

  return (
    <main className="container h-screen py-16">
      <Hero />
    </main>
  );
}
