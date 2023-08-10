import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
				manualChunks: (id) => {
					if (id.includes('node_modules'))
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
				},
				esModule: true,
				generatedCode: {
					reservedNamesAsProps: false,
				},
				interop: 'compat',
				systemNullSetters: false,
			},
		},
	},
	// resolve: {
	// 	alias: {
	// 		"@": path.resolve(__dirname, "./src"),
	// 	},
	// },
});
