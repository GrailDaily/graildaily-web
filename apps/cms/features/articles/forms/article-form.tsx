"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { slugify } from "@/features/articles/utils/slugify";
import {
  createArticleAction,
  updateArticleAction,
} from "@/actions/article.actions";
import { defaultArticleForm } from "@/features/articles/utils/default-form";
import { useEffect, useRef, useState } from "react";
import type { Article, ArticleStatus } from "@/types/article";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "@/features/articles/editor/markdown-editor";
import Image from "next/image";
import { ARTICLE_STATUS } from "@/features/articles/constants/article-status";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaPicker } from "@/features/media/components/media-picker";
import {
  articleSchema,
  type ArticleSchema,
} from "@/features/articles/validation/article-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  article?: Article;
  media: {
    id: string;
    originalName: string;
    path: string;
    width: number | null;
    height: number | null;
  }[];
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    status: "Active" | "Inactive";
  }[];
}

type ArticleInitialValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: ArticleStatus;
  scheduledAt: string | null;
  featuredImage: string | null;
  showInHero: boolean;
  showInEditorsPicks: boolean;
};

export function ArticleForm({ article, media, categories }: Props) {
  const router = useRouter();
  const initialValues: ArticleInitialValues = article
    ? {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        author: article.author,
        status: article.status,
        scheduledAt: article.scheduledAt
          ? article.scheduledAt.toISOString().slice(0, 16)
          : null,
        featuredImage: article.featuredImage ?? null,
        showInHero: article.showInHero,
        showInEditorsPicks: article.showInEditorsPicks,
      }
    : {
        title: defaultArticleForm.title,
        slug: defaultArticleForm.slug,
        excerpt: defaultArticleForm.excerpt,
        content: defaultArticleForm.content,
        category: defaultArticleForm.category,
        author: defaultArticleForm.author,
        status: defaultArticleForm.status,
        scheduledAt: defaultArticleForm.scheduledAt,
        featuredImage: defaultArticleForm.featuredImage,
        showInHero: defaultArticleForm.showInHero,
        showInEditorsPicks: defaultArticleForm.showInEditorsPicks,
      };

  //   const [slugEdited, setSlugEdited] = useState(false);

  const [preview, setPreview] = useState<string | null>(
    article?.featuredImage ?? null,
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const formMethods = useForm<ArticleSchema>({
    resolver: zodResolver(articleSchema),

    defaultValues: {
      title: initialValues.title,
      slug: initialValues.slug,
      excerpt: initialValues.excerpt,
      content: initialValues.content,
      category: initialValues.category,
      author: initialValues.author,
      status: initialValues.status,
      scheduledAt: initialValues.scheduledAt,
      showInHero: initialValues.showInHero,
      showInEditorsPicks: initialValues.showInEditorsPicks,
    },

    mode: "onChange",
  });

  const onSubmit = async (
    data: ArticleSchema,
    submitStatus?: ArticleSchema["status"],
  ) => {
    console.log("=== ONSUBMIT ===");
    console.log(data);

    setLoading(true);

    try {
      let featuredImage: string | null = preview;

      if (selectedFile) {
        const upload = await uploadImage(selectedFile);
        featuredImage = upload.url;
      }

      const finalStatus = submitStatus ?? data.status;

      const finalData = {
        ...data,
        status: finalStatus,
        scheduledAt:
          finalStatus === "Scheduled" && data.scheduledAt
            ? data.scheduledAt
            : null,
        featuredImage,
      };

      if (article) {
        await updateArticleAction(article.id, finalData);
      } else {
        await createArticleAction(finalData);
      }

      console.log("Success");

      setSelectedFile(null);

      router.push("/articles");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to save article.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    const data = formMethods.getValues();

    await onSubmit(data, "Draft");
  };

  const handlePrimarySubmit = async (data: ArticleSchema) => {
    await onSubmit(data, data.status);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleMediaSelect = (item: {
    id: string;
    originalName: string;
    path: string;
    width: number | null;
    height: number | null;
  }) => {
    setPreview(item.path);
    setSelectedFile(null);
  };

  async function uploadImage(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return response.json();
  }

  const [loading, setLoading] = useState(false);

  const title = useWatch({
    control: formMethods.control,
    name: "title",
  });

  const statusValue = useWatch({
    control: formMethods.control,
    name: "status",
  });

  const { setValue } = formMethods;

  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    if (!slugEdited) {
      setValue("slug", slugify(title));
    }
  }, [title, slugEdited, setValue]);

  return (
    <>
      <form onSubmit={formMethods.handleSubmit(handlePrimarySubmit)}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {article ? "Edit Article" : "New Article"}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>

                  <Input
                    id="title"
                    {...formMethods.register("title")}
                    placeholder="Enter title..."
                  />
                  {formMethods.formState.errors.title && (
                    <p className="text-sm text-red-600">
                      {formMethods.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>

                  <Input
                    id="slug"
                    {...formMethods.register("slug")}
                    onChange={(e) => {
                      setSlugEdited(true);

                      formMethods.setValue("slug", e.target.value);
                    }}
                    placeholder="article-slug"
                  />
                  {formMethods.formState.errors.slug && (
                    <p className="text-sm text-red-600">
                      {formMethods.formState.errors.slug.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>

                  <Textarea
                    id="excerpt"
                    {...formMethods.register("excerpt")}
                    placeholder="Write a short summary..."
                  />
                  {formMethods.formState.errors.excerpt && (
                    <p className="text-sm text-red-600">
                      {formMethods.formState.errors.excerpt.message}
                    </p>
                  )}
                </div>

                <Controller
                  control={formMethods.control}
                  name="content"
                  render={({ field }) => (
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                      media={media}
                    />
                  )}
                />
                {formMethods.formState.errors.content && (
                  <p className="text-sm text-red-600">
                    {formMethods.formState.errors.content.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Status</Label>

                  <Controller
                    control={formMethods.control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {ARTICLE_STATUS.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {statusValue === "Scheduled" && (
                  <div className="space-y-2">
                    <Label htmlFor="scheduledAt">Schedule Publication</Label>

                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      {...formMethods.register("scheduledAt")}
                    />

                    {formMethods.formState.errors.scheduledAt && (
                      <p className="text-sm text-red-600">
                        {formMethods.formState.errors.scheduledAt.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Category</Label>

                  <Controller
                    control={formMethods.control}
                    name="category"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>

                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {formMethods.formState.errors.category && (
                    <p className="text-sm text-red-600">
                      {formMethods.formState.errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Author</Label>

                  <Input
                    {...formMethods.register("author")}
                    placeholder="Author"
                  />
                  {formMethods.formState.errors.author && (
                    <p className="text-sm text-red-600">
                      {formMethods.formState.errors.author.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label>Show in Hero</Label>

                    <Controller
                      control={formMethods.control}
                      name="showInHero"
                      render={({ field }) => (
                        <Select
                          value={field.value ? "yes" : "no"}
                          onValueChange={(value) => {
                            const show = value === "yes";

                            field.onChange(show);

                            if (show) {
                              formMethods.setValue("showInEditorsPicks", false);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="yes">Ya</SelectItem>
                            <SelectItem value="no">Tidak</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Show in Editor&apos;s Picks</Label>

                    <Controller
                      control={formMethods.control}
                      name="showInEditorsPicks"
                      render={({ field }) => (
                        <Select
                          value={field.value ? "yes" : "no"}
                          onValueChange={(value) => {
                            const show = value === "yes";

                            field.onChange(show);

                            if (show) {
                              formMethods.setValue("showInHero", false);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="yes">Ya</SelectItem>
                            <SelectItem value="no">Tidak</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleSaveDraft}
                    disabled={loading}
                  >
                    {article ? "Update Draft" : "Save Draft"}
                  </Button>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading
                      ? article
                        ? "Updating..."
                        : "Saving..."
                      : statusValue === "Scheduled"
                        ? article
                          ? "Update Schedule"
                          : "Schedule Article"
                        : statusValue === "Published"
                          ? article
                            ? "Update Article"
                            : "Publish Article"
                          : article
                            ? "Update Article"
                            : "Save Article"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt="Preview"
                      width={1920}
                      height={1200}
                      className="aspect-video w-full rounded-lg object-cover"
                    />

                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => inputRef.current?.click()}
                      >
                        Replace Image
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setMediaPickerOpen(true)}
                      >
                        Select from Media Library
                      </Button>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-red-600"
                      onClick={() => {
                        setPreview(null);
                        setSelectedFile(null);

                        if (inputRef.current) {
                          inputRef.current.value = "";
                        }
                      }}
                    >
                      Remove Image
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="border-muted-foreground/30 hover:border-primary hover:bg-muted/40 flex h-56 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition"
                    >
                      <ImagePlus className="text-muted-foreground mb-4 h-10 w-10" />

                      <p className="font-medium">Upload Featured Image</p>

                      <p className="text-muted-foreground text-sm">
                        JPG, PNG or WebP
                      </p>
                    </button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setMediaPickerOpen(true)}
                    >
                      Select from Media Library
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
      <MediaPicker
        media={media}
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={handleMediaSelect}
      />
    </>
  );
}
