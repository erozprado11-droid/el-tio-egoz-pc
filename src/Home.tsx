import React, { useState } from 'react';
// IMPORTANTE: En Vite, a menos que configures el alias '@', 
// debes usar rutas relativas (ej. '../components/Dashboard')
import Dashboard from '@/components/Dashboard';
import Hero from '@/components/Hero';
import SidebarFilters, { Filters } from '@/components/SidebarFilters';

export default function Home() {
    const [filters, setFilters] = useState<Filters>({
        order: 'newest',
        tags: [],
        platforms: [],
    });
    
    const [showFilters, setShowFilters] = useState(false);

    // 🧹 LIMPIEZA: El useEffect que revisaba '/api/version' fue eliminado.
    // Como ahora es una app de escritorio local, no hay un servidor actualizando 
    // la página por detrás. Cuando actualices tu app, simplemente distribuirás un nuevo .exe.

    return (
        <div className='flex flex-col w-full overflow-x-hidden max-w-[100vw]'>
            <Hero />
            
            <div className='block lg:hidden mb-2 px-2'>
                <button
                    onClick={() => setShowFilters((v) => !v)}
                    className='bg-[#181c24] text-[#ffb300] font-semibold px-4 py-2 rounded-lg shadow transition hover:bg-[#23283a] w-full'
                >
                    {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
                </button>
            </div>

            <div className='w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-5 sm:px-10 mt-6'>
                
                {/* 🧹 LIMPIEZA: Eliminamos el <Suspense>. 
                    React Router DOM (que estamos usando ahora) maneja la URL de forma diferente. 
                    Ya no necesitas engañar al framework para que no explote por leer parámetros estáticos. */}
                
                <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex w-full justify-center`}>
                    <SidebarFilters onFilterChange={setFilters} />
                </div>
                
                <Dashboard filters={filters} />
            </div>
        </div>
    );
}