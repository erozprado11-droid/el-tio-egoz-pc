import React, { useState } from 'react';
import Pie from './components/Footer'; 
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SidebarFilters, { Filters } from './components/SidebarFilters';
import { Dashboard } from './components/Dashboard';
import { GameDetails } from './components/apps/game/GameDetails'; 
import { EmuladoresView } from "./components/apps/emulator/EmuladoresView";
import { Search } from "./components/apps/search/Search"; // Tu nuevo componente
import { Item } from "./components/types/Item";

// Añadimos 'search' al tipo de vistas
type ViewType = 'dashboard' | 'game' | 'emuladores' | 'search';

export function App() {
    const [currentView, setCurrentView] = useState<ViewType>('dashboard');
    const [selectedGame, setSelectedGame] = useState<Item | null>(null);
    const [globalSearchQuery, setGlobalSearchQuery] = useState(''); // Guarda la búsqueda del navbar
    
    const [filters, setFilters] = useState<Filters>({
        order: 'newest',
        tags: [],
        platforms: []
    });

    return (
        <div className="flex flex-col min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden w-full max-w-[100vw]">
            
            {/* NAVBAR CONECTADO AL MOTOR DE BÚSQUEDA */}
            <Navbar 
                currentView={currentView}
                onNavigate={(view) => setCurrentView(view as ViewType)}
                onSearch={(query) => {
                    setGlobalSearchQuery(query);
                    setCurrentView('search'); // Salta a la pestaña de búsqueda avanzada
                }}
            />
            
            {currentView === 'dashboard' && <Hero />}
            
            <div className="flex flex-col w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 gap-6 flex-1">
                
                {currentView === 'dashboard' && (
                    <div className="w-full flex justify-center">
                        <SidebarFilters onFilterChange={setFilters} />
                    </div>
                )}

                <main className="w-full flex-1">
                    {currentView === 'dashboard' && (
                        <Dashboard 
                            onGameClick={(item: Item) => {
                                setSelectedGame(item);
                                setCurrentView('game');
                            }} 
                            filters={filters} 
                        />
                    )}
                    
                    {currentView === 'game' && selectedGame && (
                        <GameDetails 
                            item={selectedGame} 
                            onBack={() => setCurrentView('dashboard')} 
                        />
                    )}

                    {/* VISTA DEL MOTOR DE BÚSQUEDA */}
                    {currentView === 'search' && (
                        <Search
                            initialQuery={globalSearchQuery}
                            onGameClick={(item: Item) => {
                                setSelectedGame(item);
                                setCurrentView('game');
                            }}
                            onReset={() => {
                                setGlobalSearchQuery('');
                                setCurrentView('dashboard');
                            }}
                        />
                    )}
                    
                    {currentView === 'emuladores' && <EmuladoresView />}
                </main>
            </div>

            <Pie />
        </div>
    );
}