import { redirect } from "next/navigation";
import { auth } from "@designali/auth";

export default async function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }
  return <main>{children}</main>;
}
