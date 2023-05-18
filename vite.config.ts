import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// FIXME VSCode can't follow the alias here for autocomplete, definitions, etc
// import * as path from 'path';

// commented out test property for now (3/24)

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
