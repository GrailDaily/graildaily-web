import { ArticleFormData } from "../types/article-form";

export interface ValidationErrors {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
}

export function validateArticle(form: ArticleFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!form.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!form.slug.trim()) {
    errors.slug = "Slug is required.";
  }

  if (!form.excerpt.trim()) {
    errors.excerpt = "Excerpt is required.";
  }

  if (!form.content.trim()) {
    errors.content = "Content is required.";
  }

  if (!form.category.trim()) {
    errors.category = "Please select a category.";
  }

  return errors;
}
