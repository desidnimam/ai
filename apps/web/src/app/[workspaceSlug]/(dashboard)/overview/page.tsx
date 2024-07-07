import { Dashboard } from "@/components/dashboard/overview/dash";
import UserId from "@/components/dashboard/user-id";

export default function HomePage() {
  return (
    <main className="mt-40 ">
      <div className="grid justify-center text-center">
        <h1 className="py-4">Welcome</h1>
        <UserId />
      </div>
      <Dashboard />
    </main>
  );
}
