export interface HomePostData {
  title: string;
  description: string;
  author: string;
  pubDatetime: Date;
  modDatetime: Date | null;
  featured: boolean;
  draft: boolean;
  tags: string[];
  ogImage: string | undefined;
  canonicalURL: string | undefined;
}

export interface HomePost {
  id: string;
  href: string;
  source: "astro" | "cms";
  data: HomePostData;
}
