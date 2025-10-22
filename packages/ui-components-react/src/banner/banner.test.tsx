// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Banner } from "./banner";

// Mock the X icon component
vi.mock("../icons/x", () => ({
	X: vi.fn(() => <svg data-testid="x-icon" />)
}));

describe("Banner", () => {
	describe("Unit Tests", () => {
		it("renders banner with default props", () => {
			render(<Banner>Banner content</Banner>);

			expect(screen.getByText("Banner content")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with children content", () => {
			render(<Banner>Welcome to our site!</Banner>);

			expect(screen.getByText("Welcome to our site!")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with bottom prop set to false (default)", () => {
			render(<Banner bottom={false}>Top banner</Banner>);

			expect(screen.getByText("Top banner")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with bottom prop set to true", () => {
			render(<Banner bottom={true}>Bottom banner</Banner>);

			expect(screen.getByText("Bottom banner")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with JSX children", () => {
			render(
				<Banner>
					<div>
						<h2>Important Notice</h2>
						<p>Please read this carefully.</p>
					</div>
				</Banner>
			);

			expect(screen.getByText("Important Notice")).toBeInTheDocument();
			expect(screen.getByText("Please read this carefully.")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with complex nested content", () => {
			render(
				<Banner>
					<div className="flex items-center">
						<span className="mr-2">🔔</span>
						<div>
							<strong>New Feature Available!</strong>
							<p className="text-sm">Check out our latest updates.</p>
						</div>
					</div>
				</Banner>
			);

			expect(screen.getByText("🔔")).toBeInTheDocument();
			expect(screen.getByText("New Feature Available!")).toBeInTheDocument();
			expect(screen.getByText("Check out our latest updates.")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with string content", () => {
			const content = "Simple banner message";
			render(<Banner>{content}</Banner>);

			expect(screen.getByText(content)).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with number content", () => {
			render(<Banner>{42}</Banner>);

			expect(screen.getByText("42")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with boolean content", () => {
			render(<Banner>{true}</Banner>);

			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with array content", () => {
			render(<Banner>{["Hello", " ", "World"]}</Banner>);

			expect(screen.getByText("Hello World")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with null children", () => {
			render(<Banner>{null}</Banner>);

			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with undefined children", () => {
			render(<Banner>{undefined}</Banner>);

			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with empty string children", () => {
			render(<Banner>{""}</Banner>);

			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with multiple elements", () => {
			render(
				<Banner>
					<span>First element</span>
					<span>Second element</span>
					<div>Third element</div>
				</Banner>
			);

			expect(screen.getByText("First element")).toBeInTheDocument();
			expect(screen.getByText("Second element")).toBeInTheDocument();
			expect(screen.getByText("Third element")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with long text content", () => {
			const longText =
				"This is a very long banner text that should be handled properly by the banner component and should not break the layout or cause any rendering issues.";
			render(<Banner>{longText}</Banner>);

			expect(screen.getByText(longText)).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with special characters", () => {
			render(
				<Banner>
					Special & Characters: <script>alert("test")</script>
				</Banner>
			);

			expect(screen.getByText("Special & Characters:")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with unicode characters", () => {
			render(<Banner>Unicode: 你好世界 🚀✨🎉</Banner>);

			expect(screen.getByText("Unicode: 你好世界 🚀✨🎉")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with form elements", () => {
			render(
				<Banner>
					<form>
						<input type="email" placeholder="Enter email" />
						<button type="submit">Subscribe</button>
					</form>
				</Banner>
			);

			expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
			expect(screen.getByText("Subscribe")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with links", () => {
			render(
				<Banner>
					<a href="/help">Need help?</a>
					<a href="/contact">Contact us</a>
				</Banner>
			);

			expect(screen.getByText("Need help?")).toBeInTheDocument();
			expect(screen.getByText("Contact us")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with buttons", () => {
			render(
				<Banner>
					<button>Action 1</button>
					<button>Action 2</button>
				</Banner>
			);

			expect(screen.getByText("Action 1")).toBeInTheDocument();
			expect(screen.getByText("Action 2")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with mixed content types", () => {
			render(
				<Banner>
					<span>Text content</span>
					<div>JSX content</div>
				</Banner>
			);

			expect(screen.getByText("Text content")).toBeInTheDocument();
			expect(screen.getByText("JSX content")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with className in children", () => {
			render(
				<Banner>
					<div className="custom-banner-content">
						<p className="text-lg font-bold">Styled content</p>
					</div>
				</Banner>
			);

			expect(screen.getByText("Styled content")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with data attributes in children", () => {
			render(
				<Banner>
					<div data-testid="banner-content" data-analytics="banner-click">
						Analytics content
					</div>
				</Banner>
			);

			expect(screen.getByTestId("banner-content")).toBeInTheDocument();
			expect(screen.getByText("Analytics content")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with event handlers in children", () => {
			const handleClick = vi.fn();
			render(
				<Banner>
					<button onClick={handleClick}>Click me</button>
				</Banner>
			);

			expect(screen.getByText("Click me")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});

		it("renders banner with accessibility attributes in children", () => {
			render(
				<Banner>
					<div role="alert" aria-live="polite">
						Important announcement
					</div>
				</Banner>
			);

			expect(screen.getByRole("alert")).toBeInTheDocument();
			expect(screen.getByText("Important announcement")).toBeInTheDocument();
			expect(screen.getByTestId("x-icon")).toBeInTheDocument();
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for banner with default props", () => {
			const { container } = render(<Banner>Banner content</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with bottom prop false", () => {
			const { container } = render(<Banner bottom={false}>Top banner</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with bottom prop true", () => {
			const { container } = render(<Banner bottom={true}>Bottom banner</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with JSX children", () => {
			const { container } = render(
				<Banner>
					<div>
						<h2>Important Notice</h2>
						<p>Please read this carefully.</p>
					</div>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with complex nested content", () => {
			const { container } = render(
				<Banner>
					<div className="flex items-center">
						<span className="mr-2">🔔</span>
						<div>
							<strong>New Feature Available!</strong>
							<p className="text-sm">Check out our latest updates.</p>
						</div>
					</div>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with string content", () => {
			const { container } = render(<Banner>Simple banner message</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with number content", () => {
			const { container } = render(<Banner>{42}</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with boolean content", () => {
			const { container } = render(<Banner>{true}</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with array content", () => {
			const { container } = render(<Banner>{["Hello", " ", "World"]}</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with null children", () => {
			const { container } = render(<Banner>{null}</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with undefined children", () => {
			const { container } = render(<Banner>{undefined}</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with empty string children", () => {
			const { container } = render(<Banner>{""}</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with multiple elements", () => {
			const { container } = render(
				<Banner>
					<span>First element</span>
					<span>Second element</span>
					<div>Third element</div>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with long text content", () => {
			const longText =
				"This is a very long banner text that should be handled properly by the banner component and should not break the layout or cause any rendering issues.";
			const { container } = render(<Banner>{longText}</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with special characters", () => {
			const { container } = render(
				<Banner>
					Special & Characters: <script>alert("test")</script>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with unicode characters", () => {
			const { container } = render(<Banner>Unicode: 你好世界 🚀✨🎉</Banner>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with form elements", () => {
			const { container } = render(
				<Banner>
					<form>
						<input type="email" placeholder="Enter email" />
						<button type="submit">Subscribe</button>
					</form>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with links", () => {
			const { container } = render(
				<Banner>
					<a href="/help">Need help?</a>
					<a href="/contact">Contact us</a>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with buttons", () => {
			const { container } = render(
				<Banner>
					<button>Action 1</button>
					<button>Action 2</button>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with mixed content types", () => {
			const { container } = render(
				<Banner>
					<span>Text content</span>
					{42}
					<div>JSX content</div>
					{["Array", " ", "content"]}
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with className in children", () => {
			const { container } = render(
				<Banner>
					<div className="custom-banner-content">
						<p className="text-lg font-bold">Styled content</p>
					</div>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with data attributes in children", () => {
			const { container } = render(
				<Banner>
					<div data-testid="banner-content" data-analytics="banner-click">
						Analytics content
					</div>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with accessibility attributes in children", () => {
			const { container } = render(
				<Banner>
					<div role="alert" aria-live="polite">
						Important announcement
					</div>
				</Banner>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for banner with all bottom prop combinations", () => {
			const combinations = [false, true];

			combinations.forEach((bottom, index) => {
				const { container } = render(<Banner bottom={bottom}>Banner {index}</Banner>);
				expect(container.firstChild).toMatchSnapshot(`banner bottom ${bottom}`);
			});
		});
	});
});
