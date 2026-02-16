// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
	plugins: [react()],
	resolve:
		mode === "development"
			? {
					alias: {
						// Resolve package from source so Storybook sees changes without rebuilding the package
						// Only in development - production builds should use the published npm package
						"@twin.org/ui-components-react": path.resolve(
							__dirname,
							"../../packages/ui-components-react/src"
						)
					}
				}
			: undefined,
	server: {
		watch: {
			usePolling: true
		},
		hmr: {
			overlay: true
		}
	}
}));
