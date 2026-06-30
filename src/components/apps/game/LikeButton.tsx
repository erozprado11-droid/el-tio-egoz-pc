import React, { useState, useEffect } from 'react';
import { toggleGameLike, checkIfUserLiked } from '../../../lib/likesService';
import { getAnonymousUserId } from '../../../utils/anonymousAuth';

interface LikeButtonProps {
    gameId: string;
    initialLikes: number;
}

export default function LikeButton({ gameId, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userId = getAnonymousUserId();
        checkIfUserLiked(gameId, userId).then(setIsLiked);
    }, [gameId]);

    const handleLike = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const userId = getAnonymousUserId();
            const result = await toggleGameLike(gameId, userId);
            setIsLiked(result.liked);
            setLikes(prev => result.liked ? prev + 1 : Math.max(0, prev - 1));
        } catch (err) {
            console.error("Error al dar like:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={handleLike}
            disabled={loading}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                isLiked ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-white bg-[#09090b] hover:bg-[#23283a]'
            } border border-[#23283a]`}
        >
            <span className={`text-xl ${isLiked && !loading ? 'animate-bounce' : ''} ${loading ? 'opacity-50' : ''}`}>
                {isLiked ? '❤️' : '🤍'}
            </span>
            <span className="font-bold">{likes}</span>
        </button>
    );
}