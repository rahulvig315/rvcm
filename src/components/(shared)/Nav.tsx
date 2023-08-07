import React from 'react'
import { SignOut } from './Buttons'
import Logo from './Logo'

function Nav() {
    return (
        <nav className='flex sticky justify-between  bg-[#222]/80 backdrop-blur-lg rounded-r-md col-span-1 shadow-[#232] shadow-2xl'>
            <Logo size={100} logoClasses='p-0' wrapperClasses='flex items-center font-thin gap-3 bg-[#000] pr-4 rounded-r-md' />
            <SignOut />
        </nav>
    )
}

export default Nav