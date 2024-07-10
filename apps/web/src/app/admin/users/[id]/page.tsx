import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import { APP_NAME } from "@/lib/constants";
import PageTitle from "@/src/components/mdx/page-title";

import UpdateUserForm from "./update-user-form";

export const metadata: Metadata = {
  title: `Update user - ${APP_NAME}`,
};

export default async function UpdateUserPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const user = await getUserById(id);
  if (!user) notFound();
  return (
    <div className="mx-auto max-w-lg space-y-8 px-6">
      <PageTitle
        title=" Update User"
        description={`Manage your account settings and set e-mail preferences.`}
      />
      <UpdateUserForm user={user} />
    </div>
  );
}
