"use client";

import { Article } from "@/types/article";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils/date";
import Image from "next/image";

import { RowActions } from "../components/row-actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StatusBadge } from "./status-badge";

interface Props {
  articles: Article[];
  selected: string[];
  onSelectedChange: (ids: string[]) => void;
}

export function ArticlesTable({ articles, selected, onSelectedChange }: Props) {
  const isAllSelected =
    articles.length > 0 && selected.length === articles.length;

  const toggleAll = (checked: boolean) => {
    if (checked) {
      onSelectedChange(articles.map((article) => article.id));
    } else {
      onSelectedChange([]);
    }
  };

  const toggleOne = (id: string, checked: boolean) => {
    if (checked) {
      onSelectedChange([...selected, id]);
    } else {
      onSelectedChange(selected.filter((item) => item !== id));
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked) => toggleAll(checked === true)}
                />
              </TableHead>

              <TableHead className="w-24">Image</TableHead>

              <TableHead>Title</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Author</TableHead>

              <TableHead>Date</TableHead>

              <TableHead className="w-16 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <Checkbox
                    checked={selected.includes(article.id)}
                    onCheckedChange={(checked) =>
                      toggleOne(article.id, checked === true)
                    }
                  />
                </TableCell>

                <TableCell>
                  {article.featuredImage ? (
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      width={80}
                      height={48}
                      unoptimized
                      className="h-12 w-20 rounded-md object-cover"
                    />
                  ) : (
                    <div className="bg-muted text-muted-foreground flex h-12 w-20 items-center justify-center rounded-md text-xs">
                      No Image
                    </div>
                  )}
                </TableCell>

                <TableCell className="font-medium">{article.title}</TableCell>

                <TableCell>{article.category}</TableCell>

                <TableCell>
                  <StatusBadge status={article.status} />
                </TableCell>

                <TableCell>{article.author}</TableCell>

                <TableCell>{formatDate(article.publishedAt)}</TableCell>

                <TableCell className="text-right">
                  <RowActions articleId={article.id} slug={article.slug} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
