import { NextResponse } from "next/server";

import {
  getSiteSettings,
  updateSiteSettings,
} from "@/services/settings.service";

export async function GET() {
  try {
    const settings = await getSiteSettings();

    return NextResponse.json({
      siteName: settings.siteName,
      description: settings.description,
      siteUrl: settings.siteUrl,
      language: settings.language,
      timezone: settings.timezone,
    });
  } catch (error) {
    console.error("GET /api/settings failed:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch site settings.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const siteName = String(body.siteName ?? "").trim();
    const description = String(body.description ?? "").trim();
    const siteUrl = String(body.siteUrl ?? "").trim();
    const language = String(body.language ?? "").trim();
    const timezone = String(body.timezone ?? "").trim();

    if (!siteName || !description || !siteUrl || !language || !timezone) {
      return NextResponse.json(
        {
          error: "All settings fields are required.",
        },
        {
          status: 400,
        },
      );
    }

    const settings = await updateSiteSettings({
      siteName,
      description,
      siteUrl,
      language,
      timezone,
    });

    return NextResponse.json({
      siteName: settings.siteName,
      description: settings.description,
      siteUrl: settings.siteUrl,
      language: settings.language,
      timezone: settings.timezone,
    });
  } catch (error) {
    console.error("PUT /api/settings failed:", error);

    return NextResponse.json(
      {
        error: "Failed to update site settings.",
      },
      {
        status: 500,
      },
    );
  }
}
