"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MediaItem {
  id: string;
  originalName: string;
  path: string;
  width: number | null;
  height: number | null;
}

interface Props {
  media: MediaItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (media: MediaItem) => void;
}

export function MediaPicker({ media, open, onOpenChange, onSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (item: MediaItem) => {
    setSelectedId(item.id);
    onSelect(item);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select from Media Library</DialogTitle>
        </DialogHeader>

        {media.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center">
            <p className="text-muted-foreground text-sm">
              No media uploaded yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {media.map((item) => {
              const selected = selectedId === item.id;

              return (
                <Card
                  key={item.id}
                  className={`cursor-pointer overflow-hidden transition ${
                    selected
                      ? "ring-primary ring-2"
                      : "hover:ring-muted-foreground/30 hover:ring-2"
                  }`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="bg-muted relative aspect-video overflow-hidden">
                    <Image
                      src={item.path}
                      alt={item.originalName}
                      width={item.width ?? 1920}
                      height={item.height ?? 1200}
                      className="h-full w-full object-cover"
                    />

                    {selected && (
                      <div className="bg-primary text-primary-foreground absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-3">
                    <p
                      className="truncate text-sm font-medium"
                      title={item.originalName}
                    >
                      {item.originalName}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
