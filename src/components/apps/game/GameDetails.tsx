import React from 'react';

export function GameDetails() {
    // DATOS DE PRUEBA (Mocks) para visualizar el diseño sin lógica ni props
    const mockItem = {
        title: "Crónicas de una Primavera Inusual",
        description: "Esta es la sinopsis de prueba del juego. Un viaje increíble lleno de aventuras, toma de decisiones y una historia profunda que te atrapará desde el primer minuto. Todo adaptado y traducido para tu disfrute en entorno local.",
        basicInformation: ["Versión 1.0", "Traducción Completa", "1.2 GB"],
        details: ["Singleplayer", "Múltiples Finales", "Novela Visual"],
        likes: 142,
        createdAt: "2026-06-25",
        linkWindows: "#",
        linkAndroid: "#",
    };

    return (
        // CONTENEDOR PADRE
        <div className='relative w-full overflow-x-hidden bg-[#09090b] rounded-xl border border-[#23283a]'>
            
            {/* EFECTO AMBIENT / GLOW BACKGROUND (Simulado) */}
            <div className='absolute inset-0 pointer-events-none overflow-hidden select-none z-0' aria-hidden='true'>
                <div className='w-full h-full bg-gradient-to-b from-[#181c24]/50 via-[#09090b]/80 to-[#09090b]' />
            </div>

            {/* CONTENIDO DE LA PÁGINA */}
            <div className='relative z-10 max-w-3xl mx-auto px-2 sm:px-4 py-6'>
                <div className='bg-[#181c24]/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#23283a] p-4 sm:p-8 space-y-6'>
                    
                    {/* 1. SECCIÓN HERO */}
                    <div className='space-y-4'>
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center sm:text-left'>
                            {mockItem.title}
                        </h1>
                        
                        {/* SLIDER PLACEHOLDER */}
                        <div className='overflow-hidden rounded-xl shadow-md border border-[#23283a]'>
                            <div className='w-full h-48 sm:h-72 md:h-96 bg-[#121214] flex flex-col items-center justify-center text-gray-500'>
                                <span className="text-4xl mb-2">📸</span>
                                <span>[Slider de Imágenes del Juego]</span>
                            </div>
                        </div>
                        
                        <h2 className='text-sm sm:text-base font-medium text-gray-400 text-center italic bg-black/20 py-2 px-4 rounded-lg border border-dashed border-gray-600'>
                            💡 "Desliza tu dedo o el mouse sobre la imagen para ver más detalles del juego."
                        </h2>
                    </div>

                    {/* 2. SECCIÓN: Sinopsis */}
                    <div className='bg-[#121214] border border-[#23283a] p-5 rounded-xl space-y-2'>
                        <h2 className='text-xs uppercase tracking-wider font-bold text-gray-300 opacity-70'>
                            Sinopsis del juego
                        </h2>
                        <p className='text-gray-400 text-base leading-relaxed'>
                            {mockItem.description}
                        </p>
                    </div>

                    {/* 3. SECCIÓN: Detalles en Cajas */}
                    <div className='space-y-4'>
                        <h2 className='text-xl font-black text-white flex items-center gap-2 pb-1 border-b border-[#23283a]'>
                            <span>🎮</span> Detalles del juego
                        </h2> 

                        <div className='grid grid-cols-1 gap-4'>
                            {/* Info Básica */}
                            <div className='bg-[#121214] border border-[#23283a] p-4 rounded-xl shadow-sm space-y-3'>
                                <h3 className='text-sm font-bold uppercase tracking-wide text-white flex items-center gap-1.5'>
                                    <span className='w-2 h-2 rounded-full bg-amber-500'></span>
                                    Información Básica
                                </h3>
                                <div className='flex flex-wrap gap-2'>
                                    {mockItem.basicInformation.map((info, index) => (
                                        <div key={index} className='bg-[#23283a] text-gray-300 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium shadow-sm'>
                                            {info}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Características */}
                            <div className='bg-[#121214] border border-[#23283a] p-4 rounded-xl shadow-sm space-y-3'>
                                <h3 className='text-sm font-bold uppercase tracking-wide text-white flex items-center gap-1.5'>
                                    <span className='w-2 h-2 rounded-full bg-purple-500'></span>
                                    Características
                                </h3>
                                <div className='flex flex-wrap gap-2'>
                                    {mockItem.details.map((detail, index) => (
                                        <div key={index} className='bg-[#23283a] text-gray-300 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium shadow-sm'>
                                            {detail}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Plataformas */}
                            <div className='bg-[#121214] border border-[#23283a] p-4 rounded-xl shadow-sm space-y-3'>
                                <h3 className='text-sm font-bold uppercase tracking-wide text-white flex items-center gap-1.5'>
                                    <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
                                    Plataformas Disponibles
                                </h3>
                                <div className='flex flex-wrap gap-2'>
                                    {mockItem.linkAndroid && <div className='bg-[#ffb300] text-black px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm'>Android</div>}
                                    {mockItem.linkWindows && <div className='bg-[#ffb300] text-black px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm'>Windows</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. SECCIÓN ZONA DE DESCARGAS */}
                    <div className='space-y-4 pt-2'>
                        <div className='bg-[#121214] border border-[#23283a] p-5 rounded-xl shadow-sm space-y-3'>
                            <h2 className='text-lg font-bold text-white flex items-center gap-2'>
                                📥 Descárgalo aquí
                            </h2>
                            <div className='flex flex-col sm:flex-row flex-wrap gap-2'>
                                {mockItem.linkAndroid && <button className='bg-[#ffb300] hover:bg-yellow-500 text-black font-bold px-4 py-2.5 rounded-lg shadow transition-all text-sm'>Descargar para Android</button>}
                                {mockItem.linkWindows && <button className='bg-[#ffb300] hover:bg-yellow-500 text-black font-bold px-4 py-2.5 rounded-lg shadow transition-all text-sm'>Descargar para Windows</button>}
                            </div>
                        </div>

                        {/* Tutoriales */}
                        <div className='bg-[#121214] border border-[#23283a] p-5 rounded-xl shadow-sm space-y-3'>
                            <div>
                                <h2 className='text-lg font-bold text-white flex items-center gap-2'>
                                    📖 Tutoriales de ¿Cómo...
                                </h2>
                                <p className='text-xs text-gray-400 mt-0.5 font-medium'>Nota: Usa el Tuto que va acorde a tu caso.</p>
                            </div>
                            <div className='flex flex-col sm:flex-row flex-wrap gap-3'>
                                <button className='bg-[#23283a] hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors text-sm'>¿Emularlo en JoiPlay?</button>
                            </div>
                        </div>
                    </div>

                    {/* 5. FOOTER DE LA TARJETA */}
                    <div className='flex flex-row justify-between items-center pt-4 border-t border-[#23283a] text-xs text-gray-400 font-medium'>
                        <div className="flex items-center gap-2">
                            <button className="text-red-500 hover:scale-110 transition-transform">❤️</button>
                            <span>{mockItem.likes} Likes</span>
                        </div>
                        <span>
                            📅 Publicado: {mockItem.createdAt}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}