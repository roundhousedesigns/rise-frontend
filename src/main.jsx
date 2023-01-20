import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/400.css';
import theme from './theme/index';

import App from './App';

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const backend = import.meta.env.VITE_BACKEND_URL
	? import.meta.env.VITE_BACKEND_URL
	: '';

/**
 * Apollo client.
 */
const httpLink = createHttpLink({
	uri: backend,
	credentials: 'include',
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<ChakraProvider resetCSS={true} theme={theme}>
					<App />
				</ChakraProvider>
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
