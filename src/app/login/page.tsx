"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [trackingCode, setTrackingCode] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (trackingCode.trim()) {
      // Redireciona para a página de rastreamento com o código
      router.push(`/rastreamento?codigo=${trackingCode}`);
    } else {
      alert("Por favor, digite um código de rastreio válido.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header Cinza Oficial */}
      <header className="border-b-4 border-[#ffcc00] bg-[#f2f2f2]">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Image
            src="/logo.png"
            alt="Logo Correios"
            width={150}
            height={50}
            priority
            className="object-contain"
          />

          <nav className="hidden space-x-6 text-[13px] font-bold text-[#005ca9] md:flex">
            <a href="#" className="hover:underline">
              Enviar
            </a>
            <a href="#" className="hover:underline">
              Receber
            </a>
            <a href="#" className="hover:underline">
              Comprar
            </a>
            <a
              href="/login"
              className="flex items-center gap-1 hover:underline"
            >
              <span className="text-yellow-500">❯</span> Entrar
            </a>
          </nav>
        </div>
      </header>

      {/* Seção de Busca */}
      <main className="flex-1">
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-8 text-4xl font-bold text-[#005ca9]">
              Acompanhe seu Objeto
            </h1>

            <form
              onSubmit={handleSearch}
              className="mx-auto flex max-w-3xl items-center overflow-hidden rounded-full border-2 border-gray-200 bg-white shadow-xl focus-within:border-blue-400"
            >
              <input
                type="text"
                placeholder="AA123456789BR ou 000.111.222-33"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="flex-1 px-8 py-5 text-lg outline-none"
              />
              <button
                type="submit"
                className="bg-[#005ca9] px-12 py-5 font-bold text-white transition-all hover:bg-blue-800"
              >
                BUSCAR
              </button>
            </form>

            <p className="mt-6 text-sm italic text-gray-400">
              Consulte o status de seus objetos postados
            </p>
          </div>
        </section>

        {/* Cards de Serviços */}
        <section className="container mx-auto grid grid-cols-2 gap-6 bg-gray-50 p-8 md:grid-cols-4">
          {[
            { name: "Preços e Prazos", icon: "💰" },
            { name: "Busca CEP", icon: "📍" },
            { name: "Agências", icon: "🏢" },
            { name: "Minhas Importações", icon: "✈️" },
          ].map((item) => (
            <div
              key={item.name}
              className="cursor-pointer rounded-lg border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
            >
              <span className="mb-2 block text-3xl">{item.icon}</span>
              <span className="text-sm font-bold text-[#005ca9]">
                {item.name}
              </span>
            </div>
          ))}
        </section>
      </main>

      <footer className="bg-gray-100 py-6 text-center text-xs text-gray-400">
        © 2026 Correios - Todos os direitos reservados.
      </footer>
    </div>
  );
}
