import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

function ImageSlider({ images, height }: { images: string[]; height: string }) {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: 'snap',
        slides: {
            perView: 1,
            spacing: 8,
        },
    });

    // Validación salvavidas por si el juego no tiene imágenes
    if (!images || images.length === 0) {
        return (
            <div className={`w-full ${height} bg-[#09090b] flex items-center justify-center text-gray-500 font-bold rounded overflow-hidden mb-1 sm:mb-4`}>
                Sin imágenes
            </div>
        );
    }

    return (
        <div ref={sliderRef} className='keen-slider rounded overflow-hidden mb-1 sm:mb-4 group cursor-grab active:cursor-grabbing'>
            {images.map((url, idx) => (
                <div className='keen-slider__slide' key={idx}>
                    <img
                        src={url}
                        alt={`Imagen ${idx + 1}`}
                        className={`w-full ${height} object-cover`}
                    />
                </div>
            ))}
        </div>
    );
}

export default ImageSlider;