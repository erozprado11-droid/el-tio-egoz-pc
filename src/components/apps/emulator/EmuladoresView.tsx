import React from 'react';
import { EmuladorItem } from '../emulator/EmuladorItem';
import { Emulador } from '../../types/types';

const EMULADORES_LISTA: Emulador[] = [
    {
        id: '1',
        titulo: 'JoiPlay',
        concepto: 'Sirve para jugar juegos RPG Maker, RenPy, etc.',
        tutorialLink: 'https://youtube.com/...',
        descargaLink: 'https://joiplay.cyou/',
        tienePlugin: true,
        pluginTitulo: 'Plugin de RPG Maker',
        pluginLink: 'https://github.com/...'
    },
    // Puedes agregar más aquí fácilmente

    {
        id: '2',
        titulo: 'JoiPlay',
        concepto: 'Sirve para jugar juegos RPG Maker, RenPy, etc.',
        tutorialLink: 'https://youtube.com/...',
        descargaLink: 'https://joiplay.cyou/',
        tienePlugin: true,
        pluginTitulo: 'Plugin de RPG Maker',
        pluginLink: 'https://github.com/...'
    },
];

export function EmuladoresView() {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-black mb-8">Centro de Emulación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EMULADORES_LISTA.map(emu => (
                    <EmuladorItem key={emu.id} data={emu} />
                ))}
            </div>
        </div>
    );
}