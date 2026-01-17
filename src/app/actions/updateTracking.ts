// src/app/actions/updateTracking.ts
"use server"; // Obrigatorio para rodar no servidor

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTrackingStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const newStatus = formData.get("status") as string;

  // Atualiza no banco via Prisma (Servidor)
  await prisma.tracking.update({
    where: { id },
    data: { status: newStatus },
  });

  // Limpa o cache para o cliente ver o dado novo instantaneamente
  revalidatePath("/(public)/rastreio", "page");
  revalidatePath("/(admin)/rastreios", "layout");
}
