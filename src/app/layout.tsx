import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './providers';
import { NotificationProvider } from '../context/NotificationProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RVCM',
  description: 'Rahul Vig Customer Manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
