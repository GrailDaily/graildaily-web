"use client";

import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

interface Props {
  onInsert: (value: string) => void;
  onImage: () => void;
}

export function EditorToolbar({ onInsert, onImage }: Props) {
  return (
    <div className="bg-muted/30 flex flex-wrap gap-2 rounded-lg border p-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onInsert("# ")}
      >
        H1
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onInsert("## ")}
      >
        H2
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onInsert("### ")}
      >
        H3
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onInsert("**bold**")}
      >
        Bold
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onInsert("*italic*")}
      >
        Italic
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onInsert("- ")}
      >
        List
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onInsert("> ")}
      >
        Quote
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onInsert("```\n\n```")}
      >
        Code
      </Button>

      <Button type="button" variant="outline" size="sm" onClick={onImage}>
        <ImagePlus className="mr-1 h-4 w-4" />
        Image
      </Button>
    </div>
  );
}
