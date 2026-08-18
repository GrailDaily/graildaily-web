import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  const users = await Promise.all([
    prisma.user.upsert({
      where: {
        email: "dimas@graildaily.com",
      },
      update: {
        name: "Dimas",
        role: "Admin",
        status: "Active",
      },
      create: {
        name: "Dimas",
        email: "dimas@graildaily.com",
        role: "Admin",
        status: "Active",
      },
    }),

    prisma.user.upsert({
      where: {
        email: "admin@graildaily.com",
      },
      update: {
        name: "GrailDaily Admin",
        role: "Admin",
        status: "Active",
      },
      create: {
        name: "GrailDaily Admin",
        email: "admin@graildaily.com",
        role: "Admin",
        status: "Active",
      },
    }),

    prisma.user.upsert({
      where: {
        email: "editor@graildaily.com",
      },
      update: {
        name: "GrailDaily Editor",
        role: "Editor",
        status: "Active",
      },
      create: {
        name: "GrailDaily Editor",
        email: "editor@graildaily.com",
        role: "Editor",
        status: "Active",
      },
    }),

    prisma.user.upsert({
      where: {
        email: "editor.inactive@graildaily.com",
      },
      update: {
        name: "Inactive Editor",
        role: "Editor",
        status: "Inactive",
      },
      create: {
        name: "Inactive Editor",
        email: "editor.inactive@graildaily.com",
        role: "Editor",
        status: "Inactive",
      },
    }),

    prisma.user.upsert({
      where: {
        email: "author@graildaily.com",
      },
      update: {
        name: "GrailDaily Author",
        role: "Author",
        status: "Active",
      },
      create: {
        name: "GrailDaily Author",
        email: "author@graildaily.com",
        role: "Author",
        status: "Active",
      },
    }),

    prisma.user.upsert({
      where: {
        email: "author.two@graildaily.com",
      },
      update: {
        name: "Author Two",
        role: "Author",
        status: "Active",
      },
      create: {
        name: "Author Two",
        email: "author.two@graildaily.com",
        role: "Author",
        status: "Active",
      },
    }),

    prisma.user.upsert({
      where: {
        email: "author.inactive@graildaily.com",
      },
      update: {
        name: "Inactive Author",
        role: "Author",
        status: "Inactive",
      },
      create: {
        name: "Inactive Author",
        email: "author.inactive@graildaily.com",
        role: "Author",
        status: "Inactive",
      },
    }),
  ]);

  const categories = [
    {
      name: "Archaeology",
      slug: "archaeology",
      description:
        "Explore ancient artifacts, excavations, lost cities, and civilizations that reveal humanity's distant past.",
      image: "/images/categories/Archaeology.png",
    },
    {
      name: "Economics",
      slug: "economics",
      description:
        "Understand global markets, finance, trade, economic systems, and the forces shaping modern economies.",
      image: "/images/categories/Economics.png",
    },
    {
      name: "Entertainment",
      slug: "entertainment",
      description:
        "Discover stories from film, television, music, gaming, and entertainment from around the world.",
      image: "/images/categories/Entertainment.png",
    },
    {
      name: "Geography",
      slug: "geography",
      description:
        "Explore countries, landscapes, natural wonders, climate, and the diverse regions of our planet.",
      image: "/images/categories/Geography.png",
    },
    {
      name: "History",
      slug: "history",
      description:
        "Journey through historical events, influential figures, wars, revolutions, and civilizations across time.",
      image: "/images/categories/History.png",
    },
    {
      name: "Humanity",
      slug: "humanity",
      description:
        "Explore human culture, society, behavior, ideas, and the stories that connect us.",
      image: "/images/categories/Humanity.png",
    },
    {
      name: "Mysteries",
      slug: "mysteries",
      description:
        "Explore unexplained phenomena, unsolved cases, strange events, and mysteries that continue to spark curiosity.",
      image: "/images/categories/Mysteries.png",
    },
    {
      name: "Mythology",
      slug: "mythology",
      description:
        "Dive into myths, legends, gods, heroes, folklore, and ancient beliefs from cultures around the world.",
      image: "/images/categories/Mythology.png",
    },
    {
      name: "Nature",
      slug: "nature",
      description:
        "Discover wildlife, ecosystems, environmental science, and the extraordinary beauty of the natural world.",
      image: "/images/categories/Nature.png",
    },
    {
      name: "Politics",
      slug: "politics",
      description:
        "Understand governments, political systems, diplomacy, international relations, and public policy.",
      image: "/images/categories/Politics.png",
    },
    {
      name: "Religion",
      slug: "religion",
      description:
        "Explore world religions, beliefs, traditions, sacred texts, and the history of spiritual thought.",
      image: "/images/categories/Religion.png",
    },
    {
      name: "Science",
      slug: "science",
      description:
        "Discover how the world works through physics, biology, chemistry, medicine, and scientific research.",
      image: "/images/categories/Science.png",
    },
    {
      name: "Space",
      slug: "space",
      description:
        "Explore astronomy, planets, stars, galaxies, black holes, and humanity's journey into the universe.",
      image: "/images/categories/Space.png",
    },
    {
      name: "Technology",
      slug: "technology",
      description:
        "Explore innovation, artificial intelligence, computing, engineering, and the technologies shaping our future.",
      image: "/images/categories/Technology.png",
    },
  ];

  await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({
        where: {
          slug: category.slug,
        },
        update: {
          name: category.name,
          description: category.description,
          image: category.image,
          status: "Active",
        },
        create: {
          ...category,
          status: "Active",
        },
      }),
    ),
  );

  console.log(`✅ Seeded ${categories.length} categories successfully.`);

  const [dimas, admin, editor, inactiveEditor, author, authorTwo] = users;

  await prisma.article.updateMany({
    where: {
      slug: "the-mystery-of-atlantis",
    },
    data: {
      authorUserId: dimas.id,
    },
  });

  await prisma.article.updateMany({
    where: {
      slug: "the-secrets-of-the-bermuda-triangle",
    },
    data: {
      authorUserId: editor.id,
    },
  });

  await prisma.article.updateMany({
    where: {
      slug: "how-the-great-pyramid-was-built",
    },
    data: {
      authorUserId: author.id,
    },
  });

  await prisma.article.updateMany({
    where: {
      slug: "could-life-exist-on-mars",
    },
    data: {
      authorUserId: authorTwo.id,
    },
  });

  await prisma.article.updateMany({
    where: {
      slug: "the-rise-of-artificial-intelligence",
    },
    data: {
      authorUserId: admin.id,
    },
  });

  await prisma.article.updateMany({
    where: {
      slug: "the-lost-city-of-machu-picchu",
    },
    data: {
      authorUserId: dimas.id,
    },
  });

  console.log(`✅ Seeded ${users.length} users successfully.`);
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
