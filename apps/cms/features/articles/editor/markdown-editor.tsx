"use client";

import { useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { EditorToolbar } from "./editor-toolbar";
import { MarkdownPreview } from "./markdown-preview";

import { MediaPicker } from "@/features/media/components/media-picker";

interface MediaItem {
  id: string;
  originalName: string;
  path: string;
  width: number | null;
  height: number | null;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  media: MediaItem[];
}

export function MarkdownEditor({ value, onChange, media }: Props) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const selectionRef = useRef({
    start: 0,
    end: 0,
  });

  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleInsert = (text: string) => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = value.substring(0, start);
    const selected = value.substring(start, end);
    const after = value.substring(end);

    let inserted = text;

    /*
     * Inline formatting.
     */
    if (selected && (text === "**bold**" || text === "*italic*")) {
      const marker = text === "**bold**" ? "**" : "*";

      inserted = `${marker}${selected}${marker}`;
    }

    /*
     * Headings, lists and quotes should start
     * on a new line.
     */
    if (
      text === "# " ||
      text === "## " ||
      text === "### " ||
      text === "- " ||
      text === "> "
    ) {
      const lineStart = before.lastIndexOf("\n") + 1;
      const currentLine = before.substring(lineStart);

      if (currentLine.trim() === "") {
        inserted = text;
      } else {
        inserted = `\n\n${text}`;
      }
    }

    const nextValue = before + inserted + after;

    onChange(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();

      const cursor = start + inserted.length;

      textarea.setSelectionRange(cursor, cursor);
    });
  };

  /*
   * Save the current cursor/selection before opening
   * the media picker.
   */
  const handleImageClick = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    selectionRef.current = {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
    };

    setMediaPickerOpen(true);
  };

  /*
   * Insert the selected media item as Markdown image.
   */
  const handleMediaSelect = (item: MediaItem) => {
    const { start, end } = selectionRef.current;

    const before = value.substring(0, start);
    const after = value.substring(end);

    const fileName = item.originalName.replace(/\.[^/.]+$/, "");

    const markdown = `![${fileName}](${item.path})`;

    const needsLeadingBreak = before.length > 0 && !before.endsWith("\n\n");

    const needsTrailingBreak = after.length > 0 && !after.startsWith("\n\n");

    const inserted =
      `${needsLeadingBreak ? "\n\n" : ""}` +
      markdown +
      `${needsTrailingBreak ? "\n\n" : ""}`;

    const nextValue = before + inserted + after;

    onChange(nextValue);

    setMediaPickerOpen(false);

    requestAnimationFrame(() => {
      const textarea = textareaRef.current;

      if (!textarea) return;

      textarea.focus();

      const cursor = start + inserted.length;

      textarea.setSelectionRange(cursor, cursor);
    });
  };

  /*
   * Enter creates a new Markdown paragraph.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = value.substring(0, start);
    const after = value.substring(end);

    event.preventDefault();

    const nextValue = before.trimEnd() + "\n\n" + after.trimStart();

    onChange(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();

      const cursor = before.trimEnd().length + 2;

      textarea.setSelectionRange(cursor, cursor);
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Content</Label>

        <div className="text-muted-foreground flex gap-4 text-sm">
          <span>{wordCount} words</span>
          <span>{readingTime} min read</span>
        </div>
      </div>

      <div className="bg-muted/30 flex items-center gap-1 rounded-lg border p-1">
        <Button
          type="button"
          size="sm"
          variant={mode === "write" ? "default" : "ghost"}
          onClick={() => setMode("write")}
        >
          Write
        </Button>

        <Button
          type="button"
          size="sm"
          variant={mode === "preview" ? "default" : "ghost"}
          onClick={() => setMode("preview")}
        >
          Preview
        </Button>
      </div>

      {mode === "write" ? (
        <>
          <EditorToolbar onInsert={handleInsert} onImage={handleImageClick} />

          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-175 resize-y font-mono text-sm leading-7"
            placeholder="Start writing here..."
          />
        </>
      ) : (
        <div className="bg-background min-h-175 rounded-lg border p-6">
          <MarkdownPreview value={value} />
        </div>
      )}

      <MediaPicker
        media={media}
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={handleMediaSelect}
      />
    </div>
  );
}
