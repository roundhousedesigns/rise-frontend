import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import { render } from '@server/entry-server.js';

// Define public routes that should be server-rendered
const publicRoutes = [
	'/help',
	'/partners',
	'/login',
	'/register',
	'/lost-password',
	'/reset-password',
];

function isPublicRoute(pathname) {
	return publicRoutes.some((route) => pathname.startsWith(route));
}

async function getIndexTemplate() {
	const response = await getAssetFromKV({
		request: new Request('index.html'),
	});
	return await response.text();
}

addEventListener('fetch', (event) => {
	event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
	const url = new URL(event.request.url);

	// Handle static assets
	try {
		const response = await getAssetFromKV(event);
		if (response.status < 400) {
			const filename = url.pathname.split('/').pop();
			const contentType = response.headers.get('content-type');

			// Add cache control for assets
			if (filename && !filename.includes('.html')) {
				response.headers.set('Cache-Control', 'public, max-age=31536000'); // 1 year
			}
			return response;
		}
	} catch (e) {
		// Not a static asset, continue to SSR
	}

	// SSR for public routes
	if (isPublicRoute(url.pathname)) {
		try {
			const template = await getIndexTemplate();
			const appHtml = await render(url.pathname);
			const html = template.replace('<!--ssr-outlet-->', appHtml);

			return new Response(html, {
				headers: {
					'content-type': 'text/html;charset=UTF-8',
					// Add cache control for SSR pages
					'Cache-Control': 'public, max-age=600', // 10 minutes
				},
			});
		} catch (error) {
			// If SSR fails, fallback to client-side rendering
			console.error('SSR Error:', error);
		}
	}

	// Fallback to client-side rendering
	return await getAssetFromKV(event, {
		mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/index.html`, req),
	});
}
