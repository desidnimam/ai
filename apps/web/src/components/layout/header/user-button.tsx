import Link from "next/link";
import { SignOut } from "@/lib/actions/user.actions";
import { auth } from "@designali/auth";
import { Button } from "@designali/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@designali/ui/dropdown-menu";
import { useSession } from "next-auth/react";

export default function UserButton() {
  const session = useSession();

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative ml-2 h-8 w-8 rounded-full"
            >
              {session.data.user.name}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.data.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.data.user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link className="w-full" href="/user/profile">
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link className="w-full" href="/user/orders">
              Order History
            </Link>
          </DropdownMenuItem>

          {session.data.user.role === "admin" && (
            <DropdownMenuItem>
              <Link className="w-full" href="/admin/overview">
                Admin
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="mb-1 p-0">
            <form action={SignOut} className="w-full">
              <Button
                className="h-4 w-full justify-start px-2 py-4"
                variant="ghost"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
