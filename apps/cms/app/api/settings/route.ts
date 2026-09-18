import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth-guard";
import { z } from "zod";
const settingsSchema = z.object({
  siteName: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(500),
  siteUrl: z.string().trim().url().max(2048),
  language: z.string().trim().regex(/^[a-z]{2,3}(?:-[A-Z]{2})?$/),
  timezone: z.string().trim().refine(
    (value) => {
      try {
        new Intl.DateTimeFormat("en-US", { timeZone: value });
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid timezone." },
  ),
});

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
  const authResult = await requireRole(request, ["Admin"]);

  if (!authResult.ok) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status },
    );
  }
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON body.",
        },
        {
          status: 400,
        },
      );
    }

    const validation = settingsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid settings data.",
          details: validation.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const {
      siteName,
      description,
      siteUrl,
      language,
      timezone,
    } = validation.data;

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







