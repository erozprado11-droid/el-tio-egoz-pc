'use client';
import React, { useState, useEffect, useRef } from 'react';
import { sampleTags } from '@/lib/tags'; 
import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
const orderOptions = [
    { label: 'Más nuevos', value: 'newest' },
    { label: 'Más viejos', value: 'oldest' },
];

const platforms = ['Windows', 'Android'];

export interface Filters {
    order: string;
    tags: string[];
    platforms: string[];
}

export default function SidebarFilters({
    onFilterChange,
}: {
    onFilterChange?: (filters: Filters) => void;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    // 1. LEER DE LA URL AL INICIAR
    // Leemos los tags y plataformas que vienen separados por comas (ej: tags=Accion,RPG)
    const [order, setOrder] = useState(searchParams?.get('order') || 'newest');
    const [selectedTags, setSelectedTags] = useState<string[]>(
        searchParams?.get('tags')?.split(',').filter(Boolean) || []
    );
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
        searchParams?.get('platforms')?.split(',').filter(Boolean) || []
    );

    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    // 2. SINCRONIZAR CON EL BOTÓN "ATRÁS"
    useEffect(() => {
        setOrder(searchParams?.get('order') || 'newest');
        setSelectedTags(searchParams?.get('tags')?.split(',').filter(Boolean) || []);
        setSelectedPlatforms(searchParams?.get('platforms')?.split(',').filter(Boolean) || []);
    }, [searchParams]);

    // 3. ACTUALIZAR LA URL CUANDO ALGO CAMBIA
    const triggerChange = (
        newOrder: string = order, 
        newTags: string[] = selectedTags, 
        newPlatforms: string[] = selectedPlatforms
    ) => {
        const params = new URLSearchParams(searchParams?.toString() || "");
        
        // Sincronizamos el orden
        params.set('order', newOrder);

        // Sincronizamos Tags (si no hay, borramos el param)
        if (newTags.length > 0) params.set('tags', newTags.join(','));
        else params.delete('tags');

        // Sincronizamos Plataformas
        if (newPlatforms.length > 0) params.set('platforms', newPlatforms.join(','));
        else params.delete('platforms');

        // IMPORTANTE: Si cambias un filtro, siempre vuelve a la página 1
        params.set('page', '1');

        // Empujamos la nueva URL
        router.push(`?${params.toString()}`, { scroll: false });

        if (onFilterChange) {
            onFilterChange({ order: newOrder, tags: newTags, platforms: newPlatforms });
        }
    };

    const handleOrderChange = (value: string) => {
        setOrder(value);
        triggerChange(value, selectedTags, selectedPlatforms);
    };

    const handlePlatformToggle = (platform: string) => {
        const newPlatforms = selectedPlatforms.includes(platform)
            ? selectedPlatforms.filter((p) => p !== platform)
            : [...selectedPlatforms, platform];
        setSelectedPlatforms(newPlatforms);
        triggerChange(order, selectedTags, newPlatforms);
    };

    const handleTagToggle = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(newTags);
        triggerChange(order, newTags, selectedPlatforms);
    };

    // Cerrar el menú de tags al hacer clic fuera (REVISADO)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Si el click NO ocurrió dentro del contenedor del dropdown, cerramos.
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsTagsOpen(false);
            }
        };

        // Usamos click para mayor compatibilidad
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className='w-full bg-[#181c24] rounded-xl p-3 shadow-xl text-white flex flex-col md:flex-row items-center justify-center gap-4 border border-gray-800/50'>
            {/* SECCIÓN ORDENAR */}
            <div className='flex items-center gap-2'>
                <span className='text-xs font-bold uppercase text-gray-500 ml-2'>Orden:</span>
                <div className='flex bg-[#0f1218] p-1 rounded-lg'>
                    {orderOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleOrderChange(opt.value)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                                order === opt.value 
                                ? 'bg-[#ffb300] text-black shadow-lg shadow-[#ffb300]/20' 
                                : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className='hidden md:block w-px h-8 bg-gray-700/50' />

            {/* SECCIÓN PLATAFORMAS */}
            <div className='flex items-center gap-2'>
                <span className='text-xs font-bold uppercase text-gray-500'>Plataformas:</span>
                <div className='flex gap-2'>
                    {platforms.map((p) => (
                        <button
                            key={p}
                            onClick={() => handlePlatformToggle(p)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium border-2 transition-all duration-200 ${
                                selectedPlatforms.includes(p)
                                ? 'border-[#ffb300] text-[#ffb300] bg-[#ffb300]/10'
                                : 'border-gray-700 text-gray-400 hover:border-gray-600'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className='hidden md:block w-px h-8 bg-gray-700/50' />

            {/* SECCIÓN TAGS (DROPDOWN) */}
            <div className='relative' ref={dropdownRef}>
                <button
                    onClick={() => setIsTagsOpen(!isTagsOpen)}
                    // Cambiamos px-4 py-2 por py-3 en móvil para que sea más fácil de tocar
                    className={`w-full md:w-auto flex items-center justify-between gap-3 px-4 py-3 md:py-2 rounded-lg bg-[#0f1218] border transition-all duration-200 ${
                    selectedTags.length > 0 ? 'border-[#ffb300]/50' : 'border-gray-700'
                    }`}
                >
                    <span className='text-sm font-medium'>
                        🏷️ {selectedTags.length > 0 ? `${selectedTags.length} Seleccionadas` : 'Filtrar por Tags'}
                    </span>
                    <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isTagsOpen ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isTagsOpen && (
                    <div className='absolute left-1/2 -translate-x-1/2 md:left-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-[95vw] md:w-[600px] bg-[#1c212b] border border-gray-700 rounded-xl shadow-2xl z-[60] p-5'>
                        <div className='flex justify-between items-center mb-3 border-b border-gray-700 pb-2'>
                            <span className='text-xs font-bold uppercase text-[#ffb300]'>Etiquetas disponibles</span>
                            {selectedTags.length > 0 && (
                                <button 
                                    onClick={() => { setSelectedTags([]); triggerChange(order, [], selectedPlatforms); }}
                                    className='text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded hover:bg-red-500/30'
                                >
                                    Limpiar
                                </button>
                            )}
                        </div>
                        <div className='flex flex-wrap gap-1.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar'>
                            {sampleTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagToggle(tag)}
                                // Aumentamos el padding (px-3 py-2) y el texto (text-sm) para que sean "tocables" en móvil
                                    className={`px-3 py-2 md:px-2 md:py-1 rounded text-sm md:text-xs transition-colors ${
                                    selectedTags.length > 0 && selectedTags.includes(tag)
                                    ? 'bg-[#ffb300] text-black font-bold'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* SECCIÓN RESET (BOTÓN ROJO) */}
                {searchParams?.toString() !== "" && (
                    <button
                        onClick={() => router.push(window.location.pathname)}
                        className="w-full md:w-auto px-6 py-3 md:py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all active:scale-95 text-center uppercase tracking-widest border border-red-500/50 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                            Limpiar Filtros
                    </button>
                )}
        </div>
    );
}