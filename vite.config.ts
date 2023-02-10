import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dependencies } from './package.json';

// import * as path from 'path';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	build: {
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-router-dom', 'react-dom'],
					...renderChunks(dependencies),
				},
			},
		},
	},
	// FIXME VSCode can't follow the alias here for autocomplete, definitions, etc
	// resolve: {
	// 	alias: {
	// 		"@": path.resolve(__dirname, "./src"),
	// 	},
	// },
});

function renderChunks(deps: Record<string, string>) {
	let chunks = {};
	Object.keys(deps).forEach((key) => {
		if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
		chunks[key] = [key];
	});
	return chunks;
}
