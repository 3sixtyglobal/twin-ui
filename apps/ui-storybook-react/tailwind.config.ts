// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import * as flowbite from "flowbite-react/tailwind";

const npmRoot = execSync("npm root").toString().trim().replace(/\\/g, "/");
const require = createRequire(import.meta.url);

function getBuildConfig() {
	const {
		TailwindConfig: TailwindConfigTwinOrg,
		FigmaVariables
	} = require("@twin.org/ui-tailwind");

	const defaultFigmaVariables = FigmaVariables.loadDefaultVariables();
	const collections = ["Twin Brand Color", "Twin Tokens"]
		.map(collection => FigmaVariables.getVariableCollection(defaultFigmaVariables, collection))
		.filter(Boolean);

	return {
		content: [
			"./src/**/*.{js,ts,jsx,tsx}",
			"./.storybook/**/*.html",
			flowbite.content({ base: npmRoot.replace("node_modules", "") }),
			TailwindConfigTwinOrg.buildContentPath(npmRoot, "@twin.org/ui-components-react", [
				"html",
				"js",
				"cjs",
				"mjs",
				"ts",
				"jsx",
				"tsx"
			])
		],
		plugins: [flowbite.plugin()],
		darkMode: "class",
		theme: {
			extend: TailwindConfigTwinOrg.generateTheme(collections)
		}
	};
}

export default getBuildConfig();
