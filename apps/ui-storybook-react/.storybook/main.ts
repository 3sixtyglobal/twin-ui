import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isCi = process.env.CI === "true";

console.log("Storybook config - is CI:", isCi);

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-themes"
	],
	framework: {
		name: "@storybook/react-vite",
		options: {}
	},
	async viteFinal(config) {
		const { mergeConfig } = await import("vite");

		if (isCi) {
			// In CI mode use simple configuration without aliases to avoid potential issues with path resolution
			return mergeConfig(config, {
				plugins: [
					tsconfigPaths({
						projects: ["./tsconfig.base.json"]
					})
				]
			});
		}

		return mergeConfig(config, {
			resolve: {
				alias: {
					// Resolve package from source so Storybook sees package changes without rebuilding
					"@twin.org/ui-components-react": path.resolve(
						__dirname,
						"../../../packages/ui-components-react/src"
					),
					"@twin.org/ui-components-react/icons": path.resolve(
						__dirname,
						"../../../packages/ui-components-react/src/icons"
					)
				}
			},
			plugins: [
				tsconfigPaths({
					projects: ["./tsconfig.dev.json"]
				})
			]
		});
	}
};
export default config;
