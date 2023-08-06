import React from 'react'

function Aside() {
  return (
    <aside className='w-1/6 bg-[#111] h-full rounded-lg flex flex-col justify-center place-items-center text-left mt-10 '>
        <a href="/dashboard">Dashboard</a>
        <a href="/customers">Customers</a>
        <a href="/analytics" >Analytics</a>
        <a href="/tasks" >Tasks</a>
        <a href="/leads" >Leads</a>
        <a href="/schedule" >Schedule</a>
        <a href="/logs" >Logs</a>
        <a href="/finances" >Finances</a>
        <a href="/chat" >Chat</a>
    </aside>
  )
}

export default Aside