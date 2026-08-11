"use client";

import Image from "next/image";

import { MediaActions } from "./media-actions";

import { Card, CardContent } from "@/components/ui/card";

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  width: number | null;
  height: number | null;
  createdAt: Date | string;
}

interface Props {
  media: MediaItem[];
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function MediaGrid({ media }: Props) {
  if (media.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-60 items-center justify-center">
          <p className="text-muted-foreground text-sm">
            No media uploaded yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {media.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="bg-muted aspect-video overflow-hidden">
            <Image
              src={item.path}
              alt={item.originalName}
              width={item.width ?? 1920}
              height={item.height ?? 1200}
              className="h-full w-full object-cover"
            />
          </div>

          <CardContent className="space-y-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <p
                className="min-w-0 truncate text-sm font-medium"
                title={item.originalName}
              >
                {item.originalName}
              </p>

              <MediaActions
                mediaId={item.id}
                url={item.path}
                originalName={item.originalName}
              />
            </div>

            <div className="text-muted-foreground space-y-1 text-xs">
              <p>
                {item.width && item.height
                  ? `${item.width} × ${item.height}`
                  : "Unknown dimensions"}
              </p>

              <p>{formatFileSize(item.size)}</p>

              <p>Uploaded {formatDate(item.createdAt)}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
