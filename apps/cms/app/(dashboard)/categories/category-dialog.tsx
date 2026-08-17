"use client";
import { useEffect, useState, useTransition } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/actions/categories.actions";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  status: "Active" | "Inactive";
}
interface CategoryDialogProps {
  category?: CategoryData;
}
function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
export function CategoryDialog({ category }: CategoryDialogProps) {
  const isEdit = Boolean(category);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [image, setImage] = useState(category?.image ?? "");
  const [status, setStatus] = useState<"Active" | "Inactive">(
    category?.status ?? "Active",
  );
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  useEffect(() => {
    if (open && category) {
      setName(category.name);
      setSlug(category.slug);
      setDescription(category.description);
      setImage(category.image ?? "");
      setStatus(category.status);
    }
    if (open && !category) {
      setName("");
      setSlug("");
      setDescription("");
      setImage("");
      setStatus("Active");
    }
    setError("");
  }, [open, category]);
  useEffect(() => {
    if (!deleteOpen) {
      setDeleteError("");
    }
  }, [deleteOpen]);
  function handleNameChange(value: string) {
    setName(value);
    if (!isEdit) {
      setSlug(slugify(value));
    }
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    if (!description.trim()) {
      setError("Category description is required.");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        if (category) {
          await updateCategoryAction(category.id, {
            name: name.trim(),
            slug: slugify(slug),
            description: description.trim(),
            image: image.trim(),
            status,
          });
        } else {
          await createCategoryAction({
            name: name.trim(),
            slug: slugify(slug),
            description: description.trim(),
            image: image.trim(),
          });
        }
        setOpen(false);
      } catch (error) {
        console.error(error);
        setError(
          "Unable to save category. The name or slug may already exist.",
        );
      }
    });
  }
  function handleDelete() {
    if (!category) {
      return;
    }
    setDeleteError("");
    startDeleteTransition(async () => {
      try {
        await deleteCategoryAction(category.id);
        setDeleteOpen(false);
      } catch (error) {
        console.error(error);
        setDeleteError(
          error instanceof Error ? error.message : "Unable to delete category.",
        );
      }
    });
  }
  return (
    <>
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        {" "}
        <DialogTrigger
          render={
            <Button>
              {" "}
              {isEdit ? (
                <>
                  {" "}
                  <Pencil className="mr-2 size-4" /> Edit{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Plus className="mr-2 size-4" /> Add Category{" "}
                </>
              )}{" "}
            </Button>
          }
        />{" "}
        <DialogContent className="sm:max-w-lg">
          {" "}
          <DialogHeader>
            {" "}
            <DialogTitle>
              {" "}
              {isEdit ? "Edit Category" : "Add Category"}{" "}
            </DialogTitle>{" "}
            <DialogDescription>
              {" "}
              {isEdit
                ? "Update the category information."
                : "Create a new category for GrailDaily articles."}{" "}
            </DialogDescription>{" "}
          </DialogHeader>{" "}
          <form onSubmit={handleSubmit} className="space-y-5">
            {" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="category-name">Name</Label>{" "}
              <Input
                id="category-name"
                value={name}
                onChange={(event) => handleNameChange(event.target.value)}
                placeholder="e.g. Archaeology"
              />{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="category-slug">Slug</Label>{" "}
              <Input
                id="category-slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="archaeology"
              />{" "}
              <p className="text-muted-foreground text-xs">
                {" "}
                Used in category URLs.{" "}
              </p>{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="category-description">Description</Label>{" "}
              <Textarea
                id="category-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe this category..."
                rows={4}
              />{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <Label htmlFor="category-image">Image URL</Label>{" "}
              <Input
                id="category-image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="/images/categories/Archaeology.png"
              />{" "}
            </div>{" "}
            {isEdit && (
              <div className="space-y-2">
                {" "}
                <Label htmlFor="category-status">Status</Label>{" "}
                <select
                  id="category-status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as "Active" | "Inactive")
                  }
                  className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm"
                >
                  {" "}
                  <option value="Active">Active</option>{" "}
                  <option value="Inactive">Inactive</option>{" "}
                </select>{" "}
              </div>
            )}{" "}
            {error && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                {" "}
                {error}{" "}
              </div>
            )}{" "}
            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
              {" "}
              {isEdit && category ? (
                <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                  {" "}
                  <AlertDialogTrigger
                    render={
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={isPending || isDeleting}
                      >
                        {" "}
                        <Trash2 className="mr-2 size-4" /> Delete{" "}
                      </Button>
                    }
                  />{" "}
                  <AlertDialogContent>
                    {" "}
                    <AlertDialogHeader>
                      {" "}
                      <AlertDialogTitle>
                        {" "}
                        Delete category?{" "}
                      </AlertDialogTitle>{" "}
                      <AlertDialogDescription>
                        {" "}
                        This will permanently delete{" "}
                        <strong>{category.name}</strong>. Categories that are
                        still used by articles cannot be deleted.{" "}
                      </AlertDialogDescription>{" "}
                    </AlertDialogHeader>{" "}
                    {deleteError && (
                      <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                        {" "}
                        {deleteError}{" "}
                      </div>
                    )}{" "}
                    <AlertDialogFooter>
                      {" "}
                      <AlertDialogCancel disabled={isDeleting}>
                        {" "}
                        Cancel{" "}
                      </AlertDialogCancel>{" "}
                      <AlertDialogAction
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={handleDelete}
                      >
                        {" "}
                        {isDeleting ? "Deleting..." : "Delete Category"}{" "}
                      </AlertDialogAction>{" "}
                    </AlertDialogFooter>{" "}
                  </AlertDialogContent>{" "}
                </AlertDialog>
              ) : (
                <span />
              )}{" "}
              <div className="flex gap-2">
                {" "}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isPending || isDeleting}
                >
                  {" "}
                  Cancel{" "}
                </Button>{" "}
                <Button type="submit" disabled={isPending || isDeleting}>
                  {" "}
                  {isPending
                    ? "Saving..."
                    : isEdit
                      ? "Save Changes"
                      : "Create Category"}{" "}
                </Button>{" "}
              </div>{" "}
            </DialogFooter>{" "}
          </form>{" "}
        </DialogContent>{" "}
      </Dialog>{" "}
    </>
  );
}
