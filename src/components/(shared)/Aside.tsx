'use client';
import '@/styles/aside.css';
import React from 'react';
import {usePathname} from 'next/navigation';
import {Routes} from '@/constants';
import Link from 'next/link';

const checkIfRouteActive = (active: string, route: Routes): string => active === route as string ? 'active' : '';

const asideClasses = 'hidden md:flex flex-col text-xs h-screen justify-center gap-2';

function Aside() {
	const active = usePathname();
	return (
		<aside className={asideClasses}>
			<Link className={checkIfRouteActive(active, Routes.Dashboard)} href={Routes.Dashboard}>Dashboard</Link>
			<Link className={checkIfRouteActive(active, Routes.Customers)} href={Routes.Customers} >Customers</Link>
			<Link className={checkIfRouteActive(active, Routes.Analytics)} href={Routes.Analytics} >Analytics</Link>
			<Link className={checkIfRouteActive(active, Routes.Schedule)} href={Routes.Schedule} >Schedule</Link>
			<Link className={checkIfRouteActive(active, Routes.Finances)} href={Routes.Finances}>Finances</Link>
			<Link className={checkIfRouteActive(active, Routes.Leads)} href={Routes.Leads} >Leads</Link>
			<Link className={checkIfRouteActive(active, Routes.Tasks)} href={Routes.Tasks} >Tasks</Link>
			<Link className={checkIfRouteActive(active, Routes.Logs)} href={Routes.Logs} >Logs</Link>
			<Link className={checkIfRouteActive(active, Routes.Chat)} href={Routes.Chat}>Chat</Link>
		</aside>
	);
}

export default Aside;
