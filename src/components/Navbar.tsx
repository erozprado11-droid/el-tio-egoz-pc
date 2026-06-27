import React from "react";

export default function Navbar(){
    return (
    <>
    {/* 1. BARRA SUPERIOR (NAVBAR) */}
            <header className="sticky top-0 z-50 w-full bg-[#181c24] border-b border-[#23283a] shadow-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                {/* Logo y Título */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ffb300] rounded-full flex items-center justify-center text-black font-black text-xl">
                        TE
                    </div>
                    <span className="text-xl font-bold tracking-wide">El Tío Egoz PC</span>
                </div>

                {/* Barra de Búsqueda */}
                <div className="flex flex-1 max-w-md mx-4">
                    <input 
                        type="text" 
                        placeholder="Buscar en el catálogo local..." 
                        className="w-full bg-[#09090b] text-white border border-[#23283a] rounded-l-lg px-4 py-2 focus:outline-none focus:border-[#ffb300]"
                    />
                    <button className="bg-[#ffb300] text-black px-4 py-2 rounded-r-lg font-bold hover:bg-yellow-500 transition">
                        Buscar
                    </button>
                </div>

                {/* Enlaces de Navegación */}
                <nav className="flex items-center gap-6 text-sm font-medium text-gray-300">
                    <a href="#" className="hover:text-[#ffb300] transition">Emuladores</a>
                    <a href="#" className="hover:text-[#ffb300] transition">Redes</a>
                    <a href="#" className="hover:text-[#ffb300] transition">Herramientas</a>
                </nav>
            </header>
    </>);
}