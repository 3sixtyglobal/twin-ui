// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./button";

// Mock icons for testing
const MockIcon = () => <svg data-testid="mock-icon" />;
const MockLeftIcon = () => <svg data-testid="mock-left-icon" />;
const MockRightIcon = () => <svg data-testid="mock-right-icon" />;

describe("Button", () => {
	describe("Unit Tests", () => {
		it("renders button with default props", () => {
			render(<Button>Click me</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent("Click me");
		});

		it("renders button with custom color", () => {
			render(<Button color="primary">Primary Button</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent("Primary Button");
		});

		it("renders button with custom size", () => {
			render(<Button size="lg">Large Button</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
		});

		it("renders disabled button", () => {
			render(<Button disabled>Disabled Button</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
		});

		it("renders outline button", () => {
			render(<Button outline>Outline Button</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
		});

		it("renders button with left icon", () => {
			render(
				<Button leftIcon={MockLeftIcon} showLeftIcon>
					With Left Icon
				</Button>
			);
			expect(screen.getByTestId("mock-left-icon")).toBeInTheDocument();
			expect(screen.getByText("With Left Icon")).toBeInTheDocument();
		});

		it("renders button with right icon", () => {
			render(
				<Button rightIcon={MockRightIcon} showRightIcon>
					With Right Icon
				</Button>
			);
			expect(screen.getByTestId("mock-right-icon")).toBeInTheDocument();
			expect(screen.getByText("With Right Icon")).toBeInTheDocument();
		});

		it("renders button with both icons", () => {
			render(
				<Button leftIcon={MockLeftIcon} rightIcon={MockRightIcon} showLeftIcon showRightIcon>
					Both Icons
				</Button>
			);
			expect(screen.getByTestId("mock-left-icon")).toBeInTheDocument();
			expect(screen.getByTestId("mock-right-icon")).toBeInTheDocument();
			expect(screen.getByText("Both Icons")).toBeInTheDocument();
		});

		it("renders icon-only button", () => {
			render(<Button iconOnly icon={MockIcon} />);
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
			expect(screen.queryByText("Click me")).not.toBeInTheDocument();
		});

		it("renders button with custom buttonText", () => {
			render(<Button buttonText="Custom Text">Children Text</Button>);
			expect(screen.getByText("Custom Text")).toBeInTheDocument();
		});

		it("renders button without text when showButtonText is false", () => {
			render(<Button showButtonText={false} leftIcon={MockLeftIcon} />);
			expect(screen.getByTestId("mock-left-icon")).toBeInTheDocument();
			expect(screen.queryByText("Click me")).not.toBeInTheDocument();
		});

		it("renders button with custom className", () => {
			render(<Button className="custom-class">Custom Class</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("custom-class");
		});

		it("handles click events", () => {
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Clickable Button</Button>);
			const button = screen.getByRole("button");
			fireEvent.click(button);
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("does not call onClick when disabled", () => {
			const handleClick = vi.fn();
			render(
				<Button onClick={handleClick} disabled>
					Disabled Button
				</Button>
			);
			const button = screen.getByRole("button");
			fireEvent.click(button);
			expect(handleClick).not.toHaveBeenCalled();
		});

		it("renders button with all color variants", () => {
			const colors = [
				"primary",
				"secondary",
				"error",
				"warning",
				"success",
				"info",
				"plain",
				"ghost",
				"dark"
			];
			colors.forEach(color => {
				const { unmount } = render(<Button color={color as any}>{color} Button</Button>);
				expect(screen.getByText(`${color} Button`)).toBeInTheDocument();
				unmount();
			});
		});

		it("renders button with all size variants", () => {
			const sizes = ["xs", "sm", "md", "lg", "xl"];
			sizes.forEach(size => {
				const { unmount } = render(<Button size={size as any}>{size} Button</Button>);
				expect(screen.getByText(`${size} Button`)).toBeInTheDocument();
				unmount();
			});
		});

		it("renders icon-only button with all sizes", () => {
			const sizes = ["xs", "sm", "md", "lg", "xl"];
			sizes.forEach(size => {
				const { unmount } = render(<Button iconOnly icon={MockIcon} size={size as any} />);
				expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
				unmount();
			});
		});

		it("renders button with outline and all colors", () => {
			const colors = [
				"primary",
				"secondary",
				"error",
				"warning",
				"success",
				"info",
				"plain",
				"ghost",
				"dark"
			];
			colors.forEach(color => {
				const { unmount } = render(
					<Button color={color as any} outline>
						Outlined {color}
					</Button>
				);
				expect(screen.getByText(`Outlined ${color}`)).toBeInTheDocument();
				unmount();
			});
		});

		it("renders disabled button with all colors", () => {
			const colors = [
				"primary",
				"secondary",
				"error",
				"warning",
				"success",
				"info",
				"plain",
				"ghost",
				"dark"
			];
			colors.forEach(color => {
				const { unmount } = render(
					<Button color={color as any} disabled>
						Disabled {color}
					</Button>
				);
				const button = screen.getByRole("button");
				expect(button).toBeDisabled();
				unmount();
			});
		});

		it("renders icon-only button with all colors", () => {
			const colors = [
				"primary",
				"secondary",
				"error",
				"warning",
				"success",
				"info",
				"plain",
				"ghost",
				"dark"
			];
			colors.forEach(color => {
				const { unmount } = render(<Button iconOnly icon={MockIcon} color={color as any} />);
				expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
				unmount();
			});
		});

		it("renders icon-only button with outline", () => {
			render(
				<Button iconOnly icon={MockIcon} outline>
					Outlined Icon
				</Button>
			);
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders icon-only button with disabled state", () => {
			render(<Button iconOnly icon={MockIcon} disabled />);
			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders icon-only button with custom className", () => {
			render(<Button iconOnly icon={MockIcon} className="custom-icon-only" />);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("custom-icon-only");
		});

		it("does not render left icon when showLeftIcon is false", () => {
			render(
				<Button leftIcon={MockLeftIcon} showLeftIcon={false}>
					No Left Icon
				</Button>
			);
			expect(screen.queryByTestId("mock-left-icon")).not.toBeInTheDocument();
			expect(screen.getByText("No Left Icon")).toBeInTheDocument();
		});

		it("does not render right icon when showRightIcon is false", () => {
			render(
				<Button rightIcon={MockRightIcon} showRightIcon={false}>
					No Right Icon
				</Button>
			);
			expect(screen.queryByTestId("mock-right-icon")).not.toBeInTheDocument();
			expect(screen.getByText("No Right Icon")).toBeInTheDocument();
		});

		it("renders button with complex combinations", () => {
			render(
				<Button
					color="primary"
					size="lg"
					outline
					leftIcon={MockLeftIcon}
					rightIcon={MockRightIcon}
					className="complex-button"
				>
					Complex Button
				</Button>
			);
			expect(screen.getByTestId("mock-left-icon")).toBeInTheDocument();
			expect(screen.getByTestId("mock-right-icon")).toBeInTheDocument();
			expect(screen.getByText("Complex Button")).toBeInTheDocument();
			const button = screen.getByRole("button");
			expect(button).toHaveClass("complex-button");
		});

		it("renders button with special characters in text", () => {
			render(<Button>{`Special & Characters: <>&"'`}</Button>);
			expect(screen.getByText(/Special & Characters/)).toBeInTheDocument();
		});

		it("renders button with unicode characters", () => {
			render(<Button>你好世界 🌍</Button>);
			expect(screen.getByText("你好世界 🌍")).toBeInTheDocument();
		});

		it("renders button with long text", () => {
			const longText =
				"This is a very long button text that should still render correctly without any issues";
			render(<Button>{longText}</Button>);
			expect(screen.getByText(longText)).toBeInTheDocument();
		});

		it("renders button with empty text", () => {
			render(<Button></Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
		});

		it("renders button with null children", () => {
			render(<Button>{null}</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
		});

		it("renders button with undefined children", () => {
			render(<Button>{undefined}</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
		});

		it("renders button with number children", () => {
			render(<Button>{42}</Button>);
			expect(screen.getByText("42")).toBeInTheDocument();
		});

		it("renders button with boolean children", () => {
			render(<Button>{true}</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			// Boolean values are not rendered as text in the mock
		});

		it("renders button with array children", () => {
			render(<Button>{["Part 1", "Part 2"]}</Button>);
			expect(screen.getByText("Part 1Part 2")).toBeInTheDocument();
		});

		it("renders button with mixed content children", () => {
			render(
				<Button>
					<span>Text</span>
					<div>42</div>
					true
				</Button>
			);
			expect(screen.getByText("Text")).toBeInTheDocument();
			expect(screen.getByText("42")).toBeInTheDocument();
			expect(screen.getByText("true")).toBeInTheDocument();
		});

		it("handles keyboard events", () => {
			const handleKeyDown = vi.fn();
			render(<Button onKeyDown={handleKeyDown}>Keyboard Button</Button>);
			const button = screen.getByRole("button");
			fireEvent.keyDown(button, { key: "Enter" });
			expect(handleKeyDown).toHaveBeenCalledTimes(1);
		});

		it("handles mouse events", () => {
			const handleMouseOver = vi.fn();
			render(<Button onMouseOver={handleMouseOver}>Mouse Button</Button>);
			const button = screen.getByRole("button");
			fireEvent.mouseOver(button);
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});

		it("renders button with all props combined", () => {
			const handleClick = vi.fn();
			render(
				<Button
					color="primary"
					size="lg"
					outline
					leftIcon={MockLeftIcon}
					rightIcon={MockRightIcon}
					className="all-props-button"
					onClick={handleClick}
					onMouseOver={vi.fn()}
					data-testid="all-props"
				>
					All Props Button
				</Button>
			);

			const button = screen.getByTestId("all-props");
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass("all-props-button");
			expect(screen.getByTestId("mock-left-icon")).toBeInTheDocument();
			expect(screen.getByTestId("mock-right-icon")).toBeInTheDocument();
			expect(screen.getByText("All Props Button")).toBeInTheDocument();

			fireEvent.click(button);
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		// Additional tests to increase coverage
		it("renders button with buttonText but no children", () => {
			render(<Button buttonText="Only Button Text" />);
			expect(screen.getByText("Only Button Text")).toBeInTheDocument();
		});

		it("renders button with children but no buttonText", () => {
			render(<Button>Only Children Text</Button>);
			expect(screen.getByText("Only Children Text")).toBeInTheDocument();
		});

		it("renders button with both buttonText and children", () => {
			render(<Button buttonText="Button Text">Children Text</Button>);
			expect(screen.getByText("Button Text")).toBeInTheDocument();
		});

		it("renders button with empty buttonText", () => {
			render(<Button buttonText="">Empty Button Text</Button>);
			expect(screen.getByText("Empty Button Text")).toBeInTheDocument();
		});

		it("renders button with null buttonText", () => {
			render(<Button buttonText={null as any}>Null Button Text</Button>);
			expect(screen.getByText("Null Button Text")).toBeInTheDocument();
		});

		it("renders button with undefined buttonText", () => {
			render(<Button buttonText={undefined}>Undefined Button Text</Button>);
			expect(screen.getByText("Undefined Button Text")).toBeInTheDocument();
		});

		it("renders button with showButtonText false and no icons", () => {
			render(<Button showButtonText={false}>Hidden Text</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			// Text should not be visible when showButtonText is false
		});

		it("renders button with showLeftIcon false but leftIcon provided", () => {
			render(
				<Button leftIcon={MockLeftIcon} showLeftIcon={false}>
					No Left Icon
				</Button>
			);
			expect(screen.queryByTestId("mock-left-icon")).not.toBeInTheDocument();
			expect(screen.getByText("No Left Icon")).toBeInTheDocument();
		});

		it("renders button with showRightIcon false but rightIcon provided", () => {
			render(
				<Button rightIcon={MockRightIcon} showRightIcon={false}>
					No Right Icon
				</Button>
			);
			expect(screen.queryByTestId("mock-right-icon")).not.toBeInTheDocument();
			expect(screen.getByText("No Right Icon")).toBeInTheDocument();
		});

		it("renders button with leftIcon but showLeftIcon true", () => {
			render(
				<Button leftIcon={MockLeftIcon} showLeftIcon={true}>
					With Left Icon
				</Button>
			);
			expect(screen.getByTestId("mock-left-icon")).toBeInTheDocument();
			expect(screen.getByText("With Left Icon")).toBeInTheDocument();
		});

		it("renders button with rightIcon but showRightIcon true", () => {
			render(
				<Button rightIcon={MockRightIcon} showRightIcon={true}>
					With Right Icon
				</Button>
			);
			expect(screen.getByTestId("mock-right-icon")).toBeInTheDocument();
			expect(screen.getByText("With Right Icon")).toBeInTheDocument();
		});

		it("renders icon-only button with no icon provided", () => {
			render(<Button iconOnly>No Icon</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
		});

		it("renders icon-only button with icon provided", () => {
			render(<Button iconOnly icon={MockIcon} />);
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders button with ghost color and outline", () => {
			render(
				<Button color="ghost" outline>
					Ghost Outline
				</Button>
			);
			expect(screen.getByText("Ghost Outline")).toBeInTheDocument();
		});

		it("renders button with ghost color but no outline", () => {
			render(<Button color="ghost">Ghost No Outline</Button>);
			expect(screen.getByText("Ghost No Outline")).toBeInTheDocument();
		});

		it("renders button with outline but not ghost color", () => {
			render(
				<Button color="primary" outline>
					Primary Outline
				</Button>
			);
			expect(screen.getByText("Primary Outline")).toBeInTheDocument();
		});

		it("renders button with all size variants for icon-only", () => {
			const sizes = ["xs", "sm", "md", "lg", "xl"];
			sizes.forEach(size => {
				const { unmount } = render(<Button iconOnly icon={MockIcon} size={size as any} />);
				expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
				unmount();
			});
		});

		it("renders button with all color variants for icon-only", () => {
			const colors = [
				"primary",
				"secondary",
				"error",
				"warning",
				"success",
				"info",
				"plain",
				"ghost",
				"dark"
			];
			colors.forEach(color => {
				const { unmount } = render(<Button iconOnly icon={MockIcon} color={color as any} />);
				expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
				unmount();
			});
		});

		it("renders button with icon-only and outline", () => {
			render(<Button iconOnly icon={MockIcon} outline />);
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders button with icon-only and disabled", () => {
			render(<Button iconOnly icon={MockIcon} disabled />);
			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders button with icon-only and custom className", () => {
			render(<Button iconOnly icon={MockIcon} className="custom-icon-only" />);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("custom-icon-only");
		});

		it("renders button with complex icon combinations", () => {
			render(
				<Button
					leftIcon={MockLeftIcon}
					rightIcon={MockRightIcon}
					icon={MockIcon}
					showLeftIcon={true}
					showRightIcon={true}
				>
					Complex Icons
				</Button>
			);
			expect(screen.getByTestId("mock-left-icon")).toBeInTheDocument();
			expect(screen.getByTestId("mock-right-icon")).toBeInTheDocument();
			expect(screen.getByText("Complex Icons")).toBeInTheDocument();
			// The main icon should not be rendered when not iconOnly
			expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
		});

		it("renders button with icon-only and all icon props", () => {
			render(<Button iconOnly icon={MockIcon} leftIcon={MockLeftIcon} rightIcon={MockRightIcon} />);
			// Only the main icon should be rendered for iconOnly
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
			expect(screen.queryByTestId("mock-left-icon")).not.toBeInTheDocument();
			expect(screen.queryByTestId("mock-right-icon")).not.toBeInTheDocument();
		});

		it("renders button with undefined className", () => {
			render(<Button className={undefined}>Undefined Class</Button>);
			expect(screen.getByText("Undefined Class")).toBeInTheDocument();
		});

		it("renders button with null className", () => {
			render(<Button className={null as any}>Null Class</Button>);
			expect(screen.getByText("Null Class")).toBeInTheDocument();
		});

		it("renders button with empty className", () => {
			render(<Button className="">Empty Class</Button>);
			expect(screen.getByText("Empty Class")).toBeInTheDocument();
		});

		it("renders button with multiple className values", () => {
			render(<Button className="class1 class2 class3">Multiple Classes</Button>);
			const button = screen.getByRole("button");
			expect(button).toHaveClass("class1", "class2", "class3");
		});

		it("renders button with all boolean props as true", () => {
			render(
				<Button
					outline={true}
					iconOnly={true}
					showButtonText={true}
					showLeftIcon={true}
					showRightIcon={true}
					disabled={true}
					icon={MockIcon}
				/>
			);
			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("renders button with all boolean props as false", () => {
			render(
				<Button
					outline={false}
					iconOnly={false}
					showButtonText={false}
					showLeftIcon={false}
					showRightIcon={false}
					disabled={false}
					leftIcon={MockLeftIcon}
					rightIcon={MockRightIcon}
				>
					All False
				</Button>
			);
			const button = screen.getByRole("button");
			expect(button).not.toBeDisabled();
			expect(screen.queryByTestId("mock-left-icon")).not.toBeInTheDocument();
			expect(screen.queryByTestId("mock-right-icon")).not.toBeInTheDocument();
		});

		it("renders button with spread props", () => {
			render(
				<Button data-testid="spread-props" aria-label="Custom Label" title="Custom Title">
					Spread Props
				</Button>
			);
			const button = screen.getByTestId("spread-props");
			expect(button).toHaveAttribute("aria-label", "Custom Label");
			expect(button).toHaveAttribute("title", "Custom Title");
		});

		it("renders button with all event handlers", () => {
			const handlers = {
				onClick: vi.fn(),
				onMouseOver: vi.fn(),
				onMouseOut: vi.fn(),
				onFocus: vi.fn(),
				onBlur: vi.fn(),
				onKeyDown: vi.fn(),
				onKeyUp: vi.fn()
			};

			render(<Button {...handlers}>Event Handlers</Button>);
			const button = screen.getByRole("button");

			fireEvent.click(button);
			fireEvent.mouseOver(button);
			fireEvent.mouseOut(button);
			fireEvent.focus(button);
			fireEvent.blur(button);
			fireEvent.keyDown(button);
			fireEvent.keyUp(button);

			expect(handlers.onClick).toHaveBeenCalledTimes(1);
			expect(handlers.onMouseOver).toHaveBeenCalledTimes(1);
			expect(handlers.onMouseOut).toHaveBeenCalledTimes(1);
			expect(handlers.onFocus).toHaveBeenCalledTimes(1);
			expect(handlers.onBlur).toHaveBeenCalledTimes(1);
			expect(handlers.onKeyDown).toHaveBeenCalledTimes(1);
			expect(handlers.onKeyUp).toHaveBeenCalledTimes(1);
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for primary button", () => {
			const { container } = render(<Button color="primary">Primary Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for secondary button", () => {
			const { container } = render(<Button color="secondary">Secondary Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for error button", () => {
			const { container } = render(<Button color="error">Error Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for warning button", () => {
			const { container } = render(<Button color="warning">Warning Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for success button", () => {
			const { container } = render(<Button color="success">Success Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for info button", () => {
			const { container } = render(<Button color="info">Info Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for plain button", () => {
			const { container } = render(<Button color="plain">Plain Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for ghost button", () => {
			const { container } = render(<Button color="ghost">Ghost Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for dark button", () => {
			const { container } = render(<Button color="dark">Dark Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for small button", () => {
			const { container } = render(<Button size="sm">Small Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for large button", () => {
			const { container } = render(<Button size="lg">Large Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for outline button", () => {
			const { container } = render(<Button outline>Outline Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for disabled button", () => {
			const { container } = render(<Button disabled>Disabled Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for button with left icon", () => {
			const { container } = render(
				<Button leftIcon={MockLeftIcon} showLeftIcon>
					With Left Icon
				</Button>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for button with right icon", () => {
			const { container } = render(
				<Button rightIcon={MockRightIcon} showRightIcon>
					With Right Icon
				</Button>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for button with both icons", () => {
			const { container } = render(
				<Button leftIcon={MockLeftIcon} rightIcon={MockRightIcon} showLeftIcon showRightIcon>
					Both Icons
				</Button>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for icon-only button", () => {
			const { container } = render(<Button iconOnly icon={MockIcon} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for button with custom className", () => {
			const { container } = render(<Button className="custom-class">Custom Class</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for complex button combination", () => {
			const { container } = render(
				<Button
					color="primary"
					size="lg"
					outline
					leftIcon={MockLeftIcon}
					rightIcon={MockRightIcon}
					className="complex-button"
				>
					Complex Button
				</Button>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
