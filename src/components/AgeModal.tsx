import { useEffect, useState } from 'react';

// Declaramos esto para que TypeScript no se queje
declare global {
  interface Window {
    electronAPI: {
      closeApp: () => void;
    };
  }
}

export default function AgeModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // En Electron, podemos usar localStorage igual que en la web
        const isAdult = localStorage.getItem('isAdult');
        if (!isAdult) setOpen(true);
    }, []);

    const handleYes = () => {
        localStorage.setItem('isAdult', 'true');
        setOpen(false);
    };

    const handleNo = () => {
        // Aquí llamamos a la función que cierra la ventana
        if (window.electronAPI) {
            window.electronAPI.closeApp();
        }
    };

    if (!open) return null;

    return (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm'>
            <div className='bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-200 text-center'>
                <h2 className='text-2xl font-bold mb-2'>Advertencia</h2>
                <p className='text-gray-600 mb-6'>
                    Este sitio está dirigido únicamente a mayores de edad. ¿Eres mayor de 18 años?
                </p>
                <div className='flex gap-4 justify-center'>
                    <button
                        onClick={handleYes}
                        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors'
                    >
                        Sí, soy mayor de edad
                    </button>
                    <button
                        onClick={handleNo}
                        className='bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors'
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}