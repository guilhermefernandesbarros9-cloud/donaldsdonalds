// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // permite reutilizar instância em dev
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
