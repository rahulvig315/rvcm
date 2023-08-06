import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import { authOptions } from '../api/(auth)/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { SignOut } from '@/components/(shared)/Buttons'
import Logo from '@/components/(shared)/Logo'
import Aside from '@/components/(shared)/Aside'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RVCM',
  description: 'Rahul Vig Customer Manager',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
    }) {
    
    
    const user = await getServerSession(authOptions);
    if (!user) {
        redirect('/')
    }
    
    
  return (
    <main className='flex flex-col h-screen overflow-hidden'>
      <nav className='flex sticky justify-between pr-5 bg-[#222]/80 backdrop-blur-lg rounded-r-md col-span-1 shadow-success/40 shadow-2xl'>
        <Logo size={80} logoClasses='p-0' wrapperClasses='flex items-center font-thin gap-3' />
        <SignOut/>
      </nav>
      <div className='flex h-full'>
        <Aside/>
        {children}
      </div>
    </main>
  )
}
