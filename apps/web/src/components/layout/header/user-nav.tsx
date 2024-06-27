import Link from "next/link";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@designali/ui/avatar";
import { Button } from "@designali/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@designali/ui/dropdown-menu";
import { Skeleton } from "@designali/ui/skeleton";
import { signOut, useSession } from "next-auth/react";

export function UserNav() {
  const session = useSession();
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();

  if (session.status !== "authenticated") {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-br from-foreground via-muted-foreground to-muted opacity-70" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="truncate text-xs leading-none text-muted-foreground">
              {session.data.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/app/${workspaceSlug}/settings/billing`}>Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/app/${workspaceSlug}/settings/user`}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
