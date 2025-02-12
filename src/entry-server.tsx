import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from '@theme/index';

export function render(url: string, context: any) {
	const client = new ApolloClient({
		uri: import.meta.env.VITE_BACKEND_URL,
		cache: new InMemoryCache(),
		ssrMode: true,
	});

	const html = ReactDOMServer.renderToString(
		<StaticRouter location={url}>
			<ApolloProvider client={client}>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</ApolloProvider>
		</StaticRouter>
	);

	return { html };
}
