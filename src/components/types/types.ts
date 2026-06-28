export interface Emulador {
    id: string;
    titulo: string;
    concepto: string;
    tutorialLink: string;
    descargaLink: string;
    tienePlugin: boolean;
    pluginTitulo?: string;
    pluginLink?: string;
}