import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth-guard";
import { siteSettingsSchema } from "@/features/settings/validation/settings-schema";
import {
  getSiteSettings,
  updateSiteSettings,
} from "@/services/settings.service";

export async function GET() {
  try {
    const settings = await getSiteSettings();

    return NextResponse.json(
      {
        siteName: settings.siteName,
        description: settings.description,
        siteUrl: settings.siteUrl,
        language: settings.language,
        timezone: settings.timezone,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch {
    console.error("GET /api/settings failed.");

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

    const validation = siteSettingsSchema.safeParse(body);

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

    const settings = await updateSiteSettings(validation.data);

    return NextResponse.json({
      siteName: settings.siteName,
      description: settings.description,
      siteUrl: settings.siteUrl,
      language: settings.language,
      timezone: settings.timezone,
    });
  } catch {
    console.error("PUT /api/settings failed.");

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
