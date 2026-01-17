"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    trackingCode: "",
    description: "",
    recipient: "",
    sender: "Correios Brasil", // Valor padrão
    shippingTax: "15.00", // Valor padrão da taxa
    status: "POSTED", // Status inicial
    userId: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Envia os dados para a API
    const res = await fetch("/api/package", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Encomenda cadastrada com sucesso!");
      // Limpa apenas os campos variáveis
      setForm({
        ...form,
        trackingCode: "",
        description: "",
        recipient: "",
      });
    } else {
      alert("❌ Erro ao cadastrar. Verifique o ID do Usuário.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-blue-900">
          Novo Cadastro de Objeto
        </h1>

        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          {/* Código e Descrição */}
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Código (ex: BR123...)"
              className="rounded border p-3"
              value={form.trackingCode}
              onChange={(e) =>
                setForm({ ...form, trackingCode: e.target.value })
              }
              required
            />
            <input
              placeholder="Descrição (ex: iPhone)"
              className="rounded border p-3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          {/* Destinatário e Remetente */}
          <input
            placeholder="Nome do Destinatário"
            className="rounded border p-3"
            value={form.recipient}
            onChange={(e) => setForm({ ...form, recipient: e.target.value })}
            required
          />
          <input
            placeholder="Remetente"
            className="rounded border p-3"
            value={form.sender}
            onChange={(e) => setForm({ ...form, sender: e.target.value })}
          />

          {/* Taxa e ID do Usuário */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="ml-1 text-xs text-gray-500">
                Taxa de Despacho (R$)
              </label>
              <input
                type="text"
                className="w-full rounded border p-3"
                value={form.shippingTax}
                onChange={(e) =>
                  setForm({ ...form, shippingTax: e.target.value })
                }
              />
            </div>
            <div>
              <label className="ml-1 text-xs text-gray-500">
                ID do Usuário (Neon)
              </label>
              <input
                placeholder="Cole o ID aqui"
                className="w-full rounded border p-3"
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                /* REMOVA O REQUIRED DAQUI */
              />
            </div>
          </div>

          {/* Seleção de Status */}
          <div>
            <label className="ml-1 text-xs text-gray-500">
              Status Inicial do Objeto
            </label>
            <select
              className="w-full rounded border bg-gray-50 p-3"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="POSTED">Objeto postado</option>
              <option value="IN_TRANSIT">Em trânsito</option>
              <option value="OUT_FOR_DELIVERY">Saiu para entrega</option>
              <option value="DELIVERED">Entregue</option>
              <option value="AWAITING_PICKUP">Aguardando retirada</option>
              <option value="LOST">Extraviado</option>{" "}
              {/* ADICIONE ESTA LINHA */}
              <option value="ATTENTION">Atenção</option>{" "}
              {/* ADICIONE ESTA LINHA */}
            </select>
          </div>

          <button className="mt-4 rounded-lg bg-blue-600 p-4 font-bold text-white transition-colors hover:bg-blue-700">
            CADASTRAR ENCOMENDA
          </button>
        </form>
      </div>
    </div>
  );
}
