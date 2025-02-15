import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	build: {
		minify: false,
		sourcemap: true,
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
			},
		},
		chunkSizeWarningLimit: 1400,
	},
	ssr: {
		target: 'webworker',
		noExternal: [
			'@apollo/client',
			'@chakra-ui/react',
			'@chakra-ui/system',
			'@chakra-ui/theme-tools',
			'@chakra-ui/hooks',
			'@chakra-ui/styled-system',
			'@emotion/react',
			'@emotion/styled',
			'@emotion/cache',
			'@emotion/server',
			'@emotion/is-prop-valid',
			'@emotion/utils',
			'framer-motion',
			'react-google-recaptcha-v3'
		],
		external: [
			'react',
			'react-dom',
			'react-router-dom'
		]
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
			{
				find: '@server',
				replacement: fileURLToPath(new URL('./dist/server', import.meta.url)),
			},
		],
	},
});
