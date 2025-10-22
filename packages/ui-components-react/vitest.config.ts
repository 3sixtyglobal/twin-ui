// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./test-setup.ts"],
		env: {
			TZ: "UTC"
		}
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	}
});
