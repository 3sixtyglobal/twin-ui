// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./accordion";
import type { AccordionItem } from "./accordionProps";

// Mock icon component
const MockIcon = vi.fn(() => <svg data-testid="mock-icon" />);

// Mock children for Accordion component
const MockAccordionChildren = <div data-testid="accordion-children">Mock Children</div>;

describe("Accordion", () => {
	describe("Unit Tests", () => {
		it("renders accordion with basic items", () => {
			const items: AccordionItem[] = [
				{ title: "Item 1", content: "Content 1" },
				{ title: "Item 2", content: "Content 2" }
			];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Item 2")).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
			expect(screen.getByText("Content 2")).toBeInTheDocument();
		});

		it("renders accordion with single item", () => {
			const items: AccordionItem[] = [{ title: "Single Item", content: "Single Content" }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Single Item")).toBeInTheDocument();
			expect(screen.getByText("Single Content")).toBeInTheDocument();
		});

		it("renders accordion with items containing icons", () => {
			const items: AccordionItem[] = [
				{ title: "Item with Icon", content: "Content with Icon", icon: MockIcon }
			];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Item with Icon")).toBeInTheDocument();
			expect(screen.getByText("Content with Icon")).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders accordion with multiple items with icons", () => {
			const items: AccordionItem[] = [
				{ title: "Item 1", content: "Content 1", icon: MockIcon },
				{ title: "Item 2", content: "Content 2", icon: MockIcon },
				{ title: "Item 3", content: "Content 3" }
			];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Item 2")).toBeInTheDocument();
			expect(screen.getByText("Item 3")).toBeInTheDocument();
			expect(screen.getAllByTestId("mock-icon")).toHaveLength(2);
		});

		it("renders accordion with empty items array", () => {
			const items: AccordionItem[] = [];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			// Should render the accordion container but no items
			expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
		});

		it("renders accordion with undefined items", () => {
			render(<Accordion items={undefined}>{MockAccordionChildren}</Accordion>);

			// Should render the accordion container but no items
			expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
		});

		it("renders accordion with null items", () => {
			render(<Accordion items={null as any}>{MockAccordionChildren}</Accordion>);

			// Should render the accordion container but no items
			expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
		});

		it("renders accordion with items having undefined title", () => {
			const items: AccordionItem[] = [{ title: undefined, content: "Content 1" }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with items having undefined content", () => {
			const items: AccordionItem[] = [{ title: "Title 1", content: undefined }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Title 1")).toBeInTheDocument();
		});

		it("renders accordion with items having null title", () => {
			const items: AccordionItem[] = [{ title: null, content: "Content 1" }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with items having null content", () => {
			const items: AccordionItem[] = [{ title: "Title 1", content: null }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Title 1")).toBeInTheDocument();
		});

		it("renders accordion with items having empty string title", () => {
			const items: AccordionItem[] = [{ title: "", content: "Content 1" }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with items having empty string content", () => {
			const items: AccordionItem[] = [{ title: "Title 1", content: "" }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Title 1")).toBeInTheDocument();
		});

		it("renders accordion with items having number title", () => {
			const items: AccordionItem[] = [{ title: 42, content: "Content 1" }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("42")).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with items having number content", () => {
			const items: AccordionItem[] = [{ title: "Title 1", content: 123 }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Title 1")).toBeInTheDocument();
			expect(screen.getByText("123")).toBeInTheDocument();
		});

		it("renders accordion with items having boolean title", () => {
			const items: AccordionItem[] = [{ title: true, content: "Content 1" }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with items having boolean content", () => {
			const items: AccordionItem[] = [{ title: "Title 1", content: false }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Title 1")).toBeInTheDocument();
		});

		it("renders accordion with items having JSX title", () => {
			const items: AccordionItem[] = [
				{
					title: <div data-testid="jsx-title">JSX Title</div>,
					content: "Content 1"
				}
			];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByTestId("jsx-title")).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with items having JSX content", () => {
			const items: AccordionItem[] = [
				{
					title: "Title 1",
					content: <div data-testid="jsx-content">JSX Content</div>
				}
			];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Title 1")).toBeInTheDocument();
			expect(screen.getByTestId("jsx-content")).toBeInTheDocument();
		});

		it("renders accordion with items having array title", () => {
			const items: AccordionItem[] = [{ title: ["Title", "Part"], content: "Content 1" }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("TitlePart")).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with items having array content", () => {
			const items: AccordionItem[] = [{ title: "Title 1", content: ["Content", "Part"] }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Title 1")).toBeInTheDocument();
			expect(screen.getByText("ContentPart")).toBeInTheDocument();
		});

		it("renders accordion with alwaysOpen prop", () => {
			const items: AccordionItem[] = [{ title: "Item 1", content: "Content 1" }];

			render(
				<Accordion items={items} alwaysOpen>
					{MockAccordionChildren}
				</Accordion>
			);

			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with flush prop", () => {
			const items: AccordionItem[] = [{ title: "Item 1", content: "Content 1" }];

			render(
				<Accordion items={items} flush>
					{MockAccordionChildren}
				</Accordion>
			);

			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with collapseAll prop", () => {
			const items: AccordionItem[] = [{ title: "Item 1", content: "Content 1" }];

			render(
				<Accordion items={items} collapseAll>
					{MockAccordionChildren}
				</Accordion>
			);

			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with multiple props", () => {
			const items: AccordionItem[] = [
				{ title: "Item 1", content: "Content 1" },
				{ title: "Item 2", content: "Content 2" }
			];

			render(
				<Accordion items={items} alwaysOpen flush collapseAll>
					{MockAccordionChildren}
				</Accordion>
			);

			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Item 2")).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
			expect(screen.getByText("Content 2")).toBeInTheDocument();
		});

		it("renders accordion with className prop", () => {
			const items: AccordionItem[] = [{ title: "Item 1", content: "Content 1" }];

			render(
				<Accordion items={items} className="custom-accordion">
					{MockAccordionChildren}
				</Accordion>
			);

			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Content 1")).toBeInTheDocument();
		});

		it("renders accordion with complex nested content", () => {
			const items: AccordionItem[] = [
				{
					title: "Complex Item",
					content: (
						<div>
							<h3>Nested Title</h3>
							<p>Nested paragraph</p>
							<ul>
								<li>List item 1</li>
								<li>List item 2</li>
							</ul>
						</div>
					)
				}
			];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Complex Item")).toBeInTheDocument();
			expect(screen.getByText("Nested Title")).toBeInTheDocument();
			expect(screen.getByText("Nested paragraph")).toBeInTheDocument();
			expect(screen.getByText("List item 1")).toBeInTheDocument();
			expect(screen.getByText("List item 2")).toBeInTheDocument();
		});

		it("renders accordion with mixed content types", () => {
			const items: AccordionItem[] = [
				{ title: "String Title", content: "String Content" },
				{ title: 42, content: 123 },
				{ title: <span>JSX Title</span>, content: <div>JSX Content</div> },
				{ title: ["Array", "Title"], content: ["Array", "Content"] }
			];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("String Title")).toBeInTheDocument();
			expect(screen.getByText("String Content")).toBeInTheDocument();
			expect(screen.getByText("42")).toBeInTheDocument();
			expect(screen.getByText("123")).toBeInTheDocument();
			expect(screen.getByText("JSX Title")).toBeInTheDocument();
			expect(screen.getByText("JSX Content")).toBeInTheDocument();
			expect(screen.getByText("ArrayTitle")).toBeInTheDocument();
			expect(screen.getByText("ArrayContent")).toBeInTheDocument();
		});

		it("renders accordion with long text content", () => {
			const longText =
				"This is a very long text content that should be handled properly by the accordion component and should not break the layout or cause any rendering issues.";
			const items: AccordionItem[] = [{ title: "Long Content Item", content: longText }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Long Content Item")).toBeInTheDocument();
			expect(screen.getByText(longText)).toBeInTheDocument();
		});

		it("renders accordion with special characters in content", () => {
			const items: AccordionItem[] = [
				{ title: "Special & Characters", content: 'Content with <script>alert("test")</script>' }
			];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Special & Characters")).toBeInTheDocument();
			expect(screen.getByText('Content with <script>alert("test")</script>')).toBeInTheDocument();
		});

		it("renders accordion with unicode characters", () => {
			const items: AccordionItem[] = [{ title: "Unicode: 你好世界", content: "Content: 🚀✨🎉" }];

			render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);

			expect(screen.getByText("Unicode: 你好世界")).toBeInTheDocument();
			expect(screen.getByText("Content: 🚀✨🎉")).toBeInTheDocument();
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for basic accordion", () => {
			const items: AccordionItem[] = [
				{ title: "Item 1", content: "Content 1" },
				{ title: "Item 2", content: "Content 2" }
			];

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for single item accordion", () => {
			const items: AccordionItem[] = [{ title: "Single Item", content: "Single Content" }];

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with icons", () => {
			const items: AccordionItem[] = [
				{ title: "Item with Icon", content: "Content with Icon", icon: MockIcon }
			];

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with multiple items and icons", () => {
			const items: AccordionItem[] = [
				{ title: "Item 1", content: "Content 1", icon: MockIcon },
				{ title: "Item 2", content: "Content 2", icon: MockIcon },
				{ title: "Item 3", content: "Content 3" }
			];

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with alwaysOpen prop", () => {
			const items: AccordionItem[] = [{ title: "Item 1", content: "Content 1" }];

			const { container } = render(
				<Accordion items={items} alwaysOpen>
					{MockAccordionChildren}
				</Accordion>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with flush prop", () => {
			const items: AccordionItem[] = [{ title: "Item 1", content: "Content 1" }];

			const { container } = render(
				<Accordion items={items} flush>
					{MockAccordionChildren}
				</Accordion>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with collapseAll prop", () => {
			const items: AccordionItem[] = [{ title: "Item 1", content: "Content 1" }];

			const { container } = render(
				<Accordion items={items} collapseAll>
					{MockAccordionChildren}
				</Accordion>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with all props", () => {
			const items: AccordionItem[] = [
				{ title: "Item 1", content: "Content 1", icon: MockIcon },
				{ title: "Item 2", content: "Content 2" }
			];

			const { container } = render(
				<Accordion items={items} alwaysOpen flush collapseAll className="custom-accordion">
					{MockAccordionChildren}
				</Accordion>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with empty items", () => {
			const { container } = render(<Accordion items={[]}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with undefined items", () => {
			const { container } = render(
				<Accordion items={undefined}>{MockAccordionChildren}</Accordion>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with null items", () => {
			const { container } = render(
				<Accordion items={null as any}>{MockAccordionChildren}</Accordion>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with mixed content types", () => {
			const items: AccordionItem[] = [
				{ title: "String Title", content: "String Content" },
				{ title: 42, content: 123 },
				{ title: <span>JSX Title</span>, content: <div>JSX Content</div> },
				{ title: ["Array", "Title"], content: ["Array", "Content"] }
			];

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with complex nested content", () => {
			const items: AccordionItem[] = [
				{
					title: "Complex Item",
					content: (
						<div>
							<h3>Nested Title</h3>
							<p>Nested paragraph</p>
							<ul>
								<li>List item 1</li>
								<li>List item 2</li>
							</ul>
						</div>
					)
				}
			];

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with special characters", () => {
			const items: AccordionItem[] = [
				{ title: "Special & Characters", content: 'Content with <script>alert("test")</script>' }
			];

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with unicode characters", () => {
			const items: AccordionItem[] = [{ title: "Unicode: 你好世界", content: "Content: 🚀✨🎉" }];

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with long text", () => {
			const longText =
				"This is a very long text content that should be handled properly by the accordion component and should not break the layout or cause any rendering issues.";
			const items: AccordionItem[] = [{ title: "Long Content Item", content: longText }];

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with many items", () => {
			const items: AccordionItem[] = Array.from({ length: 10 }, (_, index) => ({
				title: `Item ${index + 1}`,
				content: `Content for item ${index + 1}`,
				icon: index % 2 === 0 ? MockIcon : undefined
			}));

			const { container } = render(<Accordion items={items}>{MockAccordionChildren}</Accordion>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for accordion with all boolean props combinations", () => {
			const items: AccordionItem[] = [{ title: "Item 1", content: "Content 1" }];

			const combinations = [
				{ alwaysOpen: true, flush: false, collapseAll: false },
				{ alwaysOpen: false, flush: true, collapseAll: false },
				{ alwaysOpen: false, flush: false, collapseAll: true },
				{ alwaysOpen: true, flush: true, collapseAll: false },
				{ alwaysOpen: true, flush: false, collapseAll: true },
				{ alwaysOpen: false, flush: true, collapseAll: true },
				{ alwaysOpen: true, flush: true, collapseAll: true }
			];

			combinations.forEach((props, index) => {
				const { container } = render(
					<Accordion items={items} {...props}>
						{MockAccordionChildren}
					</Accordion>
				);
				expect(container.firstChild).toMatchSnapshot(`accordion props combo ${index}`);
			});
		});
	});
});
