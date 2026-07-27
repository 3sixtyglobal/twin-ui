// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption
} from "./ui-table";

describe("UI Table Component", () => {
	describe("Unit Tests", () => {
		it("renders table with default props", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Header</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const table = container.querySelector('[data-slot="table"]');
			expect(table).toBeInTheDocument();
		});

		it("renders table with custom className", () => {
			const { container } = render(
				<Table className="custom-table">
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const table = container.querySelector('[data-slot="table"]');
			expect(table).toHaveClass("custom-table");
		});

		it("renders table with default variant", () => {
			const { container } = render(
				<Table variant="default">
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const table = container.querySelector('[data-slot="table"]');
			expect(table).toBeInTheDocument();
		});

		it("renders TableHeader with default variant", () => {
			const { container } = render(
				<Table>
					<TableHeader variant="default">
						<TableRow>
							<TableHead>Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			);
			const header = container.querySelector('[data-slot="table-header"]');
			expect(header).toBeInTheDocument();
		});

		it("renders TableBody with default variant", () => {
			const { container } = render(
				<Table>
					<TableBody variant="default">
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const body = container.querySelector('[data-slot="table-body"]');
			expect(body).toBeInTheDocument();
		});

		it("renders TableRow with default variant", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow variant="default">
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const row = container.querySelector('[data-slot="table-row"]');
			expect(row).toBeInTheDocument();
		});

		it("renders TableHead with default variant", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead variant="default">Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
			);
			const head = container.querySelector('[data-slot="table-head"]');
			expect(head).toBeInTheDocument();
		});

		it("renders TableCell with default variant", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell variant="default">Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const cell = container.querySelector('[data-slot="table-cell"]');
			expect(cell).toBeInTheDocument();
		});

		it("renders TableFooter", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>Footer</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			);
			const footer = container.querySelector('[data-slot="table-footer"]');
			expect(footer).toBeInTheDocument();
		});

		it("renders TableCaption", () => {
			const { container } = render(
				<Table>
					<TableCaption>Table Caption</TableCaption>
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const caption = container.querySelector('[data-slot="table-caption"]');
			expect(caption).toBeInTheDocument();
			expect(caption).toHaveTextContent("Table Caption");
		});

		it("renders complete table with all components", () => {
			const { container } = render(
				<Table>
					<TableCaption>Complete Table</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Column 1</TableHead>
							<TableHead>Column 2</TableHead>
							<TableHead>Column 3</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Cell 1-1</TableCell>
							<TableCell>Cell 1-2</TableCell>
							<TableCell>Cell 1-3</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 2-1</TableCell>
							<TableCell>Cell 2-2</TableCell>
							<TableCell>Cell 2-3</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>Footer 1</TableCell>
							<TableCell>Footer 2</TableCell>
							<TableCell>Footer 3</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			);
			const table = container.querySelector('[data-slot="table"]');
			expect(table).toBeInTheDocument();
		});

		it("renders table with multiple header rows", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Header 1-1</TableHead>
							<TableHead>Header 1-2</TableHead>
						</TableRow>
						<TableRow>
							<TableHead>Header 2-1</TableHead>
							<TableHead>Header 2-2</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const header = container.querySelector('[data-slot="table-header"]');
			expect(header).toBeInTheDocument();
		});

		it("renders table with custom classNames on all components", () => {
			const { container } = render(
				<Table className="custom-table">
					<TableCaption className="custom-caption">Caption</TableCaption>
					<TableHeader className="custom-header">
						<TableRow className="custom-row">
							<TableHead className="custom-head">Header</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="custom-body">
						<TableRow className="custom-row">
							<TableCell className="custom-cell">Cell</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter className="custom-footer">
						<TableRow className="custom-row">
							<TableCell className="custom-cell">Footer</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			);
			const table = container.querySelector('[data-slot="table"]');
			expect(table).toHaveClass("custom-table");
		});

		it("renders table with aria attributes", () => {
			const { container } = render(
				<Table aria-label="Data table">
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const table = container.querySelector('[data-slot="table"]');
			expect(table).toHaveAttribute("aria-label", "Data table");
		});

		it("renders table with data attributes", () => {
			const { container } = render(
				<Table data-testid="test-table">
					<TableBody>
						<TableRow data-state="selected">
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const table = container.querySelector('[data-slot="table"]');
			expect(table).toHaveAttribute("data-testid", "test-table");
		});

		it("renders table with complex content in cells", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<div>
									<span>Complex</span>
									<strong>Content</strong>
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const cell = container.querySelector('[data-slot="table-cell"]');
			expect(cell).toBeInTheDocument();
		});

		it("renders table with empty content", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const table = container.querySelector('[data-slot="table"]');
			expect(table).toBeInTheDocument();
		});

		it("renders table with numeric content", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>{123}</TableCell>
							<TableCell>{456.78}</TableCell>
							<TableCell>{0}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const cells = container.querySelectorAll('[data-slot="table-cell"]');
			expect(cells).toHaveLength(3);
		});

		it("renders table with role attributes", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<input type="checkbox" role="checkbox" />
							</TableCell>
							<TableCell>Data</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			const table = container.querySelector('[data-slot="table"]');
			expect(table).toBeInTheDocument();
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for basic table", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Basic Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with default variant", () => {
			const { container } = render(
				<Table variant="default">
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with header", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Header 1</TableHead>
							<TableHead>Header 2</TableHead>
							<TableHead>Header 3</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Cell 1</TableCell>
							<TableCell>Cell 2</TableCell>
							<TableCell>Cell 3</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with footer", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Cell 1</TableCell>
							<TableCell>Cell 2</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>Footer 1</TableCell>
							<TableCell>Footer 2</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with caption", () => {
			const { container } = render(
				<Table>
					<TableCaption>This is a table caption</TableCaption>
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for complete table with all components", () => {
			const { container } = render(
				<Table>
					<TableCaption>Complete Table Example</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>John Doe</TableCell>
							<TableCell>john@example.com</TableCell>
							<TableCell>Admin</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Jane Smith</TableCell>
							<TableCell>jane@example.com</TableCell>
							<TableCell>User</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>Total Users</TableCell>
							<TableCell>2</TableCell>
							<TableCell>-</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with custom classNames", () => {
			const { container } = render(
				<Table className="custom-table-class">
					<TableHeader className="custom-header-class">
						<TableRow className="custom-row-class">
							<TableHead className="custom-head-class">Custom Header</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="custom-body-class">
						<TableRow className="custom-row-class">
							<TableCell className="custom-cell-class">Custom Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with multiple rows", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Column 1</TableHead>
							<TableHead>Column 2</TableHead>
							<TableHead>Column 3</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Row 1 Cell 1</TableCell>
							<TableCell>Row 1 Cell 2</TableCell>
							<TableCell>Row 1 Cell 3</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Row 2 Cell 1</TableCell>
							<TableCell>Row 2 Cell 2</TableCell>
							<TableCell>Row 2 Cell 3</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Row 3 Cell 1</TableCell>
							<TableCell>Row 3 Cell 2</TableCell>
							<TableCell>Row 3 Cell 3</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with multiple columns", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Col 1</TableHead>
							<TableHead>Col 2</TableHead>
							<TableHead>Col 3</TableHead>
							<TableHead>Col 4</TableHead>
							<TableHead>Col 5</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Data 1</TableCell>
							<TableCell>Data 2</TableCell>
							<TableCell>Data 3</TableCell>
							<TableCell>Data 4</TableCell>
							<TableCell>Data 5</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with header variants", () => {
			const { container } = render(
				<Table>
					<TableHeader variant="default">
						<TableRow>
							<TableHead variant="default">Header with default variant</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with body variants", () => {
			const { container } = render(
				<Table>
					<TableBody variant="default">
						<TableRow variant="default">
							<TableCell variant="default">Cell with default variant</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with row variants", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow variant="default">
							<TableCell>Row with default variant</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with cell variants", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell variant="default">Cell with default variant</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with all variants applied", () => {
			const { container } = render(
				<Table variant="default">
					<TableHeader variant="default">
						<TableRow variant="default">
							<TableHead variant="default">Header</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody variant="default">
						<TableRow variant="default">
							<TableCell variant="default">Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with data-state attribute", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow data-state="selected">
							<TableCell>Selected Row</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Normal Row</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with role attributes", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<input type="checkbox" role="checkbox" />
							</TableCell>
							<TableCell>Data with checkbox</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with complex content", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<div className="flex items-center">
									<span>Complex Header</span>
								</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>
								<div className="flex flex-col">
									<span className="font-bold">Title</span>
									<span className="text-sm text-gray-500">Subtitle</span>
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with numeric data", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Count</TableHead>
							<TableHead>Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>{1}</TableCell>
							<TableCell>{100}</TableCell>
							<TableCell>{29.99}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>{2}</TableCell>
							<TableCell>{250}</TableCell>
							<TableCell>{49.99}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with empty cells", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Not Empty</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with aria attributes", () => {
			const { container } = render(
				<Table aria-label="User data table" aria-describedby="table-description">
					<TableCaption id="table-description">List of users and their roles</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead scope="col">Name</TableHead>
							<TableHead scope="col">Role</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>John</TableCell>
							<TableCell>Admin</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with multiple header rows", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead colSpan={2}>Group 1</TableHead>
							<TableHead colSpan={2}>Group 2</TableHead>
						</TableRow>
						<TableRow>
							<TableHead>A</TableHead>
							<TableHead>B</TableHead>
							<TableHead>C</TableHead>
							<TableHead>D</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>1</TableCell>
							<TableCell>2</TableCell>
							<TableCell>3</TableCell>
							<TableCell>4</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with footer and totals", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Item</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Product A</TableCell>
							<TableCell>10</TableCell>
							<TableCell>$100</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Product B</TableCell>
							<TableCell>5</TableCell>
							<TableCell>$50</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>Total</TableCell>
							<TableCell>15</TableCell>
							<TableCell>$150</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for responsive table with many columns", () => {
			const { container } = render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Department</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>1</TableCell>
							<TableCell>John Doe</TableCell>
							<TableCell>john@example.com</TableCell>
							<TableCell>Admin</TableCell>
							<TableCell>IT</TableCell>
							<TableCell>Active</TableCell>
							<TableCell>Edit | Delete</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for table with mixed content types", () => {
			const { container } = render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Text</TableCell>
							<TableCell>{42}</TableCell>
							<TableCell>
								<button>Action</button>
							</TableCell>
							<TableCell>
								<span className="badge">Badge</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
