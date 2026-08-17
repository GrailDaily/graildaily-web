import { notFound } from "next/navigation";

import { PageHeader } from "@/components/common/page-header";
import { UserForm } from "@/features/users/forms/user-form";
import { getUserById } from "@/services/user.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: Props) {
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
