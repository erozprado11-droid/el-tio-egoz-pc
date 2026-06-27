import React from "react" 
export default function Pie(){

return (
    <>
    {/* 5. FOOTER (Pie de página) */}
            <footer className="w-full bg-[#181c24] border-t border-[#23283a] py-8 mt-auto">
                <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-400 text-sm">
                        © 2026 El Tío Egoz. Steam polnito XD.
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="w-8 h-8 bg-[#23283a] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition">YT</a>
                        <a href="#" className="w-8 h-8 bg-[#23283a] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition">X</a>
                        <a href="#" className="w-8 h-8 bg-[#23283a] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition">GH</a>
                    </div>
                </div>
            </footer>
    </>
);
}