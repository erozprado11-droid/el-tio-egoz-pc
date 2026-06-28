import React, { useState } from 'react';
// Ajusta la ruta de importación según dónde pusiste sampleTags
import { sampleTags } from '../components/types/tags'; 

// Las mismas opciones que tenías en la web
const orderOptions = [
    { label: 'Más recientes', value: 'newest' },
    { label: 'Más antiguos', value: 'oldest' },
];
const platformsList = ['Windows', 'Android', 'Mac']; // Agregué Mac por si acaso

export interface Filters {
    order: string;
    tags: string[];
    platforms: string[];
}

interface SidebarProps {
    onFilterChange: (filters: Filters) => void;
}

export default function SidebarFilters({ onFilterChange }: SidebarProps) {
    // 1. ESTADOS LOCALES (Sin depender de la URL)
    const [showFilters, setShowFilters] = useState(false); // Para móviles
    const [order, setOrder] = useState('newest');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // 2. MANEJADORES DE CAMBIOS
    // Cada vez que cambiamos algo, actualizamos el estado local y enviamos la nueva copia al Dashboard
    const handleOrderChange = (newOrder: string) => {
        setOrder(newOrder);
        onFilterChange({ order: newOrder, tags: selectedTags, platforms: selectedPlatforms });
    };

    const handlePlatformToggle = (platform: string) => {
        const newPlatforms = selectedPlatforms.includes(platform)
            ? selectedPlatforms.filter((p) => p !== platform)
            : [...selectedPlatforms, platform];
        
        setSelectedPlatforms(newPlatforms);
        onFilterChange({ order, tags: selectedTags, platforms: newPlatforms });
    };

    const handleTagToggle = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];
            
        setSelectedTags(newTags);
        onFilterChange({ order, tags: newTags, platforms: selectedPlatforms });
    };

    const handleReset = () => {
        setOrder('newest');
        setSelectedPlatforms([]);
        setSelectedTags([]);
        onFilterChange({ order: 'newest', tags: [], platforms: [] });
    };

    // Validamos si hay filtros activos para mostrar el botón de Limpiar
    const hasActiveFilters = order !== 'newest' || selectedPlatforms.length > 0 || selectedTags.length > 0;

    return (
        <>
            {/* BOTÓN MÓVIL */}
            <div className="block lg:hidden w-full mb-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-[#181c24] text-[#ffb300] font-semibold px-4 py-3 rounded-lg shadow transition hover:bg-[#23283a] w-full border border-[#23283a]"
                >
                    {showFilters ? 'Ocultar menú de filtros' : 'Mostrar menú de filtros'}
                </button>
            </div>

            {/* SIDEBAR VERTICAL */}
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:flex flex-col w-full lg:w-72 shrink-0 bg-[#181c24] rounded-xl p-5 border border-[#23283a] h-fit max-h-[85vh] sticky top-24`}>
                
                {/* CABECERA Y RESET */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#23283a]">
                    <h2 className="text-lg font-black text-[#ffb300] flex items-center gap-2">
                        <span>⚙️</span> Filtros
                    </h2>
                    {hasActiveFilters && (
                        <button 
                            onClick={handleReset}
                            className="text-xs text-red-400 font-bold hover:text-red-300 bg-red-500/10 px-2 py-1 rounded transition-colors border border-red-500/20"
                        >
                            Limpiar todo
                        </button>
                    )}
                </div>

                <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 flex-1">
                    
                    {/* SECCIÓN: ORDEN */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Orden de subida</h3>
                        <div className="flex flex-col gap-2">
                            {orderOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleOrderChange(opt.value)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                                        order === opt.value
                                            ? 'bg-[#ffb300] text-black shadow-md'
                                            : 'bg-[#09090b] text-gray-400 border border-[#23283a] hover:border-gray-600 hover:text-white'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SECCIÓN: PLATAFORMAS */}
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Plataformas</h3>
                        <div className="flex flex-wrap gap-2">
                            {platformsList.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => handlePlatformToggle(p)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                        selectedPlatforms.includes(p)
                                            ? 'border-[#ffb300] text-[#ffb300] bg-[#ffb300]/10'
                                            : 'border-[#23283a] bg-[#09090b] text-gray-500 hover:border-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SECCIÓN: TAGS */}
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Etiquetas</h3>
                            <span className="text-[10px] text-gray-500 bg-[#09090b] px-2 py-0.5 rounded-full border border-[#23283a]">
                                {selectedTags.length} activas
                            </span>
                        </div>
                        
                        {/* Contenedor con scroll propio para los tags */}
                        <div className="flex flex-wrap gap-1.5 max-h-[250px] overflow-y-auto pr-1">
                            {sampleTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagToggle(tag)}
                                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                                        selectedTags.includes(tag)
                                            ? 'bg-[#ffb300] text-black font-bold'
                                            : 'bg-[#23283a] text-gray-400 hover:bg-gray-600 hover:text-white'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </aside>
        </>
    );
}