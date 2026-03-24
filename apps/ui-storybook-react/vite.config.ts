// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const isCi = process.env.CI === "true";

console.log("Vite config - is CI:", isCi);

export default defineConfig(() => ({
	plugins: [react()],
	resolve: isCi
		? undefined
		: {
				alias: {
					// Resolve package from source so Storybook sees changes without rebuilding the package
					// Only in development - production builds should use the published npm package
					"@twin.org/ui-components-react": path.resolve(
						__dirname,
						"../../packages/ui-components-react/src"
					)
				}
			},
	server: {
		watch: {
			usePolling: true
		},
		hmr: {
			overlay: true
		}
	}
}));
