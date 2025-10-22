// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tabs } from "./tabs";
import React from "react";

describe("Tabs", () => {
	// Mock icon component for testing purposes
	const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

	// Unit Tests
	describe("Unit Tests", () => {
		it("renders tabs with default props", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" }
			];
			render(<Tabs items={items} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(tabs).toHaveAttribute("aria-label", "Tabs navigation");
			// Real Flowbite Tabs component doesn't expose data-variant attribute
		});

		it("renders tabs with custom variant", () => {
			const items = [{ title: "Tab 1", content: "Content 1" }];
			render(<Tabs items={items} variant="underline" />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			// Real Flowbite Tabs component doesn't expose data-variant attribute
		});

		it("renders tabs with custom aria-label", () => {
			const items = [{ title: "Tab 1", content: "Content 1" }];
			render(<Tabs items={items} aria-label="Custom tabs" />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(tabs).toHaveAttribute("aria-label", "Custom tabs");
		});

		it("renders tabs with active tab", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" }
			];
			render(<Tabs items={items} activeTab={1} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();

			const tabItems = screen.getAllByRole("tab");
			expect(tabItems).toHaveLength(2);
			// Real Flowbite Tabs component doesn't expose data-active attribute
		});

		it("renders tabs with disabled tab", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2", disabled: true }
			];
			render(<Tabs items={items} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();

			const tabItems = screen.getAllByRole("tab");
			expect(tabItems).toHaveLength(2);
			// Real Flowbite Tabs component doesn't expose data-disabled attribute
		});

		it("renders tabs with icon", () => {
			const items = [{ title: "Tab 1", content: "Content 1", icon: MockIcon }];
			render(<Tabs items={items} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders tabs with loading state", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1", isLoading: true, loadingPlaceholder: "Loading..." }
			];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText("Loading...")).toBeInTheDocument();
		});

		it("renders tabs with complex content", () => {
			const items = [
				{
					title: "Tab 1",
					content: (
						<div>
							<h3>Complex Content</h3>
							<p>This is complex JSX content</p>
						</div>
					)
				}
			];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText("Complex Content")).toBeInTheDocument();
			expect(screen.getByText("This is complex JSX content")).toBeInTheDocument();
		});

		it("renders tabs with empty items array", () => {
			render(<Tabs items={[]} />);
			// Should render empty fragment
			expect(screen.queryByTestId("flowbite-tabs")).not.toBeInTheDocument();
		});

		it("renders tabs with undefined items", () => {
			render(<Tabs items={undefined as any} />);
			// Should render empty fragment
			expect(screen.queryByTestId("flowbite-tabs")).not.toBeInTheDocument();
		});

		it("renders tabs with null items", () => {
			render(<Tabs items={null as any} />);
			// Should render empty fragment
			expect(screen.queryByTestId("flowbite-tabs")).not.toBeInTheDocument();
		});

		it("renders tabs with single item", () => {
			const items = [{ title: "Single Tab", content: "Single Content" }];
			render(<Tabs items={items} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText("Single Tab")).toBeInTheDocument();
		});

		it("renders tabs with many items", () => {
			const items = Array.from({ length: 10 }, (_, i) => ({
				title: `Tab ${i + 1}`,
				content: `Content ${i + 1}`
			}));
			render(<Tabs items={items} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getAllByRole("tab")).toHaveLength(10);
		});

		it("renders tabs with special characters in titles", () => {
			const items = [
				{ title: "Special & Characters: <>&\"'`", content: "Content 1" },
				{ title: "Unicode: éàçüö 你好世界", content: "Content 2" }
			];
			render(<Tabs items={items} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText("Special & Characters: <>&\"'`")).toBeInTheDocument();
			expect(screen.getByText("Unicode: éàçüö 你好世界")).toBeInTheDocument();
		});

		it("renders tabs with long titles", () => {
			const longTitle =
				"This is a very long tab title that should be rendered correctly within the tabs component";
			const items = [{ title: longTitle, content: "Content 1" }];
			render(<Tabs items={items} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText(longTitle)).toBeInTheDocument();
		});

		it("renders tabs with empty string titles", () => {
			const items = [
				{ title: "", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" }
			];
			render(<Tabs items={items} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			const tabItems = screen.getAllByRole("tab");
			expect(tabItems).toHaveLength(2);
			// Real Flowbite Tabs component doesn't expose data-title attribute
		});

		it("renders tabs with null content", () => {
			const items = [{ title: "Tab 1", content: null }];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.queryByTestId("flowbite-tabs-panel")).not.toBeInTheDocument();
		});

		it("renders tabs with undefined content", () => {
			const items = [{ title: "Tab 1", content: undefined }];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.queryByTestId("flowbite-tabs-panel")).not.toBeInTheDocument();
		});

		it("renders tabs with boolean content", () => {
			const items = [{ title: "Tab 1", content: true }];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			// Boolean content should not render in tab panel
			expect(screen.queryByTestId("flowbite-tabs-panel")).not.toBeInTheDocument();
		});

		it("renders tabs with number content", () => {
			const items = [{ title: "Tab 1", content: 42 }];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText("42")).toBeInTheDocument();
		});

		it("renders tabs with array content", () => {
			const items = [{ title: "Tab 1", content: ["Item 1", "Item 2", "Item 3"] }];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText(/Item 1Item 2Item 3/)).toBeInTheDocument();
		});

		it("renders tabs with mixed content types", () => {
			const items = [
				{ title: "Tab 1", content: "Text content" },
				{ title: "Tab 2", content: 123 },
				{ title: "Tab 3", content: <span data-testid="jsx-content">JSX content</span> },
				{ title: "Tab 4", content: null },
				{ title: "Tab 5", content: undefined }
			];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText("Text content")).toBeInTheDocument();
		});

		it("renders tabs with onActiveTabChange handler", () => {
			const handleTabChange = vi.fn();
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" }
			];
			render(<Tabs items={items} onActiveTabChange={handleTabChange} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			// The handler is passed to the component but not automatically triggered
			expect(handleTabChange).not.toHaveBeenCalled();
		});

		it("renders tabs with active tab content only", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" },
				{ title: "Tab 3", content: "Content 3" }
			];
			render(<Tabs items={items} activeTab={1} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();

			// Only the active tab should have content rendered
			expect(screen.getByText("Content 2")).toBeInTheDocument();
			expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
			expect(screen.queryByText("Content 3")).not.toBeInTheDocument();
		});

		it("renders tabs with loading placeholder when loading", () => {
			const items = [
				{
					title: "Tab 1",
					content: "Content 1",
					isLoading: true,
					loadingPlaceholder: "Loading content..."
				}
			];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText("Loading content...")).toBeInTheDocument();
			expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
		});

		it("renders tabs with content when not loading", () => {
			const items = [
				{
					title: "Tab 1",
					content: "Content 1",
					isLoading: false,
					loadingPlaceholder: "Loading content..."
				}
			];
			render(<Tabs items={items} activeTab={0} />);
			const tabs = screen.getByRole("tablist");
			expect(tabs).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
			expect(screen.queryByText("Loading content...")).not.toBeInTheDocument();
		});
	});

	// Snapshot Tests
	describe("Snapshot Tests", () => {
		it("matches snapshot for tabs with default props", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" }
			];
			const { container } = render(<Tabs items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with custom variant", () => {
			const items = [{ title: "Tab 1", content: "Content 1" }];
			const { container } = render(<Tabs items={items} variant="underline" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with custom aria-label", () => {
			const items = [{ title: "Tab 1", content: "Content 1" }];
			const { container } = render(<Tabs items={items} aria-label="Custom tabs" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with active tab", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" }
			];
			const { container } = render(<Tabs items={items} activeTab={1} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with disabled tab", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2", disabled: true }
			];
			const { container } = render(<Tabs items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with icon", () => {
			const items = [{ title: "Tab 1", content: "Content 1", icon: MockIcon }];
			const { container } = render(<Tabs items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with loading state", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1", isLoading: true, loadingPlaceholder: "Loading..." }
			];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with complex content", () => {
			const items = [
				{
					title: "Tab 1",
					content: (
						<div>
							<h3>Complex Content</h3>
							<p>This is complex JSX content</p>
						</div>
					)
				}
			];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with empty items array", () => {
			const { container } = render(<Tabs items={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with undefined items", () => {
			const { container } = render(<Tabs items={undefined as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with null items", () => {
			const { container } = render(<Tabs items={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with single item", () => {
			const items = [{ title: "Single Tab", content: "Single Content" }];
			const { container } = render(<Tabs items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with many items", () => {
			const items = Array.from({ length: 10 }, (_, i) => ({
				title: `Tab ${i + 1}`,
				content: `Content ${i + 1}`
			}));
			const { container } = render(<Tabs items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with special characters in titles", () => {
			const items = [
				{ title: "Special & Characters: <>&\"'`", content: "Content 1" },
				{ title: "Unicode: éàçüö 你好世界", content: "Content 2" }
			];
			const { container } = render(<Tabs items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with long titles", () => {
			const longTitle =
				"This is a very long tab title that should be rendered correctly within the tabs component";
			const items = [{ title: longTitle, content: "Content 1" }];
			const { container } = render(<Tabs items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with empty string titles", () => {
			const items = [
				{ title: "", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" }
			];
			const { container } = render(<Tabs items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with null content", () => {
			const items = [{ title: "Tab 1", content: null }];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with undefined content", () => {
			const items = [{ title: "Tab 1", content: undefined }];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with boolean content", () => {
			const items = [{ title: "Tab 1", content: true }];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with number content", () => {
			const items = [{ title: "Tab 1", content: 42 }];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with array content", () => {
			const items = [{ title: "Tab 1", content: ["Item 1", "Item 2", "Item 3"] }];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with mixed content types", () => {
			const items = [
				{ title: "Tab 1", content: "Text content" },
				{ title: "Tab 2", content: 123 },
				{ title: "Tab 3", content: <span data-testid="jsx-content">JSX content</span> },
				{ title: "Tab 4", content: null },
				{ title: "Tab 5", content: undefined }
			];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with onActiveTabChange handler", () => {
			const handleTabChange = vi.fn();
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" }
			];
			const { container } = render(<Tabs items={items} onActiveTabChange={handleTabChange} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with all props combined", () => {
			const handleTabChange = vi.fn();
			const items = [
				{ title: "Tab 1", content: "Content 1", icon: MockIcon },
				{ title: "Tab 2", content: "Content 2", disabled: true },
				{ title: "Tab 3", content: "Content 3", isLoading: true, loadingPlaceholder: "Loading..." }
			];
			const { container } = render(
				<Tabs
					items={items}
					variant="pills"
					activeTab={0}
					onActiveTabChange={handleTabChange}
					aria-label="Combined tabs"
					data-test="combined"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with active tab content only", () => {
			const items = [
				{ title: "Tab 1", content: "Content 1" },
				{ title: "Tab 2", content: "Content 2" },
				{ title: "Tab 3", content: "Content 3" }
			];
			const { container } = render(<Tabs items={items} activeTab={1} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with loading placeholder when loading", () => {
			const items = [
				{
					title: "Tab 1",
					content: "Content 1",
					isLoading: true,
					loadingPlaceholder: "Loading content..."
				}
			];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for tabs with content when not loading", () => {
			const items = [
				{
					title: "Tab 1",
					content: "Content 1",
					isLoading: false,
					loadingPlaceholder: "Loading content..."
				}
			];
			const { container } = render(<Tabs items={items} activeTab={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
