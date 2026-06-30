import React, { useState, useEffect } from 'react';
// IMPORTAMOS EL LOGO (Ajusta la ruta de los ".." según dónde esté tu Navbar)

const navLinks = [
    { label: 'Inicio', view: 'dashboard', external: false },
    { label: 'Emuladores', view: 'emuladores', external: false },
    { label: 'Telegram', href: 'https://t.me/+2372MYlLqx84ODYx', external: true },
    { label: 'Tik Tok', href: 'https://www.tiktok.com/@mrerjuegos?is_from_webapp=1&sender_device=pc', external: true },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCkMe6g5tAfFRuEzYCNLW51w', external: true },
    { label: 'Patreon', href: 'https://www.patreon.com/ELTioEgoz', external: true },
];

interface NavbarProps {
    currentView: string;
    onNavigate: (view: string) => void;
    onSearch: (query: string) => void;
}

export default function Navbar({ currentView, onNavigate, onSearch }: NavbarProps) {
    const [query, setQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    const isSearchPage = currentView === 'search';

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            closeMenu();
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleNavigation = (view: string) => {
        onNavigate(view);
        closeMenu();
    };

    return (
        <header className={`sticky top-0 z-[100] transition-all duration-500 ${
            scrolled ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-[#23283a] shadow-2xl' : 'bg-[#09090b]'
        }`}>
            <nav className='max-w-[1600px] mx-auto flex flex-row justify-between items-center px-4 sm:px-8 py-3'>
                
                {/* LOGO */}
                <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavigation('dashboard')}>
                    <div className='flex items-center gap-3 group'>
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <img src='src/images/logo.webp' alt='logo' className='w-11 h-11 rounded-full border border-white/10 relative z-10' />
                        </div>
                        <span className='text-xl font-black tracking-tighter uppercase hidden md:block text-white'>
                            El Tío <span className="text-purple-500">Egoz</span>
                        </span>
                    </div>
                </div>

                {/* SEARCH BAR DINÁMICA */}
                <div className="flex-1 flex items-center justify-center gap-2 max-w-xl mx-4 md:mx-10">
                    {!isSearchPage ? (
                        <>
                            <form onSubmit={handleSearchSubmit} className='flex-1 relative group'>
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Búsqueda rápida...'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300'
                                />
                            </form>
                            <button 
                                onClick={() => handleNavigation('search')}
                                className="hidden md:flex items-center gap-2 bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600/20 text-purple-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
                            >
                                🔍 Búsqueda Avanzada
                            </button>
                        </>
                    ) : (
                        <div className="h-9 flex items-center">
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] animate-pulse">
                                Panel de Control Avanzado
                            </span>
                        </div>
                    )}
                </div>

                {/* LINKS DESKTOP */}
                <ul className='hidden lg:flex flex-row gap-1 items-center'>
                    {navLinks.map((link, idx) => (
                        <li key={idx}>
                            {link.external ? (
                                <a href={link.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300">
                                    {link.label}
                                </a>
                            ) : (
                                <button onClick={() => handleNavigation(link.view!)} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 ${currentView === link.view ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                    {link.label}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>

                {/* MENU HAMBURGUESA (MÓVIL) */}
                <button className='lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform' onClick={toggleMenu}>
                    <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
                    <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
                    <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </nav>

            {/* SIDEBAR MÓVIL */}
            {/* ... Aquí mantienes la misma lógica del móvil, cambiando los <Link> por botones que ejecutan handleNavigation(link.view) ... */}
        </header>
    );
}