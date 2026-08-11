import { createMarkdownProcessor } from "@astrojs/markdown-remark";

import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";

let processorPromise: ReturnType<typeof createMarkdownProcessor> | null = null;

async function getProcessor() {
  if (!processorPromise) {
    processorPromise = createMarkdownProcessor({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
      rehypePlugins: [rehypeCallouts],
      shikiConfig: {
        themes: {
          light: "min-light",
          dark: "night-owl",
        },
        defaultColor: false,
        wrap: false,
      },
    });
  }

  return processorPromise;
}

export async function renderCmsMarkdown(markdown: string) {
  const processor = await getProcessor();

  const result = await processor.render(markdown);

  return result.code;
}
