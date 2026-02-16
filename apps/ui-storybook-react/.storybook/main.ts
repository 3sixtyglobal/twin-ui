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
	async viteFinal(config, { configType }) {
		const { mergeConfig } = await import("vite");

		// Only use source alias in development mode
		// Production builds (CI) should use the published npm package
		const alias =
			configType === "DEVELOPMENT"
				? {
						// Resolve package from source so Storybook sees package changes without rebuilding
						"@twin.org/ui-components-react": path.resolve(
							__dirname,
							"../../../packages/ui-components-react/src"
						)
					}
				: {};

		return mergeConfig(config, {
			resolve: {
				alias
			}
		});
	}
};
export default config;
