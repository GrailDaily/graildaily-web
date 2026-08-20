import { ArticleFormData } from "../types/article-form";

export const defaultArticleForm: ArticleFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",

  category: "",
  author: "GrailDaily",
  status: "Draft",

  featuredImage: null,

  showInHero: false,
  showInEditorsPicks: false,
};
