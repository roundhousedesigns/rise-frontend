import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// FIXME VSCode can't follow the alias here for autocomplete, definitions, etc
// import * as path from 'path';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	// resolve: {
	// 	alias: {
	// 		"@": path.resolve(__dirname, "./src"),
	// 	},
	// },
});
