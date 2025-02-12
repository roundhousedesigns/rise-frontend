import { PagesFunction, Response } from '@cloudflare/workers-types';
import { render } from '../dist/entry-server';

export const onRequest: PagesFunction = async ({ request }): Promise<Response> => {
	try {
		const url = new URL(request.url);
		const { html } = await render(url.pathname, {});

		return new Response(html, {
			headers: {
				'content-type': 'text/html;charset=UTF-8',
			},
		});
	} catch (error) {
		return new Response('Server Error', { status: 500 });
	}
};
