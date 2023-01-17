import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import * as path from "path";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@@": path.resolve(__dirname, "./public")
		},
	},
});
