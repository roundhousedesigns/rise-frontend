import { render } from './entry-server.js';

// Define public routes that should be server-rendered
const publicRoutes = [
	'/',
	'/help',
	'/partners',
	'/login',
	'/register',
	'/lost-password',
	'/reset-password',
	'/test-2',
];

function isPublicRoute(pathname) {
	return publicRoutes.includes(pathname);
}

export async function onRequest(context) {
	const { request } = context;
	const url = new URL(request.url);
	const pathname = url.pathname;

	// Debug the incoming request
	console.log('🎭 Request:', {
		pathname,
		isPublic: isPublicRoute(pathname)
	});

	// Handle static files
	if (pathname.includes('.')) {
		console.log('🎭 Static file request:', pathname);
		return context.next();
	}

	// SSR for public routes
	if (isPublicRoute(pathname)) {
		try {
			console.log('🎭 SSR for:', pathname);
			
			// Get the index.html content directly from context
			const indexResponse = await context.next();
			const template = await indexResponse.text();
			
			// Render the page
			const { html, state } = await render(pathname);
			
			const fullHtml = template
				.replace('<!--ssr-outlet-->', html)
				.replace('window.__APOLLO_STATE__ = null', `window.__APOLLO_STATE__ = ${state}`);

			return new Response(fullHtml, {
				headers: { 
					'content-type': 'text/html;charset=UTF-8',
					'Cache-Control': 'no-cache'
				},
			});
		} catch (error) {
			console.error('�� SSR Error:', error);
			return context.next();
		}
	}

	// All other routes - pass through
	return context.next();
}
