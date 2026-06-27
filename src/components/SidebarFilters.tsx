import React, { useState } from 'react';

export default function SidebarFilters(){
    const [showFilters, setShowFilters] = useState(false);
    return(
    <>
    <div className="block lg:hidden mt-4 px-4 w-full">
                <button
                    onClick={() => setShowFilters((v) => !v)}
                    className="bg-[#181c24] text-[#ffb300] font-semibold px-4 py-3 rounded-lg shadow transition hover:bg-[#23283a] w-full border border-[#23283a]"
                >
                    {showFilters ? 'Ocultar menú de filtros' : 'Mostrar menú de filtros'}
                </button>
            </div>
            
    <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 shrink-0 bg-[#181c24] rounded-xl p-5 border border-[#23283a] h-fit`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-[#ffb300]">Filtros</h2>
                        <button className="text-xs text-gray-400 hover:text-white underline">Limpiar</button>
                    </div>
                    
                    {/* Placeholder de Tags */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 mb-2">Orden</h3>
                            <div className="h-10 bg-[#09090b] rounded border border-[#23283a] flex items-center px-3 text-gray-500 text-sm">Más recientes</div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 mb-2">Plataformas</h3>
                            <div className="h-20 bg-[#09090b] rounded border border-[#23283a] flex items-center justify-center text-gray-500 text-sm">Lista de plataformas...</div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 mb-2">Tags</h3>
                            <div className="h-32 bg-[#09090b] rounded border border-[#23283a] flex items-center justify-center text-gray-500 text-sm">Lista de tags...</div>
                        </div>
                    </div>
                </aside>
    </>
    );
}