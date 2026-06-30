import { db } from "../lib/firebase"; // Ajusta la ruta a tu firebase.ts
import { doc, runTransaction, serverTimestamp, getDoc } from "firebase/firestore";

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
                transaction.set(likeRef, { likedAt: serverTimestamp() });
                transaction.update(gameRef, { likes: currentLikes + 1 });
                return { liked: true };
            } else {
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

export const checkIfUserLiked = async (gameId: string, userId: string): Promise<boolean> => {
    const likeRef = doc(db, "games", gameId, "likes", userId);
    const docSnap = await getDoc(likeRef);
    return docSnap.exists();
};