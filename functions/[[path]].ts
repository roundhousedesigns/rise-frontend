import type { PagesFunction, EventContext } from '@cloudflare/workers-types';
import { render } from '../dist/entry-server';

export const onRequest = (async ({ request }: EventContext<unknown, any, unknown>) => {
	const url = new URL(request.url);
	console.log('📥 Incoming request:', {
		path: url.pathname,
		method: request.method,
	});

	try {
		// Add error boundary around render
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
			`<!DOCTYPE html>
			<html>
				<head>
					<script>window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>
				</head>
				<body>
					<div id="root">${html}</div>
				</body>
			</html>`,
			{
				headers: {
					'content-type': 'text/html;charset=UTF-8',
				},
			}
		) as Response & { webSocket: null };
	} catch (error) {
		console.error('🔥 Server error:', error);
		// Return a more detailed error page
		return new Response(
			`
			<!DOCTYPE html>
			<html>
				<head>
					<title>Server Error</title>
				</head>
				<body>
					<h1>Server Error</h1>
					<pre>${error instanceof Error ? error.message : 'Unknown error'}</pre>
					<pre>${error instanceof Error ? error.stack : ''}</pre>
				</body>
			</html>
		`,
			{
				status: 500,
				headers: {
					'content-type': 'text/html;charset=UTF-8',
				},
			}
		) as Response & { webSocket: null };
	}
}) as unknown as PagesFunction;
