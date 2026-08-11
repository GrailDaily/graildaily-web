"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

import { useTransition } from "react";

import {
  archiveArticleAction,
  duplicateArticleAction,
  deleteArticleAction,
} from "@/actions/article.actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  articleId: string;
  slug: string;
}

export function RowActions({ articleId, slug }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
      />

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/articles/${articleId}/edit`)}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              try {
                await duplicateArticleAction(articleId);

                router.refresh();
              } catch (error) {
                console.error(error);
              }
            });
          }}
        >
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            window.open(
              `https://graildaily-website.pages.dev/posts/${slug}`,
              "_blank",
              "noopener,noreferrer",
            );
          }}
        >
          Preview
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              try {
                await archiveArticleAction(articleId);

                router.refresh();
              } catch (error) {
                console.error(error);
              }
            });
          }}
        >
          Archive
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          disabled={isPending}
          onClick={() => {
            if (!confirm("Delete this article?")) return;

            startTransition(async () => {
              try {
                await deleteArticleAction(articleId);

                router.refresh();
              } catch (error) {
                console.error(error);
              }
            });
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
