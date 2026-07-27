// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./footer";

// Mock icon component for testing
const MockIcon = () => <svg data-testid="mock-icon">Icon</svg>;

describe("Footer", () => {
	describe("Unit Tests", () => {
		it("renders footer with default props", () => {
			render(<Footer body="Footer content" />);

			const footer = screen.getByTestId("flowbite-footer");
			expect(footer).toBeInTheDocument();
			expect(footer).toHaveTextContent("Footer content");
		});

		it("renders footer with custom className", () => {
			render(<Footer body="Footer content" className="custom-footer" />);

			const footer = screen.getByTestId("flowbite-footer");
			expect(footer).toHaveClass("custom-footer");
		});

		it("renders footer with complex body content", () => {
			const complexBody = (
				<div>
					<h3>Company Info</h3>
					<p>Contact us</p>
				</div>
			);

			render(<Footer body={complexBody} />);

			expect(screen.getByText("Company Info")).toBeInTheDocument();
			expect(screen.getByText("Contact us")).toBeInTheDocument();
		});

		it("renders footer with string body", () => {
			render(<Footer body="Simple footer text" />);

			expect(screen.getByText("Simple footer text")).toBeInTheDocument();
		});

		it("renders footer with number body", () => {
			render(<Footer body={2024} />);

			expect(screen.getByText("2024")).toBeInTheDocument();
		});

		it("renders footer with boolean body", () => {
			render(<Footer body={true} />);

			const footer = screen.getByTestId("flowbite-footer");
			expect(footer).toBeInTheDocument();
		});

		it("renders footer with array body", () => {
			const arrayBody = ["Item 1", "Item 2", "Item 3"];
			render(<Footer body={arrayBody} />);

			expect(screen.getByText(/Item 1/)).toBeInTheDocument();
			expect(screen.getByText(/Item 2/)).toBeInTheDocument();
			expect(screen.getByText(/Item 3/)).toBeInTheDocument();
		});

		it("renders footer with null body", () => {
			render(<Footer body={null} />);

			const footer = screen.getByTestId("flowbite-footer");
			expect(footer).toBeInTheDocument();
		});

		it("renders footer with undefined body", () => {
			render(<Footer body={undefined} />);

			const footer = screen.getByTestId("flowbite-footer");
			expect(footer).toBeInTheDocument();
		});

		it("renders footer with empty string body", () => {
			render(<Footer body="" />);

			const footer = screen.getByTestId("flowbite-footer");
			expect(footer).toBeInTheDocument();
		});

		it("renders footer with special characters in body", () => {
			render(<Footer body={`Special & Characters: <>&"'`} />);

			expect(screen.getByText("Special & Characters: <>&\"'")).toBeInTheDocument();
		});

		it("renders footer with unicode characters in body", () => {
			render(<Footer body="Unicode: 你好世界 🌍" />);

			expect(screen.getByText("Unicode: 你好世界 🌍")).toBeInTheDocument();
		});

		it("renders footer with long body content", () => {
			const longContent =
				"This is a very long footer content that should be rendered properly without any issues or truncation. It contains multiple sentences and should display correctly in the footer component.";
			render(<Footer body={longContent} />);

			expect(screen.getByText(longContent)).toBeInTheDocument();
		});

		it("renders footer with mixed content body", () => {
			const mixedContent = [
				"Text content",
				42,
				<span key="jsx">JSX Element</span>,
				true,
				null,
				undefined
			];
			render(<Footer body={mixedContent} />);

			expect(screen.getByText(/Text content/)).toBeInTheDocument();
			expect(screen.getByText(/42/)).toBeInTheDocument();
			expect(screen.getByText(/JSX Element/)).toBeInTheDocument();
		});
	});

	describe("Footer.Brand Tests", () => {
		it("renders footer brand with default props", () => {
			render(<Footer body={<Footer.Brand name="Company" />} />);

			const brand = screen.getByTestId("flowbite-footer-brand");
			expect(brand).toBeInTheDocument();
		});

		it("renders footer brand with all props", () => {
			render(
				<Footer
					body={
						<Footer.Brand
							name="Company Name"
							href="https://company.com"
							src="logo.png"
							alt="Company Logo"
						/>
					}
				/>
			);

			const brand = screen.getByTestId("flowbite-footer-brand");
			expect(brand).toBeInTheDocument();
		});

		it("renders footer brand with empty name", () => {
			render(<Footer body={<Footer.Brand name="" />} />);

			const brand = screen.getByTestId("flowbite-footer-brand");
			expect(brand).toBeInTheDocument();
		});

		it("renders footer brand with undefined name", () => {
			render(<Footer body={<Footer.Brand name={undefined} />} />);

			const brand = screen.getByTestId("flowbite-footer-brand");
			expect(brand).toBeInTheDocument();
		});

		it("renders footer brand with null name", () => {
			render(<Footer body={<Footer.Brand name={null as any} />} />);

			const brand = screen.getByTestId("flowbite-footer-brand");
			expect(brand).toBeInTheDocument();
		});

		it("renders footer brand with special characters in name", () => {
			render(<Footer body={<Footer.Brand name="Company & Co. <>" />} />);

			const brand = screen.getByTestId("flowbite-footer-brand");
			expect(brand).toBeInTheDocument();
		});

		it("renders footer brand with unicode characters in name", () => {
			render(<Footer body={<Footer.Brand name="公司名称" />} />);

			const brand = screen.getByTestId("flowbite-footer-brand");
			expect(brand).toBeInTheDocument();
		});
	});

	describe("Footer.Copyright Tests", () => {
		it("renders footer copyright with required props", () => {
			render(<Footer body={<Footer.Copyright by="Company" year={2024} />} />);

			const copyright = screen.getByTestId("flowbite-footer-copyright");
			expect(copyright).toBeInTheDocument();
		});

		it("renders footer copyright with all props", () => {
			render(
				<Footer
					body={<Footer.Copyright by="Company Name" year={2024} href="https://company.com" />}
				/>
			);

			const copyright = screen.getByTestId("flowbite-footer-copyright");
			expect(copyright).toBeInTheDocument();
		});

		it("renders footer copyright with different years", () => {
			render(<Footer body={<Footer.Copyright by="Company" year={2023} />} />);

			const copyright = screen.getByTestId("flowbite-footer-copyright");
			expect(copyright).toBeInTheDocument();
		});

		it("renders footer copyright with zero year", () => {
			render(<Footer body={<Footer.Copyright by="Company" year={0} />} />);

			const copyright = screen.getByTestId("flowbite-footer-copyright");
			expect(copyright).toBeInTheDocument();
		});

		it("renders footer copyright with negative year", () => {
			render(<Footer body={<Footer.Copyright by="Company" year={-1} />} />);

			const copyright = screen.getByTestId("flowbite-footer-copyright");
			expect(copyright).toBeInTheDocument();
		});

		it("renders footer copyright with special characters in by", () => {
			render(<Footer body={<Footer.Copyright by="Company & Co. <>" year={2024} />} />);

			const copyright = screen.getByTestId("flowbite-footer-copyright");
			expect(copyright).toBeInTheDocument();
		});

		it("renders footer copyright with unicode characters in by", () => {
			render(<Footer body={<Footer.Copyright by="公司名称" year={2024} />} />);

			const copyright = screen.getByTestId("flowbite-footer-copyright");
			expect(copyright).toBeInTheDocument();
		});
	});

	describe("Footer.Divider Tests", () => {
		it("renders footer divider", () => {
			render(<Footer body={<Footer.Divider />} />);

			const divider = screen.getByTestId("footer-divider");
			expect(divider).toBeInTheDocument();
		});
	});

	describe("Footer.Icon Tests", () => {
		it("renders footer icon with required props", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with all props", () => {
			render(
				<Footer
					body={
						<Footer.Icon
							icon={MockIcon}
							href="https://example.com"
							className="custom-icon"
							ariaLabel="Social Media Icon"
						/>
					}
				/>
			);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with empty href", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} href="" />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with undefined href", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} href={undefined} />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with null href", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} href={null as any} />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with empty className", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} className="" />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with undefined className", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} className={undefined} />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with null className", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} className={null as any} />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with empty ariaLabel", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} ariaLabel="" />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with undefined ariaLabel", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} ariaLabel={undefined} />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});

		it("renders footer icon with null ariaLabel", () => {
			render(<Footer body={<Footer.Icon icon={MockIcon} ariaLabel={null as any} />} />);

			const icon = screen.getByTestId("mock-icon");
			expect(icon).toBeInTheDocument();
		});
	});

	describe("Footer.Link Tests", () => {
		it("renders footer link with required props", () => {
			render(<Footer body={<Footer.Link href="https://example.com">Link Text</Footer.Link>} />);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
		});

		it("renders footer link with default href", () => {
			render(<Footer body={<Footer.Link>Link Text</Footer.Link>} />);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
		});

		it("renders footer link with empty href", () => {
			render(<Footer body={<Footer.Link href="">Link Text</Footer.Link>} />);

			// Empty href makes it not a link, so we check for the text content instead
			expect(screen.getByText("Link Text")).toBeInTheDocument();
		});

		it("renders footer link with undefined href", () => {
			render(<Footer body={<Footer.Link href={undefined}>Link Text</Footer.Link>} />);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
		});

		it("renders footer link with null href", () => {
			render(<Footer body={<Footer.Link href={null as any}>Link Text</Footer.Link>} />);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
		});

		it("renders footer link with string children", () => {
			render(<Footer body={<Footer.Link href="https://example.com">Simple Link</Footer.Link>} />);

			expect(screen.getByText("Simple Link")).toBeInTheDocument();
		});

		it("renders footer link with JSX children", () => {
			render(
				<Footer
					body={
						<Footer.Link href="https://example.com">
							<span>JSX Link</span>
						</Footer.Link>
					}
				/>
			);

			expect(screen.getByText("JSX Link")).toBeInTheDocument();
		});

		it("renders footer link with number children", () => {
			render(<Footer body={<Footer.Link href="https://example.com">{42}</Footer.Link>} />);

			expect(screen.getByText("42")).toBeInTheDocument();
		});

		it("renders footer link with boolean children", () => {
			render(<Footer body={<Footer.Link href="https://example.com">{true}</Footer.Link>} />);

			const link = screen.getByRole("link");
			expect(link).toBeInTheDocument();
		});

		it("renders footer link with array children", () => {
			render(
				<Footer
					body={<Footer.Link href="https://example.com">{["Part 1", "Part 2"]}</Footer.Link>}
				/>
			);

			expect(screen.getByText(/Part 1/)).toBeInTheDocument();
			expect(screen.getByText(/Part 2/)).toBeInTheDocument();
		});

		it("renders footer link with special characters in children", () => {
			render(
				<Footer body={<Footer.Link href="https://example.com">{`Link & Text <>`}</Footer.Link>} />
			);

			expect(screen.getByText("Link & Text <>")).toBeInTheDocument();
		});

		it("renders footer link with unicode characters in children", () => {
			render(<Footer body={<Footer.Link href="https://example.com">链接文本</Footer.Link>} />);

			expect(screen.getByText("链接文本")).toBeInTheDocument();
		});
	});

	describe("Footer.LinkGroup Tests", () => {
		it("renders footer link group with default props", () => {
			render(
				<Footer
					body={
						<Footer.LinkGroup>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);

			const linkGroup = screen.getByTestId("footer-groupLink");
			expect(linkGroup).toBeInTheDocument();
		});

		it("renders footer link group with col prop", () => {
			render(
				<Footer
					body={
						<Footer.LinkGroup col>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);

			const linkGroup = screen.getByTestId("footer-groupLink");
			expect(linkGroup).toBeInTheDocument();
		});

		it("renders footer link group with col false", () => {
			render(
				<Footer
					body={
						<Footer.LinkGroup col={false}>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);

			const linkGroup = screen.getByTestId("footer-groupLink");
			expect(linkGroup).toBeInTheDocument();
		});

		it("renders footer link group with undefined col", () => {
			render(
				<Footer
					body={
						<Footer.LinkGroup col={undefined}>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);

			const linkGroup = screen.getByTestId("footer-groupLink");
			expect(linkGroup).toBeInTheDocument();
		});

		it("renders footer link group with null col", () => {
			render(
				<Footer
					body={
						<Footer.LinkGroup col={null as any}>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);

			const linkGroup = screen.getByTestId("footer-groupLink");
			expect(linkGroup).toBeInTheDocument();
		});

		it("renders footer link group with string children", () => {
			render(<Footer body={<Footer.LinkGroup>Simple text content</Footer.LinkGroup>} />);

			expect(screen.getByText("Simple text content")).toBeInTheDocument();
		});

		it("renders footer link group with number children", () => {
			render(<Footer body={<Footer.LinkGroup>{42}</Footer.LinkGroup>} />);

			expect(screen.getByText("42")).toBeInTheDocument();
		});

		it("renders footer link group with boolean children", () => {
			render(<Footer body={<Footer.LinkGroup>{true}</Footer.LinkGroup>} />);

			const linkGroup = screen.getByTestId("footer-groupLink");
			expect(linkGroup).toBeInTheDocument();
		});

		it("renders footer link group with array children", () => {
			render(<Footer body={<Footer.LinkGroup>{["Item 1", "Item 2"]}</Footer.LinkGroup>} />);

			expect(screen.getByText(/Item 1/)).toBeInTheDocument();
			expect(screen.getByText(/Item 2/)).toBeInTheDocument();
		});
	});

	describe("Footer.Title Tests", () => {
		it("renders footer title with required props", () => {
			render(<Footer body={<Footer.Title title="Section Title" />} />);

			const title = screen.getByTestId("flowbite-footer-title");
			expect(title).toBeInTheDocument();
		});

		it("renders footer title with empty title", () => {
			render(<Footer body={<Footer.Title title="" />} />);

			const title = screen.getByTestId("flowbite-footer-title");
			expect(title).toBeInTheDocument();
		});

		it("renders footer title with special characters", () => {
			render(<Footer body={<Footer.Title title="Title & Co. <>" />} />);

			const title = screen.getByTestId("flowbite-footer-title");
			expect(title).toBeInTheDocument();
		});

		it("renders footer title with unicode characters", () => {
			render(<Footer body={<Footer.Title title="标题" />} />);

			const title = screen.getByTestId("flowbite-footer-title");
			expect(title).toBeInTheDocument();
		});

		it("renders footer title with long title", () => {
			const longTitle =
				"This is a very long title that should be rendered properly without any issues or truncation";
			render(<Footer body={<Footer.Title title={longTitle} />} />);

			const title = screen.getByTestId("flowbite-footer-title");
			expect(title).toBeInTheDocument();
		});
	});

	describe("Complex Footer Tests", () => {
		it("renders footer with all sub-components", () => {
			render(
				<Footer
					body={
						<div>
							<Footer.Brand name="Company" href="https://company.com" />
							<Footer.Divider />
							<Footer.LinkGroup>
								<Footer.Title title="Links" />
								<Footer.Link href="https://example.com">Link 1</Footer.Link>
								<Footer.Link href="https://example.com">Link 2</Footer.Link>
							</Footer.LinkGroup>
							<Footer.Icon icon={MockIcon} href="https://social.com" />
							<Footer.Copyright by="Company" year={2024} />
						</div>
					}
				/>
			);

			expect(screen.getByTestId("flowbite-footer")).toBeInTheDocument();
			expect(screen.getByTestId("flowbite-footer-brand")).toBeInTheDocument();
			expect(screen.getByTestId("footer-divider")).toBeInTheDocument();
			expect(screen.getByTestId("footer-groupLink")).toBeInTheDocument();
			expect(screen.getByTestId("flowbite-footer-title")).toBeInTheDocument();
			const links = screen.getAllByRole("link");
			expect(links).toHaveLength(4); // Brand link + 2 Footer.Link components + copyright link
			expect(screen.getByTestId("flowbite-footer-icon")).toBeInTheDocument();
			expect(screen.getByTestId("flowbite-footer-copyright")).toBeInTheDocument();
		});

		it("renders footer with multiple link groups", () => {
			render(
				<Footer
					body={
						<div>
							<Footer.LinkGroup>
								<Footer.Title title="Products" />
								<Footer.Link href="/products">Product 1</Footer.Link>
								<Footer.Link href="/products">Product 2</Footer.Link>
							</Footer.LinkGroup>
							<Footer.LinkGroup>
								<Footer.Title title="Support" />
								<Footer.Link href="/support">Help</Footer.Link>
								<Footer.Link href="/support">Contact</Footer.Link>
							</Footer.LinkGroup>
						</div>
					}
				/>
			);

			const linkGroups = screen.getAllByTestId("footer-groupLink");
			expect(linkGroups).toHaveLength(2);
			expect(screen.getByText("Products")).toBeInTheDocument();
			expect(screen.getByText("Support")).toBeInTheDocument();
		});

		it("renders footer with multiple icons", () => {
			render(
				<Footer
					body={
						<div>
							<Footer.Icon icon={MockIcon} href="https://twitter.com" />
							<Footer.Icon icon={MockIcon} href="https://facebook.com" />
							<Footer.Icon icon={MockIcon} href="https://linkedin.com" />
						</div>
					}
				/>
			);

			const icons = screen.getAllByTestId("flowbite-footer-icon");
			expect(icons).toHaveLength(3);
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for footer with default props", () => {
			const { container } = render(<Footer body="Footer content" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with custom className", () => {
			const { container } = render(<Footer body="Footer content" className="custom-footer" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with complex body content", () => {
			const complexBody = (
				<div>
					<h3>Company Info</h3>
					<p>Contact us</p>
				</div>
			);

			const { container } = render(<Footer body={complexBody} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with string body", () => {
			const { container } = render(<Footer body="Simple footer text" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with number body", () => {
			const { container } = render(<Footer body={2024} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with boolean body", () => {
			const { container } = render(<Footer body={true} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with array body", () => {
			const arrayBody = ["Item 1", "Item 2", "Item 3"];
			const { container } = render(<Footer body={arrayBody} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with null body", () => {
			const { container } = render(<Footer body={null} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with undefined body", () => {
			const { container } = render(<Footer body={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with empty string body", () => {
			const { container } = render(<Footer body="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with special characters in body", () => {
			const { container } = render(<Footer body={`Special & Characters: <>&"'`} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with unicode characters in body", () => {
			const { container } = render(<Footer body="Unicode: 你好世界 🌍" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with long body content", () => {
			const longContent =
				"This is a very long footer content that should be rendered properly without any issues or truncation. It contains multiple sentences and should display correctly in the footer component.";
			const { container } = render(<Footer body={longContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with mixed content body", () => {
			const mixedContent = [
				"Text content",
				42,
				<span key="jsx">JSX Element</span>,
				true,
				null,
				undefined
			];
			const { container } = render(<Footer body={mixedContent} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer brand with default props", () => {
			const { container } = render(<Footer body={<Footer.Brand name="Company" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer brand with all props", () => {
			const { container } = render(
				<Footer
					body={
						<Footer.Brand
							name="Company Name"
							href="https://company.com"
							src="logo.png"
							alt="Company Logo"
						/>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer brand with empty name", () => {
			const { container } = render(<Footer body={<Footer.Brand name="" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer brand with undefined name", () => {
			const { container } = render(<Footer body={<Footer.Brand name={undefined} />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer brand with null name", () => {
			const { container } = render(<Footer body={<Footer.Brand name={null as any} />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer brand with special characters in name", () => {
			const { container } = render(<Footer body={<Footer.Brand name="Company & Co. <>" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer brand with unicode characters in name", () => {
			const { container } = render(<Footer body={<Footer.Brand name="公司名称" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer copyright with required props", () => {
			const { container } = render(<Footer body={<Footer.Copyright by="Company" year={2024} />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer copyright with all props", () => {
			const { container } = render(
				<Footer
					body={<Footer.Copyright by="Company Name" year={2024} href="https://company.com" />}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer copyright with different years", () => {
			const { container } = render(<Footer body={<Footer.Copyright by="Company" year={2023} />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer copyright with zero year", () => {
			const { container } = render(<Footer body={<Footer.Copyright by="Company" year={0} />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer copyright with negative year", () => {
			const { container } = render(<Footer body={<Footer.Copyright by="Company" year={-1} />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer copyright with special characters in by", () => {
			const { container } = render(
				<Footer body={<Footer.Copyright by="Company & Co. <>" year={2024} />} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer copyright with unicode characters in by", () => {
			const { container } = render(
				<Footer body={<Footer.Copyright by="公司名称" year={2024} />} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer divider", () => {
			const { container } = render(<Footer body={<Footer.Divider />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with required props", () => {
			const { container } = render(<Footer body={<Footer.Icon icon={MockIcon} />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with all props", () => {
			const { container } = render(
				<Footer
					body={
						<Footer.Icon
							icon={MockIcon}
							href="https://example.com"
							className="custom-icon"
							ariaLabel="Social Media Icon"
						/>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with empty href", () => {
			const { container } = render(<Footer body={<Footer.Icon icon={MockIcon} href="" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with undefined href", () => {
			const { container } = render(
				<Footer body={<Footer.Icon icon={MockIcon} href={undefined} />} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with null href", () => {
			const { container } = render(
				<Footer body={<Footer.Icon icon={MockIcon} href={null as any} />} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with empty className", () => {
			const { container } = render(<Footer body={<Footer.Icon icon={MockIcon} className="" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with undefined className", () => {
			const { container } = render(
				<Footer body={<Footer.Icon icon={MockIcon} className={undefined} />} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with null className", () => {
			const { container } = render(
				<Footer body={<Footer.Icon icon={MockIcon} className={null as any} />} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with empty ariaLabel", () => {
			const { container } = render(<Footer body={<Footer.Icon icon={MockIcon} ariaLabel="" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with undefined ariaLabel", () => {
			const { container } = render(
				<Footer body={<Footer.Icon icon={MockIcon} ariaLabel={undefined} />} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer icon with null ariaLabel", () => {
			const { container } = render(
				<Footer body={<Footer.Icon icon={MockIcon} ariaLabel={null as any} />} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with required props", () => {
			const { container } = render(
				<Footer body={<Footer.Link href="https://example.com">Link Text</Footer.Link>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with default href", () => {
			const { container } = render(<Footer body={<Footer.Link>Link Text</Footer.Link>} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with empty href", () => {
			const { container } = render(<Footer body={<Footer.Link href="">Link Text</Footer.Link>} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with undefined href", () => {
			const { container } = render(
				<Footer body={<Footer.Link href={undefined}>Link Text</Footer.Link>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with null href", () => {
			const { container } = render(
				<Footer body={<Footer.Link href={null as any}>Link Text</Footer.Link>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with string children", () => {
			const { container } = render(
				<Footer body={<Footer.Link href="https://example.com">Simple Link</Footer.Link>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with JSX children", () => {
			const { container } = render(
				<Footer
					body={
						<Footer.Link href="https://example.com">
							<span>JSX Link</span>
						</Footer.Link>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with number children", () => {
			const { container } = render(
				<Footer body={<Footer.Link href="https://example.com">{42}</Footer.Link>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with boolean children", () => {
			const { container } = render(
				<Footer body={<Footer.Link href="https://example.com">{true}</Footer.Link>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with array children", () => {
			const { container } = render(
				<Footer
					body={<Footer.Link href="https://example.com">{["Part 1", "Part 2"]}</Footer.Link>}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with special characters in children", () => {
			const { container } = render(
				<Footer body={<Footer.Link href="https://example.com">{`Link & Text <>`}</Footer.Link>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link with unicode characters in children", () => {
			const { container } = render(
				<Footer body={<Footer.Link href="https://example.com">链接文本</Footer.Link>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link group with default props", () => {
			const { container } = render(
				<Footer
					body={
						<Footer.LinkGroup>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link group with col prop", () => {
			const { container } = render(
				<Footer
					body={
						<Footer.LinkGroup col>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link group with col false", () => {
			const { container } = render(
				<Footer
					body={
						<Footer.LinkGroup col={false}>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link group with undefined col", () => {
			const { container } = render(
				<Footer
					body={
						<Footer.LinkGroup col={undefined}>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link group with null col", () => {
			const { container } = render(
				<Footer
					body={
						<Footer.LinkGroup col={null as any}>
							<Footer.Link href="https://example.com">Link 1</Footer.Link>
							<Footer.Link href="https://example.com">Link 2</Footer.Link>
						</Footer.LinkGroup>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link group with string children", () => {
			const { container } = render(
				<Footer body={<Footer.LinkGroup>Simple text content</Footer.LinkGroup>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link group with number children", () => {
			const { container } = render(<Footer body={<Footer.LinkGroup>{42}</Footer.LinkGroup>} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link group with boolean children", () => {
			const { container } = render(<Footer body={<Footer.LinkGroup>{true}</Footer.LinkGroup>} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer link group with array children", () => {
			const { container } = render(
				<Footer body={<Footer.LinkGroup>{["Item 1", "Item 2"]}</Footer.LinkGroup>} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer title with required props", () => {
			const { container } = render(<Footer body={<Footer.Title title="Section Title" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer title with empty title", () => {
			const { container } = render(<Footer body={<Footer.Title title="" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer title with special characters", () => {
			const { container } = render(<Footer body={<Footer.Title title="Title & Co. <>" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer title with unicode characters", () => {
			const { container } = render(<Footer body={<Footer.Title title="标题" />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer title with long title", () => {
			const longTitle =
				"This is a very long title that should be rendered properly without any issues or truncation";
			const { container } = render(<Footer body={<Footer.Title title={longTitle} />} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with all sub-components", () => {
			const { container } = render(
				<Footer
					body={
						<div>
							<Footer.Brand name="Company" href="https://company.com" />
							<Footer.Divider />
							<Footer.LinkGroup>
								<Footer.Title title="Links" />
								<Footer.Link href="https://example.com">Link 1</Footer.Link>
								<Footer.Link href="https://example.com">Link 2</Footer.Link>
							</Footer.LinkGroup>
							<Footer.Icon icon={MockIcon} href="https://social.com" />
							<Footer.Copyright by="Company" year={2024} />
						</div>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with multiple link groups", () => {
			const { container } = render(
				<Footer
					body={
						<div>
							<Footer.LinkGroup>
								<Footer.Title title="Products" />
								<Footer.Link href="/products">Product 1</Footer.Link>
								<Footer.Link href="/products">Product 2</Footer.Link>
							</Footer.LinkGroup>
							<Footer.LinkGroup>
								<Footer.Title title="Support" />
								<Footer.Link href="/support">Help</Footer.Link>
								<Footer.Link href="/support">Contact</Footer.Link>
							</Footer.LinkGroup>
						</div>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for footer with multiple icons", () => {
			const { container } = render(
				<Footer
					body={
						<div>
							<Footer.Icon icon={MockIcon} href="https://twitter.com" />
							<Footer.Icon icon={MockIcon} href="https://facebook.com" />
							<Footer.Icon icon={MockIcon} href="https://linkedin.com" />
						</div>
					}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
