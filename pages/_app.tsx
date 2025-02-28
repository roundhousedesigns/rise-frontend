import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '../app/theme';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // Force dark mode class on body to prevent hydration mismatch
  useEffect(() => {
    document.body.classList.add('chakra-ui-dark');
  }, []);

  return (
    <ChakraProvider theme={theme} colorModeManager={{
      type: 'localStorage',
      get: () => 'dark', // Default to dark mode for consistency
      set: () => {}, // No-op since we're forcing dark mode for now
    }}>
      <ColorModeScript initialColorMode="dark" />
      <Component {...pageProps} />
    </ChakraProvider>
  );
} 