import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// import * as path from 'path';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	// FIXME VSCode can't follow the alias here for autocomplete, definitions, etc
	// resolve: {
	// 	alias: {
	// 		"@": path.resolve(__dirname, "./src"),
	// 	},
	// },
});
