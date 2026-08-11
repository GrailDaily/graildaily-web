"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ArticleStatus } from "@/types/article";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  bulkDeleteArticlesAction,
  bulkUpdateStatusAction,
} from "@/actions/article.actions";

import { Button } from "@/components/ui/button";

interface Props {
  count: number;
  ids: string[];
  onCompleted: () => void;
}

export function BulkActionBar({ count, ids, onCompleted }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  if (count === 0) return null;

  const updateStatus = (status: ArticleStatus) => {
    startTransition(async () => {
      try {
        await bulkUpdateStatusAction(ids, status);

        toast.success(
          `${ids.length} article${ids.length > 1 ? "s" : ""} updated to ${status}.`,
        );

        onCompleted();

        router.refresh();
      } catch (error) {
        console.error(error);

        toast.error("Failed to update articles.");
      }
    });
  };

  const deleteArticles = () => {
    startTransition(async () => {
      try {
        await bulkDeleteArticlesAction(ids);

        toast.success(
          `${ids.length} article${ids.length > 1 ? "s" : ""} deleted.`,
        );

        onCompleted();

        router.refresh();
      } catch (error) {
        console.error(error);

        toast.error("Failed to delete articles.");
      }
    });
  };

  return (
    <div className="bg-muted/40 flex items-center justify-between rounded-lg border px-4 py-3">
      <span className="text-sm font-medium">
        {count} article{count > 1 ? "s" : ""} selected
      </span>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => updateStatus("Published")}
        >
          Publish
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => updateStatus("Review")}
        >
          Review
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => updateStatus("Archived")}
        >
          Archive
        </Button>

        <AlertDialog>
          <AlertDialogTrigger
            disabled={isPending}
            className="border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium shadow-xs transition-colors disabled:pointer-events-none disabled:opacity-50"
          >
            Delete
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete {ids.length} article{ids.length > 1 ? "s" : ""}?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. The selected article
                {ids.length > 1 ? "s" : ""} will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction onClick={deleteArticles} disabled={isPending}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
