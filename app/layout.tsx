import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'RISE Theatre Directory',
	description: 'Theatre directory for RISE',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="dark" style={{ colorScheme: 'dark' }}>
			<body className={`${inter.className} chakra-ui-dark`}>
				<Providers>
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
} 