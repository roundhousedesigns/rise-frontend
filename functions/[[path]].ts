import type { PagesFunction, EventContext } from '@cloudflare/workers-types';
import { render } from '../dist/entry-server';

export const onRequest = (async ({ request }: EventContext<unknown, any, unknown>) => {
	console.log('onRequest', request);
	try {
		const url = new URL(request.url);
		const { html } = await render(url.pathname, {});

		return new Response(html, {
			headers: {
				'content-type': 'text/html;charset=UTF-8',
			},
		}) as Response & { webSocket: null };
	} catch (error) {
		return new Response('Server Error', { status: 500 }) as Response & { webSocket: null };
	}
}) as unknown as PagesFunction;
