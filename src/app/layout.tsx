// eslint-disable-next-line import/no-unassigned-import
import './globals.css';

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { Fab } from '@/components/home/Fab';
import { NavBar } from '@/components/NavBar';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Insights Engine',
	description: 'Modern analytics platform for data-driven insights',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='h-full'>
			<head>
				{/* Viewport meta tag for accessibility */}
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes'
				/>
				{/* DNS prefetch for external resources */}
				<link rel='dns-prefetch' href='//fonts.googleapis.com' />
				<link rel='dns-prefetch' href='//fonts.gstatic.com' />
				{/* Content Security Policy */}
				<meta
					httpEquiv='Content-Security-Policy'
					content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; base-uri 'self'; form-action 'self';"
				/>
				{/* Trusted Types for DOM-based XSS protection */}
				<meta httpEquiv='Trusted-Types' content="'none'" />
			</head>
			<body
				className={`${inter.variable} ${jetbrainsMono.variable} h-full overflow-x-hidden antialiased`}
				style={{
					fontFamily:
						'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
				}}
			>
				<div
					id='ie-app-container'
					className='min-h-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'
				>
					<NavBar />
					{children}
					{/* Hide FAB on certain routes via CSS: pages can add body class 'ie-hide-fab' */}
					<div className='[&_.ie-hide-fab_&]:hidden'>
						<Fab />
					</div>
				</div>
			</body>
		</html>
	);
}
