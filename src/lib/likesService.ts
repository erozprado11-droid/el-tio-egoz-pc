// src/lib/likesService.ts
import { db } from "@/lib/firebase"; // Asegúrate de que esta ruta apunte a tu archivo de configuración
import { doc, runTransaction, serverTimestamp, getDoc } from "firebase/firestore";

/**
 * Función para alternar el like
 * @param gameId El ID del juego (el documento padre)
 * @param userId El ID anónimo del dispositivo
 */
export const toggleGameLike = async (gameId: string, userId: string) => {
    const gameRef = doc(db, "games", gameId);
    const likeRef = doc(db, "games", gameId, "likes", userId);

    try {
    return await runTransaction(db, async (transaction) => {
        const gameDoc = await transaction.get(gameRef);
        const likeDoc = await transaction.get(likeRef);

        if (!gameDoc.exists()) {
        throw new Error("El juego no existe en la base de datos.");
        }

        const currentLikes = gameDoc.data().likes || 0;

        if (!likeDoc.exists()) {
        // CASO: No tiene like -> Lo ponemos
        transaction.set(likeRef, { likedAt: serverTimestamp() });
        transaction.update(gameRef, { likes: currentLikes + 1 });
        return { liked: true };
        } else {
        // CASO: Ya tiene like -> Lo quitamos
        transaction.delete(likeRef);
        transaction.update(gameRef, { likes: Math.max(0, currentLikes - 1) });
        return { liked: false };
        }
    });
    } catch (error) {
    console.error("Error al procesar el like:", error);
    throw error;
    }
};

/**
 * Función para verificar si el usuario ya le dio like (para pintar el botón)
 */
export const checkIfUserLiked = async (gameId: string, userId: string): Promise<boolean> => {
    const likeRef = doc(db, "games", gameId, "likes", userId);
    const docSnap = await getDoc(likeRef);
    return docSnap.exists();
};