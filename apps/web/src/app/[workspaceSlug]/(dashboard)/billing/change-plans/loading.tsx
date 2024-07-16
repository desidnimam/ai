import { DashboardContent } from "@/src/components/dashboard/billing/content";
import { Loading } from "@lemonsqueezy/wedges";

export default function LoadingComponent() {
  return (
    <DashboardContent className="flex h-lvh items-center justify-center">
      <Loading size="md" />
    </DashboardContent>
  );
}
