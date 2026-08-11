export const ARTICLE_CATEGORIES = [
  "Archaeology",
  "Economics",
  "Entertainment",
  "Geography",
  "History",
  "Humanity",
  "Mysteries",
  "Mythology",
  "Nature",
  "Politics",
  "Religion",
  "Science",
  "Space",
  "Technology",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];
