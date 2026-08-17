import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const outputPath = path.resolve(process.cwd(), "scripts", "sqlite-export.json");

const db = new Database(dbPath, {
  readonly: true,
});

const articles = db
  .prepare(
    `
    SELECT
      id,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      author,
      status,
      createdAt,
      updatedAt,
      publishedAt
    FROM Article
    ORDER BY publishedAt DESC
  `,
  )
  .all();

const media = db
  .prepare(
    `
    SELECT
      id,
      filename,
      originalName,
      mimeType,
      size,
      path,
      width,
      height,
      createdAt,
      publicId
    FROM Media
    ORDER BY createdAt ASC
  `,
  )
  .all();

db.close();

const exportData = {
  exportedAt: new Date().toISOString(),
  articles,
  media,
};

fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), "utf8");

console.log("=== SQLITE EXPORT COMPLETE ===");
console.log(`Articles: ${articles.length}`);
console.log(`Media: ${media.length}`);
console.log(`Output: ${outputPath}`);
