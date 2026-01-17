// src/components/AdminPackagesClient.tsx
"use client";

import { useState } from "react";

export type PackageItem = {
  id: string;
  trackingCode: string;
  description?: string;
  recipient?: string;
  status?: string;
  shippingTax?: number;
};

export default function AdminPackagesClient({
  initialPackages,
}: {
  initialPackages: PackageItem[];
}) {
  const [packages, setPackages] = useState<PackageItem[]>(initialPackages);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  // Atualiza status via API (PUT). Não faz GET para recarregar a página.
  const updateStatus = async (pkg: PackageItem, newStatus: string) => {
    // evita cliques repetidos
    if (loadingMap[pkg.id]) return;
    setLoadingMap((s) => ({ ...s, [pkg.id]: true }));

    try {
      const res = await fetch("/api/package", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackingCode: pkg.trackingCode,
          status: newStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("PUT response error:", data);
        alert("Erro: " + (data?.error || "falha ao atualizar"));
        return;
      }

      // Atualiza localmente imediatamente (optimistic)
      setPackages((prev) =>
        prev.map((p) => (p.id === pkg.id ? { ...p, status: newStatus } : p)),
      );
    } catch (err) {
      console.error("fetch PUT error:", err);
      alert("Erro de conexão ao atualizar");
    } finally {
      setLoadingMap((s) => ({ ...s, [pkg.id]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="flex items-center justify-between rounded bg-white p-4 shadow"
        >
          <div>
            <div className="font-bold text-blue-900">{pkg.trackingCode}</div>
            <div className="text-sm text-gray-500">
              {pkg.description} — {pkg.recipient}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={pkg.status}
              className="rounded border p-2"
              onChange={(e) => updateStatus(pkg, e.target.value)}
              disabled={!!loadingMap[pkg.id]}
            >
              <option value="POSTED">Objeto postado</option>
              <option value="IN_TRANSIT">Em trânsito</option>
              <option value="OUT_FOR_DELIVERY">Saiu para entrega</option>
              <option value="DELIVERED">Entregue</option>
              <option value="AWAITING_PICKUP">Aguardando retirada</option>
            </select>

            <div
              className={`h-3 w-3 rounded-full ${loadingMap[pkg.id] ? "animate-pulse bg-yellow-400" : "bg-green-500"}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
