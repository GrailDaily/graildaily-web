import { getMedia } from "@/services/media.service";

import { MediaGrid } from "@/features/media/components/media-grid";

export default async function MediaPage() {
  const media = await getMedia();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Media Library</h1>

        <p className="text-muted-foreground">Manage uploaded images.</p>
      </div>

      <MediaGrid media={media} />
    </div>
  );
}
