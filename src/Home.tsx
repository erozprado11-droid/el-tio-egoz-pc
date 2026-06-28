import React, { useState } from 'react';
import Pie from './components/Footer'; 
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SidebarFilters, { Filters } from './components/SidebarFilters';
import { Dashboard } from './components/Dashboard';
import { GameDetails } from './components/apps/game/GameDetails'; 
import { EmuladoresView } from "./components/apps/emulator/EmuladoresView";

// 1. Creamos un tipo estricto con las 3 vistas reales
type ViewType = 'dashboard' | 'game' | 'emuladores';

export function App() {
    const [currentView, setCurrentView] = useState<ViewType>('dashboard');

    // 2. Estado central que une lo que tocas en el Sidebar con lo que renderiza el Dashboard
    const [filters, setFilters] = useState<Filters>({
        order: 'newest',
        tags: [],
        platforms: []
    });

    return (
        <div className="flex flex-col min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden w-full max-w-[100vw]">
            
            {/* Forzamos el tipo 'any' al Navbar por si acaso su prop no está tipada con 'ViewType' */}
            <Navbar onNavigate={(view: any) => setCurrentView(view)} />
            
            <Hero />
            
            <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 gap-6 flex-1">
                
                {/* 3. Le conectamos el 'setFilters' al Sidebar */}
                {currentView === 'dashboard' && (
                    <SidebarFilters onFilterChange={setFilters} />
                )}

                <main className="flex-1">
                    {currentView === 'dashboard' && (
                        <Dashboard 
                            onGameClick={() => setCurrentView('game')} 
                            filters={filters} /* 4. Le inyectamos los filtros al Dashboard */
                        />
                    )}
                    
                    {currentView === 'game' && <GameDetails />}
                    {currentView === 'emuladores' && <EmuladoresView />}
                </main>
            </div>

            <Pie />
        </div>
    );
}