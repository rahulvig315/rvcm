import React from 'react';

type HeaderProps = {
	classes?: string;
	title: string;
};

const defaultClass = 'text-center text-lg uppercase tracking-widest font-black bg-[#132] p-4 shadow-2xl drop-shadow-2xl';
const Header: React.FC<HeaderProps> = ({classes = defaultClass, title = ''}: HeaderProps) => (
	<header className={classes}>
		{title}
	</header>
);

export default Header;
