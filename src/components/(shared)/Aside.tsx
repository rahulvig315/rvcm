'use client';
import {PageRoutes} from '@/constants';
import '@/styles/aside.css';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const checkIfRouteActive = (active: string, route: PageRoutes): string => active === route as string ? 'active' : '';

const asideClasses = 'hidden md:flex flex-col text-xs h-screen justify-center gap-2';

function Aside() {
	const active = usePathname();
	return (
		<aside className={asideClasses}>
			{Object.entries(PageRoutes).map(([routeName, routeLink]) => <Link className={checkIfRouteActive(active, routeLink)} key={routeName} href={routeLink}>{routeName}</Link>)}
		</aside>
	);
}

export default Aside;
