"use client";

import { useState } from "react";
import { Check, Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  deleteMediaAction,
  updateMediaAltTextAction,
} from "../actions/media.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  mediaId: string;
  url: string;
  originalName: string;
  altText: string | null;
}

export function MediaActions({ mediaId, url, originalName, altText }: Props) {
  const [copied, setCopied] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [altTextOpen, setAltTextOpen] = useState(false);
  const [altTextValue, setAltTextValue] = useState(altText ?? "");
  const [savingAltText, setSavingAltText] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      toast.success("URL copied");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const handleSaveAltText = async () => {
    try {
      setSavingAltText(true);

      await updateMediaAltTextAction(mediaId, altTextValue);

      toast.success("Alt text updated");

      setAltTextOpen(false);

      window.location.reload();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Failed to update alt text",
      );
    } finally {
      setSavingAltText(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await deleteMediaAction(mediaId);

      toast.success("Media deleted successfully");

      setDeleteOpen(false);

      window.location.reload();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Failed to delete media",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded-md"
          aria-label="Media actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setAltTextOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Alt Text
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy URL
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete media?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete <strong>{originalName}</strong>?
              The image will be permanently removed from the media library and
              Cloudinary. If the image is still used by an article, deletion
              will be blocked.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog
        open={altTextOpen}
        onOpenChange={(open) => {
          setAltTextOpen(open);

          if (open) {
            setAltTextValue(altText ?? "");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Alt Text</DialogTitle>

            <DialogDescription>
              Add a short description of this image for accessibility and search
              engines.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="alt-text">Alt Text</Label>

            <Input
              id="alt-text"
              value={altTextValue}
              onChange={(event) => setAltTextValue(event.target.value)}
              placeholder="Describe this image..."
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAltTextOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSaveAltText}
              disabled={savingAltText}
            >
              {savingAltText ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
