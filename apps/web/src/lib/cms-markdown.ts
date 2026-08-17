import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

export async function renderCmsMarkdown(markdown: string) {
  return await marked.parse(markdown);
}
