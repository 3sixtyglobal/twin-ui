// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumb } from "./breadcrumb";
import type { BreadcrumbItem } from "./breadcrumbProps";

// Mock icon component
const MockIcon = vi.fn(() => <svg data-testid="mock-icon" />);

describe("Breadcrumb", () => {
	describe("Unit Tests", () => {
		it("renders breadcrumb with basic items", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/" },
				{ label: "Products", href: "/products" },
				{ label: "Current Page" }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Products")).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
		});

		it("renders breadcrumb with default aria-label", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			render(<Breadcrumb items={items} />);

			expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
		});

		it("renders breadcrumb with custom aria-label", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			render(<Breadcrumb items={items} ariaLabel="Navigation breadcrumb" />);

			expect(screen.getByLabelText("Navigation breadcrumb")).toBeInTheDocument();
		});

		it("renders breadcrumb with className", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			render(<Breadcrumb items={items} className="custom-breadcrumb" />);

			expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having icons", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: MockIcon },
				{ label: "Products", href: "/products", icon: MockIcon }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Products")).toBeInTheDocument();
			expect(screen.getAllByTestId("mock-icon")).toHaveLength(2);
		});

		it("renders breadcrumb with items without href", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Current Page" }];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
		});

		it("renders breadcrumb with empty items array", () => {
			render(<Breadcrumb items={[]} />);

			expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
		});

		it("renders breadcrumb with undefined items", () => {
			render(<Breadcrumb items={undefined} />);

			expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
		});

		it("renders breadcrumb with single item", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
		});

		it("renders breadcrumb with many items", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/" },
				{ label: "Category", href: "/category" },
				{ label: "Subcategory", href: "/category/subcategory" },
				{ label: "Product", href: "/category/subcategory/product" },
				{ label: "Current Page" }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Category")).toBeInTheDocument();
			expect(screen.getByText("Subcategory")).toBeInTheDocument();
			expect(screen.getByText("Product")).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having special characters", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home & Garden", href: "/" },
				{ label: "Products > Electronics", href: "/products" },
				{ label: 'Current "Page"' }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home & Garden")).toBeInTheDocument();
			expect(screen.getByText("Products > Electronics")).toBeInTheDocument();
			expect(screen.getByText('Current "Page"')).toBeInTheDocument();
		});

		it("renders breadcrumb with items having unicode characters", () => {
			const items: BreadcrumbItem[] = [
				{ label: "首页", href: "/" },
				{ label: "产品", href: "/products" },
				{ label: "当前页面 🏠" }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("首页")).toBeInTheDocument();
			expect(screen.getByText("产品")).toBeInTheDocument();
			expect(screen.getByText("当前页面 🏠")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having long labels", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/" },
				{
					label: "This is a very long breadcrumb item label that should be handled properly",
					href: "/long"
				},
				{ label: "Current Page" }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(
				screen.getByText(
					"This is a very long breadcrumb item label that should be handled properly"
				)
			).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having empty labels", () => {
			const items: BreadcrumbItem[] = [
				{ label: "", href: "/" },
				{ label: "Valid Label", href: "/valid" },
				{ label: "", href: "/empty" }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Valid Label")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having complex hrefs", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/" },
				{ label: "Search", href: "/search?q=test&category=all" },
				{ label: "Product", href: "/product/123?ref=breadcrumb&utm_source=nav" }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Search")).toBeInTheDocument();
			expect(screen.getByText("Product")).toBeInTheDocument();
		});

		it("renders breadcrumb with mixed item configurations", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: MockIcon },
				{ label: "Category", href: "/category" },
				{ label: "Current", icon: MockIcon }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Category")).toBeInTheDocument();
			expect(screen.getByText("Current")).toBeInTheDocument();
			expect(screen.getAllByTestId("mock-icon")).toHaveLength(2);
		});

		it("renders breadcrumb with all props provided", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: MockIcon },
				{ label: "Current Page" }
			];

			render(
				<Breadcrumb
					items={items}
					ariaLabel="Custom breadcrumb navigation"
					className="custom-breadcrumb-class"
				/>
			);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
			expect(screen.getByLabelText("Custom breadcrumb navigation")).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders breadcrumb with no props", () => {
			render(<Breadcrumb />);

			expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
		});

		it("renders breadcrumb with null items", () => {
			render(<Breadcrumb items={null as any} />);

			expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having undefined href", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: undefined },
				{ label: "Current Page", href: undefined }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having null href", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: null as any },
				{ label: "Current Page", href: null as any }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having empty string href", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "" },
				{ label: "Current Page", href: "" }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having undefined icon", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: undefined },
				{ label: "Current Page", icon: undefined }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
		});

		it("renders breadcrumb with items having null icon", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: null as any },
				{ label: "Current Page", icon: null as any }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("Current Page")).toBeInTheDocument();
		});

		it("renders breadcrumb with complex nested navigation", () => {
			const items: BreadcrumbItem[] = [
				{ label: "🏠 Home", href: "/", icon: MockIcon },
				{ label: "📁 Categories", href: "/categories" },
				{ label: "💻 Electronics", href: "/categories/electronics" },
				{ label: "📱 Smartphones", href: "/categories/electronics/smartphones" },
				{ label: "📱 iPhone 15 Pro" }
			];

			render(<Breadcrumb items={items} />);

			expect(screen.getByText("🏠 Home")).toBeInTheDocument();
			expect(screen.getByText("📁 Categories")).toBeInTheDocument();
			expect(screen.getByText("💻 Electronics")).toBeInTheDocument();
			expect(screen.getByText("📱 Smartphones")).toBeInTheDocument();
			expect(screen.getByText("📱 iPhone 15 Pro")).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for breadcrumb with basic items", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/" },
				{ label: "Products", href: "/products" },
				{ label: "Current Page" }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with default aria-label", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with custom aria-label", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			const { container } = render(<Breadcrumb items={items} ariaLabel="Navigation breadcrumb" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with className", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			const { container } = render(<Breadcrumb items={items} className="custom-breadcrumb" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having icons", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: MockIcon },
				{ label: "Products", href: "/products", icon: MockIcon }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items without href", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }, { label: "Current Page" }];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with empty items array", () => {
			const { container } = render(<Breadcrumb items={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with undefined items", () => {
			const { container } = render(<Breadcrumb items={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with single item", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with many items", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/" },
				{ label: "Category", href: "/category" },
				{ label: "Subcategory", href: "/category/subcategory" },
				{ label: "Product", href: "/category/subcategory/product" },
				{ label: "Current Page" }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having special characters", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home & Garden", href: "/" },
				{ label: "Products > Electronics", href: "/products" },
				{ label: 'Current "Page"' }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having unicode characters", () => {
			const items: BreadcrumbItem[] = [
				{ label: "首页", href: "/" },
				{ label: "产品", href: "/products" },
				{ label: "当前页面 🏠" }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having long labels", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/" },
				{
					label: "This is a very long breadcrumb item label that should be handled properly",
					href: "/long"
				},
				{ label: "Current Page" }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having empty labels", () => {
			const items: BreadcrumbItem[] = [
				{ label: "", href: "/" },
				{ label: "Valid Label", href: "/valid" },
				{ label: "", href: "/empty" }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having complex hrefs", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/" },
				{ label: "Search", href: "/search?q=test&category=all" },
				{ label: "Product", href: "/product/123?ref=breadcrumb&utm_source=nav" }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with mixed item configurations", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: MockIcon },
				{ label: "Category", href: "/category" },
				{ label: "Current", icon: MockIcon }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with all props provided", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: MockIcon },
				{ label: "Current Page" }
			];

			const { container } = render(
				<Breadcrumb
					items={items}
					ariaLabel="Custom breadcrumb navigation"
					className="custom-breadcrumb-class"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with no props", () => {
			const { container } = render(<Breadcrumb />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with null items", () => {
			const { container } = render(<Breadcrumb items={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having undefined href", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: undefined },
				{ label: "Current Page", href: undefined }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having null href", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: null as any },
				{ label: "Current Page", href: null as any }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having empty string href", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "" },
				{ label: "Current Page", href: "" }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having undefined icon", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: undefined },
				{ label: "Current Page", icon: undefined }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with items having null icon", () => {
			const items: BreadcrumbItem[] = [
				{ label: "Home", href: "/", icon: null as any },
				{ label: "Current Page", icon: null as any }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with complex nested navigation", () => {
			const items: BreadcrumbItem[] = [
				{ label: "🏠 Home", href: "/", icon: MockIcon },
				{ label: "📁 Categories", href: "/categories" },
				{ label: "💻 Electronics", href: "/categories/electronics" },
				{ label: "📱 Smartphones", href: "/categories/electronics/smartphones" },
				{ label: "📱 iPhone 15 Pro" }
			];

			const { container } = render(<Breadcrumb items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for breadcrumb with all aria-label combinations", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			const combinations = [
				{ ariaLabel: undefined },
				{ ariaLabel: "Custom breadcrumb" },
				{ ariaLabel: "" }
			];

			combinations.forEach(({ ariaLabel }, index) => {
				const { container } = render(<Breadcrumb items={items} ariaLabel={ariaLabel} />);
				expect(container.firstChild).toMatchSnapshot(`breadcrumb aria-label ${index}`);
			});
		});

		it("matches snapshot for breadcrumb with all className combinations", () => {
			const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

			const combinations = [
				{ className: undefined },
				{ className: "custom-class" },
				{ className: "" }
			];

			combinations.forEach(({ className }, index) => {
				const { container } = render(<Breadcrumb items={items} className={className} />);
				expect(container.firstChild).toMatchSnapshot(`breadcrumb className ${index}`);
			});
		});
	});
});
