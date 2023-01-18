import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Grommet } from 'grommet';
import { theme } from './theme';

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
		{/* TODO Grommet: plain --> custom theming */}
		<Grommet theme={theme}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</Grommet>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
