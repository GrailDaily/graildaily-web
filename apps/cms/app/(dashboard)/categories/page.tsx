import Link from "next/link";
import { CategoryDialog } from "./category-dialog";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
export default async function CategoriesPage() {
  const [categories, articleCounts] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.article.groupBy({ by: ["category"], _count: { _all: true } }),
  ]);
  const countMap = new Map(
    articleCounts.map((item) => [item.category, item._count._all]),
  );
  const totalArticles = articleCounts.reduce(
    (total, item) => total + item._count._all,
    0,
  );
  const categoriesInUse = categories.filter(
    (category) => (countMap.get(category.name) ?? 0) > 0,
  ).length;
  const emptyCategories = categories.length - categoriesInUse;
  return (
    <div className="space-y-8">
      {" "}
      <div className="flex items-start justify-between gap-4">
        {" "}
        <PageHeader
          title="Categories"
          description="Manage article categories used across GrailDaily."
        />{" "}
        <CategoryDialog />{" "}
      </div>{" "}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {" "}
        <StatCard title="Total Categories" value={categories.length} />{" "}
        <StatCard title="Categories in Use" value={categoriesInUse} />{" "}
        <StatCard title="Empty Categories" value={emptyCategories} />{" "}
        <StatCard title="Total Articles" value={totalArticles} />{" "}
      </div>{" "}
      <Card>
        {" "}
        <CardHeader>
          {" "}
          <CardTitle>Article Categories</CardTitle>{" "}
          <p className="text-muted-foreground text-sm">
            {" "}
            Browse articles by category.{" "}
          </p>{" "}
        </CardHeader>{" "}
        <CardContent>
          {" "}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {" "}
            {categories.map((category) => {
              const count = countMap.get(category.name) ?? 0;
              return (
                <div
                  key={category.id}
                  className="hover:bg-muted/50 rounded-lg border p-4 transition-colors"
                >
                  {" "}
                  <div className="flex items-start justify-between gap-4">
                    {" "}
                    <Link
                      href={`/articles?category=${encodeURIComponent(category.name)}`}
                      className="group min-w-0"
                    >
                      {" "}
                      <p className="font-medium group-hover:underline">
                        {" "}
                        {category.name}{" "}
                      </p>{" "}
                      <p className="text-muted-foreground mt-2 text-sm">
                        {" "}
                        {count === 1 ? "1 article" : `${count} articles`}{" "}
                      </p>{" "}
                    </Link>{" "}
                    <span className="bg-muted shrink-0 rounded-full px-2.5 py-0.5 text-sm font-medium">
                      {" "}
                      {count}{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    {" "}
                    <span
                      className={
                        category.status === "Active"
                          ? "text-xs font-medium text-green-600"
                          : "text-muted-foreground text-xs font-medium"
                      }
                    >
                      {" "}
                      {category.status}{" "}
                    </span>{" "}
                    <CategoryDialog category={category} />{" "}
                  </div>{" "}
                </div>
              );
            })}{" "}
          </div>{" "}
        </CardContent>{" "}
      </Card>{" "}
    </div>
  );
}
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      {" "}
      <CardContent className="p-5">
        {" "}
        <p className="text-muted-foreground text-sm">{title}</p>{" "}
        <p className="mt-1 text-3xl font-bold tracking-tight">
          {" "}
          {value.toLocaleString()}{" "}
        </p>{" "}
      </CardContent>{" "}
    </Card>
  );
}
