"use client";
import '@/styles/aside.css';
import React from 'react'
import { usePathname } from 'next/navigation';
import { Routes } from '@/constants';
import Link from 'next/link';


function Aside() {
  const active = usePathname();
  return (
    <aside className='w-1/6 bg-[#111] h-full rounded-lg hidden md:flex flex-col justify-center place-items-center text-left mt-10 sticky min-w-fit text-sm'>
        <Link className={`${active === Routes.Dashboard ? "active" : ""}`} href={Routes.Dashboard}>Dashboard</Link>
        <Link className={`${active === Routes.Customers ? "active" : ""}`} href={Routes.Customers} >Customers</Link>
        <Link className={`${active === Routes.Analytics ? "active" : ""}`} href={Routes.Analytics} >Analytics</Link>
        <Link className={`${active === Routes.Schedule ? "active" : ""}`} href={Routes.Schedule} >Schedule</Link>
        <Link className={`${active === Routes.Finances ? "active" : ""}`} href={Routes.Finances}>Finances</Link>
        <Link className={`${active === Routes.Leads ? "active" : ""}`} href={Routes.Leads} >Leads</Link>
        <Link className={`${active === Routes.Tasks ? "active" : ""}`} href={Routes.Tasks} >Tasks</Link>
        <Link className={`${active === Routes.Logs ? "active" : ""}`} href={Routes.Logs} >Logs</Link>
        <Link className={`${active === Routes.Chat ? "active" : ""}`} href={Routes.Chat}>Chat</Link>
    </aside>
  )
}

export default Aside