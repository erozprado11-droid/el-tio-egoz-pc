'use client'; // Esto es vital para que funcione en el navegador

import { useEffect } from 'react';

export default function SecurityShell() {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Bloquea F12
            if (e.key === 'F12') e.preventDefault();
            // Bloquea Ctrl+Shift+I, J, C y Ctrl+U (ver código)
            if (e.ctrlKey && (e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase()) || e.key.toUpperCase() === 'U')) {
                e.preventDefault();
            }
        };

        const handleContextMenu = (e: MouseEvent) => e.preventDefault();

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return null; // Este componente no renderiza nada visualmente
}