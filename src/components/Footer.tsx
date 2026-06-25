import React from "react";

export default function Footer(){

    return (
        <>
            {/* PIE DE PÁGINA CON BOTONES DE REDES SOCIALES */}
            <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-10">
                <div className="max-w-7xl mx-auto px-5 sm:px-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} El Tio Egoz. Todos los derechos reservados.
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                Únete a nuestras comunidades para más contenido, por favor UwU
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 justify-center">
                            {/*Botón de Telegram*/}
                            <a
                                href="https://t.me/+2372MYlLqx84ODYx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.69 1.03-.58.05-1.02-.38-1.58-.75-.88-.57-1.38-.93-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.07-.06-.17-.04-.24-.02-.1.02-1.79 1.14-5.06 3.34-.48.33-.91.5-1.3.49-.43-.01-1.27-.25-1.89-.45-.76-.25-1.37-.38-1.32-.8.03-.25.4-.5 1.1-.76 4.05-1.64 6.74-2.73 8.05-3.29 3.84-1.67 4.64-1.96 5.16-1.97.11 0 .36.03.52.18.12.12.16.28.18.42.01.1.01.32.01.52z"/>
                                </svg>
                                Únete a Telegram
                            </a>
                            
                            {/*Botón de YouTube*/}
                            <a
                                href="https://www.youtube.com/channel/UCkMe6g5tAfFRuEzYCNLW51w"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                                Suscríbete a YT
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}