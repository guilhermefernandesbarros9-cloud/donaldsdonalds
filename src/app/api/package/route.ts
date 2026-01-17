import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Instância do Prisma Client

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Cria um novo registro na tabela Tracking
    const pkg = await prisma.tracking.create({
      data: {
        trackingCode: body.trackingCode,
        description: body.description,
        sender: body.sender || "Correios Brasil",
        recipient: body.recipient,
        shippingTax: parseFloat(body.shippingTax) || 15,
        status: body.status || "POSTED",
        userId: body.userId || null, // Pode ser null para teste
      },
    });

    return NextResponse.json(pkg);
  } catch (error: any) {
    console.error("Erro ao criar tracking:", error);
    return NextResponse.json(
      { error: error.message || "Erro desconhecido" },
      { status: 500 },
    );
  }
}
