import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from './theme/index';
import Fonts from './theme/Fonts';
import App from './App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Env vars
const { VITE_BACKEND_URL, VITE_GA4_ID } = import.meta.env;

// Initialize Google Analytics
if (VITE_GA4_ID) ReactGA.initialize(VITE_GA4_ID);

/**
 * Apollo client.
 */
const httpLink = createUploadLink({
	uri: VITE_BACKEND_URL,
	credentials: 'include',
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

root.render(
	<StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<ChakraProvider resetCSS={true} theme={theme}>
					<Fonts />
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<App />
				</ChakraProvider>
			</ApolloProvider>
		</BrowserRouter>
	</StrictMode>
);

const sendAnalytics = () => {
	ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendAnalytics);
