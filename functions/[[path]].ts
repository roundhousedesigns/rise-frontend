import { ExecutionContext } from '@cloudflare/workers-types';
import { render } from '../src/entry-server';
import { isPublicRoute } from '../src/lib/routeUtils';

// Base HTML template with proper asset references
const getBaseHtml = (content: string = '', initialState: string = '') => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" type="image/svg+xml" href="/assets/images/rise-favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="description" content="RISE Theatre Directory" />
		<title>RISE Theatre Directory</title>
		<link rel="stylesheet" href="/assets/index.css" />
		${initialState ? `<script>window.__APOLLO_STATE__=${initialState}</script>` : ''}
	</head>
	<body>
		<div id="root">${content}</div>
		<script type="module" src="/assets/index.js"></script>
	</body>
</html>
`;

export interface Env {
	// Add your environment variables here
}

export const onRequest = async (
	_context: ExecutionContext,
	request: Request,
	_env: Env
): Promise<Response> => {
	try {
		const url = new URL(request.url);
		console.log('📥 Incoming request:', {
			path: url.pathname,
			method: request.method,
		});

		// Handle static assets
		if (url.pathname.startsWith('/assets/')) {
			// Let Cloudflare Pages handle static assets
			return fetch(request);
		}

		// Only use SSR for public routes
		if (!isPublicRoute(url.pathname)) {
			// Return the client-side app shell for non-public routes
			return new Response(
				getBaseHtml(),
				{
					headers: {
						'content-type': 'text/html;charset=UTF-8',
					},
				}
			) as Response & { webSocket: null };
		}

		// SSR for public routes
		if (!render) {
			console.error('❌ Render function not found');
			throw new Error('Render function not found');
		}

		const { html, initialState } = await render(url.pathname);

		if (!html) {
			console.error('❌ No HTML returned from render');
			throw new Error('No HTML returned from render');
		}

		return new Response(
			getBaseHtml(html, JSON.stringify(initialState).replace(/</g, '\\u003c')),
			{
				headers: {
					'content-type': 'text/html;charset=UTF-8',
				},
			}
		) as Response & { webSocket: null };
	} catch (error) {
		console.error('🔥 Server error:', error);
		return new Response(
			getBaseHtml(`
				<h1>Server Error</h1>
				<pre>${error instanceof Error ? error.message : 'Unknown error'}</pre>
				<pre>${error instanceof Error ? error.stack : ''}</pre>
			`),
			{
				status: 500,
				headers: {
					'content-type': 'text/html;charset=UTF-8',
				},
			}
		) as Response & { webSocket: null };
	}
};
