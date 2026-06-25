import { useEffect, useState, useMemo } from 'react';
import { useSearch } from '@/context/SearchContext';
import { Link, useSearchParams } from 'react-router-dom';
import { Item } from '@/types'; 
import ImageSlider from './UI/ImageSlider';
import StatusBadge from '@/lib/StatusBadge';

const ITEMS_PER_PAGE = 12;

// 1. COMPONENTE DE PLATAFORMAS (CON TODA LA ESENCIA)
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

export default function Dashboard({ filters }: { filters: { order: string, tags: string[], platforms: string[] } }) { 
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Adaptación a React Router
    const [searchParams, setSearchParams] = useSearchParams();
    const { query } = useSearch();

    const currentPage = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        async function fetchItems() {
            try {
                // NOTA: Si este servidor no es local, cambia por la URL real
                const res = await fetch('http://localhost:3000/api/game/get'); 
                const items = await res.json();
                setData(items);
            } catch (err) {
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchItems();
    }, []);

    const filteredGames = useMemo(() => {
        let filtered = data.filter((game) => game.title.toLowerCase().includes(query.toLowerCase()));
        
        const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
        const selectedPlatforms = searchParams.get('platforms')?.split(',').filter(Boolean) || [];
        const order = searchParams.get('order') || 'newest';

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
    }, [data, query, searchParams]);

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    const gamesToShow = filteredGames.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            const params = new URLSearchParams(searchParams);
            params.set('page', page.toString());
            // React Router: actualiza los parámetros en la URL
            setSearchParams(params);
            
            if (window.scrollY > 300) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const getPaginationNumbers = () => {
        const pages: (number | '...')[] = [];
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
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
        <div className='max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-10 py-5 sm:py-10'>
            {/* Grid de Publicaciones */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6'>
                
                {/* 1. SEÑUELO DE CARGA */}
                {loading && (
                    <div className='bg-card rounded-xl h-[400px] flex flex-col items-center justify-center border border-white/5 animate-pulse'>
                        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Invocando contenido...</p>
                    </div>
                )}

                {/* 2. SEÑUELO DE "SIN RESULTADOS" */}
                {!loading && filteredGames.length === 0 && (
                    <div className='bg-card rounded-xl h-[400px] flex flex-col overflow-hidden border border-dashed border-white/10 shadow-2xl relative'>
                        <div className="h-48 sm:h-56 bg-white/5 flex items-center justify-center">
                            <span className="text-5xl opacity-20">📂</span>
                        </div>
                        <div className='p-6 flex flex-col flex-grow justify-center text-center'>
                            <h2 className='text-sm font-black text-gray-400 uppercase tracking-tighter'>
                                No hay archivos en este sector
                            </h2>
                            <p className='text-[10px] text-gray-600 mt-2 uppercase leading-relaxed'>
                                El Tío no encontró juegos con esos filtros. <br/> Intenta resetear la terminal.
                            </p>
                            <button 
                                // CORRECCIÓN: Usar setSearchParams para limpiar la URL de React Router
                                onClick={() => setSearchParams(new URLSearchParams())}
                                className="mt-6 text-[9px] font-black bg-red-600/20 text-red-400 border border-red-500/30 py-2 px-4 rounded-xl hover:bg-red-600/40 transition-all uppercase"
                            >
                                🚫 Limpiar Filtros
                            </button>
                        </div>
                    </div>
                )}

                {/* 3. RENDERIZADO DE JUEGOS REALES */}
                {!loading && gamesToShow.map((item) => {
                    const statusKeywords = ["Finalizado", "Desarrollo", "Abandonado", "Desconocido"];
                    const statusText = statusKeywords.find(keyword => 
                        item.basicInformation?.some(infoLine => infoLine.includes(keyword))
                    );

                    return (
                        <div key={item.id} className='bg-card rounded-xl flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/5'>
                            <ImageSlider images={item.images} height='h-48 sm:h-56' />
                            <Link to={`/game/${item.id}`} className='p-3'>
                                <h2 className='text-sm sm:text-base text-heading font-bold line-clamp-1 mb-1'>{item.title}</h2>
                                
                                <div className="flex flex-wrap items-center gap-1">
                                    <PlatformBadge item={item} />
                                    <StatusBadge status={statusText} />
                                </div>
                                
                                <p className='text-[10px] text-gray-500 mt-3 uppercase tracking-widest'>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* 4. PAGINADOR RESPONSIVO */}
            {totalPages > 1 && (
                <div className='flex justify-center items-center mt-16 mb-10'>
                    <div className='flex items-center gap-1 sm:gap-2 p-1.5 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl'>
                        
                        {/* Anterior */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all ${
                                currentPage === 1 ? 'text-gray-600 opacity-20' : 'text-blue-400 hover:bg-blue-500/10 active:scale-90'
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
                                            ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30 scale-110 z-10'
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
                                currentPage === totalPages ? 'text-gray-600 opacity-20' : 'text-blue-400 hover:bg-blue-500/10 active:scale-90'
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