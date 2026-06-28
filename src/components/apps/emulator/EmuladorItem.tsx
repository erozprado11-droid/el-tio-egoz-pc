import React from 'react';
import { Emulador } from '../../types/types'; // Asegúrate de tener esta ruta

export function EmuladorItem({ data }: { data: Emulador }) {
    return (
        <div className="bg-[#181c24] p-6 rounded-xl border border-[#23283a] hover:border-[#ffb300] transition-all">
            <h3 className="text-2xl font-bold text-[#ffb300] mb-2">{data.titulo}</h3>
            <p className="text-gray-400 mb-4">{data.concepto}</p>
            
            <div className="flex flex-wrap gap-3 mb-4">
                <a href={data.tutorialLink} target="_blank" className="bg-[#23283a] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600">Ver Tutorial</a>
                <a href={data.descargaLink} target="_blank" className="bg-[#ffb300] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-500">Descargar</a>
            </div>

            {data.tienePlugin && (
                <div className="bg-[#09090b] p-3 rounded-lg border-l-4 border-[#ffb300]">
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Plugin disponible:</p>
                    <a href={data.pluginLink} className="text-white hover:underline text-sm font-medium">{data.pluginTitulo}</a>
                </div>
            )}
        </div>
    );
}