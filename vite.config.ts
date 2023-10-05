import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// FIXME VSCode can't follow the alias here for autocomplete, definitions, etc
// import * as path from 'path';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	build: {
		rollupOptions: {
			makeAbsoluteExternalsRelative: true,
			preserveEntrySignatures: 'strict',
			output: {
				esModule: true,
				generatedCode: {
					reservedNamesAsProps: false,
				},
				interop: 'compat',
				systemNullSetters: false,
				manualChunks(id) {
					if (id.includes('react-player')) {
						return 'react-player';
					}

					return 'vendor';
				},
			},
		},
		chunkSizeWarningLimit: 1100,
	},
	resolve: {
		alias: [
			{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
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
				find: '@context',
				replacement: fileURLToPath(new URL('./src/context', import.meta.url)),
			},
			{
				find: '@hooks',
				replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)),
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
});
