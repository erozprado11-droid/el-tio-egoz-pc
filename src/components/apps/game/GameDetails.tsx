import React from 'react';
import { Item } from '../../types/Item'; 
import LikeButton from './LikeButton';
import ImageSlider from '../../../utils/ImageSlider';
interface GameDetailsProps {
    item: Item;
    onBack: () => void; // Función para regresar al Dashboard
}

export function GameDetails({ item, onBack }: GameDetailsProps) {
    if (!item) return <p className='mx-auto text-center py-10'>Juego no encontrado.</p>;

    return (
        <div className='relative min-h-screen w-full bg-[#09090b]'>
            
            {/* EFECTO AMBIENT - Corregido para cubrir siempre el contenedor */}
            {item.images && item.images.length > 0 && (
                <div className='fixed inset-0 pointer-events-none z-0'>
                    <img 
                        src={item.images[0]} 
                        alt="" 
                        className='w-full h-full object-cover blur-[12px] opacity-20'
                    />
                    {/* Gradiente para que el texto sea legible sobre cualquier imagen */}
                    <div className='absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/40' />
                </div>
            )}

            {/* CONTENIDO PRINCIPAL */}
            <div className='relative z-10 max-w-5xl mx-auto px-4 py-8'>
                
                <button 
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-gray-500 hover:text-[#ffb300] transition-colors font-bold uppercase text-xs tracking-widest"
                >
                    ← Volver al catálogo
                </button>

                {/* Grid principal para pantallas grandes */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Columna Izquierda: Slider y Título */}
                    <div className="lg:col-span-7 space-y-6">
                        <h1 className='text-4xl sm:text-5xl font-black text-white tracking-tight'>
                            {item.title}
                        </h1>
                        
                        <div className='rounded-2xl overflow-hidden border border-[#23283a] shadow-2xl'>
                            <ImageSlider images={item.images} height="h-[300px] sm:h-[400px]" />
                        </div>

                        {/* Sinopsis aquí para que sea prominente */}
                        <div className='bg-[#181c24]/50 border border-[#23283a] p-6 rounded-2xl'>
                            <h2 className='text-xs uppercase font-bold text-[#ffb300] mb-3'>Sinopsis</h2>
                            <p className='text-gray-300 leading-relaxed'>{item.description}</p>
                        </div>
                    </div>

                    {/* Columna Derecha: Detalles, Plataformas y Descarga */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Detalles */}
                        <div className='bg-[#181c24]/50 border border-[#23283a] p-6 rounded-2xl space-y-4'>
                            <h3 className='text-sm font-bold text-white uppercase border-b border-[#23283a] pb-2'>Especificaciones</h3>
                            <div className="flex flex-wrap gap-2">
                                {item.basicInformation?.map((info, i) => (
                                    <span key={i} className='bg-[#09090b] text-gray-400 px-3 py-1 rounded-lg text-xs font-medium border border-[#23283a]'>{info}</span>
                                ))}
                            </div>
                        </div>

                        {/* Plataformas */}
                        <div className='bg-[#181c24]/50 border border-[#23283a] p-6 rounded-2xl space-y-4'>
                            <h3 className='text-sm font-bold text-white uppercase border-b border-[#23283a] pb-2'>Plataformas</h3>
                            <div className='flex gap-3'>
                                {item.linkWindows && <span className='text-[#ffb300] font-bold text-xs'>Windows</span>}
                                {item.linkAndroid && <span className='text-[#ffb300] font-bold text-xs'>Android</span>}
                                {item.linkMac && <span className='text-[#ffb300] font-bold text-xs'>Mac</span>}
                            </div>
                        </div>

                        {/* Características / Tags */}
                        <div className='bg-[#181c24]/50 border border-[#23283a] p-6 rounded-2xl space-y-4'>
                            <h3 className='text-sm font-bold text-white uppercase border-b border-[#23283a] pb-2'>
                                Etiquetas y Estilos
                            </h3>
                            <div className='flex flex-wrap gap-2'>
                                {item.details && item.details.length > 0 ? (
                                    item.details.map((detail, i) => (
                                        <span 
                                            key={i} 
                                            className='bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider'
                                        >
                                            {detail}
                                        </span>
                                    ))
                                ) : (
                                    <span className='text-gray-600 text-xs italic'>Sin etiquetas registradas</span>
                                )}
                            </div>
                        </div>

                        {/* Botón de Descarga Principal */}
                        <div className='bg-gradient-to-r from-purple-900 to-[#181c24] border border-purple-500/30 p-6 rounded-2xl'>
                            <h2 className='text-lg font-black text-white mb-4'>📥 Descarga Directa</h2>
                            <div className='flex flex-col gap-2'>
                                {item.linkWindows && <a href={item.linkWindows} target="_blank" className='bg-[#ffb300] text-black font-black text-center py-3 rounded-xl hover:scale-[1.02] transition-transform'>Windows</a>}
                                {item.linkAndroid && <a href={item.linkAndroid} target="_blank" className='bg-[#ffb300] text-black font-black text-center py-3 rounded-xl hover:scale-[1.02] transition-transform'>Android</a>}
                            </div>
                        </div>

                        {/* Like y Fecha */}
                        <div className='flex justify-between items-center bg-[#09090b] p-4 rounded-xl border border-[#23283a]'>
                            <LikeButton gameId={item.id} initialLikes={item.likes || 0} />
                            <span className='text-[10px] text-gray-500 uppercase'>Publicado: {item.createdAt}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}