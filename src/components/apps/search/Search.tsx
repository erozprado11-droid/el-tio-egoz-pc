import React, { useState, useEffect, useRef } from 'react';
import { sampleTags } from '../../types/tags';
import { Dashboard } from '../../Dashboard'; // Asegúrate de la ruta correcta
import { Item } from '../../types/Item';

interface SearchProps {
    initialQuery: string;
    onGameClick: (item: Item) => void;
    onReset: () => void;
}

export function Search({ initialQuery, onGameClick, onReset }: SearchProps) {
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(!!initialQuery);
    const [error, setError] = useState<string | null>(null);
    
    const [formState, setFormState] = useState({
        title: initialQuery || '',
        platforms: [] as string[],
        tags: [] as string[],
        order: 'newest'
    });

    // Estado local de filtros (lo que se pasa al Dashboard cuando se hace clic en buscar)
    const [activeFilters, setActiveFilters] = useState(formState);
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Si viene una query del Navbar, lanzamos la búsqueda inmediatamente
    useEffect(() => {
        if (initialQuery) {
            setFormState(prev => ({ ...prev, title: initialQuery }));
            setActiveFilters(prev => ({ ...prev, title: initialQuery }));
            setHasSearched(true);
        }
    }, [initialQuery]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsTagsOpen(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleSearch = () => {
        if (!formState.title.trim() && formState.platforms.length === 0 && formState.tags.length === 0) {
            setError("Oye, debes al menos colocar algo para poder ir a buscarlo...");
            return;
        }
        setError(null);
        setLoading(true);
        setHasSearched(true);
        
        // Pasamos el estado del formulario a los filtros activos
        setActiveFilters(formState);

        setTimeout(() => setLoading(false), 600); // Pequeño delay estético
    };

    const togglePlatform = (p: string) => {
        setFormState(prev => ({
            ...prev,
            platforms: prev.platforms.includes(p) ? prev.platforms.filter(x => x !== p) : [...prev.platforms, p]
        }));
    };

    const toggleTag = (tag: string) => {
        setFormState(prev => ({
            ...prev,
            tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
        }));
    };

    const isFiltered = hasSearched || formState.title !== "";

    return (
        <main className="min-h-screen bg-[#09090b] w-full pt-10 pb-20">
            <div className="max-w-screen-2xl mx-auto px-4">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
                            Motor de <span className="text-purple-500">Búsqueda AVANZADA</span>
                        </h1>
                        <p className="text-[10px] text-gray-500 font-mono tracking-[0.2em]">SISTEMA OPERATIVO : ONLINE</p>
                    </div>

                    {isFiltered && (
                        <button 
                            onClick={() => {
                                setFormState({title: '', platforms: [], tags: [], order: 'newest'});
                                setActiveFilters({title: '', platforms: [], tags: [], order: 'newest'});
                                setHasSearched(false);
                                onReset();
                            }}
                            className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-red-500/50"
                        >
                            🚫 Limpiar Terminal
                        </button>
                    )}
                </div>

                {error && (
                    <div className="mb-6 animate-in fade-in slide-in-from-top-4">
                        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4 flex items-center gap-4">
                            <div className="bg-red-500 p-2 rounded-lg text-white font-bold">!</div>
                            <p className="text-red-400 text-sm font-black uppercase italic">{error}</p>
                        </div>
                    </div>
                )}

                {/* CAJA DE HERRAMIENTAS */}
                <section className="bg-[#181c24] border border-[#23283a] rounded-3xl p-5 md:p-8 mb-12 shadow-2xl relative z-20">
                    <div className="flex flex-col gap-8">
                        {/* ... TODO TU HTML DEL FORMULARIO SE MANTIENE EXACTAMENTE IGUAL ... */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-3">
                                <label className="text-[11px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Identificador del Proyecto</label>
                                <input 
                                    type="text"
                                    placeholder="Nombre del juego..."
                                    className="w-full bg-[#09090b] border border-[#23283a] focus:border-purple-500/50 rounded-2xl px-5 py-4 text-sm text-white outline-none transition-all"
                                    value={formState.title}
                                    onChange={(e) => setFormState(prev => ({...prev, title: e.target.value}))}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Prioridad</label>
                                <select 
                                    className="w-full bg-[#09090b] border border-[#23283a] rounded-2xl px-5 py-4 text-sm text-gray-300 outline-none cursor-pointer"
                                    value={formState.order}
                                    onChange={(e) => setFormState(prev => ({...prev, order: e.target.value}))}
                                >
                                    <option value="newest">Más Recientes</option>
                                    <option value="oldest">Más Antiguos</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-6">
                            <div className="flex-1">
                                <label className="text-[11px] font-black text-gray-400 uppercase ml-1 mb-3 block tracking-widest">Entorno de Ejecución</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Windows', 'Android'].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => togglePlatform(p)}
                                            className={`py-4 md:py-3 rounded-2xl text-xs font-black uppercase border-2 transition-all ${
                                                formState.platforms.includes(p)
                                                ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                                                : 'border-[#23283a] bg-[#09090b] text-gray-500'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 relative" ref={dropdownRef}>
                                <label className="text-[11px] font-black text-gray-400 uppercase ml-1 mb-3 block tracking-widest">
                                    Etiquetas ({formState.tags.length})
                                </label>
                                <button
                                    onClick={() => setIsTagsOpen(!isTagsOpen)}
                                    className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-[#09090b] border border-[#23283a]"
                                >
                                    <span className="text-sm font-bold text-gray-200">
                                        {formState.tags.length > 0 ? `🏷️ ${formState.tags.length} Activas` : 'Desplegar Catálogo'}
                                    </span>
                                </button>

                                {isTagsOpen && (
                                    <div className="absolute left-0 top-full mt-3 w-full md:w-[600px] bg-[#181c24] border border-[#23283a] rounded-3xl shadow-2xl z-[70] p-6">
                                        <div className="flex flex-wrap gap-2 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                                            {sampleTags.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => toggleTag(tag)}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                                                        formState.tags.includes(tag) ? 'bg-purple-600 text-white' : 'bg-[#09090b] text-gray-400 border border-[#23283a]'
                                                    }`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={handleSearch}
                                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-12 py-5 md:py-3.5 rounded-2xl font-black uppercase text-xs active:scale-95 transition-all"
                            >
                                Iniciar Escaneo
                            </button>
                        </div>
                    </div>
                </section>

                {/* RESULTADOS DINÁMICOS */}
                <section className="min-h-[400px]">
                    {!hasSearched ? (
                        <div className="bg-[#181c24] rounded-xl h-[400px] flex flex-col overflow-hidden border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)] relative">
                            <div className="h-48 sm:h-56 bg-purple-500/10 flex items-center justify-center">
                                <span className="text-5xl animate-bounce">📋</span>
                            </div>
                            <div className='p-6 flex flex-col flex-grow justify-center text-center'>
                                <h2 className='text-sm font-black text-purple-400 uppercase tracking-tighter'>Protocolo de Búsqueda</h2>
                                <div className="text-[10px] text-gray-500 mt-3 space-y-2 uppercase leading-relaxed font-mono">
                                    <p>1. Ingresa el nombre del proyecto</p>
                                    <p>2. Selecciona el entorno (Win/And)</p>
                                    <p>3. Filtra por etiquetas específicas</p>
                                    <p>4. Ejecuta el escaneo del sistema</p>
                                </div>
                            </div>
                        </div>
                    ) : loading ? (
                        <div className="bg-[#181c24] rounded-xl h-[400px] flex flex-col items-center justify-center border border-[#23283a] animate-pulse">
                            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-[10px] font-black uppercase text-purple-400 tracking-[0.3em]">Analizando Archivos...</p>
                        </div>
                    ) : (
                        /* AQUÍ RENDERIZAMOS EL DASHBOARD RECICLADO INYECTÁNDOLE LOS FILTROS */
                        <Dashboard 
                            onGameClick={onGameClick}
                            filters={{
                                order: activeFilters.order,
                                tags: activeFilters.tags,
                                platforms: activeFilters.platforms,
                                query: activeFilters.title // Aquí le pasamos la barra de búsqueda al Dashboard
                            }} 
                        />
                    )}
                </section>
            </div>
        </main>
    );
}