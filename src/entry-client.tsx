import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from '@theme/index';
import Fonts from '@theme/Fonts';
import App from '@/App';
import reportWebVitals from '@/reportWebVitals';

const { VITE_BACKEND_URL, VITE_GA4_ID, VITE_RECAPTCHA_SITE_KEY } = import.meta.env;

// Initialize Google Analytics
if (VITE_GA4_ID) ReactGA.initialize(VITE_GA4_ID);

// Debug: Log render type and state
const isSSR = Boolean(window.__APOLLO_STATE__);
console.debug('🎭 Client Render Debug:', {
	mode: isSSR ? 'SSR + Hydration' : 'CSR',
	apolloState: window.__APOLLO_STATE__,
	rootElement: document.getElementById('root')?.innerHTML
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

/**
 * Apollo client.
 */
const client = new ApolloClient({
	link: createUploadLink({
		uri: VITE_BACKEND_URL,
		credentials: 'include',
	}) as any,
	cache: new InMemoryCache().restore(window.__APOLLO_STATE__ || {}),
});

// Debug: Log the component tree we're hydrating
const AppTree = (
	<StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<GoogleReCaptchaProvider reCaptchaKey={VITE_RECAPTCHA_SITE_KEY}>
			<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
				<ApolloProvider client={client}>
					<ChakraProvider resetCSS={true} theme={theme}>
						<Fonts />
						<App />
					</ChakraProvider>
				</ApolloProvider>
			</BrowserRouter>
		</GoogleReCaptchaProvider>
	</StrictMode>
);

console.debug('🎭 Hydrating with:', {
	tree: AppTree,
	client: client.extract()
});

hydrateRoot(rootElement, AppTree);

const sendAnalytics = () => {
	ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

reportWebVitals(sendAnalytics);
