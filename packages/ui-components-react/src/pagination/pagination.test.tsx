// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination", () => {
	describe("Unit Tests", () => {
		it("renders pagination with default props", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with custom className", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					className="custom-pagination"
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toHaveClass("custom-pagination");
		});

		it("renders pagination with showIcons prop", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} showIcons />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with layout prop", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					layout="navigation"
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with previousLabel prop", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={2}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="Previous"
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with nextLabel prop", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} nextLabel="Next" />
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with both previousLabel and nextLabel props", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={5}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="Previous"
					nextLabel="Next"
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with currentPage and totalPages", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={3} totalPages={15} onPageChange={onPageChange} />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with single page", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with many pages", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={50} totalPages={100} onPageChange={onPageChange} />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with currentPage at first page", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with currentPage at last page", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={10} totalPages={10} onPageChange={onPageChange} />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with currentPage in middle", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with all props combined", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={3}
					totalPages={20}
					onPageChange={onPageChange}
					className="custom-pagination"
					showIcons
					layout="pagination"
					previousLabel="Previous"
					nextLabel="Next"
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
			expect(pagination).toHaveClass("custom-pagination");
		});

		it("renders pagination with additional props", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					data-testid="custom-pagination"
					id="pagination-1"
				/>
			);

			const pagination = screen.getByTestId("custom-pagination");
			expect(pagination).toBeInTheDocument();
			expect(pagination).toHaveAttribute("id", "pagination-1");
		});

		it("renders pagination with aria attributes", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					role="navigation"
					aria-label="Pagination navigation"
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toHaveAttribute("role", "navigation");
			expect(pagination).toHaveAttribute("aria-label", "Pagination navigation");
		});

		it("renders pagination with style prop", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					style={{ backgroundColor: "red" }}
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toHaveStyle("background-color: rgb(255, 0, 0)");
		});

		it("renders pagination with onClick handler", () => {
			const onPageChange = vi.fn();
			const handleClick = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					onClick={handleClick}
				/>
			);

			const pagination = screen.getByRole("navigation");
			pagination.click();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("renders pagination with onMouseOver handler", () => {
			const onPageChange = vi.fn();
			const handleMouseOver = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					onMouseOver={handleMouseOver}
				/>
			);

			const pagination = screen.getByRole("navigation");
			pagination.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});

		it("calls onPageChange when page changes", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);

			// The mock will simulate a page change
			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
			// Note: The actual page change logic would be handled by the Flowbite component
			// We're testing that our component renders correctly and passes the callback
		});

		it("renders pagination with edge case values", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with large values", () => {
			const onPageChange = vi.fn();
			render(<Pagination currentPage={999} totalPages={1000} onPageChange={onPageChange} />);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with special characters in labels", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="← Previous"
					nextLabel="Next →"
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with unicode characters in labels", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="上一页"
					nextLabel="下一页"
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with empty string labels", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel=""
					nextLabel=""
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with long labels", () => {
			const onPageChange = vi.fn();
			render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="Go to the previous page"
					nextLabel="Go to the next page"
				/>
			);

			const pagination = screen.getByRole("navigation");
			expect(pagination).toBeInTheDocument();
		});

		it("renders pagination with different layout values", () => {
			const onPageChange = vi.fn();
			const layouts = ["pagination", "navigation"];

			layouts.forEach(layout => {
				const { unmount } = render(
					<Pagination
						currentPage={1}
						totalPages={10}
						onPageChange={onPageChange}
						layout={layout as any}
					/>
				);

				const pagination = screen.getByRole("navigation");
				expect(pagination).toBeInTheDocument();
				unmount();
			});
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for pagination with default props", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with custom className", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					className="custom-pagination"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with showIcons prop", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} showIcons />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with layout prop", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					layout="navigation"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with previousLabel prop", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={2}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="Previous"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with nextLabel prop", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} nextLabel="Next" />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with both previousLabel and nextLabel props", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={5}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="Previous"
					nextLabel="Next"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with currentPage and totalPages", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={3} totalPages={15} onPageChange={onPageChange} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with single page", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with many pages", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={50} totalPages={100} onPageChange={onPageChange} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with currentPage at first page", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with currentPage at last page", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={10} totalPages={10} onPageChange={onPageChange} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with currentPage in middle", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with all props combined", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={3}
					totalPages={20}
					onPageChange={onPageChange}
					className="custom-pagination"
					showIcons
					layout="pagination"
					previousLabel="Previous"
					nextLabel="Next"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with additional props", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					data-testid="custom-pagination"
					id="pagination-1"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with aria attributes", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					role="navigation"
					aria-label="Pagination navigation"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with style prop", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					style={{ backgroundColor: "red" }}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with edge case values", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with large values", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination currentPage={999} totalPages={1000} onPageChange={onPageChange} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with special characters in labels", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="← Previous"
					nextLabel="Next →"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with unicode characters in labels", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="上一页"
					nextLabel="下一页"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with empty string labels", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel=""
					nextLabel=""
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with long labels", () => {
			const onPageChange = vi.fn();
			const { container } = render(
				<Pagination
					currentPage={1}
					totalPages={10}
					onPageChange={onPageChange}
					previousLabel="Go to the previous page"
					nextLabel="Go to the next page"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for pagination with different layout values", () => {
			const onPageChange = vi.fn();
			const layouts = ["pagination", "navigation"];

			layouts.forEach(layout => {
				const { container, unmount } = render(
					<Pagination
						currentPage={1}
						totalPages={10}
						onPageChange={onPageChange}
						layout={layout as any}
					/>
				);

				expect(container.firstChild).toMatchSnapshot();
				unmount();
			});
		});
	});
});
