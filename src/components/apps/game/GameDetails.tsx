import React from 'react';
import { Item } from '../../types/Item'; 
import LikeButton from './LikeButton';
import ImageSlider from '../../../utils/ImageSlider';
interface GameDetailsProps {
    item: Item;
    onBack: () => void; // Función para regresar al Dashboard
}

export function GameDetails({ item, onBack }: GameDetailsProps) {
    // Nota: Eliminamos el fetch interno porque el Dashboard ya nos pasa el 'item' completo.
    if (!item) return <p className='mx-auto text-center py-10'>Juego no encontrado.</p>;

    return (
        <div className='relative min-h-screen w-full overflow-x-hidden bg-[#09090b]'>
            
            {/* EFECTO AMBIENT / GLOW BACKGROUND */}
            {item.images && item.images.length > 0 && (
                <div className='absolute inset-0 pointer-events-none overflow-hidden select-none z-0' aria-hidden='true'>
                    <img 
                        src={item.images[0]} 
                        alt="" 
                        className='w-full h-full object-cover scale-110 blur-[8px] opacity-30 transition-all duration-500'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/80 to-[#09090b]' />
                </div>
            )}

            {/* CONTENIDO DE LA PÁGINA */}
            <div className='relative z-10 max-w-4xl mx-auto px-2 sm:px-4 py-6'>
                
                {/* BOTÓN VOLVER */}
                <button 
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-gray-400 hover:text-[#ffb300] transition-colors font-bold uppercase text-sm tracking-wider"
                >
                    ← Volver al catálogo
                </button>

                <div className='bg-[#181c24]/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#23283a] p-4 sm:p-8 space-y-6'>
                    
                    {/* 1. SECCIÓN HERO */}
                    <div className='space-y-4'>
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center sm:text-left'>
                            {item.title}
                        </h1>
                        
                        <div className='overflow-hidden rounded-xl shadow-md border border-[#23283a]'>
                            {/* Si aún no tienes ImageSlider adaptado, usamos la primera imagen */}
                            {item.images && item.images.length > 0 ? (
                                <div className='overflow-hidden rounded-xl shadow-md border border-[#23283a]'>
                                    <ImageSlider images={item.images} height="h-48 sm:h-72 md:h-96" />
                                </div>
                            ) : (
                                <div className="h-48 sm:h-72 md:h-96 bg-[#09090b] flex items-center justify-center text-gray-500">Sin imágenes</div>
                            )}
                        </div>
                        
                        <h2 className='text-sm sm:text-base font-medium text-gray-400 text-center italic bg-black/20 py-2 px-4 rounded-lg border border-dashed border-[#23283a]'>
                            💡 "Desliza tu dedo o el mouse sobre la imagen para ver más detalles del juego."
                        </h2>
                    </div>

                    {/* 2. SECCIÓN: Sinopsis */}
                    <div className='bg-[#09090b] border border-[#23283a] p-5 rounded-xl space-y-2'>
                        <h2 className='text-xs uppercase tracking-wider font-bold text-gray-400 opacity-70'>
                            Sinopsis del juego
                        </h2>
                        <p className='text-gray-300 text-base leading-relaxed'>
                            {item.description}
                        </p>
                    </div>

                    {/* 3. SECCIÓN: Detalles en Cajas */}
                    <div className='space-y-4'>
                        <h2 className='text-xl font-black text-white flex items-center gap-2 pb-1 border-b border-[#23283a]'>
                            <span>🎮</span> Detalles del juego sabroso
                        </h2> 

                        <div className='grid grid-cols-1 gap-4'>
                            {item.basicInformation && item.basicInformation.length > 0 && (
                                <div className='bg-[#09090b] border border-[#23283a] p-4 rounded-xl shadow-sm space-y-3'>
                                    <h3 className='text-sm font-bold uppercase tracking-wide text-white flex items-center gap-1.5'>
                                        <span className='w-2 h-2 rounded-full bg-amber-500'></span>
                                        Información Básica
                                    </h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {item.basicInformation.map((info, index) => (
                                            <div key={index} className='bg-[#23283a] text-gray-300 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium shadow-sm'>
                                                {info}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {item.details && item.details.length > 0 && (
                                <div className='bg-[#09090b] border border-[#23283a] p-4 rounded-xl shadow-sm space-y-3'>
                                    <h3 className='text-sm font-bold uppercase tracking-wide text-white flex items-center gap-1.5'>
                                        <span className='w-2 h-2 rounded-full bg-purple-500'></span>
                                        Características
                                    </h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {item.details.map((detail, index) => (
                                            <div key={index} className='bg-[#23283a] text-gray-300 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium shadow-sm'>
                                                {detail}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className='bg-[#09090b] border border-[#23283a] p-4 rounded-xl shadow-sm space-y-3'>
                                <h3 className='text-sm font-bold uppercase tracking-wide text-white flex items-center gap-1.5'>
                                    <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
                                    Plataformas Disponibles
                                </h3>
                                <div className='flex flex-wrap gap-2'>
                                    {item.linkAndroid && <div className='bg-[#23283a] text-[#ffb300] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm'>Android</div>}
                                    {item.linkMac && <div className='bg-[#23283a] text-[#ffb300] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm'>Mac</div>}
                                    {item.linkWindows && <div className='bg-[#23283a] text-[#ffb300] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm'>Windows</div>}
                                    {item.linkIos && <div className='bg-[#23283a] text-[#ffb300] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm'>iOS</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. SECCIÓN ZONA DE DESCARGAS */}
                    <div className='space-y-4 pt-2'>
                        <div className='bg-gradient-to-r from-purple-900/20 to-[#09090b] border border-purple-500/20 p-5 rounded-xl shadow-sm space-y-3'>
                            <h2 className='text-lg font-bold text-white flex items-center gap-2'>
                                📥 Descárgalo aquí
                            </h2>
                            <div className='flex flex-col sm:flex-row flex-wrap gap-2'>
                                {item.linkAndroid && <a href={item.linkAndroid} target='_blank' rel='noopener noreferrer' className='bg-[#ffb300] hover:bg-yellow-500 text-black font-bold px-4 py-2.5 rounded-lg transition-transform hover:-translate-y-0.5 text-center text-sm'>Android</a>}
                                {item.linkMac && <a href={item.linkMac} target='_blank' rel='noopener noreferrer' className='bg-[#ffb300] hover:bg-yellow-500 text-black font-bold px-4 py-2.5 rounded-lg transition-transform hover:-translate-y-0.5 text-center text-sm'>Mac</a>}
                                {item.linkWindows && <a href={item.linkWindows} target='_blank' rel='noopener noreferrer' className='bg-[#ffb300] hover:bg-yellow-500 text-black font-bold px-4 py-2.5 rounded-lg transition-transform hover:-translate-y-0.5 text-center text-sm'>Windows</a>}
                            </div>
                        </div>

                        <div className='bg-[#09090b] border border-[#23283a] p-5 rounded-xl shadow-sm space-y-3'>
                            <div>
                                <h2 className='text-lg font-bold text-white flex items-center gap-2'>📖 Tutoriales de ¿Como...</h2>
                                <p className='text-xs text-gray-400 mt-0.5 font-medium'>Nota: Usa el Tuto que va a acorde a tu caso.</p>
                            </div>
                            <div className='flex flex-col sm:flex-row flex-wrap gap-3'>
                                <a href="https://youtube.com/shorts/8cuXJNnW2pE?feature=share" target='_blank' rel='noopener noreferrer' className='bg-[#23283a] hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-center text-sm'>¿Emularlo en JoiPlay?</a>
                            </div>
                        </div>

                        <div className='bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/30 p-5 rounded-xl shadow-sm space-y-3'>
                            <div>
                                <h2 className='text-lg font-bold text-amber-500 flex items-center gap-2'>⭐ Descarga directa</h2>
                                <p className='text-sm text-gray-400 mt-1 leading-relaxed'>
                                    Si te gusta el contenido, en Patreon te ofrezco links sin acortadores.
                                </p>
                            </div>
                            <div className='flex flex-row flex-wrap gap-3'>
                                <a href="https://www.patreon.com/ELTioEgoz" target='_blank' rel='noopener noreferrer' className='bg-[#ffb300] text-black font-black px-5 py-2.5 rounded-lg transition-transform hover:scale-105 text-center text-sm'>🚀 Descarga directa</a>
                            </div>
                        </div>
                    </div>

                    {/* 5. FOOTER DE LA TARJETA */}
                    <div className='flex flex-row justify-between items-center pt-4 border-t border-[#23283a] text-xs text-gray-400 font-medium'>
                        <LikeButton gameId={item.id} initialLikes={item.likes || 0} />
                        <span>📅 Publicado: {item.createdAt}</span> {/* La fecha ya viene curada del Dashboard */}
                    </div>

                </div>
            </div>
        </div>
    );
}