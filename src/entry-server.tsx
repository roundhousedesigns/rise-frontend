import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from '@theme/index';
import Fonts from '@theme/Fonts';
import App from '@/App';

// Env vars will be available in the Cloudflare Worker environment
const { VITE_BACKEND_URL, VITE_RECAPTCHA_SITE_KEY } = import.meta.env;

export function render(url: string): string {
	// Create a new Apollo Client instance for each render
	const httpLink = createUploadLink({
		uri: VITE_BACKEND_URL,
		credentials: 'include',
	});

	const client = new ApolloClient({
		link: httpLink as any,
		cache: new InMemoryCache(),
		ssrMode: true, // Enable SSR mode
	});

	return ReactDOMServer.renderToString(
		<StrictMode>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<GoogleReCaptchaProvider reCaptchaKey={VITE_RECAPTCHA_SITE_KEY}>
				<StaticRouter location={url}>
					<ApolloProvider client={client}>
						<ChakraProvider resetCSS={true} theme={theme}>
							<Fonts />
							<App />
						</ChakraProvider>
					</ApolloProvider>
				</StaticRouter>
			</GoogleReCaptchaProvider>
		</StrictMode>
	);
}
