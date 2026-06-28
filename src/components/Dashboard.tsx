import React, { useEffect, useState, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Item } from '../components/types/Item'; // Asegúrate de tener la ruta correcta

const ITEMS_PER_PAGE = 24;

// --- 1. COMPONENTES DE BADGES (Integrados aquí para mayor facilidad) ---

function PlatformBadge({ item }: { item: Item }) {
    const PLATFORMS_CONFIG = {
        Windows: {
            exists: item.linkWindows && item.linkWindows.trim() !== '',
            styles: "from-blue-600/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]",
        },
        Android: {
            exists: item.linkAndroid && item.linkAndroid.trim() !== '',
            styles: "from-green-600/20 to-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
        },
    };

    const activePlatforms = Object.entries(PLATFORMS_CONFIG).filter(([_, conf]) => conf.exists);
    if (activePlatforms.length === 0) return null;

    return (
        <>
            {activePlatforms.map(([name, config]) => (
                <span 
                    key={name}
                    className={`inline-flex items-center px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter rounded border bg-gradient-to-br backdrop-blur-sm transition-all duration-300 hover:scale-105 ${config.styles}`}
                >
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse mr-1" />
                    {name}
                </span>
            ))}
        </>
    );
}

function StatusBadge({ status }: { status: string | undefined }) {
    if (!status) return null;
    const STATUS_CONFIG: Record<string, string> = {
        "Finalizado": "from-purple-600/20 to-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30 shadow-[0_0_10px_rgba(217,70,239,0.15)]",
        "Desarrollo": "from-yellow-600/20 to-orange-500/20 text-yellow-400 border-yellow-500/30",
        "Abandonado": "from-red-600/20 to-rose-500/20 text-rose-400 border-rose-500/30",
        "Desconocido": "from-slate-600/20 to-gray-500/20 text-gray-400 border-gray-500/30",
    };
    const styles = STATUS_CONFIG[status] || "from-slate-600/20 to-slate-500/20 text-slate-400 border-slate-500/30";

    return (
        <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter rounded border bg-gradient-to-br backdrop-blur-sm transition-all duration-300 hover:scale-105 ${styles}`}>
            <span className="w-1 h-1 rounded-full bg-current animate-pulse mr-1" />
            {status}
        </span>
    );
}


// --- 2. COMPONENTE PRINCIPAL: DASHBOARD ---

// Actualizamos la interfaz para recibir los filtros (¡Preparando el terreno para el Sidebar!)
interface DashboardProps {
    onGameClick: () => void; // Más adelante le pasaremos el ID: (id: string) => void
    filters?: { order: string; tags: string[]; platforms: string[]; query?: string };
}

export function Dashboard({ onGameClick, filters }: DashboardProps) {
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    
    // El estado de la página ahora vive aquí, ya no en la URL
    const [currentPage, setCurrentPage] = useState(1);

    // Si los filtros cambian, regresamos a la página 1 automáticamente
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // 1. CARGAR DATOS DE FIREBASE
    useEffect(() => {
        async function fetchItems() {
            try {
                const querySnapshot = await getDocs(collection(db, 'games'));
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Item[];
                setData(items);
            } catch (err) {
                console.error('Error cargando la base de datos:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchItems();
    }, []);

    // 2. LÓGICA DE FILTRADO Y ORDEN (Mantenida intacta, pero adaptada a los props)
    const filteredGames = useMemo(() => {
        let filtered = data;

        // Búsqueda por texto (si la implementamos luego en el navbar)
        if (filters?.query) {
            filtered = filtered.filter(game => game.title.toLowerCase().includes(filters.query!.toLowerCase()));
        }

        const selectedTags = filters?.tags || [];
        const selectedPlatforms = filters?.platforms || [];
        const order = filters?.order || 'newest';

        if (selectedPlatforms.length > 0) {
            filtered = filtered.filter((game) => {
                return selectedPlatforms.some((p) => {
                    const linkKey = p === 'Windows' ? 'linkWindows' : 'linkAndroid';
                    const link = game[linkKey as keyof Item];
                    return typeof link === 'string' && link.trim() !== '';
                });
            });
        }

        if (selectedTags.length > 0) {
            filtered = filtered.filter((game) => {
                const gameDetails = String(game.details || "").toLowerCase();
                return selectedTags.every((tag) => gameDetails.includes(tag.toLowerCase()));
            });
        }

        return [...filtered].sort((a, b) => {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return order === 'newest' ? timeB - timeA : timeA - timeB;
        });
    }, [data, filters]);

    // 3. PAGINACIÓN
    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    const gamesToShow = filteredGames.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll suave nativo para la ventana de Electron
            if (window.scrollY > 300) {
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
            }
        }
    };

    const getPaginationNumbers = () => {
        const pages: (number | '...')[] = [];
        const isMobile = window.innerWidth < 640;
        const maxPagesToShow = isMobile ? 3 : 5; 

        if (totalPages <= maxPagesToShow + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return [...new Set(pages)];
    };

    return (
        <div className='w-full min-h-screen contain-paint flex flex-col'>
            <div className='w-full'>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6'>
                    
                    {/* SEÑUELO DE CARGA */}
                    {loading && (
                        <div className='col-span-full bg-[#181c24] rounded-xl h-[400px] flex flex-col items-center justify-center border border-[#23283a] animate-pulse'>
                            <div className="w-12 h-12 border-4 border-[#ffb300]/20 border-t-[#ffb300] rounded-full animate-spin mb-4"></div>
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Invocando contenido...</p>
                        </div>
                    )}

                    {/* SEÑUELO SIN RESULTADOS */}
                    {!loading && filteredGames.length === 0 && (
                        <div className='col-span-full bg-[#181c24] rounded-xl h-[400px] flex flex-col overflow-hidden border border-dashed border-[#23283a] shadow-2xl relative'>
                            <div className="h-48 sm:h-56 bg-[#09090b] flex items-center justify-center">
                                <span className="text-5xl opacity-20">📂</span>
                            </div>
                            <div className='p-6 flex flex-col flex-grow justify-center text-center'>
                                <h2 className='text-sm font-black text-gray-400 uppercase tracking-tighter'>
                                    No hay archivos en este sector
                                </h2>
                                <p className='text-[10px] text-gray-600 mt-2 uppercase leading-relaxed'>
                                    El Tío no encontró juegos con esos filtros. <br/> Intenta resetear la terminal.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* RENDERIZADO DE JUEGOS REALES */}
                    {!loading && gamesToShow.map((item) => {
                        const statusKeywords = ["Finalizado", "Desarrollo", "Abandonado", "Desconocido"];
                        const statusText = statusKeywords.find(keyword => 
                            item.basicInformation?.some(infoLine => infoLine.includes(keyword))
                        );

                        return (
                            <div 
                                key={item.id} 
                                onClick={onGameClick} 
                                className='bg-[#181c24] cursor-pointer rounded-xl flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[#23283a] group'
                            >
                                {/* Contenedor de Imagen (Reemplaza ImageSlider por ahora) */}
                                <div className='h-48 sm:h-56 w-full bg-[#09090b] relative overflow-hidden'>
                                    {item.images && item.images.length > 0 ? (
                                        <img 
                                            src={item.images[0]} 
                                            alt={item.title} 
                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">Sin Portada</div>
                                    )}
                                </div>
                                
                                <div className='p-3'>
                                    <h2 className='text-sm sm:text-base text-white font-bold line-clamp-1 mb-1'>{item.title}</h2>
                                    
                                    <div className="flex flex-wrap items-center gap-1">
                                        <PlatformBadge item={item} />
                                        <StatusBadge status={statusText} />
                                    </div>
                                    
                                    <p className='text-[10px] text-gray-500 mt-3 uppercase tracking-widest'>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* PAGINADOR RESPONSIVO */}
                {totalPages > 1 && (
                    <div className='flex justify-center items-center mt-16 mb-10'>
                        <div className='flex items-center gap-1 sm:gap-2 p-1.5 bg-[#09090b]/60 backdrop-blur-xl border border-[#23283a] rounded-2xl shadow-2xl'>
                            
                            {/* Anterior */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all ${
                                    currentPage === 1 ? 'text-gray-600 opacity-20' : 'text-[#ffb300] hover:bg-[#ffb300]/10 active:scale-90'
                                }`}
                            >
                                ← <span className='hidden sm:inline ml-1'>Anterior</span>
                            </button>

                            {/* Números */}
                            <div className="flex items-center">
                                {getPaginationNumbers().map((page, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                                        disabled={page === '...'}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                                            page === currentPage
                                                ? 'bg-[#ffb300] text-black shadow-lg shadow-[#ffb300]/30 scale-110 z-10'
                                                : page === '...' ? 'text-gray-600 cursor-default' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            {/* Siguiente */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all ${
                                    currentPage === totalPages ? 'text-gray-600 opacity-20' : 'text-[#ffb300] hover:bg-[#ffb300]/10 active:scale-90'
                                }`}
                            >
                                <span className='hidden sm:inline mr-1'>Siguiente</span> →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}