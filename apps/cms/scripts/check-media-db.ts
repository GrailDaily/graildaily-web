import Database from "better-sqlite3";

const db = new Database("dev.db");

const tables = db
  .prepare(`SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name`)
  .all();

console.log("=== TABLES ===");
console.log(tables);

for (const table of tables as { name: string }[]) {
  if (table.name === "Media" || table.name === "new_Media") {
    console.log(`\n=== ${table.name} ===`);

    const columns = db.prepare(`PRAGMA table_info("${table.name}")`).all();

    console.log(columns);

    const rows = db.prepare(`SELECT * FROM "${table.name}"`).all();

    console.log(rows);
  }
}

db.close();
