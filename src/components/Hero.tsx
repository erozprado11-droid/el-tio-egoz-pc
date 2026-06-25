import Image from 'next/image';

export default function Hero() {
	return (
		<section className='relative w-full min-h-[250px] sm:min-h-[300px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-center overflow-hidden'>
			<div className='absolute inset-0 z-0 overflow-hidden'>
				<Image
					src='/images/hero-bg-2.webp'
					alt='Fondo Hero'
					fill
					className='object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-black/75' />
			</div>

			<div className='relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white px-4 sm:px-8'>
				<div className='w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto'>
					<h1 className='text-3xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold mb-4 drop-shadow-lg tracking-tight'>
						¿Has pensado en ser traductor de juegos?
					</h1>
					<p className='text-base sm:text-lg md:text-2xl xl:text-3xl max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto drop-shadow-md'>
						¡Estoy reclurando colegas para subir más contenido!
						<br />
						Si estas interesado te esperamos en telegram.
						<br />
						Y no olvides tener Discord XD
					</p>
				</div>
			</div>
		</section>
	);
}
