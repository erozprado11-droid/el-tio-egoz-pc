// src/components/LikeButton.tsx
"use client";

import { useEffect, useState } from "react";
// Importaciones limpias (ajusta las rutas si tu carpeta src está anidada diferente)
import { toggleGameLike, checkIfUserLiked } from "@/lib/likesService";
import { getAnonymousUserId } from "@/utils/anonymousAuth";

export default function LikeButton({ gameId, initialLikes }: { gameId: string; initialLikes: number }) {
  // Inicializamos el contador con el dato que ya trae tu API, no desde Firebase
  const [likes, setLikes] = useState<number>(initialLikes);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Al cargar, SOLO verificamos si este usuario en específico ya había dado like
    const userId = getAnonymousUserId();
    checkIfUserLiked(gameId, userId)
      .then(setHasLiked)
      .catch((err) => console.error("Error verificando like:", err));
  }, [gameId]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      const userId = getAnonymousUserId();
      // Se envía la petición a Firebase
      const result = await toggleGameLike(gameId, userId);
      
      // Actualizamos los estados visuales inmediatamente sin recargar ni escuchar la BD
      setHasLiked(result.liked);
      setLikes((prev) => (result.liked ? prev + 1 : prev - 1));
      
    } catch (err) {
      console.error("Error al procesar like:", err);
      alert("No se pudo procesar tu like, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border 
        ${hasLiked 
          ? "bg-red-500/20 border-red-500 text-red-500" 
          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
        } 
        active:scale-95`}
    >
      <span className={`text-xl ${hasLiked ? "animate-pulse" : ""}`}>
        {hasLiked ? "❤️" : "🤍"}
      </span>
      <span className="font-bold text-sm">{likes}</span>
    </button>
  );
}