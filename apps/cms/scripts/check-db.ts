import { prisma } from "@/lib/prisma";

async function main() {
  console.log("========== DATABASE ==========");

  const articles = await prisma.article.findMany();

  console.log("Total:", articles.length);

  console.log("");

  console.table(
    articles.map((article) => ({
      id: article.id,
      title: article.title,
      status: article.status,
      category: article.category,
    })),
  );

  console.log("");

  console.log("========== RAW DATA ==========");

  console.log(articles);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
