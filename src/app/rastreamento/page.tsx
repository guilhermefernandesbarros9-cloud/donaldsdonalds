import { prisma } from "@/lib/prisma";

export default async function PublicTrackingPage({
  searchParams,
}: {
  searchParams: { codigo?: string };
}) {
  const codigo = searchParams.codigo || "";

  // Busca dados UMA ÚNICA VEZ no servidor
  const data = await prisma.tracking.findUnique({
    where: { trackingCode: codigo },
  });

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-blue-900">
        Rastreamento de Objeto
      </h1>

      {!data ? (
        <p className="text-gray-500">Digite um código válido para consultar.</p>
      ) : (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">Status Atual:</span>
            {/* Lógica visual para "Saiu para entrega" solicitada */}
            {data.status === "Saiu para entrega" && (
              <span className="animate-pulse rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                🚀 Seu objeto saiu para entrega!
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-orange-600">{data.status}</h2>
          <p className="mt-2 text-sm text-gray-400">
            Código: {data.trackingCode}
          </p>
        </div>
      )}
    </div>
  );
}
