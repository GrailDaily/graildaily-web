"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ARTICLE_CATEGORIES } from "../constants/categories";

interface Props {
  search: string;
  status: string;
  category: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function ArticlesToolbar({
  search,
  status,
  category,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles..."
            className="pl-9"
          />
        </div>

        {/* Status Filter */}
        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value ?? "all")}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select
          value={category}
          onValueChange={(value) => onCategoryChange(value ?? "all")}
        >
          <SelectTrigger className="w-full md:w-52">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>

            {ARTICLE_CATEGORIES.map((categoryName) => (
              <SelectItem key={categoryName} value={categoryName.toLowerCase()}>
                {categoryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
