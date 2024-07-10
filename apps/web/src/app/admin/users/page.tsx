import type { Metadata } from "next";
import Link from "next/link";
import DeleteDialog from "@/components/admin/delete-dialog";
import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";
import { APP_NAME } from "@/lib/constants";
import { formatId } from "@/lib/dutils";
import PageTitle from "@/src/components/mdx/page-title";
import { auth } from "@designali/auth";
import { Button } from "@designali/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@designali/ui/table";

export const metadata: Metadata = {
  title: `Admin Users - ${APP_NAME}`,
};

export default async function AdminUser({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page) || 1;
  const users = await getAllUsers({
    page,
  });
  return (
    <div className="space-y-2 px-6">
      <PageTitle
        title="Users"
        description={`Manage your account settings and set e-mail preferences.`}
      />
      <div className="mt-20 rounded-3xl border p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formatId(user.id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/users/${user.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={user.id} action={deleteUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
