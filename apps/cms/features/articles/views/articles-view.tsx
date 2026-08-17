"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArticlesPagination } from "../components/articles-pagination";
import { ArticlesTable } from "../table/articles-table";
import { ArticlesToolbar } from "../toolbar/toolbar";

import { Article } from "@/types/article";

import { BulkActionBar } from "../components/bulk-action-bar";

interface Props {
  articles: Article[];
  page: number;
  totalPages: number;
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    status: "Active" | "Inactive";
  }[];
}

export function ArticlesView({
  articles,
  page,
  totalPages,
  categories,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<string[]>([]);

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "all";
  const category = searchParams.get("category") ?? "all";

  const updateFilters = (
    nextSearch: string,
    nextStatus: string,
    nextCategory: string,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSearch) {
      params.set("search", nextSearch);
    } else {
      params.delete("search");
    }

    if (nextStatus !== "all") {
      params.set("status", nextStatus);
    } else {
      params.delete("status");
    }

    if (nextCategory !== "all") {
      params.set("category", nextCategory);
    } else {
      params.delete("category");
    }

    // Filter baru harus kembali ke halaman pertama.
    params.delete("page");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleSearchChange = (value: string) => {
    updateFilters(value, status, category);
  };

  const handleStatusChange = (value: string) => {
    updateFilters(search, value, category);
  };

  const handleCategoryChange = (value: string) => {
    updateFilters(search, status, value);
  };

  return (
    <div className="space-y-6">
      <ArticlesToolbar
        search={search}
        status={status}
        category={category}
        categories={categories}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onCategoryChange={handleCategoryChange}
      />

      <BulkActionBar
        count={selected.length}
        ids={selected}
        onCompleted={() => setSelected([])}
      />

      <ArticlesTable
        key={`${search}-${status}-${category}`}
        articles={articles}
        selected={selected}
        onSelectedChange={setSelected}
      />

      <ArticlesPagination page={page} totalPages={totalPages} />
    </div>
  );
}
