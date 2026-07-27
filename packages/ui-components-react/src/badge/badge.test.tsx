// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./badge";

// Mock icon component for testing
const MockIcon = () => (
	<svg data-testid="mock-icon" width="16" height="16" viewBox="0 0 16 16">
		<circle cx="8" cy="8" r="4" fill="currentColor" />
	</svg>
);

describe("Badge - Unit Tests", () => {
	it("renders badge with text content", () => {
		render(<Badge>Test Badge</Badge>);
		expect(screen.getByText("Test Badge")).toBeInTheDocument();
	});

	it("renders badge with custom text", () => {
		render(<Badge>Custom Badge Text</Badge>);
		expect(screen.getByText("Custom Badge Text")).toBeInTheDocument();
	});

	it("renders badge with gray color", () => {
		render(<Badge color="gray">Gray Badge</Badge>);
		const badge = screen.getByText("Gray Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with failure color", () => {
		render(<Badge color="failure">Failure Badge</Badge>);
		const badge = screen.getByText("Failure Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with warning color", () => {
		render(<Badge color="warning">Warning Badge</Badge>);
		const badge = screen.getByText("Warning Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with success color", () => {
		render(<Badge color="success">Success Badge</Badge>);
		const badge = screen.getByText("Success Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with info color", () => {
		render(<Badge color="info">Info Badge</Badge>);
		const badge = screen.getByText("Info Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with extra small size", () => {
		render(<Badge size="xs">Extra Small Badge</Badge>);
		const badge = screen.getByText("Extra Small Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with small size", () => {
		render(<Badge size="sm">Small Badge</Badge>);
		const badge = screen.getByText("Small Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders non-dismissible badge", () => {
		render(<Badge>Non-dismissible Badge</Badge>);
		const badge = screen.getByText("Non-dismissible Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with icon", () => {
		render(<Badge icon={MockIcon}>Badge with Icon</Badge>);
		const badge = screen.getByText("Badge with Icon");
		expect(badge).toBeInTheDocument();
	});

	it("renders icon-only badge", () => {
		render(<Badge icon={MockIcon} onlyIcon />);
		const badge = screen.getByTestId("flowbite-badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with custom className", () => {
		render(<Badge className="custom-badge-class">Custom Badge</Badge>);
		const badge = screen.getByText("Custom Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with multiple custom classes", () => {
		render(<Badge className="custom-class another-class">Multi-class Badge</Badge>);
		const badge = screen.getByText("Multi-class Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with all props", () => {
		render(
			<Badge color="success" size="sm" dismiss icon={MockIcon} className="test-class">
				Complete Badge
			</Badge>
		);
		const badge = screen.getByText("Complete Badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with empty children", () => {
		render(<Badge></Badge>);
		const badge = screen.getByTestId("flowbite-badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with null children", () => {
		render(<Badge>{null}</Badge>);
		const badge = screen.getByTestId("flowbite-badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with undefined children", () => {
		render(<Badge>{undefined}</Badge>);
		const badge = screen.getByTestId("flowbite-badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with number children", () => {
		render(<Badge>{42}</Badge>);
		expect(screen.getByText("42")).toBeInTheDocument();
	});

	it("renders badge with boolean children", () => {
		render(<Badge>{true}</Badge>);
		const badge = screen.getByTestId("flowbite-badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders badge with JSX content", () => {
		render(
			<Badge>
				<span>JSX Content</span>
			</Badge>
		);
		expect(screen.getByText("JSX Content")).toBeInTheDocument();
	});

	it("renders badge with complex JSX content", () => {
		render(
			<Badge>
				<div>
					<span>Complex</span>
					<strong>Content</strong>
				</div>
			</Badge>
		);
		expect(screen.getByText("Complex")).toBeInTheDocument();
		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	it("renders badge with array content", () => {
		render(<Badge>{["Item 1", "Item 2", "Item 3"]}</Badge>);
		const badge = screen.getByTestId("flowbite-badge");
		expect(badge).toBeInTheDocument();
		expect(badge.textContent).toContain("Item 1");
		expect(badge.textContent).toContain("Item 2");
		expect(badge.textContent).toContain("Item 3");
	});

	it("renders badge with fragment content", () => {
		render(
			<Badge>
				<>
					<span>Fragment</span>
					<span>Content</span>
				</>
			</Badge>
		);
		expect(screen.getByText("Fragment")).toBeInTheDocument();
		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	it("renders badge with long text content", () => {
		const longText =
			"This is a very long badge text that should be handled properly by the component";
		render(<Badge>{longText}</Badge>);
		expect(screen.getByText(longText)).toBeInTheDocument();
	});

	it("renders all color variants", () => {
		const colors = ["gray", "failure", "warning", "success", "info"];
		colors.forEach(color => {
			const { unmount } = render(<Badge color={color as any}>{color} Badge</Badge>);
			expect(screen.getByText(`${color} Badge`)).toBeInTheDocument();
			unmount();
		});
	});

	it("renders all size variants", () => {
		const sizes = ["xs", "sm"];
		sizes.forEach(size => {
			const { unmount } = render(<Badge size={size as any}>{size} Badge</Badge>);
			expect(screen.getByText(`${size} Badge`)).toBeInTheDocument();
			unmount();
		});
	});

	it("renders icon-only badges with all colors", () => {
		const colors = ["gray", "failure", "warning", "success", "info"];
		colors.forEach(color => {
			const { unmount } = render(<Badge color={color as any} icon={MockIcon} onlyIcon />);
			const badge = screen.getByTestId("flowbite-badge");
			expect(badge).toBeInTheDocument();
			unmount();
		});
	});

	it("renders icon-only badges with all sizes", () => {
		const sizes = ["xs", "sm"];
		sizes.forEach(size => {
			const { unmount } = render(<Badge size={size as any} icon={MockIcon} onlyIcon />);
			const badge = screen.getByTestId("flowbite-badge");
			expect(badge).toBeInTheDocument();
			unmount();
		});
	});

	it("renders dismissible badge with icon", () => {
		render(
			<Badge dismiss icon={MockIcon}>
				Dismissible with Icon
			</Badge>
		);
		const badge = screen.getByText("Dismissible with Icon");
		expect(badge).toBeInTheDocument();
	});

	it("renders icon-only dismissible badge", () => {
		render(<Badge dismiss icon={MockIcon} onlyIcon />);
		const badge = screen.getByTestId("flowbite-badge");
		expect(badge).toBeInTheDocument();
	});

	it("renders complete badge with all features", () => {
		render(
			<Badge color="success" size="sm" dismiss icon={MockIcon} className="complete-badge">
				Complete Badge
			</Badge>
		);
		const badge = screen.getByText("Complete Badge");
		expect(badge).toBeInTheDocument();
	});
});

// Snapshot tests
describe("Badge - Snapshot Tests", () => {
	it("matches snapshot for basic badge", () => {
		const { container } = render(<Badge>Basic Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for gray badge", () => {
		const { container } = render(<Badge color="gray">Gray Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for failure badge", () => {
		const { container } = render(<Badge color="failure">Failure Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for warning badge", () => {
		const { container } = render(<Badge color="warning">Warning Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for success badge", () => {
		const { container } = render(<Badge color="success">Success Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for info badge", () => {
		const { container } = render(<Badge color="info">Info Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for extra small badge", () => {
		const { container } = render(<Badge size="xs">Extra Small Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for small badge", () => {
		const { container } = render(<Badge size="sm">Small Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for dismissible badge", () => {
		const { container } = render(<Badge dismiss>Dismissible Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with icon", () => {
		const { container } = render(<Badge icon={MockIcon}>Badge with Icon</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for icon-only badge", () => {
		const { container } = render(<Badge icon={MockIcon} onlyIcon />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with custom className", () => {
		const { container } = render(<Badge className="custom-badge-class">Custom Badge</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for complex badge", () => {
		const { container } = render(
			<Badge color="success" size="sm" dismiss icon={MockIcon} className="complex-badge">
				Complex Badge
			</Badge>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for icon-only complex badge", () => {
		const { container } = render(
			<Badge color="warning" size="xs" dismiss icon={MockIcon} onlyIcon className="icon-complex" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with JSX content", () => {
		const { container } = render(
			<Badge>
				<div>
					<span>JSX</span>
					<strong>Content</strong>
				</div>
			</Badge>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with array content", () => {
		const { container } = render(<Badge>{["First", "Second", "Third"]}</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with number content", () => {
		const { container } = render(<Badge>{42}</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with boolean content", () => {
		const { container } = render(<Badge>{true}</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with empty content", () => {
		const { container } = render(<Badge></Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with null content", () => {
		const { container } = render(<Badge>{null}</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with undefined content", () => {
		const { container } = render(<Badge>{undefined}</Badge>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with long text", () => {
		const { container } = render(
			<Badge>
				This is a very long badge text that should be handled properly by the component and should
				not break the layout
			</Badge>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for badge with all color variants", () => {
		const colors = ["gray", "failure", "warning", "success", "info"];
		colors.forEach(color => {
			const { container } = render(<Badge color={color as any}>{color} Badge</Badge>);
			expect(container.firstChild).toMatchSnapshot(`${color} color badge`);
		});
	});

	it("matches snapshot for badge with all size variants", () => {
		const sizes = ["xs", "sm"];
		sizes.forEach(size => {
			const { container } = render(<Badge size={size as any}>{size} Badge</Badge>);
			expect(container.firstChild).toMatchSnapshot(`${size} size badge`);
		});
	});

	it("matches snapshot for icon-only badges with all colors", () => {
		const colors = ["gray", "failure", "warning", "success", "info"];
		colors.forEach(color => {
			const { container } = render(<Badge color={color as any} icon={MockIcon} onlyIcon />);
			expect(container.firstChild).toMatchSnapshot(`icon-only ${color} badge`);
		});
	});

	it("matches snapshot for icon-only badges with all sizes", () => {
		const sizes = ["xs", "sm"];
		sizes.forEach(size => {
			const { container } = render(<Badge size={size as any} icon={MockIcon} onlyIcon />);
			expect(container.firstChild).toMatchSnapshot(`icon-only ${size} badge`);
		});
	});

	it("matches snapshot for dismissible badges with all colors", () => {
		const colors = ["gray", "failure", "warning", "success", "info"];
		colors.forEach(color => {
			const { container } = render(
				<Badge color={color as any} dismiss>
					{color} Dismissible
				</Badge>
			);
			expect(container.firstChild).toMatchSnapshot(`dismissible ${color} badge`);
		});
	});

	it("matches snapshot for badges with icons and all colors", () => {
		const colors = ["gray", "failure", "warning", "success", "info"];
		colors.forEach(color => {
			const { container } = render(
				<Badge color={color as any} icon={MockIcon}>
					{color} with Icon
				</Badge>
			);
			expect(container.firstChild).toMatchSnapshot(`${color} badge with icon`);
		});
	});

	it("matches snapshot for badges with custom classes and all colors", () => {
		const colors = ["gray", "failure", "warning", "success", "info"];
		colors.forEach(color => {
			const { container } = render(
				<Badge color={color as any} className={`custom-${color}-class`}>
					{color} Custom
				</Badge>
			);
			expect(container.firstChild).toMatchSnapshot(`${color} badge with custom class`);
		});
	});

	it("matches snapshot for complete badge combinations", () => {
		const combinations = [
			{ color: "success", size: "sm", dismiss: true, icon: true, onlyIcon: false },
			{ color: "warning", size: "xs", dismiss: false, icon: true, onlyIcon: true },
			{ color: "failure", size: "sm", dismiss: true, icon: false, onlyIcon: false },
			{ color: "info", size: "xs", dismiss: false, icon: true, onlyIcon: false },
			{ color: "gray", size: "sm", dismiss: true, icon: true, onlyIcon: true }
		];

		combinations.forEach((combo, index) => {
			const { container } = render(
				<Badge
					color={combo.color as any}
					size={combo.size as any}
					dismiss={combo.dismiss}
					icon={combo.icon ? MockIcon : undefined}
					onlyIcon={combo.onlyIcon}
					className={`combo-${index}`}
				>
					{combo.onlyIcon ? undefined : `Combo ${index}`}
				</Badge>
			);
			expect(container.firstChild).toMatchSnapshot(`complete badge combo ${index}`);
		});
	});
});
