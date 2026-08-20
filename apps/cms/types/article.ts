export type ArticleStatus =
  | "Draft"
  | "Review"
  | "Scheduled"
  | "Published"
  | "Archived";

export interface Article {
  id: string;

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  featuredImage: string | null;

  category: string;

  author: string;

  status: ArticleStatus;

  showInHero: boolean;
  heroSelectedAt: Date | null;

  showInEditorsPicks: boolean;
  editorsPicksSelectedAt: Date | null;

  publishedAt: Date | null;

  updatedAt: Date;

  createdAt: Date;

  views: number;

  _count?: {
    views: number;
  };
}
