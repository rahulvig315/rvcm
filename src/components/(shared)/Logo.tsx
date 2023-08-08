import Image from 'next/image';

const defaultLogoProps = {
	size: 400,
	alt: 'Rahul Vig Logo',
	src: '/RVLogo.png',
	logoClasses: 'p-5',
	wrapperClasses: 'text-2xl md:text-4xl font-thin text-center',
	subtitle: 'Customer Manager',
};

export type LogoProps = {
	size?: number;
	alt?: string;
	src?: string;
	logoClasses?: string;
	wrapperClasses?: string;
	subtitle?: string;
};

function Logo({
	size = defaultLogoProps.size,
	alt = defaultLogoProps.alt,
	src = defaultLogoProps.src,
	logoClasses = defaultLogoProps.logoClasses,
	wrapperClasses = defaultLogoProps.wrapperClasses,
	subtitle = defaultLogoProps.subtitle,
}: LogoProps) {
	return (
		<div className={wrapperClasses}>
			<Image
				src={src}
				width={size}
				height={size}
				alt={alt}
				className={logoClasses}
				priority
			/>
			<h1>{subtitle}</h1>
		</div>
	);
}

export default Logo;
