import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/lib/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

console.log("=== PRISMA CLIENT CREATED ===");
console.log("article:", typeof prismaClient.article);
console.log("media:", typeof prismaClient.media);

export const prisma = prismaClient;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}
