import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function TaxaPage({
  searchParams,
}: {
  searchParams: { codigo?: string };
}) {
  const pkg = await prisma.package.findFirst({
    where: { trackingCode: searchParams.codigo },
  });

  if (!pkg) return <div>Erro ao carregar taxa.</div>;

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border bg-white p-6 shadow-xl">
      <h1 className="mb-4 text-xl font-bold text-blue-900">
        Pagamento de Tributos
      </h1>
      <div className="my-4 border-b border-t py-4">
        <div className="flex justify-between">
          <span>Taxa Postal:</span>
          <span className="font-bold">R$ {pkg.shippingTax?.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full rounded-lg bg-green-600 py-3 font-bold text-white">
        PAGAR COM PIX
      </button>
    </div>
  );
}
