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

	return (
		<div
			ref={sliderRef}
			className='keen-slider rounded overflow-hidden mb-1 sm:mb-4'
		>
			{images.map((url, idx) => (
				<div
					className='keen-slider__slide'
					key={idx}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
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
