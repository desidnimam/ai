import Link from "next/link";
import { Icons } from "@/components/icons";
import { signIn } from "@designali/auth";
import { Button } from "@designali/ui/button";
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
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Get started now. No credit card required.
        </p>
      </div>
      <div className="grid justify-center gap-3">
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo });
          }}
          className="w-full"
        >
          <Button type="submit" size={"lg"}>
            Signin with GitHub <Icons.menu className="ml-2 h-4 w-4" />
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo });
          }}
          className="w-full"
        >
          <Button type="submit" variant="outline" size={"lg"}>
            Signin with Google <Icons.menu className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
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
