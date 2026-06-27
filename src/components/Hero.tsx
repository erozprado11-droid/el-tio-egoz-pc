import React from "react";

export default function Hero(){
    return(
    <>
    <section className="w-full h-64 bg-gradient-to-r from-[#181c24] to-[#23283a] flex flex-col items-center justify-center text-center px-4 border-b border-[#23283a]">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-wider">
            Bienvenido a tu steam... H 
        </h1>
            <p className="text-gray-400 max-w-2xl">
                Me cansé de los baneos gente...
            </p>
    </section>
    </>
    );
}