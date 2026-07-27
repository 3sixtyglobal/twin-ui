// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import flowbite from "flowbite/plugin";
import flowbiteTypography from "flowbite-typography";

export default {
	content: ["./src/**/*.{js,ts,svelte}", "./.storybook/**/*.html"],
	plugins: [flowbite, flowbiteTypography],
	darkMode: "class",
	theme: {
		extend: {}
	}
};

// Note: this Storybook config intentionally avoids importing ui-tailwind runtime helpers.
// That keeps Tailwind config loading CI-safe during formatting/lint steps before package build
// artifacts exist. For local theme parity testing, prefer building and consuming the package
// outputs rather than wiring ui-tailwind generation directly into this config.
