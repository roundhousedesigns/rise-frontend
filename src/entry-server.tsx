import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { getDataFromTree } from '@apollo/client/react/ssr';

import theme from '@theme/index';
import Fonts from '@theme/Fonts';
import App from '@/App';

// Env vars will be available in the Cloudflare Worker environment
const { VITE_BACKEND_URL, VITE_RECAPTCHA_SITE_KEY } = import.meta.env;

export async function render(url: string): Promise<{ html: string; state: string }> {
	// Create a new Apollo Client instance for each render
	const client = new ApolloClient({
		ssrMode: true,
		link: createUploadLink({
			uri: VITE_BACKEND_URL,
			credentials: 'include',
		}) as any,
		cache: new InMemoryCache(),
	});

	const AppTree = (
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

	console.debug('🎭 Server Render Debug:', {
		url,
		initialState: client.extract()
	});

	// Wait for all queries to resolve
	await getDataFromTree(AppTree);

	const html = ReactDOMServer.renderToString(AppTree);
	const state = JSON.stringify(client.extract());

	console.debug('🎭 After Server Render:', {
		html: html.slice(0, 200) + '...', // First 200 chars
		stateSize: state.length,
		finalState: client.extract()
	});

	return { html, state };
}
