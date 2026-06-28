import React from "react";

interface NavbarProps {
    onNavigate: (view: 'dashboard' | 'emuladores' | 'redes' | 'herramientas') => void;
}

const navLinks = [
    { label: 'Inicio', href: '/', external: false },
    { label: 'Telegram', href: 'https://t.me/+2372MYlLqx84ODYx', external: true },
    { label: 'Emuladores', href: '/emulator', external: false },
    { label: 'Tik Tok', href: 'https://www.tiktok.com/@mrerjuegos?is_from_webapp=1&sender_device=pc', external: true },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCkMe6g5tAfFRuEzYCNLW51w', external: true },
    { label: 'Patreon', href: 'https://www.patreon.com/ELTioEgoz', external: true },
];

export default function Navbar({ onNavigate }: NavbarProps) {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#181c24] border-b border-[#23283a] shadow-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            
            {/* Logo y Título - AÑADIMOS EL onClick AQUÍ */}
            <div 
                onClick={() => onNavigate('dashboard')} 
                className="flex items-center gap-3 cursor-pointer group"
            >
                <div className="w-10 h-10 bg-[#ffb300] rounded-full flex items-center justify-center text-black font-black text-xl group-hover:scale-105 transition-transform">
                    TE
                </div>
                <span className="text-xl font-bold tracking-wide group-hover:text-[#ffb300] transition-colors">
                    El Tío Egoz PC
                </span>
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
                <button onClick={() => onNavigate('emuladores')} className="hover:text-[#ffb300]">Emuladores</button>
            </nav>
        </header>
    );
}