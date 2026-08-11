import { prisma } from "@/lib/prisma";

function extractPublicId(url: string) {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^/.]+$/);

  return match?.[1] ?? null;
}

async function main() {
  const media = await prisma.media.findMany({
    where: {
      publicId: null,
    },
  });

  console.log(`Found ${media.length} media without publicId.`);

  for (const item of media) {
    const publicId = extractPublicId(item.path);

    if (!publicId) {
      console.warn(`Could not extract publicId from: ${item.originalName}`);
      continue;
    }

    await prisma.media.update({
      where: {
        id: item.id,
      },
      data: {
        publicId,
      },
    });

    console.log(`Updated: ${item.originalName} → ${publicId}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
