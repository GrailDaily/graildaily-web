import type { ArticleStatus } from "@/types/article";

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;

  category: string;
  author: string;
  status: ArticleStatus;
  scheduledAt: string | null;

  featuredImage: string | null;

  showInHero: boolean;
  showInEditorsPicks: boolean;
}
