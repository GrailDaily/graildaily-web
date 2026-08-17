import type { APIRoute } from "astro";

const CMS_API_URL = import.meta.env.CMS_API_URL ?? "http://localhost:3000";

export const prerender = false;

export const POST: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response(
      JSON.stringify({
        error: "Slug artikel tidak ditemukan",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await fetch(
      `${CMS_API_URL}/api/articles/${encodeURIComponent(slug)}/view`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to proxy article view:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to record article view.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
