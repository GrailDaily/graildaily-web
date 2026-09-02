import { getVercelOidcToken } from "@vercel/oidc";

export interface CmsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  category: string;
  author: string;
  status: "Draft" | "Review" | "Scheduled" | "Published" | "Archived";
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;

  showInHero: boolean;
  heroSelectedAt: string | null;

  showInEditorsPicks: boolean;
  editorsPicksSelectedAt: string | null;
}

interface CmsArticlesResponse {
  articles: CmsArticle[];
  total: number;
}

const CMS_API_URL = import.meta.env.CMS_API_URL ?? "http://localhost:3000";

async function cmsFetch(path: string): Promise<Response> {
  const headers = new Headers();

  if (import.meta.env.VERCEL === "1") {
    const token = await getVercelOidcToken();

    headers.set("x-vercel-trusted-oidc-idp-token", token);
  }

  return fetch(`${CMS_API_URL}${path}`, {
    headers,
  });
}

export async function getCmsArticles(): Promise<CmsArticle[]> {
  const response = await cmsFetch("/api/articles");

  if (!response.ok) {
    throw new Error(`Failed to fetch CMS articles: ${response.status}`);
  }

  const data = (await response.json()) as CmsArticlesResponse;

  return data.articles;
}

export async function getCmsPopularArticles(
  range: "all" | "month" | "week" | "today" = "all"
): Promise<CmsArticle[]> {
  const response = await cmsFetch(`/api/articles/popular?range=${range}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch CMS popular articles: ${response.status}`);
  }

  const data = (await response.json()) as CmsArticlesResponse;

  return data.articles;
}

export async function getCmsTrendingArticles(): Promise<CmsArticle[]> {
  const response = await cmsFetch("/api/articles/trending");

  if (!response.ok) {
    throw new Error(`Failed to fetch CMS trending articles: ${response.status}`);
  }

  const data = (await response.json()) as CmsArticlesResponse;

  return data.articles;
}

export async function getCmsHeroArticles(): Promise<CmsArticle[]> {
  const response = await cmsFetch("/api/articles/hero");

  if (!response.ok) {
    throw new Error(`Failed to fetch CMS hero articles: ${response.status}`);
  }

  const data = (await response.json()) as CmsArticlesResponse;

  return data.articles;
}

export async function getCmsEditorsPicks(): Promise<CmsArticle[]> {
  const response = await cmsFetch("/api/articles/editors-picks");

  if (!response.ok) {
    throw new Error(`Failed to fetch CMS editors picks: ${response.status}`);
  }

  const data = (await response.json()) as CmsArticlesResponse;

  return data.articles;
}

export async function getCmsArticle(slug: string): Promise<CmsArticle | null> {
  const response = await cmsFetch(
    `/api/articles/${encodeURIComponent(slug)}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch CMS article: ${response.status}`);
  }

  return (await response.json()) as CmsArticle;
}

