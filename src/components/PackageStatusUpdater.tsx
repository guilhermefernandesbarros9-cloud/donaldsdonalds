// src/components/PackageStatusUpdater.tsx
"use client";

import { useState } from "react";

export type PackageItem = {
  id: string;
  trackingCode: string;
  description?: string;
  status?: string;
  shippingTax?: number;
  sender?: string;
  recipient?: string;
};

export default function PackageStatusUpdater({
  pkg,
  onUpdated,
}: {
  pkg: PackageItem;
  onUpdated?: (updatedPkg: PackageItem) => void;
}) {
  const [status, setStatus] = useState(pkg.status || "POSTED");
  const [loading, setLoading] = useState(false);

  const update = async () => {
    if (!pkg.trackingCode) return alert("Pacote sem trackingCode");
    setLoading(true);
    try {
      const res = await fetch("/api/package", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingCode: pkg.trackingCode, status }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("Erro: " + (data?.error || "falha ao atualizar"));
      } else {
        alert("Status atualizado com sucesso");
        onUpdated?.(data.updated || { ...pkg, status });
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-md border bg-white p-3">
      <div className="flex-1">
        <div className="text-sm font-semibold">{pkg.trackingCode}</div>
        <div className="text-xs text-gray-500">{pkg.description}</div>
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded border p-2"
      >
        <option value="POSTED">Objeto postado</option>
        <option value="IN_TRANSIT">Em trânsito</option>
        <option value="OUT_FOR_DELIVERY">Saiu para entrega</option>
        <option value="DELIVERED">Entregue</option>
        <option value="AWAITING_PICKUP">Aguardando retirada</option>
      </select>

      <button
        onClick={update}
        disabled={loading}
        className="rounded bg-yellow-500 px-3 py-2 font-bold text-white disabled:opacity-60"
      >
        {loading ? "Atualizando..." : "Atualizar"}
      </button>
    </div>
  );
}
