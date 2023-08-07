import React from 'react'
import { SignOut } from './Buttons'
import Logo from './Logo'

const navStyles = {
    classes: {
        nav: 'flex sticky justify-between  bg-[#222]/80 backdrop-blur-lg rounded-r-md col-span-1 shadow-[#232] shadow-2xl z-10',
        logoWrapper: 'flex items-center font-thin gap-3 bg-[#000] pr-4 rounded-r-md',
        logoClass: 'p-0',
    },
    attributes: {
        logoSize: 50
    }
}

function Nav({ classes = navStyles['classes'], attributes = navStyles['attributes'] }: { classes?: typeof navStyles['classes'], attributes?: typeof navStyles['attributes'] }) {
    return (
        <nav className={classes.nav}>
            <Logo size={attributes.logoSize} logoClasses={classes.logoClass} wrapperClasses={classes.logoWrapper} />
            <SignOut />
        </nav>
    )
}

export default Nav