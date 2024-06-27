import { auth, signIn, signOut } from "@designali/auth";
import { Button } from "@designali/ui/button";

export async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return (
      <form>
        <Button
          size="sm"
          formAction={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          Sign in
        </Button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <form>
        <Button
          size="sm"
          formAction={async () => {
            "use server";
            await signOut();
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
