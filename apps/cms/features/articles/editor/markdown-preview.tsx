"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  value: string;
}

export function MarkdownPreview({ value }: Props) {
  return (
    <div className="markdown-preview">
      {value.trim() ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-6 text-4xl font-bold tracking-tight">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="mt-8 mb-5 text-3xl font-bold tracking-tight">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="mt-6 mb-4 text-2xl font-semibold">{children}</h3>
            ),

            p: ({ children }) => (
              <p className="text-foreground mb-5 text-base leading-7">
                {children}
              </p>
            ),

            strong: ({ children }) => (
              <strong className="text-foreground font-bold">{children}</strong>
            ),

            em: ({ children }) => <em className="italic">{children}</em>,

            ul: ({ children }) => (
              <ul className="mb-5 ml-6 list-disc space-y-2 pl-4">{children}</ul>
            ),

            ol: ({ children }) => (
              <ol className="mb-5 ml-6 list-decimal space-y-2 pl-4">
                {children}
              </ol>
            ),

            li: ({ children }) => <li className="leading-7">{children}</li>,

            blockquote: ({ children }) => (
              <blockquote className="border-primary/40 bg-muted/40 text-muted-foreground my-6 border-l-4 px-5 py-3 italic">
                {children}
              </blockquote>
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
              >
                {children}
              </a>
            ),

            img: ({ src, alt }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt ?? ""}
                className="my-6 max-h-150 w-full rounded-lg object-cover"
              />
            ),

            code: ({ className, children }) => {
              const isBlock = Boolean(className);

              if (isBlock) {
                return (
                  <code className="font-mono text-sm leading-6">
                    {children}
                  </code>
                );
              }

              return (
                <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
                  {children}
                </code>
              );
            },

            pre: ({ children }) => (
              <pre className="bg-muted/50 my-6 overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-6">
                {children}
              </pre>
            ),

            hr: () => <hr className="border-border my-8" />,

            table: ({ children }) => (
              <div className="my-6 overflow-x-auto">
                <table className="border-border w-full border-collapse border text-sm">
                  {children}
                </table>
              </div>
            ),

            thead: ({ children }) => (
              <thead className="bg-muted">{children}</thead>
            ),

            th: ({ children }) => (
              <th className="border-border border px-4 py-2 text-left font-semibold">
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td className="border-border border px-4 py-2">{children}</td>
            ),
          }}
        >
          {value}
        </ReactMarkdown>
      ) : (
        <p className="text-muted-foreground text-sm">Nothing to preview yet.</p>
      )}
    </div>
  );
}
