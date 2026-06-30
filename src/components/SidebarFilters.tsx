import React, { useState, useEffect, useRef } from 'react';
import { sampleTags } from '../components/types/tags'; // Ajusta la ruta si es necesario

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
    // 1. ESTADOS LOCALES (Reemplazando la lectura de la URL)
    const [order, setOrder] = useState('newest');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 2. FUNCIÓN PARA DISPARAR CAMBIOS AL PADRE (App.tsx)
    const triggerChange = (
        newOrder: string = order, 
        newTags: string[] = selectedTags, 
        newPlatforms: string[] = selectedPlatforms
    ) => {
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

    const handleReset = () => {
        setOrder('newest');
        setSelectedTags([]);
        setSelectedPlatforms([]);
        triggerChange('newest', [], []);
    };

    // 3. CERRAR MENÚ AL HACER CLIC FUERA
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsTagsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Verificamos si hay filtros activos para mostrar el botón de reset
    const hasActiveFilters = order !== 'newest' || selectedTags.length > 0 || selectedPlatforms.length > 0;

    return (
        <div className='w-full bg-[#181c24] rounded-xl p-3 shadow-xl text-white flex flex-col md:flex-row items-center justify-center gap-4 border border-[#23283a]'>
            
            {/* SECCIÓN ORDENAR */}
            <div className='flex items-center gap-2'>
                <span className='text-xs font-bold uppercase text-gray-500 ml-2'>Orden:</span>
                <div className='flex bg-[#09090b] p-1 rounded-lg border border-[#23283a]'>
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

            <div className='hidden md:block w-px h-8 bg-[#23283a]' />

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
                                : 'border-[#23283a] text-gray-400 hover:border-gray-500 hover:bg-[#09090b]'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className='hidden md:block w-px h-8 bg-[#23283a]' />

            {/* SECCIÓN TAGS (DROPDOWN) */}
            <div className='relative' ref={dropdownRef}>
                <button
                    onClick={() => setIsTagsOpen(!isTagsOpen)}
                    className={`w-full md:w-auto flex items-center justify-between gap-3 px-4 py-3 md:py-2 rounded-lg bg-[#09090b] border transition-all duration-200 ${
                    selectedTags.length > 0 ? 'border-[#ffb300]' : 'border-[#23283a]'
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
                    <div className='absolute left-1/2 -translate-x-1/2 md:left-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-[95vw] md:w-[600px] bg-[#181c24] border border-[#23283a] rounded-xl shadow-2xl z-[60] p-5'>
                        <div className='flex justify-between items-center mb-3 border-b border-[#23283a] pb-2'>
                            <span className='text-xs font-bold uppercase text-[#ffb300]'>Etiquetas disponibles</span>
                            {selectedTags.length > 0 && (
                                <button 
                                    onClick={() => { setSelectedTags([]); triggerChange(order, [], selectedPlatforms); }}
                                    className='text-[10px] bg-red-500/10 text-red-400 px-2 py-1 rounded hover:bg-red-500/20 border border-red-500/30 font-bold'
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
                                    className={`px-3 py-2 md:px-2 md:py-1 rounded text-sm md:text-xs transition-colors ${
                                    selectedTags.includes(tag)
                                    ? 'bg-[#ffb300] text-black font-bold'
                                    : 'bg-[#09090b] text-gray-400 hover:bg-[#23283a] border border-[#23283a]'
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
            {hasActiveFilters && (
                <button
                    onClick={handleReset}
                    className="w-full md:w-auto px-6 py-3 md:py-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 text-xs font-black rounded-lg shadow-sm transition-all active:scale-95 text-center uppercase tracking-widest border border-red-500/30 flex items-center justify-center gap-2"
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