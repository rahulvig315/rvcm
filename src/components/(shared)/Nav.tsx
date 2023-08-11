'use client';
import {signOut} from 'next-auth/react';
import Logo from './Logo';

const navStyles = {
	classes: {
		nav: 'flex sticky justify-between  bg-[#222]/80 backdrop-blur-lg rounded-r-md col-span-1 shadow-[#232] shadow-2xl z-10',
		logoWrapper: 'flex items-center font-thin gap-3 bg-[#000] pr-4 rounded-r-md',
		logoClass: 'p-0',
	},
	attributes: {
		logoSize: 50,
	},
};

export function SignOut({className = 'bg-[#132] uppercase text-sm font-black rounded-r-md rounded-l-md px-5', size}: Partial<any>) {
	return (
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		<button className={className} onClick={async () => signOut()}>Sign Out</button>
	);
}

function Nav({classes = navStyles.classes, attributes = navStyles.attributes}: {classes?: typeof navStyles['classes']; attributes?: typeof navStyles['attributes']}) {
	return (
		<nav className={classes.nav}>
			<Logo size={attributes.logoSize} logoClasses={classes.logoClass} wrapperClasses={classes.logoWrapper} />
			<SignOut />
		</nav>
	);
}

export default Nav;
