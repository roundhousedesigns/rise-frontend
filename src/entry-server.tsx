import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { getDataFromTree } from '@apollo/client/react/ssr';

import theme from '@theme/index';
import Fonts from '@theme/Fonts';
import App from '@/App';

// Env vars will be available in the Cloudflare Worker environment
const { VITE_BACKEND_URL } = import.meta.env;

export async function render(url: string): Promise<{ html: string; state: string }> {
	const client = new ApolloClient({
		ssrMode: true,
		link: createUploadLink({
			uri: VITE_BACKEND_URL,
			credentials: 'include',
			headers: {
				'X-SSR': '1', // Add header to identify SSR requests
			},
		}) as any,
		cache: new InMemoryCache({
			addTypename: true,
		}),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: 'cache-first',
			},
		},
	});

	// Create the app tree with all providers
	const AppTree = (
		<StrictMode>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<StaticRouter location={url}>
				<ApolloProvider client={client}>
					<ChakraProvider resetCSS theme={theme}>
						<Fonts />
						<App />
					</ChakraProvider>
				</ApolloProvider>
			</StaticRouter>
		</StrictMode>
	);

	try {
		// Wait for all queries to resolve
		await getDataFromTree(AppTree);

		// Render to string
		const html = ReactDOMServer.renderToString(AppTree);
		const state = JSON.stringify(client.extract());

		console.debug('🎭 SSR Complete:', {
			url,
			stateSize: state.length,
			queries: client.extract(),
		});

		return {
			html,
			state,
		};
	} catch (error) {
		console.error('🎭 SSR Error:', error);
		// Return empty state on error but still render the tree
		const html = ReactDOMServer.renderToString(AppTree);
		return {
			html,
			state: JSON.stringify({}),
		};
	}
}
