import { prisma } from "@/lib/prisma";

export interface CmsUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Author";
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
  articleCount: number;
}

interface GetUsersOptions {
  search?: string;
  role?: string;
  status?: string;
}

export async function getUsers({
  search = "",
  role = "all",
  status = "all",
}: GetUsersOptions = {}): Promise<CmsUser[]> {
  const where = {
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),

    ...(role !== "all"
      ? {
          role: role as "Admin" | "Editor" | "Author",
        }
      : {}),

    ...(status !== "all"
      ? {
          status: status as "Active" | "Inactive",
        }
      : {}),
  };

  const users = await prisma.user.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          articles: true,
        },
      },
    },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    articleCount: user._count.articles,
  }));
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          articles: true,
        },
      },
    },
  });
}

export async function updateUser(
  id: string,
  data: {
    name: string;
    email: string;
    role: "Admin" | "Editor" | "Author";
    status: "Active" | "Inactive";
  },
) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
    },
  });
}

export async function getUserStats() {
  const [total, active, inactive, admins, editors, authors] = await Promise.all(
    [
      prisma.user.count(),

      prisma.user.count({
        where: {
          status: "Active",
        },
      }),

      prisma.user.count({
        where: {
          status: "Inactive",
        },
      }),

      prisma.user.count({
        where: {
          role: "Admin",
        },
      }),

      prisma.user.count({
        where: {
          role: "Editor",
        },
      }),

      prisma.user.count({
        where: {
          role: "Author",
        },
      }),
    ],
  );

  return {
    total,
    active,
    inactive,
    admins,
    editors,
    authors,
  };
}
