'use client';

import { ReactNode, useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as ApolloClientProvider, HttpLink, from } from '@apollo/client';

// Environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/graphql';

// Custom fetch function that supports file uploads
const customFetch = (uri: RequestInfo | URL, options?: RequestInit) => {
	if (options && options.body && options.body instanceof FormData) {
		// If it's a FormData object, it's likely a file upload
		return fetch(uri, options);
	}
	
	// Regular fetch for non-file operations
	return fetch(uri, options);
};

export function ApolloProvider({ children }: { children: ReactNode }) {
	const client = useMemo(() => {
		// Create a standard HTTP link with custom fetch
		const httpLink = new HttpLink({
			uri: BACKEND_URL,
			credentials: 'include',
			fetch: customFetch,
		});

		return new ApolloClient({
			link: from([httpLink]),
			cache: new InMemoryCache(),
			defaultOptions: {
				watchQuery: {
					fetchPolicy: 'cache-and-network',
				},
			},
		});
	}, []);

	return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>;
} 