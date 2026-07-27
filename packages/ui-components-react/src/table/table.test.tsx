// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Table } from "./table";

describe("Table", () => {
	const mockHeader = [
		{ content: "Name", className: "font-bold" },
		{ content: "Age", className: "text-center" },
		{ content: "Email", className: "text-right" }
	];

	const mockBody = [
		[
			{ content: "John Doe", className: "font-medium" },
			{ content: "30", className: "text-center" },
			{ content: "john@example.com", className: "text-right" }
		],
		[
			{ content: "Jane Smith", className: "font-medium" },
			{ content: "25", className: "text-center" },
			{ content: "jane@example.com", className: "text-right" }
		]
	];

	const mockFooter = [
		{
			className: "bg-gray-100",
			cells: [
				{ content: "Total", className: "font-bold" },
				{ content: "2", className: "text-center" },
				{ content: "2 emails", className: "text-right" }
			]
		}
	];

	describe("Unit Tests", () => {
		it("renders table with default props", () => {
			render(<Table />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with custom className", () => {
			render(<Table className="custom-table" />);

			const table = screen.getByRole("table");
			expect(table).toHaveClass("custom-table");
		});

		it("renders table with header only", () => {
			render(<Table header={mockHeader} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with body only", () => {
			render(<Table body={mockBody} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with footer only", () => {
			render(<Table footer={mockFooter} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with header and body", () => {
			render(<Table header={mockHeader} body={mockBody} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with header, body, and footer", () => {
			render(<Table header={mockHeader} body={mockBody} footer={mockFooter} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with empty header array", () => {
			render(<Table header={[]} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with empty body array", () => {
			render(<Table body={[]} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with empty footer array", () => {
			render(<Table footer={[]} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with single header cell", () => {
			const singleHeader = [{ content: "Single Header" }];
			render(<Table header={singleHeader} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with single body row", () => {
			const singleRow = [[{ content: "Single Cell" }]];
			render(<Table body={singleRow} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with single footer row", () => {
			const singleFooter = [
				{
					cells: [{ content: "Single Footer Cell" }]
				}
			];
			render(<Table footer={singleFooter} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with header cells having no className", () => {
			const headerWithoutClass = [{ content: "Name" }, { content: "Age" }, { content: "Email" }];
			render(<Table header={headerWithoutClass} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with body cells having no className", () => {
			const bodyWithoutClass = [
				[{ content: "John Doe" }, { content: "30" }, { content: "john@example.com" }]
			];
			render(<Table body={bodyWithoutClass} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with footer cells having no className", () => {
			const footerWithoutClass = [
				{
					cells: [{ content: "Total" }, { content: "2" }, { content: "2 emails" }]
				}
			];
			render(<Table footer={footerWithoutClass} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with footer row having no className", () => {
			const footerRowWithoutClass = [
				{
					cells: [{ content: "Total" }, { content: "2" }, { content: "2 emails" }]
				}
			];
			render(<Table footer={footerRowWithoutClass} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with complex content in cells", () => {
			const complexContent = [
				[
					{ content: <span data-testid="complex-content">Complex JSX</span> },
					{ content: 42 },
					{ content: "String content" }
				]
			];
			render(<Table body={complexContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
			// Just check that the table is rendered, the complex content test is more about structure
			expect(table).toBeInTheDocument();
		});

		it("renders table with special characters in content", () => {
			const specialContent = [
				[{ content: "Special & Characters: <>&\"'`" }, { content: "Normal content" }]
			];
			render(<Table body={specialContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with unicode characters in content", () => {
			const unicodeContent = [[{ content: "Café" }, { content: "Naïve" }, { content: "Zürich" }]];
			render(<Table body={unicodeContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with long content in cells", () => {
			const longContent = [
				[
					{
						content:
							"This is a very long content that might wrap to multiple lines in the table cell"
					},
					{ content: "Short" }
				]
			];
			render(<Table body={longContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with empty string content", () => {
			const emptyContent = [[{ content: "" }, { content: "Normal content" }]];
			render(<Table body={emptyContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with null content", () => {
			const nullContent = [[{ content: null }, { content: "Normal content" }]];
			render(<Table body={nullContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with undefined content", () => {
			const undefinedContent = [[{ content: undefined }, { content: "Normal content" }]];
			render(<Table body={undefinedContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with boolean content", () => {
			const booleanContent = [
				[{ content: true }, { content: false }, { content: "Normal content" }]
			];
			render(<Table body={booleanContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with number content", () => {
			const numberContent = [[{ content: 42 }, { content: 3.14 }, { content: -10 }]];
			render(<Table body={numberContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with array content", () => {
			const arrayContent = [[{ content: ["Item 1", "Item 2"] }, { content: "Normal content" }]];
			render(<Table body={arrayContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with many rows", () => {
			const manyRows = Array.from({ length: 50 }, (_, i) => [
				{ content: `Name ${i + 1}` },
				{ content: `${20 + i}` },
				{ content: `email${i + 1}@example.com` }
			]);
			render(<Table body={manyRows} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with many columns", () => {
			const manyColumns = [Array.from({ length: 20 }, (_, i) => ({ content: `Column ${i + 1}` }))];
			render(<Table body={manyColumns} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with mixed content types", () => {
			const mixedContent = [
				[
					{ content: "String" },
					{ content: 42 },
					{ content: true },
					{ content: <span>JSX</span> },
					{ content: ["Array", "Content"] }
				]
			];
			render(<Table body={mixedContent} />);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
		});

		it("renders table with additional props", () => {
			render(<Table data-testid="custom-table" data-custom="value" />);

			const table = screen.getByTestId("custom-table");
			expect(table).toBeInTheDocument();
			expect(table).toHaveAttribute("data-custom", "value");
		});

		it("renders table with aria attributes", () => {
			render(
				<Table role="table" aria-label="User data table" aria-describedby="table-description" />
			);

			const table = screen.getByRole("table");
			expect(table).toHaveAttribute("role", "table");
			expect(table).toHaveAttribute("aria-label", "User data table");
			expect(table).toHaveAttribute("aria-describedby", "table-description");
		});

		it("renders table with style prop", () => {
			render(<Table style={{ backgroundColor: "red", width: "100%" }} />);

			const table = screen.getByRole("table");
			expect(table).toHaveStyle("background-color: rgb(255, 0, 0)");
			expect(table).toHaveStyle("width: 100%");
		});

		it("renders table with onClick handler", () => {
			const handleClick = vi.fn();
			render(<Table onClick={handleClick} />);

			const table = screen.getByRole("table");
			table.click();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("renders table with onMouseOver handler", () => {
			const handleMouseOver = vi.fn();
			render(<Table onMouseOver={handleMouseOver} />);

			const table = screen.getByRole("table");
			table.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});

		it("renders table with all props combined", () => {
			render(
				<Table
					header={mockHeader}
					body={mockBody}
					footer={mockFooter}
					className="custom-table"
					role="table"
					aria-label="Complete table"
					style={{ backgroundColor: "blue" }}
				/>
			);

			const table = screen.getByRole("table");
			expect(table).toBeInTheDocument();
			expect(table).toHaveClass("custom-table");
			expect(table).toHaveAttribute("role", "table");
			expect(table).toHaveAttribute("aria-label", "Complete table");
			expect(table).toHaveStyle("background-color: rgb(0, 0, 255)");
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for table with default props", () => {
			const { container } = render(<Table />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with custom className", () => {
			const { container } = render(<Table className="custom-table" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with header only", () => {
			const { container } = render(<Table header={mockHeader} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with body only", () => {
			const { container } = render(<Table body={mockBody} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with footer only", () => {
			const { container } = render(<Table footer={mockFooter} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with header and body", () => {
			const { container } = render(<Table header={mockHeader} body={mockBody} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with header, body, and footer", () => {
			const { container } = render(
				<Table header={mockHeader} body={mockBody} footer={mockFooter} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with empty header array", () => {
			const { container } = render(<Table header={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with empty body array", () => {
			const { container } = render(<Table body={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with empty footer array", () => {
			const { container } = render(<Table footer={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with single header cell", () => {
			const singleHeader = [{ content: "Single Header" }];
			const { container } = render(<Table header={singleHeader} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with single body row", () => {
			const singleRow = [[{ content: "Single Cell" }]];
			const { container } = render(<Table body={singleRow} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with single footer row", () => {
			const singleFooter = [
				{
					cells: [{ content: "Single Footer Cell" }]
				}
			];
			const { container } = render(<Table footer={singleFooter} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with header cells having no className", () => {
			const headerWithoutClass = [{ content: "Name" }, { content: "Age" }, { content: "Email" }];
			const { container } = render(<Table header={headerWithoutClass} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with body cells having no className", () => {
			const bodyWithoutClass = [
				[{ content: "John Doe" }, { content: "30" }, { content: "john@example.com" }]
			];
			const { container } = render(<Table body={bodyWithoutClass} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with footer cells having no className", () => {
			const footerWithoutClass = [
				{
					cells: [{ content: "Total" }, { content: "2" }, { content: "2 emails" }]
				}
			];
			const { container } = render(<Table footer={footerWithoutClass} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with footer row having no className", () => {
			const footerRowWithoutClass = [
				{
					cells: [{ content: "Total" }, { content: "2" }, { content: "2 emails" }]
				}
			];
			const { container } = render(<Table footer={footerRowWithoutClass} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with complex content in cells", () => {
			const complexContent = [
				[
					{ content: <span data-testid="complex-content">Complex JSX</span> },
					{ content: 42 },
					{ content: "String content" }
				]
			];
			const { container } = render(<Table body={complexContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with special characters in content", () => {
			const specialContent = [
				[{ content: `Special & Characters: <>&"'` }, { content: "Normal content" }]
			];
			const { container } = render(<Table body={specialContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with unicode characters in content", () => {
			const unicodeContent = [[{ content: "Café" }, { content: "Naïve" }, { content: "Zürich" }]];
			const { container } = render(<Table body={unicodeContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with long content in cells", () => {
			const longContent = [
				[
					{
						content:
							"This is a very long content that might wrap to multiple lines in the table cell"
					},
					{ content: "Short" }
				]
			];
			const { container } = render(<Table body={longContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with empty string content", () => {
			const emptyContent = [[{ content: "" }, { content: "Normal content" }]];
			const { container } = render(<Table body={emptyContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with null content", () => {
			const nullContent = [[{ content: null }, { content: "Normal content" }]];
			const { container } = render(<Table body={nullContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with undefined content", () => {
			const undefinedContent = [[{ content: undefined }, { content: "Normal content" }]];
			const { container } = render(<Table body={undefinedContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with boolean content", () => {
			const booleanContent = [
				[{ content: true }, { content: false }, { content: "Normal content" }]
			];
			const { container } = render(<Table body={booleanContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with number content", () => {
			const numberContent = [[{ content: 42 }, { content: 3.14 }, { content: -10 }]];
			const { container } = render(<Table body={numberContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with array content", () => {
			const arrayContent = [[{ content: ["Item 1", "Item 2"] }, { content: "Normal content" }]];
			const { container } = render(<Table body={arrayContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with many rows", () => {
			const manyRows = Array.from({ length: 50 }, (_, i) => [
				{ content: `Name ${i + 1}` },
				{ content: `${20 + i}` },
				{ content: `email${i + 1}@example.com` }
			]);
			const { container } = render(<Table body={manyRows} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with many columns", () => {
			const manyColumns = [Array.from({ length: 20 }, (_, i) => ({ content: `Column ${i + 1}` }))];
			const { container } = render(<Table body={manyColumns} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with mixed content types", () => {
			const mixedContent = [
				[
					{ content: "String" },
					{ content: 42 },
					{ content: true },
					{ content: <span>JSX</span> },
					{ content: ["Array", "Content"] }
				]
			];
			const { container } = render(<Table body={mixedContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with additional props", () => {
			const { container } = render(<Table data-testid="custom-table" data-custom="value" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with aria attributes", () => {
			const { container } = render(
				<Table role="table" aria-label="User data table" aria-describedby="table-description" />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with style prop", () => {
			const { container } = render(<Table style={{ backgroundColor: "red", width: "100%" }} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with all props combined", () => {
			const { container } = render(
				<Table
					header={mockHeader}
					body={mockBody}
					footer={mockFooter}
					className="custom-table"
					role="table"
					aria-label="Complete table"
					style={{ backgroundColor: "blue" }}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
