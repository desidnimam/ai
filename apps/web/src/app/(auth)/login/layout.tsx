import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@designali/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) redirect("/dashboard");

  return <div className="my-60 flex justify-center">{children}</div>;
}
