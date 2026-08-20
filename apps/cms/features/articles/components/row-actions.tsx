"use client";

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  archiveArticleAction,
  duplicateArticleAction,
  deleteArticleAction,
  selectHeroArticleAction,
  removeHeroArticleAction,
  selectEditorsPickArticleAction,
  removeEditorsPickArticleAction,
} from "@/actions/article.actions";

import type { ArticleStatus } from "@/types/article";

interface Props {
  articleId: string;
  slug: string;
  status: ArticleStatus;
  showInHero: boolean;
  showInEditorsPicks: boolean;
}

export function RowActions({
  articleId,
  slug,
  status,
  showInHero,
  showInEditorsPicks,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const runAction = async (action: () => Promise<void>) => {
    startTransition(async () => {
      try {
        await action();
        router.refresh();
      } catch (error) {
        console.error(error);
        alert(error instanceof Error ? error.message : "Something went wrong.");
      }
    });
  };

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
          onClick={() => runAction(() => duplicateArticleAction(articleId))}
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

        {status === "Published" && (
          <>
            <DropdownMenuItem
              disabled={isPending}
              onClick={() =>
                runAction(() =>
                  showInHero
                    ? removeHeroArticleAction(articleId)
                    : selectHeroArticleAction(articleId),
                )
              }
            >
              {showInHero ? "Remove from Hero" : "Set as Hero"}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={isPending}
              onClick={() =>
                runAction(() =>
                  showInEditorsPicks
                    ? removeEditorsPickArticleAction(articleId)
                    : selectEditorsPickArticleAction(articleId),
                )
              }
            >
              {showInEditorsPicks
                ? "Remove from Editor's Picks"
                : "Set as Editor's Picks"}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          disabled={isPending}
          onClick={() => runAction(() => archiveArticleAction(articleId))}
        >
          Archive
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          disabled={isPending}
          onClick={() => {
            if (!confirm("Delete this article?")) return;

            runAction(() => deleteArticleAction(articleId));
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
