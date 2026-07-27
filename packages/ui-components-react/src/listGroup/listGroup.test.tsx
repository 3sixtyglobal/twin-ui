// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ListGroup } from "./listGroup";

// Mock icon component for testing
const MockIcon = () => <svg data-testid="mock-icon">Icon</svg>;

describe("ListGroup", () => {
	describe("Unit Tests", () => {
		it("renders listgroup with default props", () => {
			const items = [{ title: "Item 1" }, { title: "Item 2" }, { title: "Item 3" }];

			render(<ListGroup items={items} />);

			const listGroup = screen.getByRole("list");
			expect(listGroup).toBeInTheDocument();
			expect(screen.getByText("Item 1")).toBeInTheDocument();
			expect(screen.getByText("Item 2")).toBeInTheDocument();
			expect(screen.getByText("Item 3")).toBeInTheDocument();
		});

		it("renders listgroup with custom className", () => {
			const items = [{ title: "Item 1" }];

			render(<ListGroup items={items} className="custom-listgroup" />);

			const listGroup = screen.getByRole("list");
			expect(listGroup).toHaveClass("custom-listgroup");
		});

		it("renders listgroup with empty items array", () => {
			render(<ListGroup items={[]} />);

			const listGroup = screen.getByRole("list");
			expect(listGroup).toBeInTheDocument();
		});

		it("renders listgroup with single item", () => {
			const items = [{ title: "Single Item" }];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Single Item")).toBeInTheDocument();
		});

		it("renders listgroup with many items", () => {
			const items = Array.from({ length: 10 }, (_, i) => ({ title: `Item ${i + 1}` }));

			render(<ListGroup items={items} />);

			for (let i = 1; i <= 10; i++) {
				expect(screen.getByText(`Item ${i}`)).toBeInTheDocument();
			}
		});

		it("renders listgroup with items containing special characters", () => {
			const items = [
				{ title: "Item & Co." },
				{ title: 'Item <>"' },
				{ title: 'Item with "quotes"' }
			];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Item & Co.")).toBeInTheDocument();
			expect(screen.getByText('Item <>"')).toBeInTheDocument();
			expect(screen.getByText('Item with "quotes"')).toBeInTheDocument();
		});

		it("renders listgroup with items containing unicode characters", () => {
			const items = [{ title: "项目 1" }, { title: "アイテム 2" }, { title: "아이템 3" }];

			render(<ListGroup items={items} />);

			expect(screen.getByText("项目 1")).toBeInTheDocument();
			expect(screen.getByText("アイテム 2")).toBeInTheDocument();
			expect(screen.getByText("아이템 3")).toBeInTheDocument();
		});

		it("renders listgroup with items containing long titles", () => {
			const items = [
				{
					title:
						"This is a very long item title that should be rendered properly without any issues or truncation"
				}
			];

			render(<ListGroup items={items} />);

			expect(
				screen.getByText(
					"This is a very long item title that should be rendered properly without any issues or truncation"
				)
			).toBeInTheDocument();
		});

		it("renders listgroup with items containing empty titles", () => {
			const items = [{ title: "" }, { title: "Valid Item" }];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Valid Item")).toBeInTheDocument();
		});

		it("renders listgroup with items with icons", () => {
			const items = [{ title: "Item with Icon", icon: MockIcon }, { title: "Item without Icon" }];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Item with Icon")).toBeInTheDocument();
			expect(screen.getByText("Item without Icon")).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders listgroup with active items", () => {
			const items = [
				{ title: "Active Item", active: true },
				{ title: "Inactive Item", active: false },
				{ title: "Default Item" }
			];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Active Item")).toBeInTheDocument();
			expect(screen.getByText("Inactive Item")).toBeInTheDocument();
			expect(screen.getByText("Default Item")).toBeInTheDocument();
		});

		it("renders listgroup with disabled items", () => {
			const items = [
				{ title: "Disabled Item", disabled: true },
				{ title: "Enabled Item", disabled: false },
				{ title: "Default Item" }
			];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Disabled Item")).toBeInTheDocument();
			expect(screen.getByText("Enabled Item")).toBeInTheDocument();
			expect(screen.getByText("Default Item")).toBeInTheDocument();
		});

		it("renders listgroup with items with href", () => {
			const items = [
				{ title: "Link Item", href: "https://example.com" },
				{ title: "Regular Item" }
			];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Link Item")).toBeInTheDocument();
			expect(screen.getByText("Regular Item")).toBeInTheDocument();
		});

		it("renders listgroup with items with empty href", () => {
			const items = [{ title: "Empty Link Item", href: "" }, { title: "Regular Item" }];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Empty Link Item")).toBeInTheDocument();
			expect(screen.getByText("Regular Item")).toBeInTheDocument();
		});

		it("renders listgroup with items with undefined href", () => {
			const items = [{ title: "Undefined Link Item", href: undefined }, { title: "Regular Item" }];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Undefined Link Item")).toBeInTheDocument();
			expect(screen.getByText("Regular Item")).toBeInTheDocument();
		});

		it("renders listgroup with items with null href", () => {
			const items = [{ title: "Null Link Item", href: null as any }, { title: "Regular Item" }];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Null Link Item")).toBeInTheDocument();
			expect(screen.getByText("Regular Item")).toBeInTheDocument();
		});

		it("renders listgroup with complex item combinations", () => {
			const items = [
				{
					title: "Complex Item",
					icon: MockIcon,
					active: true,
					disabled: false,
					href: "https://example.com"
				},
				{ title: "Simple Item" }
			];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Complex Item")).toBeInTheDocument();
			expect(screen.getByText("Simple Item")).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders listgroup with all boolean combinations", () => {
			const items = [
				{ title: "Active Disabled", active: true, disabled: true },
				{ title: "Active Enabled", active: true, disabled: false },
				{ title: "Inactive Disabled", active: false, disabled: true },
				{ title: "Inactive Enabled", active: false, disabled: false },
				{ title: "Default", active: undefined, disabled: undefined }
			];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Active Disabled")).toBeInTheDocument();
			expect(screen.getByText("Active Enabled")).toBeInTheDocument();
			expect(screen.getByText("Inactive Disabled")).toBeInTheDocument();
			expect(screen.getByText("Inactive Enabled")).toBeInTheDocument();
			expect(screen.getByText("Default")).toBeInTheDocument();
		});

		it("renders listgroup with items with special href formats", () => {
			const items = [
				{ title: "HTTP Link", href: "http://example.com" },
				{ title: "HTTPS Link", href: "https://example.com" },
				{ title: "Relative Link", href: "/path/to/page" },
				{ title: "Hash Link", href: "#section" },
				{ title: "Mailto Link", href: "mailto:test@example.com" },
				{ title: "Tel Link", href: "tel:+1234567890" }
			];

			render(<ListGroup items={items} />);

			expect(screen.getByText("HTTP Link")).toBeInTheDocument();
			expect(screen.getByText("HTTPS Link")).toBeInTheDocument();
			expect(screen.getByText("Relative Link")).toBeInTheDocument();
			expect(screen.getByText("Hash Link")).toBeInTheDocument();
			expect(screen.getByText("Mailto Link")).toBeInTheDocument();
			expect(screen.getByText("Tel Link")).toBeInTheDocument();
		});

		it("renders listgroup with items with duplicate titles", () => {
			const items = [{ title: "Duplicate" }, { title: "Unique" }, { title: "Duplicate" }];

			render(<ListGroup items={items} />);

			const duplicateItems = screen.getAllByText("Duplicate");
			expect(duplicateItems).toHaveLength(2);
			expect(screen.getByText("Unique")).toBeInTheDocument();
		});

		it("renders listgroup with items with numeric titles", () => {
			const items = [{ title: "1" }, { title: "2" }, { title: "3" }];

			render(<ListGroup items={items} />);

			expect(screen.getByText("1")).toBeInTheDocument();
			expect(screen.getByText("2")).toBeInTheDocument();
			expect(screen.getByText("3")).toBeInTheDocument();
		});

		it("renders listgroup with items with boolean-like titles", () => {
			const items = [{ title: "true" }, { title: "false" }, { title: "null" }];

			render(<ListGroup items={items} />);

			expect(screen.getByText("true")).toBeInTheDocument();
			expect(screen.getByText("false")).toBeInTheDocument();
			expect(screen.getByText("null")).toBeInTheDocument();
		});

		it("renders listgroup with items with whitespace titles", () => {
			const items = [{ title: " " }, { title: "  " }, { title: "\t" }, { title: "\n" }];

			render(<ListGroup items={items} />);

			const listGroup = screen.getByRole("list");
			expect(listGroup).toBeInTheDocument();
			expect(screen.getAllByRole("listitem")).toHaveLength(4);
		});

		it("renders listgroup with items with mixed content", () => {
			const items = [
				{ title: "Text Item" },
				{ title: "123" },
				{ title: "Special & Characters" },
				{ title: "Unicode 你好" },
				{ title: "" },
				{ title: " " }
			];

			render(<ListGroup items={items} />);

			expect(screen.getByText("Text Item")).toBeInTheDocument();
			expect(screen.getByText("123")).toBeInTheDocument();
			expect(screen.getByText("Special & Characters")).toBeInTheDocument();
			expect(screen.getByText("Unicode 你好")).toBeInTheDocument();
			expect(screen.getAllByRole("listitem")).toHaveLength(6);
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for listgroup with default props", () => {
			const items = [{ title: "Item 1" }, { title: "Item 2" }, { title: "Item 3" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with custom className", () => {
			const items = [{ title: "Item 1" }];

			const { container } = render(<ListGroup items={items} className="custom-listgroup" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with empty items array", () => {
			const { container } = render(<ListGroup items={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with single item", () => {
			const items = [{ title: "Single Item" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with many items", () => {
			const items = Array.from({ length: 5 }, (_, i) => ({ title: `Item ${i + 1}` }));

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items containing special characters", () => {
			const items = [
				{ title: "Item & Co." },
				{ title: 'Item <>"' },
				{ title: 'Item with "quotes"' }
			];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items containing unicode characters", () => {
			const items = [{ title: "项目 1" }, { title: "アイテム 2" }, { title: "아이템 3" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items containing long titles", () => {
			const items = [
				{
					title:
						"This is a very long item title that should be rendered properly without any issues or truncation"
				}
			];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items containing empty titles", () => {
			const items = [{ title: "" }, { title: "Valid Item" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with icons", () => {
			const items = [{ title: "Item with Icon", icon: MockIcon }, { title: "Item without Icon" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with active items", () => {
			const items = [
				{ title: "Active Item", active: true },
				{ title: "Inactive Item", active: false },
				{ title: "Default Item" }
			];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with disabled items", () => {
			const items = [
				{ title: "Disabled Item", disabled: true },
				{ title: "Enabled Item", disabled: false },
				{ title: "Default Item" }
			];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with href", () => {
			const items = [
				{ title: "Link Item", href: "https://example.com" },
				{ title: "Regular Item" }
			];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with empty href", () => {
			const items = [{ title: "Empty Link Item", href: "" }, { title: "Regular Item" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with undefined href", () => {
			const items = [{ title: "Undefined Link Item", href: undefined }, { title: "Regular Item" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with null href", () => {
			const items = [{ title: "Null Link Item", href: null as any }, { title: "Regular Item" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with complex item combinations", () => {
			const items = [
				{
					title: "Complex Item",
					icon: MockIcon,
					active: true,
					disabled: false,
					href: "https://example.com"
				},
				{ title: "Simple Item" }
			];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with all boolean combinations", () => {
			const items = [
				{ title: "Active Disabled", active: true, disabled: true },
				{ title: "Active Enabled", active: true, disabled: false },
				{ title: "Inactive Disabled", active: false, disabled: true },
				{ title: "Inactive Enabled", active: false, disabled: false },
				{ title: "Default", active: undefined, disabled: undefined }
			];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with special href formats", () => {
			const items = [
				{ title: "HTTP Link", href: "http://example.com" },
				{ title: "HTTPS Link", href: "https://example.com" },
				{ title: "Relative Link", href: "/path/to/page" },
				{ title: "Hash Link", href: "#section" },
				{ title: "Mailto Link", href: "mailto:test@example.com" },
				{ title: "Tel Link", href: "tel:+1234567890" }
			];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with duplicate titles", () => {
			const items = [{ title: "Duplicate" }, { title: "Unique" }, { title: "Duplicate" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with numeric titles", () => {
			const items = [{ title: "1" }, { title: "2" }, { title: "3" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with boolean-like titles", () => {
			const items = [{ title: "true" }, { title: "false" }, { title: "null" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with whitespace titles", () => {
			const items = [{ title: " " }, { title: "  " }, { title: "\t" }, { title: "\n" }];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for listgroup with items with mixed content", () => {
			const items = [
				{ title: "Text Item" },
				{ title: "123" },
				{ title: "Special & Characters" },
				{ title: "Unicode 你好" },
				{ title: "" },
				{ title: " " }
			];

			const { container } = render(<ListGroup items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
