import { ArticleFormData } from "../types/article-form";

export const defaultArticleForm: ArticleFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",

  category: "",
  author: "GrailDaily",
  status: "Draft",
  scheduledAt: null,

  featuredImage: null,

  showInHero: false,
  showInEditorsPicks: false,
};
