import {appDescription, appName} from '@/constants';
import {NotificationProvider} from '@/providers/NotificationProvider';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {type ReactNode} from 'react';
import {NextAuthProvider} from '../providers/NextAuthProvider';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
	title: appName,
	description: appDescription,
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NextAuthProvider>
					<NotificationProvider>{children}</NotificationProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}
