import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from '@theme/index';

export async function render(url: string) {
	console.log('🚀 SSR rendering path:', url);

	try {
		const httpLink = createHttpLink({
			uri: import.meta.env.VITE_BACKEND_URL,
			credentials: undefined,
			fetchOptions: {
				headers: {
					'Content-Type': 'application/json',
				},
			},
		});

		console.log('🔗 GraphQL endpoint:', import.meta.env.VITE_BACKEND_URL);

		const client = new ApolloClient({
			ssrMode: true,
			link: httpLink,
			cache: new InMemoryCache(),
			defaultOptions: {
				query: {
					fetchPolicy: 'network-only',
					errorPolicy: 'all',
				},
			},
		});

		const AppTree = (
			<StaticRouter location={url}>
				<ApolloProvider client={client}>
					<ChakraProvider theme={theme}>
						<App />
					</ChakraProvider>
				</ApolloProvider>
			</StaticRouter>
		);

		console.log('🌳 Starting getDataFromTree...');
		try {
			await getDataFromTree(AppTree);
			console.log('✅ getDataFromTree complete');
		} catch (error) {
			console.error('❌ getDataFromTree error:', error);
			throw error;
		}

		const queryData = client.extract();
		console.log('📊 Queries in cache:', Object.keys(queryData).length);

		const html = ReactDOMServer.renderToString(AppTree);

		return { html, initialState: queryData };
	} catch (error) {
		console.error('❌ SSR render failed:', error);
		throw error;
	}
}
