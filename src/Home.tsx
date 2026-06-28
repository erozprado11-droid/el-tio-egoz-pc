import React, { useState } from 'react';
import Pie from './components/Footer'; // Asegúrate que en Footer.tsx exportes 'Pie' como nombre, no como default
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SidebarFilters from './components/SidebarFilters';
import Dashboard from './components/Dashboard';
import { GameDetails } from './components/apps/game/GameDetails'; // Importamos el detalle
import { EmuladoresView } from "./components/apps/emulator/EmuladoresView";

export function App() {
    type View = 'dashboard' | 'game' | 'emuladores' | 'redes' | 'herramientas';
    const [currentView, setCurrentView] = useState<View>('dashboard');

    const navigateToGame = () => setCurrentView('game');
    const navigateToDashboard = () => setCurrentView('dashboard');

    return (
        <div className="flex flex-col min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden w-full max-w-[100vw]">
            
            {/* 1. BARRA SUPERIOR (NAVBAR) - Pasamos la función para que el logo vuelva al inicio */}
            <Navbar onNavigate={setCurrentView} />
            
            {/* 2. HERO (Portada) */}
            <Hero />
            
            {/* 3. CONTENEDOR PRINCIPAL */}
            <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 gap-6 flex-1">
                
                {/* Lógica de navegación: Solo mostramos los filtros si estamos en el Dashboard */}
                {currentView === 'dashboard' && <SidebarFilters />}

                {/* 4. ÁREA DE CONTENIDO DINÁMICO */}
                <main className="flex-1">
                    {currentView === 'dashboard' && <Dashboard onGameClick={() => setCurrentView('game')} />}
                    {currentView === 'game' && <GameDetails />}
                    {currentView === 'emuladores' && <EmuladoresView />}
                </main>
            </div>

            {/* 5. FOOTER */}
            <Pie />
        </div>
    );
}