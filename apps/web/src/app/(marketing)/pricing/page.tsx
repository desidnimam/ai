import Billing from "@/components/dashboard/billing";
import { FAQ } from "@/components/home/faq";

export default function HomePage() {
  return (
    <main className="mt-14">
      <Billing />
      <div className="px-6">
        <FAQ />
      </div>
    </main>
  );
}
