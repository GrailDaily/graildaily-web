import { prisma } from "@/lib/prisma";
export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}
export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}
export async function createCategory(data: {
  name: string;
  slug: string;
  description: string;
  image?: string;
}) {
  return prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image || null,
      status: "Active",
    },
  });
}
export async function updateCategory(
  id: string,
  data: {
    name: string;
    slug: string;
    description: string;
    image?: string;
    status: "Active" | "Inactive";
  },
) {
  return prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image || null,
      status: data.status,
    },
  });
}
export async function deleteCategory(id: string) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    throw new Error("Category not found.");
  }
  const articleCount = await prisma.article.count({
    where: { category: category.name },
  });
  if (articleCount > 0) {
    throw new Error(
      `Cannot delete category "${category.name}" because it is used by ${articleCount} article${articleCount === 1 ? "" : "s"}.`,
    );
  }
  return prisma.category.delete({ where: { id } });
}
