-- Repair migration: scheduledAt already exists in the database.
ALTER TABLE "Article" ADD COLUMN IF NOT EXISTS "scheduledAt" TIMESTAMP(3);
