// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { execSync } from "node:child_process";
import { TailwindConfig } from "./src/lib/config/tailwindConfig.js";

const npmRoot = execSync("npm root").toString().trim().replace(/\\/g, "/");
const isCi = process.env.CI === "true";

console.log("SvelteTailwind config - is CI:", isCi);

export default isCi
	? {
			content: ["./src/**/*.{html,js,svelte,ts}"],
			plugins: [],
			darkMode: "class",
			theme: {
				extend: {}
			}
		}
	: {
			content: ["./src/**/*.{html,js,svelte,ts}", ...TailwindConfig.getContentPaths(npmRoot, false)],
			plugins: TailwindConfig.getPlugins(),
			darkMode: "class",
			theme: {
				extend: TailwindConfig.getTheme()
			}
		};
