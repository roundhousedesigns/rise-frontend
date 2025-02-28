'use client';

import { ReactNode } from 'react';
import { ChakraProvider } from './ChakraProvider';
import { ApolloProvider } from './ApolloProvider';
import { AuthProvider } from './AuthProvider';
import { SearchProvider } from './SearchProvider';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// Environment variables
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ChakraProvider>
			<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
				<ApolloProvider>
					<AuthProvider>
						<SearchProvider>{children}</SearchProvider>
					</AuthProvider>
				</ApolloProvider>
			</GoogleReCaptchaProvider>
		</ChakraProvider>
	);
} 