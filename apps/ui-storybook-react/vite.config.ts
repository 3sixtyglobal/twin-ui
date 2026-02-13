// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			// Resolve package from source so Storybook sees changes without rebuilding the package
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
});
