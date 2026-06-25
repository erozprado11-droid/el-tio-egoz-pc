'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';
import { useRouter, usePathname } from 'next/navigation';
// { label: 'Discord', href: 'https://discord.gg/bUw4FaypG8', external: true },
const navLinks = [
    { label: 'Inicio', href: '/', external: false },
    { label: 'Telegram', href: 'https://t.me/+2372MYlLqx84ODYx', external: true },
    { label: 'Emuladores', href: '/emulator', external: false },
    { label: 'Tik Tok', href: 'https://www.tiktok.com/@mrerjuegos?is_from_webapp=1&sender_device=pc', external: true },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCkMe6g5tAfFRuEzYCNLW51w', external: true },
    { label: 'Patreon', href: 'https://www.patreon.com/ELTioEgoz', external: true },
];

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { query, setQuery } = useSearch();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Detectamos si el usuario ya está en la página de búsqueda
    const isSearchPage = pathname === '/search';

    const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}&page=1`);
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

    return (
        <header className={`sticky top-0 z-[100] transition-all duration-500 ${
            scrolled ? 'bg-[#0f111a]/95 backdrop-blur-md border-b border-white/10 shadow-2xl' : 'bg-[#0f111a]'
        }`}>
            <nav className='max-w-[1600px] mx-auto flex flex-row justify-between items-center px-4 sm:px-8 py-3'>
                
                {/* LOGO */}
                <div className="flex-shrink-0">
                    <Link href='/' className='flex items-center gap-3 group' onClick={closeMenu}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <Image
                                src='/images/logo.webp'
                                alt='logo'
                                width={45}
                                height={45}
                                className='rounded-full border border-white/10 relative z-10'
                            />
                        </div>
                        <span className='text-xl font-black tracking-tighter uppercase hidden md:block text-white'>
                            El Tío <span className="text-purple-500">Egoz</span>
                        </span>
                    </Link>
                </div>
                {/* SEARCH BAR DINÁMICA: Se oculta si ya estás en /search */}
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
                            
                            {/* BOTÓN EXTRA: BÚSQUEDA AVANZADA */}
                            <Link 
                                href="/search"
                                className="hidden md:flex items-center gap-2 bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600/20 text-purple-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
                            >
                                🔍 Búsqueda Avanzada
                            </Link>
                        </>
                    ) : (
                        // Si estamos en la página de búsqueda, mostramos un indicador o dejamos vacío
                        <div className="h-9 flex items-center">
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] animate-pulse">
                                Panel de Control Avanzado
                            </span>
                        </div>
                    )}
                </div>

                {/* LINKS DESKTOP */}
                <ul className='hidden lg:flex flex-row gap-1 items-center'>
                    {navLinks.map((link, idx) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={idx}>
                                <Link
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                                        isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* MENU HAMBURGUESA */}
                <button
                    className='lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform'
                    onClick={toggleMenu}
                >
                    <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
                    <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
                    <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </nav>

            {/* SIDEBAR MOBILE */}
            <div className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
                <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeMenu} />
                <aside className={`absolute right-0 top-0 w-[280px] h-full bg-[#0f111a] border-l border-white/10 p-6 flex flex-col shadow-2xl transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-xs font-black uppercase tracking-widest text-purple-500">Navegación</span>
                        <button onClick={closeMenu} className="text-gray-400 text-2xl">&times;</button>
                    </div>

                    <ul className='space-y-2'>
                        {/* En móvil también agregamos el acceso directo a avanzada */}
                        {!isSearchPage && (
                            <li>
                                <Link
                                    href="/search"
                                    className="flex items-center px-4 py-4 rounded-xl text-sm font-bold bg-purple-600/20 text-purple-400 border border-purple-500/20 mb-4"
                                    onClick={closeMenu}
                                >
                                    🔍 Búsqueda Avanzada
                                </Link>
                            </li>
                        )}
                        {navLinks.map((link, idx) => (
                            <li key={idx}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center px-4 py-4 rounded-xl text-sm font-bold transition-all ${
                                        pathname === link.href ? 'bg-white/10 text-white' : 'text-gray-400'
                                    }`}
                                    onClick={closeMenu}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </header>
    );
}