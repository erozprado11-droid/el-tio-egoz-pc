import React from 'react';
import Pie from "./components/Footer"
import Navbar from './components/Navbar';
import Hero from "./components/Hero";
import SidebarFilters from "./components/SidebarFilters";
import Dashboard from "./components/Dashboard";

export function App() {

    return (
        <div className="flex flex-col min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden w-full max-w-[100vw]">
            
            {/* 1. BARRA SUPERIOR (NAVBAR) */}
            <Navbar/>
            {/* 2. HERO (Portada) */}
            <Hero />
            {/* CONTENEDOR PRINCIPAL (Filtros + Dashboard) */}
            <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 gap-6 flex-1">
                {/* 3. SIDEBAR FILTERS */}
                <SidebarFilters />
                {/* 4. DASHBOARD (Área de juegos/publicaciones) */}
                <Dashboard/>
            </div>
            {/* 5. FOOTER (Pie de página) */}
            <Pie />
        </div>
    );
}