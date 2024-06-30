import Link from "next/link";
import { Icons } from "@/components/icons";
import { signIn } from "@designali/auth";
import { Button } from "@designali/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@designali/ui/card";
import { Input } from "@designali/ui/input";
import { Label } from "@designali/ui/label";
import { Separator } from "@designali/ui/separator";
import { z } from "zod";

/**
 * allowed URL search params
 */
const searchParamsSchema = z.object({
  redirectTo: z.string().optional().default("/"),
});

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const search = searchParamsSchema.safeParse(searchParams);
  const redirectTo = search.success ? search.data.redirectTo : "/dashboard";

  return (
    <div className="my-4 grid w-full max-w-xl gap-6 md:p-10">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign In</CardTitle>
          <CardDescription>
            Get started now. No credit card required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("resend", { redirectTo: "/dashboard" });
              }}
              className="w-full"
            >
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@aliimam.in"
                  required
                />
                <Button variant="default" type="submit" size={"lg"}>
                  Signin with Email <Icons.mail className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
            <Separator />
            <div className="grid justify-center gap-2">
              <form
                action={async () => {
                  "use server";
                  await signIn("github", { redirectTo: "/dashboard" });
                }}
                className="w-full"
              >
                <Button variant="outline" type="submit" size={"lg"}>
                  Signin with GitHub <Icons.github className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/dashboard" });
                }}
                className="w-full"
              >
                <Button type="submit" variant="outline" size={"lg"}>
                  Signin with Google <Icons.menu className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary hover:no-underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary hover:no-underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
