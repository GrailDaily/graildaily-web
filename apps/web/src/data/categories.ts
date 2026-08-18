export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    name: "Archaeology",
    slug: "archaeology",
    image: "/images/categories/Archaeology.png",
    description:
      "Explore ancient artifacts, excavations, lost cities, and civilizations that reveal humanity's distant past.",
  },
  {
    name: "Economics",
    slug: "economics",
    image: "/images/categories/Economics.png",
    description:
      "Understand global markets, finance, trade, economic systems, and the forces shaping modern economies.",
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    image: "/images/categories/Entertainment.png",
    description:
      "Discover stories from film, television, music, gaming, and entertainment from around the world.",
  },
  {
    name: "Geography",
    slug: "geography",
    image: "/images/categories/Geography.png",
    description:
      "Explore countries, landscapes, natural wonders, climate, and the diverse regions of our planet.",
  },
  {
    name: "History",
    slug: "history",
    image: "/images/categories/History.png",
    description:
      "Journey through historical events, influential figures, wars, revolutions, and civilizations across time.",
  },
  {
    name: "Humanity",
    slug: "humanity",
    image: "/images/categories/Humanity.png",
    description:
      "Explore human culture, society, behavior, ideas, and the stories that connect us.",
  },
  {
    name: "Mysteries",
    slug: "mysteries",
    image: "/images/categories/Mysteries.png",
    description:
      "Explore unexplained phenomena, unsolved cases, strange events, and mysteries that continue to spark curiosity.",
  },
  {
    name: "Mythology",
    slug: "mythology",
    image: "/images/categories/Mythology.png",
    description:
      "Dive into myths, legends, gods, heroes, folklore, and ancient beliefs from cultures around the world.",
  },
  {
    name: "Nature",
    slug: "nature",
    image: "/images/categories/Nature.png",
    description:
      "Discover wildlife, ecosystems, environmental science, and the extraordinary beauty of the natural world.",
  },
  {
    name: "Politics",
    slug: "politics",
    image: "/images/categories/Politics.png",
    description:
      "Understand governments, political systems, diplomacy, international relations, and public policy.",
  },
  {
    name: "Religion",
    slug: "religion",
    image: "/images/categories/Religion.png",
    description:
      "Explore world religions, beliefs, traditions, sacred texts, and the history of spiritual thought.",
  },
  {
    name: "Science",
    slug: "science",
    image: "/images/categories/Science.png",
    description:
      "Discover how the world works through physics, biology, chemistry, medicine, and scientific research.",
  },
  {
    name: "Space",
    slug: "space",
    image: "/images/categories/Space.png",
    description:
      "Explore astronomy, planets, stars, galaxies, black holes, and humanity's journey into the universe.",
  },
  {
    name: "Technology",
    slug: "technology",
    image: "/images/categories/Technology.png",
    description:
      "Explore innovation, artificial intelligence, computing, engineering, and the technologies shaping our future.",
  },
];
