import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";

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

		const alias = {
			// Resolve package from source so Storybook sees package changes without rebuilding
			"@twin.org/ui-components-react": path.resolve(
				__dirname,
				"../../../packages/ui-components-react/src"
			),
			"@twin.org/ui-components-react/icons": path.resolve(
				__dirname,
				"../../../packages/ui-components-react/src/icons"
			)
		};

		return mergeConfig(config, {
			resolve: {
				alias
			}
		});
	}
};
export default config;
