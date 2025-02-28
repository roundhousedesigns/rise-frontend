'use client';

import { ReactNode, useEffect } from 'react';
import { ChakraProvider as ChakraUIProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '../theme';
import Fonts from '../theme/Fonts';

export function ChakraProvider({ children }: { children: ReactNode }) {
	// Force dark mode class on body to prevent hydration mismatch
	useEffect(() => {
		document.body.classList.add('chakra-ui-dark');
	}, []);

	return (
		<>
			<ColorModeScript initialColorMode="dark" />
			<ChakraUIProvider resetCSS theme={theme} colorModeManager={{
				type: 'localStorage',
				get: () => 'dark', // Default to dark mode for consistency
				set: () => {}, // No-op since we're forcing dark mode for now
			}}>
				<Fonts />
				{children}
			</ChakraUIProvider>
		</>
	);
} 