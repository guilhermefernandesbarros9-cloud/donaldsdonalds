import { prisma } from "@/lib/prisma";
import { updateTrackingStatus } from "@/app/actions/updateTracking";

export default async function AdminEditPage({
  params,
}: {
  params: { id: string };
}) {
  // Busca o objeto atual no servidor
  const item = await prisma.tracking.findUnique({
    where: { id: params.id },
  });

  if (!item) return <div>Objeto não encontrado.</div>;

  return (
    <div className="max-w-md p-8">
      <h1 className="mb-4 text-xl font-bold">
        Gerenciar Objeto: {item.trackingCode}
      </h1>

      {/* Formulário que usa Server Action - Sem useState ou useEffect */}
      <form action={updateTrackingStatus} className="space-y-4">
        <input type="hidden" name="id" value={item.id} />

        <label className="block text-sm font-medium text-gray-700">
          Alterar Status:
        </label>
        <select
          name="status"
          defaultValue={item.status}
          className="w-full rounded border bg-gray-50 p-2"
        >
          <option value="Objeto postado">Objeto postado</option>
          <option value="Em trânsito">Em trânsito</option>
          <option value="Saiu para entrega">Saiu para entrega</option>
          <option value="Entregue">Entregue</option>
          <option value="Extraviado">Extraviado</option>
        </select>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 font-bold text-white transition-colors hover:bg-blue-700"
        >
          SALVAR ALTERAÇÃO
        </button>
      </form>
    </div>
  );
}
