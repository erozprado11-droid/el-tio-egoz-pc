// src/components/StatusBadge.tsx

// src/components/StatusBadge.tsx (o lib/StatusBadge.tsx)
export default function StatusBadge({ status }: { status: string | undefined }) {
  if (!status) return null;

  const STATUS_CONFIG: Record<string, string> = {
    // NUEVO COLOR PÚRPURA para Finalizado
    "Finalizado": "from-purple-600/20 to-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30 shadow-[0_0_10px_rgba(217,70,239,0.15)]",
    "Desarrollo": "from-yellow-600/20 to-orange-500/20 text-yellow-400 border-yellow-500/30",
    "Abandonado": "from-red-600/20 to-rose-500/20 text-rose-400 border-rose-500/30",
    "Desconocido": "from-slate-600/20 to-gray-500/20 text-gray-400 border-gray-500/30", // Cambié Desconocido a gris, rojo es muy agresivo
  };

  const styles = STATUS_CONFIG[status] || "from-slate-600/20 to-slate-500/20 text-slate-400 border-slate-500/30";

  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter rounded border bg-gradient-to-br backdrop-blur-sm transition-all duration-300 hover:scale-105 ${styles}`}
    >
      <span className="w-1 h-1 rounded-full bg-current animate-pulse mr-1" />
      {status}
    </span>
  );
}