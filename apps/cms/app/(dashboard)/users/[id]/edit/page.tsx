import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth-guard";
import { PageHeader } from "@/components/common/page-header";
import { UserForm } from "@/features/users/forms/user-form";
import { getUserById } from "@/services/user.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: Props) {
  const requestHeaders = await headers();

  const authResult = await requireRole(
    new Request("http://localhost", {
      headers: requestHeaders,
    }),
    ["Admin"],
  );

  if (!authResult.ok) {
    if (authResult.status === 401) {
      redirect("/login");
    }

    notFound();
  }

  const { id } = await params;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  const cmsUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    articleCount: user._count.articles,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit User"
        description="Update an existing user's information and access."
      />

      <UserForm user={cmsUser} />
    </div>
  );
}
