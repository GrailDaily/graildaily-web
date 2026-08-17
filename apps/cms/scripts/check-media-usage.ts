import { prisma } from "../lib/prisma";

async function main() {
  const media = await prisma.media.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      featuredImage: true,
    },
  });

  for (const m of media) {
    const used = articles.filter(
      (article) => article.featuredImage === m.path,
    );

    console.log("---");
    console.log("Media:", m.originalName);
    console.log("ID:", m.id);
    console.log("Public ID:", m.publicId);
    console.log("Used by:", used.length);

    for (const article of used) {
      console.log("  -", article.title);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
