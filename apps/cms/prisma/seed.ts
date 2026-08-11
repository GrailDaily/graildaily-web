import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { PrismaClient } from "@/lib/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.article.deleteMany();

  await prisma.article.createMany({
    data: [
      {
        id: "1",
        title: "The Mystery of Atlantis",
        slug: "the-mystery-of-atlantis",
        excerpt:
          "Exploring the enduring legend of Atlantis and the evidence behind the myth.",
        content: "# Atlantis\n\nThis is a sample article.",
        featuredImage: "/images/atlantis.jpg",
        category: "History",
        author: "GrailDaily",
        status: "Published",
        publishedAt: new Date("2026-07-21"),
      },
      {
        id: "2",
        title: "The Secrets of the Bermuda Triangle",
        slug: "the-secrets-of-the-bermuda-triangle",
        excerpt:
          "A closer look at the mysterious disappearances linked to the Bermuda Triangle.",
        content: "# Bermuda Triangle\n\nThis is a sample article.",
        featuredImage: "/images/bermuda-triangle.jpg",
        category: "Mysteries",
        author: "GrailDaily",
        status: "Draft",
      },
      {
        id: "3",
        title: "How the Great Pyramid Was Built",
        slug: "how-the-great-pyramid-was-built",
        excerpt:
          "Examining the theories behind the construction of Egypt's greatest monument.",
        content: "# Great Pyramid\n\nThis is a sample article.",
        featuredImage: "/images/great-pyramid.jpg",
        category: "Archaeology",
        author: "GrailDaily",
        status: "Review",
      },
      {
        id: "4",
        title: "Could Life Exist on Mars?",
        slug: "could-life-exist-on-mars",
        excerpt:
          "Discover the latest scientific discoveries about the possibility of life on Mars.",
        content: "# Mars\n\nThis is a sample article.",
        featuredImage: "/images/mars.jpg",
        category: "Space",
        author: "GrailDaily",
        status: "Scheduled",
      },
      {
        id: "5",
        title: "The Rise of Artificial Intelligence",
        slug: "the-rise-of-artificial-intelligence",
        excerpt:
          "Understanding how AI is transforming industries and everyday life.",
        content: "# Artificial Intelligence\n\nThis is a sample article.",
        featuredImage: "/images/artificial-intelligence.jpg",
        category: "Technology",
        author: "GrailDaily",
        status: "Archived",
      },
      {
        id: "6",
        title: "The Lost City of Machu Picchu",
        slug: "the-lost-city-of-machu-picchu",
        excerpt:
          "Discover the fascinating history and mystery surrounding the ancient Inca city.",
        content: "# Machu Picchu\n\nThis is a sample article.",
        featuredImage: "/images/machu-picchu.jpg",
        category: "History",
        author: "GrailDaily",
        status: "Published",
        publishedAt: new Date("2026-08-06"),
      },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
