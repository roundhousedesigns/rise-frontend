import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const isSSR = mode === 'ssr';

	return {
		plugins: [
			react(),
			{
				name: 'asset-loader',
				transform(code, id) {
					if (isSSR && (id.endsWith('.svg') || id.endsWith('.png'))) {
						// For SSR, return the asset's public URL
						const fileName = id.split('/').pop();
						return {
							code: `export default '/assets/${fileName}'`,
							map: null
						};
					}
				}
			}
		],
		server: {
			port: 3000,
		},
		build: {
			ssr: isSSR,
			outDir: isSSR ? 'dist/server' : 'dist/client',
			rollupOptions: {
				input: isSSR ? './src/entry-server.tsx' : './index.html',
				output: {
					format: isSSR ? 'esm' : 'es',
					entryFileNames: isSSR ? 'entry-server.js' : 'assets/[name]-[hash].js',
				},
			},
			manifest: !isSSR,
			assetsDir: 'assets',
			chunkSizeWarningLimit: 1400,
			copyPublicDir: !isSSR,
		},
		resolve: {
			alias: [
				{ find: '@@', replacement: fileURLToPath(new URL('./', import.meta.url)) },
				{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
				{
					find: '@theme',
					replacement: fileURLToPath(new URL('./src/theme', import.meta.url)),
				},
				{
					find: '@dev',
					replacement: fileURLToPath(new URL('./src/dev', import.meta.url)),
				},
				{
					find: '@assets',
					replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
				},
				{
					find: '@components',
					replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
				},
				{
					find: '@common',
					replacement: fileURLToPath(new URL('./src/components/common', import.meta.url)),
				},
				{
					find: '@layout',
					replacement: fileURLToPath(new URL('./src/components/layout', import.meta.url)),
				},
				{
					find: '@context',
					replacement: fileURLToPath(new URL('./src/context', import.meta.url)),
				},
				{
					find: '@hooks',
					replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)),
				},
				{
					find: '@queries',
					replacement: fileURLToPath(new URL('./src/hooks/queries', import.meta.url)),
				},
				{
					find: '@mutations',
					replacement: fileURLToPath(new URL('./src/hooks/mutations', import.meta.url)),
				},
				{
					find: '@lib',
					replacement: fileURLToPath(new URL('./src/lib', import.meta.url)),
				},
				{
					find: '@routes',
					replacement: fileURLToPath(new URL('./src/routes', import.meta.url)),
				},
				{
					find: '@views',
					replacement: fileURLToPath(new URL('./src/views', import.meta.url)),
				},
			],
		},
		ssr: {
			noExternal: ['react-router-dom'],
			external: ['@cloudflare/workers-types'],
		},
		optimizeDeps: {
			include: ['react-router-dom'],
		},
	};
});
