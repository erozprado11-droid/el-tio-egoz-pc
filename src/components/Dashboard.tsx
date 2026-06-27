import React from "react";

export default function Dashboard(){
    return(
    <>
    <main className="flex-1 bg-[#121214] rounded-xl border border-[#23283a] p-6 shadow-inner min-h-[500px]">
        <h2 className="text-2xl font-bold mb-6 border-b border-[#23283a] pb-4">Catálogo Principal</h2>
                    
        {/* Grid de ejemplo para las tarjetas de juegos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="bg-[#181c24] rounded-lg overflow-hidden border border-[#23283a] hover:border-[#ffb300] transition cursor-pointer group">
                        <div className="h-48 bg-[#23283a] w-full group-hover:opacity-80 transition flex items-center justify-center text-gray-600">
                            [Imagen Portada]
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1 truncate">Jueguito H {item}</h3>
                                <p className="text-xs text-gray-400 mb-3">Rol, Aventura, Visual Novel</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold bg-[#23283a] px-2 py-1 rounded text-gray-300">Windows</span>
                                    <button className="text-[#ffb300] text-sm font-bold hover:underline">Ver detalles</button>
                                </div>
                        </div>
                    </div>
                        ))}
            </div>
    </main>
    </>
    );
}