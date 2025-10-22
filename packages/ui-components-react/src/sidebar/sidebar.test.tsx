// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sidebar } from "./sidebar";
import React from "react";

describe("Sidebar", () => {
	// Mock icon component for testing purposes
	const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

	// Unit Tests
	describe("Unit Tests", () => {
		it("renders sidebar with default props", () => {
			render(<Sidebar />);
			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toBeInTheDocument();
			expect(sidebar).toHaveAttribute("aria-label", "Navigation sidebar");
		});

		it("renders sidebar with custom aria-label", () => {
			render(<Sidebar ariaLabel="Custom sidebar" />);
			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toHaveAttribute("aria-label", "Custom sidebar");
		});

		it("renders sidebar with logo", () => {
			const logo = {
				label: "My Brand",
				img: "/logo.png",
				imgAlt: "Brand Logo",
				href: "/home"
			};
			render(<Sidebar logo={logo} />);
			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toBeInTheDocument();
			// Logo is rendered as a link with the brand text
			expect(screen.getByRole("link", { name: /my brand/i })).toBeInTheDocument();
			expect(screen.getByText("My Brand")).toBeInTheDocument();
		});

		it("renders sidebar with logo without href", () => {
			const logo = {
				label: "My Brand",
				img: "/logo.png",
				imgAlt: "Brand Logo"
			};
			render(<Sidebar logo={logo} />);
			const logoElement = screen.getByRole("link", { name: /my brand/i });
			expect(logoElement).toHaveAttribute("href", "#");
		});

		it("renders sidebar with logo without imgAlt", () => {
			const logo = {
				label: "My Brand",
				img: "/logo.png",
				href: "/home"
			};
			render(<Sidebar logo={logo} />);
			const logoElement = screen.getByRole("link", { name: /my brand/i });
			const img = logoElement.querySelector("img");
			expect(img).toHaveAttribute("alt", "");
		});

		it("renders sidebar with basic items", () => {
			const items = [
				{ label: "Home", href: "/home" },
				{ label: "About", href: "/about" }
			];
			render(<Sidebar items={items} />);
			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toBeInTheDocument();
			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("About")).toBeInTheDocument();
		});

		it("renders sidebar with items with icons", () => {
			const items = [
				{ label: "Home", href: "/home", icon: MockIcon },
				{ label: "About", href: "/about", icon: MockIcon }
			];
			render(<Sidebar items={items} />);
			expect(screen.getAllByTestId("mock-icon")).toHaveLength(2);
			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("About")).toBeInTheDocument();
		});

		it("renders sidebar with active items", () => {
			const items = [
				{ label: "Home", href: "/home", active: true },
				{ label: "About", href: "/about", active: false }
			];
			render(<Sidebar items={items} />);
			const sidebarItems = screen.getAllByRole("link");
			expect(sidebarItems).toHaveLength(2);
			// Real Flowbite components don't expose data-active attributes
		});

		it("renders sidebar with disabled items", () => {
			const items = [
				{ label: "Home", href: "/home", disabled: true },
				{ label: "About", href: "/about", disabled: false }
			];
			render(<Sidebar items={items} />);
			const sidebarItems = screen.getAllByRole("link");
			expect(sidebarItems).toHaveLength(2);
			// Real Flowbite components don't expose data-disabled attributes
		});

		it("renders sidebar with nested items", () => {
			const items = [
				{
					label: "Settings",
					href: "/settings",
					items: [
						{ label: "Profile", href: "/profile" },
						{ label: "Account", href: "/account" }
					]
				}
			];
			render(<Sidebar items={items} />);
			// Collapse is rendered as a button
			expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument();
			expect(screen.getByText("Settings")).toBeInTheDocument();
			expect(screen.getByText("Profile")).toBeInTheDocument();
			expect(screen.getByText("Account")).toBeInTheDocument();
		});

		it("renders sidebar with nested items with icons", () => {
			const items = [
				{
					label: "Settings",
					href: "/settings",
					icon: MockIcon,
					items: [
						{ label: "Profile", href: "/profile", icon: MockIcon },
						{ label: "Account", href: "/account", icon: MockIcon }
					]
				}
			];
			render(<Sidebar items={items} />);
			// Collapse is rendered as a button
			expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument();
			expect(screen.getAllByTestId("mock-icon")).toHaveLength(3);
		});

		it("renders sidebar with disabled nested items", () => {
			const items = [
				{
					label: "Settings",
					href: "/settings",
					disabled: true,
					items: [
						{ label: "Profile", href: "/profile" },
						{ label: "Account", href: "/account" }
					]
				}
			];
			render(<Sidebar items={items} />);
			const collapse = screen.getByRole("button", { name: /settings/i });
			expect(collapse).toHaveAttribute("disabled");
		});

		it("renders sidebar with CTA", () => {
			const CTA = <div data-testid="cta-content">Call to Action</div>;
			render(<Sidebar CTA={CTA} />);
			expect(screen.getByTestId("sidebar-cta")).toBeInTheDocument();
			expect(screen.getByTestId("cta-content")).toBeInTheDocument();
		});

		it("renders sidebar with header", () => {
			const header = <div data-testid="header-content">Header Content</div>;
			render(<Sidebar header={header} />);
			expect(screen.getByTestId("sidebar-header")).toBeInTheDocument();
			expect(screen.getByTestId("header-content")).toBeInTheDocument();
		});

		it("renders sidebar with children", () => {
			const children = <div data-testid="children-content">Children Content</div>;
			render(<Sidebar>{children}</Sidebar>);
			expect(screen.getByTestId("children-content")).toBeInTheDocument();
		});

		it("renders sidebar with footer content", () => {
			const footerContent = <div data-testid="footer-content">Footer Content</div>;
			render(<Sidebar footerContent={footerContent} />);
			expect(screen.getByTestId("sidebar-footer")).toBeInTheDocument();
			expect(screen.getByTestId("footer-content")).toBeInTheDocument();
		});

		it("renders sidebar with footer items", () => {
			const footerItems = [
				{ label: "Help", href: "/help" },
				{ label: "Contact", href: "/contact" }
			];
			render(<Sidebar footerItems={footerItems} />);
			expect(screen.getByTestId("sidebar-footer")).toBeInTheDocument();
			expect(screen.getByText("Help")).toBeInTheDocument();
			expect(screen.getByText("Contact")).toBeInTheDocument();
		});

		it("renders sidebar with footer content and footer items", () => {
			const footerContent = <div data-testid="footer-content">Footer Content</div>;
			const footerItems = [
				{ label: "Help", href: "/help" },
				{ label: "Contact", href: "/contact" }
			];
			render(<Sidebar footerContent={footerContent} footerItems={footerItems} />);
			expect(screen.getByTestId("sidebar-footer")).toBeInTheDocument();
			expect(screen.getByTestId("footer-content")).toBeInTheDocument();
			expect(screen.getByText("Help")).toBeInTheDocument();
			expect(screen.getByText("Contact")).toBeInTheDocument();
		});

		it("renders sidebar with empty items array", () => {
			render(<Sidebar items={[]} />);
			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toBeInTheDocument();
			expect(screen.queryByTestId("flowbite-sidebar-items")).not.toBeInTheDocument();
		});

		it("renders sidebar with undefined items", () => {
			render(<Sidebar items={undefined} />);
			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toBeInTheDocument();
			expect(screen.queryByTestId("flowbite-sidebar-items")).not.toBeInTheDocument();
		});

		it("renders sidebar with null items", () => {
			render(<Sidebar items={undefined} />);
			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toBeInTheDocument();
			expect(screen.queryByTestId("flowbite-sidebar-items")).not.toBeInTheDocument();
		});

		it("renders sidebar with undefined footer items", () => {
			render(<Sidebar footerItems={undefined} />);
			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toBeInTheDocument();
			expect(screen.queryByTestId("sidebar-footer")).not.toBeInTheDocument();
		});

		it("renders sidebar with null footer items", () => {
			render(<Sidebar footerItems={undefined} />);
			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toBeInTheDocument();
			expect(screen.queryByTestId("sidebar-footer")).not.toBeInTheDocument();
		});

		it("renders sidebar with complex nested structure", () => {
			const items = [
				{
					label: "Dashboard",
					href: "/dashboard",
					icon: MockIcon,
					active: true
				},
				{
					label: "Settings",
					href: "/settings",
					icon: MockIcon,
					items: [
						{
							label: "Profile",
							href: "/profile",
							icon: MockIcon,
							badge: "New"
						},
						{
							label: "Account",
							href: "/account",
							icon: MockIcon,
							disabled: true
						}
					]
				}
			];
			render(<Sidebar items={items} />);
			expect(screen.getByText("Dashboard")).toBeInTheDocument();
			expect(screen.getByText("Settings")).toBeInTheDocument();
			expect(screen.getByText("Profile")).toBeInTheDocument();
			expect(screen.getByText("Account")).toBeInTheDocument();
			expect(screen.getByText("New")).toBeInTheDocument();
		});

		it("renders sidebar with all props combined", () => {
			const logo = {
				label: "My Brand",
				img: "/logo.png",
				imgAlt: "Brand Logo",
				href: "/home"
			};
			const items = [
				{ label: "Home", href: "/home", icon: MockIcon, active: true },
				{ label: "About", href: "/about", icon: MockIcon, badge: "5" }
			];
			const CTA = <div data-testid="cta-content">CTA</div>;
			const header = <div data-testid="header-content">Header</div>;
			const children = <div data-testid="children-content">Children</div>;
			const footerContent = <div data-testid="footer-content">Footer</div>;
			const footerItems = [
				{ label: "Help", href: "/help" },
				{ label: "Contact", href: "/contact" }
			];

			render(
				<Sidebar
					logo={logo}
					items={items}
					CTA={CTA}
					header={header}
					footerContent={footerContent}
					footerItems={footerItems}
					ariaLabel="Complete Sidebar"
				>
					{children}
				</Sidebar>
			);

			const sidebar = screen.getByRole("navigation");
			expect(sidebar).toBeInTheDocument();
			expect(sidebar).toHaveAttribute("aria-label", "Complete Sidebar");
			// Logo is rendered as a link with the brand text
			expect(screen.getByRole("link", { name: /my brand/i })).toBeInTheDocument();
			expect(screen.getByText("My Brand")).toBeInTheDocument();
			expect(screen.getByText("Home")).toBeInTheDocument();
			expect(screen.getByText("About")).toBeInTheDocument();
			expect(screen.getByText("5")).toBeInTheDocument();
			expect(screen.getByTestId("sidebar-cta")).toBeInTheDocument();
			expect(screen.getByTestId("sidebar-header")).toBeInTheDocument();
			expect(screen.getByTestId("children-content")).toBeInTheDocument();
			expect(screen.getByTestId("sidebar-footer")).toBeInTheDocument();
			expect(screen.getByText("Help")).toBeInTheDocument();
			expect(screen.getByText("Contact")).toBeInTheDocument();
		});

		it("renders sidebar with special characters in labels", () => {
			const items = [
				{ label: "Special & Characters: <>&\"'`", href: "/special" },
				{ label: "Unicode: éàçüö", href: "/unicode" }
			];
			render(<Sidebar items={items} />);
			expect(screen.getByText(/Special & Characters: <>&"'`/)).toBeInTheDocument();
			expect(screen.getByText("Unicode: éàçüö")).toBeInTheDocument();
		});

		it("renders sidebar with unicode characters in labels", () => {
			const items = [
				{ label: "你好世界", href: "/chinese" },
				{ label: "こんにちは世界", href: "/japanese" }
			];
			render(<Sidebar items={items} />);
			expect(screen.getByText("你好世界")).toBeInTheDocument();
			expect(screen.getByText("こんにちは世界")).toBeInTheDocument();
		});

		it("renders sidebar with long labels", () => {
			const items = [
				{ label: "This is a very long label that should be rendered correctly", href: "/long" }
			];
			render(<Sidebar items={items} />);
			expect(
				screen.getByText("This is a very long label that should be rendered correctly")
			).toBeInTheDocument();
		});
	});

	// Snapshot Tests
	describe("Snapshot Tests", () => {
		it("matches snapshot for sidebar with default props", () => {
			const { container } = render(<Sidebar />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with custom aria-label", () => {
			const { container } = render(<Sidebar ariaLabel="Custom sidebar" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with logo", () => {
			const logo = {
				label: "My Brand",
				img: "/logo.png",
				imgAlt: "Brand Logo",
				href: "/home"
			};
			const { container } = render(<Sidebar logo={logo} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with logo without href", () => {
			const logo = {
				label: "My Brand",
				img: "/logo.png",
				imgAlt: "Brand Logo"
			};
			const { container } = render(<Sidebar logo={logo} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with logo without imgAlt", () => {
			const logo = {
				label: "My Brand",
				img: "/logo.png",
				href: "/home"
			};
			const { container } = render(<Sidebar logo={logo} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with basic items", () => {
			const items = [
				{ label: "Home", href: "/home" },
				{ label: "About", href: "/about" }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with items with icons", () => {
			const items = [
				{ label: "Home", href: "/home", icon: MockIcon },
				{ label: "About", href: "/about", icon: MockIcon }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with active items", () => {
			const items = [
				{ label: "Home", href: "/home", active: true },
				{ label: "About", href: "/about", active: false }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with disabled items", () => {
			const items = [
				{ label: "Home", href: "/home", disabled: true },
				{ label: "About", href: "/about", disabled: false }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with items with badges", () => {
			const items = [
				{ label: "Home", href: "/home", badge: "5" },
				{ label: "About", href: "/about", badge: "New" }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with nested items", () => {
			const items = [
				{
					label: "Settings",
					href: "/settings",
					items: [
						{ label: "Profile", href: "/profile" },
						{ label: "Account", href: "/account" }
					]
				}
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with nested items with icons", () => {
			const items = [
				{
					label: "Settings",
					href: "/settings",
					icon: MockIcon,
					items: [
						{ label: "Profile", href: "/profile", icon: MockIcon },
						{ label: "Account", href: "/account", icon: MockIcon }
					]
				}
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with disabled nested items", () => {
			const items = [
				{
					label: "Settings",
					href: "/settings",
					disabled: true,
					items: [
						{ label: "Profile", href: "/profile" },
						{ label: "Account", href: "/account" }
					]
				}
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with CTA", () => {
			const CTA = <div data-testid="cta-content">Call to Action</div>;
			const { container } = render(<Sidebar CTA={CTA} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with header", () => {
			const header = <div data-testid="header-content">Header Content</div>;
			const { container } = render(<Sidebar header={header} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with children", () => {
			const children = <div data-testid="children-content">Children Content</div>;
			const { container } = render(<Sidebar>{children}</Sidebar>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with footer content", () => {
			const footerContent = <div data-testid="footer-content">Footer Content</div>;
			const { container } = render(<Sidebar footerContent={footerContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with footer items", () => {
			const footerItems = [
				{ label: "Help", href: "/help" },
				{ label: "Contact", href: "/contact" }
			];
			const { container } = render(<Sidebar footerItems={footerItems} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with footer content and footer items", () => {
			const footerContent = <div data-testid="footer-content">Footer Content</div>;
			const footerItems = [
				{ label: "Help", href: "/help" },
				{ label: "Contact", href: "/contact" }
			];
			const { container } = render(
				<Sidebar footerContent={footerContent} footerItems={footerItems} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with empty items array", () => {
			const { container } = render(<Sidebar items={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with undefined items", () => {
			const { container } = render(<Sidebar items={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with null items", () => {
			const { container } = render(<Sidebar items={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with empty footer items array", () => {
			const { container } = render(<Sidebar footerItems={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with undefined footer items", () => {
			const { container } = render(<Sidebar footerItems={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with null footer items", () => {
			const { container } = render(<Sidebar footerItems={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with complex nested structure", () => {
			const items = [
				{
					label: "Dashboard",
					href: "/dashboard",
					icon: MockIcon,
					active: true
				},
				{
					label: "Settings",
					href: "/settings",
					icon: MockIcon,
					items: [
						{
							label: "Profile",
							href: "/profile",
							icon: MockIcon,
							badge: "New"
						},
						{
							label: "Account",
							href: "/account",
							icon: MockIcon,
							disabled: true
						}
					]
				}
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with all props combined", () => {
			const logo = {
				label: "My Brand",
				img: "/logo.png",
				imgAlt: "Brand Logo",
				href: "/home"
			};
			const items = [
				{ label: "Home", href: "/home", icon: MockIcon, active: true },
				{ label: "About", href: "/about", icon: MockIcon, badge: "5" }
			];
			const CTA = <div data-testid="cta-content">CTA</div>;
			const header = <div data-testid="header-content">Header</div>;
			const children = <div data-testid="children-content">Children</div>;
			const footerContent = <div data-testid="footer-content">Footer</div>;
			const footerItems = [
				{ label: "Help", href: "/help" },
				{ label: "Contact", href: "/contact" }
			];

			const { container } = render(
				<Sidebar
					logo={logo}
					items={items}
					CTA={CTA}
					header={header}
					footerContent={footerContent}
					footerItems={footerItems}
					ariaLabel="Complete Sidebar"
				>
					{children}
				</Sidebar>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with special characters in labels", () => {
			const items = [
				{ label: "Special & Characters: <>&\"'`", href: "/special" },
				{ label: "Unicode: éàçüö", href: "/unicode" }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with unicode characters in labels", () => {
			const items = [
				{ label: "你好世界", href: "/chinese" },
				{ label: "こんにちは世界", href: "/japanese" }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with long labels", () => {
			const items = [
				{ label: "This is a very long label that should be rendered correctly", href: "/long" }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with empty string labels", () => {
			const items = [
				{ label: "", href: "/empty" },
				{ label: "Normal", href: "/normal" }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with empty string hrefs", () => {
			const items = [
				{ label: "Home", href: "" },
				{ label: "About", href: "/about" }
			];
			const { container } = render(<Sidebar items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with additional props", () => {
			const { container } = render(<Sidebar data-custom="value" aria-live="polite" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for sidebar with style prop", () => {
			const { container } = render(<Sidebar style={{ backgroundColor: "red", color: "blue" }} />);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
