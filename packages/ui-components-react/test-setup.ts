// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import "@testing-library/jest-dom";
import { expect, vi } from "vitest";
// Individual mocks are now handled by the vitest alias to flowbite-react

// All flowbite-react components are now mocked via vitest alias

// Mock useId to return consistent values for snapshot tests
let idCounter = 0;

vi.mock("react", async importOriginal => {
	const actual = await importOriginal<typeof import("react")>();
	return {
		__esModule: true,
		...actual,
		useId: () => `mocked-id-${++idCounter}`
	};
});

// Mock ResizeObserver for components that use it
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn()
}));

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn()
}));

// Mock window.matchMedia for responsive components
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {}, // deprecated
		removeListener: () => {}, // deprecated
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false
	})
});

// Mock scrollTo for components that use it
Object.defineProperty(window, "scrollTo", {
	writable: true,
	value: () => {}
});

// Custom snapshot serializer to normalize CSS values for cross-platform consistency
// Only match strings containing camelCase "currentColor" (not already-lowercase "currentcolor")
// to avoid infinite recursion when the printer calls the serializer again
expect.addSnapshotSerializer({
	serialize(val, config, indentation, depth, refs, printer) {
		// Normalize currentColor to lowercase for consistent snapshots
		if (typeof val === "string") {
			const normalized = val.replace(/currentColor/g, "currentcolor");
			return printer(normalized, config, indentation, depth, refs);
		}
		return printer(val, config, indentation, depth, refs);
	},
	test(val) {
		// Only match camelCase "currentColor", not lowercase "currentcolor"
		return typeof val === "string" && val.includes("currentColor");
	}
});
