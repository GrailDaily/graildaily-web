"use client";
import { useState, useTransition } from "react";
import { updateSiteSettingsAction } from "@/actions/settings.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface SettingsFormProps {
  settings: {
    siteName: string;
    description: string;
    siteUrl: string;
    language: string;
    timezone: string;
  };
}
export function SettingsForm({ settings }: SettingsFormProps) {
  const [siteName, setSiteName] = useState(settings.siteName);
  const [description, setDescription] = useState(settings.description);
  const [siteUrl, setSiteUrl] = useState(settings.siteUrl);
  const [language, setLanguage] = useState(settings.language);
  const [timezone, setTimezone] = useState(settings.timezone);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);
    setError("");
    startTransition(async () => {
      try {
        await updateSiteSettingsAction({
          siteName,
          description,
          siteUrl,
          language,
          timezone,
        });
        setSuccess(true);
      } catch {
        setError("Failed to update settings.");
      }
    });
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {" "}
      <div className="space-y-2">
        {" "}
        <Label htmlFor="site-name">Site Name</Label>{" "}
        <Input
          id="site-name"
          value={siteName}
          onChange={(event) => setSiteName(event.target.value)}
          placeholder="Enter site name"
        />{" "}
        <p className="text-muted-foreground text-sm">
          {" "}
          The name displayed throughout the website and CMS.{" "}
        </p>{" "}
      </div>{" "}
      <div className="space-y-2">
        {" "}
        <Label htmlFor="site-description">Site Description</Label>{" "}
        <Input
          id="site-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter site description"
        />{" "}
        <p className="text-muted-foreground text-sm">
          {" "}
          A short description of your website.{" "}
        </p>{" "}
      </div>{" "}
      <div className="space-y-2">
        {" "}
        <Label htmlFor="site-url">Site URL</Label>{" "}
        <Input
          id="site-url"
          value={siteUrl}
          onChange={(event) => setSiteUrl(event.target.value)}
          placeholder="https://example.com"
        />{" "}
        <p className="text-muted-foreground text-sm">
          {" "}
          The public URL of your GrailDaily website.{" "}
        </p>{" "}
      </div>{" "}
      <div className="grid gap-6 md:grid-cols-2">
        {" "}
        <div className="space-y-2">
          {" "}
          <Label htmlFor="language">Default Language</Label>{" "}
          <Input
            id="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          />{" "}
        </div>{" "}
        <div className="space-y-2">
          {" "}
          <Label htmlFor="timezone">Timezone</Label>{" "}
          <Input
            id="timezone"
            value={timezone}
            onChange={(event) => setTimezone(event.target.value)}
          />{" "}
        </div>{" "}
      </div>{" "}
      {success && (
        <div className="rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600">
          {" "}
          SETTINGS UPDATED SUCCESS{" "}
        </div>
      )}{" "}
      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600">
          {" "}
          {error}{" "}
        </div>
      )}{" "}
      <div className="flex justify-end">
        {" "}
        <Button type="submit" disabled={isPending}>
          {" "}
          {isPending ? "Saving..." : "Save Changes"}{" "}
        </Button>{" "}
      </div>{" "}
    </form>
  );
}
