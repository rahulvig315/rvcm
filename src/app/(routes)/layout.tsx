import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import { authOptions } from '../api/(auth)/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { SignOut } from '@/components/(shared)/Buttons'
import Logo from '@/components/(shared)/Logo'
import Aside from '@/components/(shared)/Aside'
import Nav from '@/components/(shared)/Nav'

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
    <main>
      <Nav />
      <div>
        <Aside />
        <section>
          {children}
        </section>
      </div>
    </main>
  )
}
