"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [codigo, setCodigo] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codigo.trim()) {
      router.push(`/rastreamento?codigo=${codigo.trim()}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-3xl font-bold text-blue-900">
        Acompanhe seu Objeto
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg overflow-hidden rounded-full border border-gray-200 shadow-lg"
      >
        <input
          type="text"
          placeholder="Digite o código de rastreio"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="flex-1 p-4 text-gray-600 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-900 px-10 font-bold text-white transition-colors hover:bg-blue-700"
        >
          BUSCAR
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-500">
        Consulte a situação de seus objetos postados nos Correios.
      </p>
    </main>
  );
}
