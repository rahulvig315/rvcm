import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import { authOptions } from '../api/(auth)/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import Aside from '@/components/(shared)/Aside'
import Nav from '@/components/(shared)/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RVCM App',
  description: 'Rahul Vig Customer Manager',
}


const layoutClasses = {
  main: 'app-routes-layout',
  content: 'flex',
  section: 'mx-auto my-10 bg-[#111] p-10 rounded-lg shadow-2xl drop-shadow-2xl h-[80vh] overflow-hidden w-[85vw]'
}

export default async function RootLayout({
  children,
  classes = layoutClasses
}: {
  children: React.ReactNode,
  classes: typeof layoutClasses
}) {


  const user = await getServerSession(authOptions);
  if (!user) {
    redirect('/')
  }


  return (
    <main className={classes.main}>
      <Nav />
      <div className={classes.content}>
        <Aside />
        <section className={classes.section}>
          {children}
        </section>
      </div>
    </main>
  )
}
