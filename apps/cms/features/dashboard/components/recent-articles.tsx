import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/date";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Article } from "@/types/article";

interface Props {
  articles: Article[];
}

export function RecentArticles({ articles }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Articles</CardTitle>

        <Link
          href="/articles"
          className="text-primary text-sm font-medium hover:underline"
        >
          View All
        </Link>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>

                <TableCell>{article.category}</TableCell>

                <TableCell>
                  <Badge>{article.status}</Badge>
                </TableCell>

                <TableCell>{formatDate(article.publishedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
