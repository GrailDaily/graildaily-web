export interface Category {
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: "Archaeology",
    slug: "archaeology",
    description:
      "Explore ancient artifacts, excavations, lost cities, and discoveries that uncover humanity's distant past.",
  },
  {
    name: "Economics",
    slug: "economics",
    description:
      "Understand global markets, finance, trade, economic systems, and the forces shaping modern economies.",
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    description:
      "Discover stories from film, television, music, gaming, and the entertainment industry around the world.",
  },
  {
    name: "Geography",
    slug: "geography",
    description:
      "Explore countries, landscapes, natural wonders, climates, and the diverse regions of our planet.",
  },
  {
    name: "History",
    slug: "history",
    description:
      "Journey through historical events, influential figures, wars, revolutions, and civilizations across time.",
  },
  {
    name: "Humanity",
    slug: "humanity",
    description:
      "Learn about human culture, society, civilization, behavior, and the stories that connect us all.",
  },
  {
    name: "Mysteries",
    slug: "mysteries",
    description:
      "Investigate unexplained phenomena, unsolved cases, strange events, and enduring historical mysteries.",
  },
  {
    name: "Mythology",
    slug: "mythology",
    description:
      "Dive into myths, legends, gods, heroes, folklore, and ancient beliefs from civilizations worldwide.",
  },
  {
    name: "Nature",
    slug: "nature",
    description:
      "Discover wildlife, ecosystems, environmental science, and the extraordinary beauty of the natural world.",
  },
  {
    name: "Politics",
    slug: "politics",
    description:
      "Understand governments, political systems, diplomacy, international relations, and public policy.",
  },
  {
    name: "Religion",
    slug: "religion",
    description:
      "Explore world religions, beliefs, traditions, sacred texts, and the history of spiritual thought.",
  },
  {
    name: "Science",
    slug: "science",
    description:
      "Learn about scientific discoveries, physics, biology, chemistry, medicine, and groundbreaking research.",
  },
  {
    name: "Space",
    slug: "space",
    description:
      "Explore astronomy, planets, stars, galaxies, black holes, and humanity's journey into the universe.",
  },
  {
    name: "Technology",
    slug: "technology",
    description:
      "Stay informed about innovation, artificial intelligence, computing, engineering, and emerging technologies.",
  },
];
