import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function requireActiveUser(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    return {
      ok: false as const,
      status: 401,
      error: "Unauthorized",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  if (!user || user.status !== "Active") {
    return {
      ok: false as const,
      status: 403,
      error: "Forbidden",
    };
  }

  return {
    ok: true as const,
    user,
    session,
  };
}


export async function requireRole(request: Request, allowedRoles: Array<"Admin" | "Editor" | "Author">) {
  const authResult = await requireActiveUser(request);

  if (!authResult.ok) {
    return authResult;
  }

  if (!allowedRoles.includes(authResult.user.role as "Admin" | "Editor" | "Author")) {
    return {
      ok: false as const,
      status: 403,
      error: "Forbidden",
    };
  }

  return authResult;
}