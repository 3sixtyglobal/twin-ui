// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Card } from "./card";
import { ButtonColors } from "../button/buttonColors";
import { ButtonSizes } from "../button/buttonSizes";

// Mock icon components for testing
const MockIcon = () => (
	<svg data-testid="mock-icon" width="16" height="16" viewBox="0 0 16 16">
		<circle cx="8" cy="8" r="4" fill="currentColor" />
	</svg>
);

describe("Card - Unit Tests", () => {
	it("renders card with title", () => {
		render(<Card title="Test Card Title" />);
		expect(screen.getByText("Test Card Title")).toBeInTheDocument();
	});

	it("renders card with children as title when no title provided", () => {
		render(<Card>Card Title from Children</Card>);
		expect(screen.getByText("Card Title from Children")).toBeInTheDocument();
	});

	it("renders card with content", () => {
		render(<Card title="Test Card" content="This is the card content" />);
		expect(screen.getByText("Test Card")).toBeInTheDocument();
		expect(screen.getByText("This is the card content")).toBeInTheDocument();
	});

	it("renders card with JSX content", () => {
		render(
			<Card
				title="Test Card"
				content={
					<div>
						<strong>Bold content</strong> and <em>italic content</em>
					</div>
				}
			/>
		);
		expect(screen.getByText("Test Card")).toBeInTheDocument();
		expect(screen.getByText("Bold content")).toBeInTheDocument();
		expect(screen.getByText("italic content")).toBeInTheDocument();
	});

	it("renders card with image", () => {
		render(
			<Card title="Card with Image" image={{ imgSrc: "test-image.jpg", imgAlt: "Test image" }} />
		);
		expect(screen.getByText("Card with Image")).toBeInTheDocument();
		const image = screen.getByRole("img");
		expect(image).toHaveAttribute("src", "test-image.jpg");
		expect(image).toHaveAttribute("alt", "Test image");
	});

	it("renders card with icon in top position", () => {
		render(
			<Card title="Card with Icon" icon={{ component: MockIcon, size: "md" }} iconPosition="top" />
		);
		expect(screen.getByText("Card with Icon")).toBeInTheDocument();
		expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
	});

	it("renders card with icon in left position", () => {
		render(
			<Card title="Card with Icon" icon={{ component: MockIcon, size: "lg" }} iconPosition="left" />
		);
		expect(screen.getByText("Card with Icon")).toBeInTheDocument();
		expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
	});

	it("renders card with icon in top-absolute position", () => {
		render(
			<Card
				title="Card with Icon"
				icon={{ component: MockIcon, size: "sm" }}
				iconPosition="top-absolute"
			/>
		);
		expect(screen.getByText("Card with Icon")).toBeInTheDocument();
		expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
	});

	it("renders card with badge in top-right position", () => {
		render(<Card title="Card with Badge" badge={{ children: "New" }} badgePosition="top-right" />);
		expect(screen.getByText("Card with Badge")).toBeInTheDocument();
		expect(screen.getByText("New")).toBeInTheDocument();
	});

	it("renders card with badge in top-left position", () => {
		render(
			<Card title="Card with Badge" badge={{ children: "Featured" }} badgePosition="top-left" />
		);
		expect(screen.getByText("Card with Badge")).toBeInTheDocument();
		expect(screen.getByText("Featured")).toBeInTheDocument();
	});

	it("renders card with badge in bottom-right position", () => {
		render(
			<Card title="Card with Badge" badge={{ children: "Sale" }} badgePosition="bottom-right" />
		);
		expect(screen.getByText("Card with Badge")).toBeInTheDocument();
		expect(screen.getByText("Sale")).toBeInTheDocument();
	});

	it("renders card with badge in bottom-left position", () => {
		render(
			<Card title="Card with Badge" badge={{ children: "Hot" }} badgePosition="bottom-left" />
		);
		expect(screen.getByText("Card with Badge")).toBeInTheDocument();
		expect(screen.getByText("Hot")).toBeInTheDocument();
	});

	it("renders card with badge in inline position", () => {
		render(
			<Card title="Card with Badge" badge={{ children: "Inline Badge" }} badgePosition="inline" />
		);
		expect(screen.getByText("Card with Badge")).toBeInTheDocument();
		expect(screen.getByText("Inline Badge")).toBeInTheDocument();
	});

	it("renders card with buttons", () => {
		const buttons = [
			{ label: "Primary", color: ButtonColors.Primary },
			{ label: "Secondary", color: ButtonColors.Secondary }
		];

		render(<Card title="Card with Buttons" buttons={buttons} />);
		expect(screen.getByText("Card with Buttons")).toBeInTheDocument();
		expect(screen.getByText("Primary")).toBeInTheDocument();
		expect(screen.getByText("Secondary")).toBeInTheDocument();
	});

	it("renders card with horizontal layout", () => {
		render(
			<Card
				title="Horizontal Card"
				horizontal={true}
				image={{ imgSrc: "test.jpg", imgAlt: "Test" }}
			/>
		);
		expect(screen.getByText("Horizontal Card")).toBeInTheDocument();
		const card = screen.getByTestId("flowbite-card");
		expect(card).toBeInTheDocument();
	});

	it("renders card with href", () => {
		render(<Card title="Clickable Card" href="/test-link" />);
		expect(screen.getByText("Clickable Card")).toBeInTheDocument();
		const card = screen.getByTestId("flowbite-card");
		expect(card).toHaveAttribute("href", "/test-link");
	});

	it("renders card with all props", () => {
		const buttons = [{ label: "Action", color: ButtonColors.Primary }];

		render(
			<Card
				title="Complete Card"
				content="This is a complete card with all features"
				href="/complete-card"
				horizontal={false}
				image={{ imgSrc: "complete.jpg", imgAlt: "Complete card" }}
				icon={{ component: MockIcon, size: "lg", className: "custom-icon" }}
				iconPosition="top"
				badge={{ children: "Complete", color: "success" }}
				badgePosition="top-right"
				buttons={buttons}
			/>
		);

		expect(screen.getByText("Complete Card")).toBeInTheDocument();
		expect(screen.getByText("This is a complete card with all features")).toBeInTheDocument();
		expect(screen.getByText("Action")).toBeInTheDocument();
		expect(screen.getByText("Complete")).toBeInTheDocument();
		expect(screen.getByTestId("mock-icon")).toBeInTheDocument();

		const card = screen.getByTestId("flowbite-card");
		expect(card).toHaveAttribute("href", "/complete-card");
		const image = screen.getByRole("img");
		expect(image).toHaveAttribute("src", "complete.jpg");
		expect(image).toHaveAttribute("alt", "Complete card");
	});

	it("renders card with multiple buttons", () => {
		const buttons = [
			{ label: "Edit", color: ButtonColors.Primary },
			{ label: "Delete", color: ButtonColors.Error },
			{ label: "View", color: ButtonColors.Secondary }
		];

		render(<Card title="Multi Button Card" buttons={buttons} />);

		expect(screen.getByText("Multi Button Card")).toBeInTheDocument();
		expect(screen.getByText("Edit")).toBeInTheDocument();
		expect(screen.getByText("Delete")).toBeInTheDocument();
		expect(screen.getByText("View")).toBeInTheDocument();
	});

	it("renders card with different icon sizes", () => {
		const sizes = ["sm", "md", "lg", "xl"] as const;

		sizes.forEach(size => {
			const { unmount } = render(
				<Card
					title={`Card with ${size} icon`}
					icon={{ component: MockIcon, size }}
					iconPosition="top"
				/>
			);

			expect(screen.getByText(`Card with ${size} icon`)).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
			unmount();
		});
	});

	it("renders card with icon and custom className", () => {
		render(
			<Card
				title="Card with Custom Icon"
				icon={{ component: MockIcon, size: "md", className: "custom-icon-class" }}
				iconPosition="top"
			/>
		);

		expect(screen.getByText("Card with Custom Icon")).toBeInTheDocument();
		expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
	});

	it("renders card with complex content", () => {
		render(
			<Card
				title="Complex Content Card"
				content={
					<div>
						<h3>Subtitle</h3>
						<p>
							This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.
						</p>
						<ul>
							<li>List item 1</li>
							<li>List item 2</li>
						</ul>
					</div>
				}
			/>
		);

		expect(screen.getByText("Complex Content Card")).toBeInTheDocument();
		expect(screen.getByText("Subtitle")).toBeInTheDocument();
		expect(screen.getByText("bold text")).toBeInTheDocument();
		expect(screen.getByText("italic text")).toBeInTheDocument();
		expect(screen.getByText("List item 1")).toBeInTheDocument();
		expect(screen.getByText("List item 2")).toBeInTheDocument();
	});

	it("renders card with empty content", () => {
		render(<Card title="Empty Content Card" content="" />);
		expect(screen.getByText("Empty Content Card")).toBeInTheDocument();
	});

	it("renders card with null content", () => {
		render(<Card title="Null Content Card" content={null} />);
		expect(screen.getByText("Null Content Card")).toBeInTheDocument();
	});

	it("renders card with undefined content", () => {
		render(<Card title="Undefined Content Card" content={undefined} />);
		expect(screen.getByText("Undefined Content Card")).toBeInTheDocument();
	});

	it("renders card with number content", () => {
		render(<Card title="Number Content Card" content={42} />);
		expect(screen.getByText("Number Content Card")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();
	});

	it("renders card with boolean content", () => {
		render(<Card title="Boolean Content Card" content={true} />);
		expect(screen.getByText("Boolean Content Card")).toBeInTheDocument();
	});

	it("renders card with array content", () => {
		render(<Card title="Array Content Card" content={["Item 1", "Item 2", "Item 3"]} />);
		expect(screen.getByText("Array Content Card")).toBeInTheDocument();
	});

	it("renders card with fragment content", () => {
		render(
			<Card
				title="Fragment Content Card"
				content={
					<>
						<span>Fragment</span>
						<span>Content</span>
					</>
				}
			/>
		);
		expect(screen.getByText("Fragment Content Card")).toBeInTheDocument();
		expect(screen.getByText("Fragment")).toBeInTheDocument();
		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	it("renders card with long text content", () => {
		const longText =
			"This is a very long text content that should be handled properly by the card component and should not break the layout or cause any issues with rendering.";
		render(<Card title="Long Text Card" content={longText} />);
		expect(screen.getByText("Long Text Card")).toBeInTheDocument();
		expect(screen.getByText(longText)).toBeInTheDocument();
	});

	it("renders card with all badge positions", () => {
		const positions = ["top-right", "top-left", "bottom-right", "bottom-left", "inline"] as const;

		positions.forEach(position => {
			const { unmount } = render(
				<Card
					title={`Card with ${position} badge`}
					badge={{ children: `${position} badge` }}
					badgePosition={position}
				/>
			);

			expect(screen.getByText(`Card with ${position} badge`)).toBeInTheDocument();
			expect(screen.getByText(`${position} badge`)).toBeInTheDocument();
			unmount();
		});
	});

	it("renders card with all icon positions", () => {
		const positions = ["top", "left", "top-absolute"] as const;

		positions.forEach(position => {
			const { unmount } = render(
				<Card
					title={`Card with ${position} icon`}
					icon={{ component: MockIcon, size: "md" }}
					iconPosition={position}
				/>
			);

			expect(screen.getByText(`Card with ${position} icon`)).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
			unmount();
		});
	});

	it("renders card with multiple icons", () => {
		render(
			<Card
				title="Card with Multiple Icons"
				icon={{ component: MockIcon, size: "md" }}
				iconPosition="top"
			/>
		);

		expect(screen.getByText("Card with Multiple Icons")).toBeInTheDocument();
		expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
	});

	it("renders card with button click handlers", () => {
		const handleClick = vi.fn();
		const buttons = [{ label: "Clickable", color: ButtonColors.Primary, onClick: handleClick }];

		render(<Card title="Card with Clickable Button" buttons={buttons} />);

		expect(screen.getByText("Card with Clickable Button")).toBeInTheDocument();
		expect(screen.getByText("Clickable")).toBeInTheDocument();
	});

	it("renders card with complex badge props", () => {
		render(
			<Card
				title="Card with Complex Badge"
				badge={{
					children: "Complex Badge",
					color: ButtonColors.Warning,
					size: ButtonSizes.Small,
					dismiss: true
				}}
				badgePosition="top-right"
			/>
		);

		expect(screen.getByText("Card with Complex Badge")).toBeInTheDocument();
		expect(screen.getByText("Complex Badge")).toBeInTheDocument();
	});

	it("renders card with complex button props", () => {
		const buttons = [
			{
				label: "Complex Button",
				color: ButtonColors.Success,
				size: ButtonSizes.Small,
				outline: true,
				disabled: false
			}
		];

		render(<Card title="Card with Complex Button" buttons={buttons} />);

		expect(screen.getByText("Card with Complex Button")).toBeInTheDocument();
		expect(screen.getByText("Complex Button")).toBeInTheDocument();
	});

	it("renders card with title taking precedence over children", () => {
		render(<Card title="Title Takes Precedence">This should not be rendered as title</Card>);

		expect(screen.getByText("Title Takes Precedence")).toBeInTheDocument();
		expect(screen.queryByText("This should not be rendered as title")).not.toBeInTheDocument();
	});

	it("renders card with children as title when no title provided", () => {
		render(<Card>This should be rendered as title</Card>);

		expect(screen.getByText("This should be rendered as title")).toBeInTheDocument();
	});

	it("renders card with no title and no children", () => {
		render(<Card content="Only content" />);
		expect(screen.getByText("Only content")).toBeInTheDocument();
	});

	it("renders card with empty title and children", () => {
		render(<Card title="" content="Content with empty title" />);
		expect(screen.getByText("Content with empty title")).toBeInTheDocument();
	});

	it("renders card with whitespace title", () => {
		render(<Card title="   " content="Content with whitespace title" />);
		expect(screen.getByText("Content with whitespace title")).toBeInTheDocument();
	});

	it("renders card with whitespace children", () => {
		render(<Card content="Content with whitespace children"> </Card>);
		expect(screen.getByText("Content with whitespace children")).toBeInTheDocument();
	});
});

// Snapshot tests
describe("Card - Snapshot Tests", () => {
	it("matches snapshot for basic card", () => {
		const { container } = render(<Card title="Basic Card" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with content", () => {
		const { container } = render(<Card title="Card with Content" content="This is the content" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with children as title", () => {
		const { container } = render(<Card>Card Title from Children</Card>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with image", () => {
		const { container } = render(
			<Card title="Card with Image" image={{ imgSrc: "test-image.jpg", imgAlt: "Test image" }} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with icon in top position", () => {
		const { container } = render(
			<Card title="Card with Icon" icon={{ component: MockIcon, size: "md" }} iconPosition="top" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with icon in left position", () => {
		const { container } = render(
			<Card title="Card with Icon" icon={{ component: MockIcon, size: "lg" }} iconPosition="left" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with icon in top-absolute position", () => {
		const { container } = render(
			<Card
				title="Card with Icon"
				icon={{ component: MockIcon, size: "sm" }}
				iconPosition="top-absolute"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with badge in top-right position", () => {
		const { container } = render(
			<Card title="Card with Badge" badge={{ children: "New" }} badgePosition="top-right" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with badge in top-left position", () => {
		const { container } = render(
			<Card title="Card with Badge" badge={{ children: "Featured" }} badgePosition="top-left" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with badge in bottom-right position", () => {
		const { container } = render(
			<Card title="Card with Badge" badge={{ children: "Sale" }} badgePosition="bottom-right" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with badge in bottom-left position", () => {
		const { container } = render(
			<Card title="Card with Badge" badge={{ children: "Hot" }} badgePosition="bottom-left" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with badge in inline position", () => {
		const { container } = render(
			<Card title="Card with Badge" badge={{ children: "Inline Badge" }} badgePosition="inline" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with buttons", () => {
		const buttons = [
			{ label: "Primary", color: ButtonColors.Primary },
			{ label: "Secondary", color: ButtonColors.Secondary }
		];

		const { container } = render(<Card title="Card with Buttons" buttons={buttons} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with horizontal layout", () => {
		const { container } = render(
			<Card
				title="Horizontal Card"
				horizontal={true}
				image={{ imgSrc: "test.jpg", imgAlt: "Test" }}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with href", () => {
		const { container } = render(<Card title="Clickable Card" href="/test-link" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with JSX content", () => {
		const { container } = render(
			<Card
				title="Card with JSX Content"
				content={
					<div>
						<strong>Bold content</strong> and <em>italic content</em>
					</div>
				}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with complex content", () => {
		const { container } = render(
			<Card
				title="Complex Content Card"
				content={
					<div>
						<h3>Subtitle</h3>
						<p>
							This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.
						</p>
						<ul>
							<li>List item 1</li>
							<li>List item 2</li>
						</ul>
					</div>
				}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with multiple buttons", () => {
		const buttons = [
			{ label: "Edit", color: ButtonColors.Primary },
			{ label: "Delete", color: ButtonColors.Error },
			{ label: "View", color: ButtonColors.Secondary }
		];

		const { container } = render(<Card title="Multi Button Card" buttons={buttons} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with all features", () => {
		const buttons = [{ label: "Action", color: ButtonColors.Primary }];

		const { container } = render(
			<Card
				title="Complete Card"
				content="This is a complete card with all features"
				href="/complete-card"
				horizontal={false}
				image={{ imgSrc: "complete.jpg", imgAlt: "Complete card" }}
				icon={{ component: MockIcon, size: "lg", className: "custom-icon" }}
				iconPosition="top"
				badge={{ children: "Complete", color: "success" }}
				badgePosition="top-right"
				buttons={buttons}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with different icon sizes", () => {
		const sizes = ["sm", "md", "lg", "xl"] as const;

		sizes.forEach(size => {
			const { container } = render(
				<Card
					title={`Card with ${size} icon`}
					icon={{ component: MockIcon, size }}
					iconPosition="top"
				/>
			);
			expect(container.firstChild).toMatchSnapshot(`card with ${size} icon`);
		});
	});

	it("matches snapshot for card with all badge positions", () => {
		const positions = ["top-right", "top-left", "bottom-right", "bottom-left", "inline"] as const;

		positions.forEach(position => {
			const { container } = render(
				<Card
					title={`Card with ${position} badge`}
					badge={{ children: `${position} badge` }}
					badgePosition={position}
				/>
			);
			expect(container.firstChild).toMatchSnapshot(`card with ${position} badge`);
		});
	});

	it("matches snapshot for card with all icon positions", () => {
		const positions = ["top", "left", "top-absolute"] as const;

		positions.forEach(position => {
			const { container } = render(
				<Card
					title={`Card with ${position} icon`}
					icon={{ component: MockIcon, size: "md" }}
					iconPosition={position}
				/>
			);
			expect(container.firstChild).toMatchSnapshot(`card with ${position} icon`);
		});
	});

	it("matches snapshot for card with complex badge props", () => {
		const { container } = render(
			<Card
				title="Card with Complex Badge"
				badge={{
					children: "Complex Badge",
					color: ButtonColors.Warning,
					size: ButtonSizes.Small,
					dismiss: true
				}}
				badgePosition="top-right"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with complex button props", () => {
		const buttons = [
			{
				label: "Complex Button",
				color: ButtonColors.Success,
				size: ButtonSizes.Small,
				outline: true,
				disabled: false
			}
		];

		const { container } = render(<Card title="Card with Complex Button" buttons={buttons} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with empty content", () => {
		const { container } = render(<Card title="Empty Content Card" content="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with null content", () => {
		const { container } = render(<Card title="Null Content Card" content={null} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with undefined content", () => {
		const { container } = render(<Card title="Undefined Content Card" content={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with number content", () => {
		const { container } = render(<Card title="Number Content Card" content={42} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with boolean content", () => {
		const { container } = render(<Card title="Boolean Content Card" content={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with array content", () => {
		const { container } = render(
			<Card title="Array Content Card" content={["Item 1", "Item 2", "Item 3"]} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with fragment content", () => {
		const { container } = render(
			<Card
				title="Fragment Content Card"
				content={
					<>
						<span>Fragment</span>
						<span>Content</span>
					</>
				}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with long text content", () => {
		const longText =
			"This is a very long text content that should be handled properly by the card component and should not break the layout or cause any issues with rendering.";
		const { container } = render(<Card title="Long Text Card" content={longText} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with title taking precedence over children", () => {
		const { container } = render(
			<Card title="Title Takes Precedence">This should not be rendered as title</Card>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with children as title when no title provided", () => {
		const { container } = render(<Card>This should be rendered as title</Card>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with no title and no children", () => {
		const { container } = render(<Card content="Only content" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with empty title and children", () => {
		const { container } = render(<Card title="" content="Content with empty title" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with whitespace title", () => {
		const { container } = render(<Card title="   " content="Content with whitespace title" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with whitespace children", () => {
		const { container } = render(<Card content="Content with whitespace children"> </Card>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with icon and custom className", () => {
		const { container } = render(
			<Card
				title="Card with Custom Icon"
				icon={{ component: MockIcon, size: "md", className: "custom-icon-class" }}
				iconPosition="top"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with multiple icons", () => {
		const { container } = render(
			<Card
				title="Card with Multiple Icons"
				icon={{ component: MockIcon, size: "md" }}
				iconPosition="top"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for card with button click handlers", () => {
		const handleClick = vi.fn();
		const buttons = [{ label: "Clickable", color: ButtonColors.Primary, onClick: handleClick }];

		const { container } = render(<Card title="Card with Clickable Button" buttons={buttons} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
