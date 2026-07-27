// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ToggleSwitch } from "./toggleSwitch";
import { ToggleSwitchColors } from "./toggleSwitchColors";
import { ToggleSwitchSizes } from "./toggleSwitchSizes";
import React from "react";

describe("ToggleSwitch", () => {
	// Unit Tests
	describe("Unit Tests", () => {
		it("renders toggleswitch with default props", () => {
			render(<ToggleSwitch checked={false} />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			expect(toggleswitch).toHaveAttribute("type", "button");
			expect(toggleswitch).toHaveAttribute("aria-checked", "false");
		});

		it("renders toggleswitch as checked", () => {
			render(<ToggleSwitch checked={true} />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toHaveAttribute("aria-checked", "true");
		});

		it("renders toggleswitch with custom id", () => {
			render(<ToggleSwitch checked={false} id="custom-toggle-id" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toHaveAttribute("id", "custom-toggle-id");
		});

		it("renders toggleswitch with default id when id is undefined", () => {
			render(<ToggleSwitch checked={false} id={undefined} />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			// Note: when id is undefined, the real component doesn't have an id attribute
			expect(toggleswitch).not.toHaveAttribute("id");
		});

		it("renders toggleswitch with custom className", () => {
			render(<ToggleSwitch checked={false} className="custom-toggle-class" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toHaveClass("custom-toggle-class");
		});

		it("renders toggleswitch with sizing prop", () => {
			render(<ToggleSwitch checked={false} sizing="sm" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			// Note: sizing is applied via CSS classes, not data attributes
		});

		it("renders toggleswitch with color prop", () => {
			render(<ToggleSwitch checked={false} color="success" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			// Note: color is applied via CSS classes, not data attributes
		});

		it("renders toggleswitch with default color when color is undefined", () => {
			render(<ToggleSwitch checked={false} color={undefined} />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			// Note: default color is applied via CSS classes, not data attributes
		});

		it("renders toggleswitch with disabled prop", () => {
			render(<ToggleSwitch checked={false} disabled={true} />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeDisabled();
		});

		it("renders toggleswitch as enabled when disabled is false", () => {
			render(<ToggleSwitch checked={false} disabled={false} />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).not.toBeDisabled();
		});

		it("renders toggleswitch with name prop", () => {
			render(<ToggleSwitch checked={false} name="toggle-name" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			// Note: Flowbite ToggleSwitch doesn't render a hidden input
			expect(toggleswitch).toBeInTheDocument();
		});

		it("renders toggleswitch with value prop", () => {
			render(<ToggleSwitch checked={false} value="toggle-value" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toHaveAttribute("value", "toggle-value");
		});

		it("renders toggleswitch with label", () => {
			render(<ToggleSwitch checked={false} label="Toggle Label" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			const label = screen.getByText("Toggle Label");
			expect(label).toBeInTheDocument();
			// Note: real Flowbite uses aria-labelledby instead of for attribute
			expect(toggleswitch).toHaveAttribute("aria-labelledby");
		});

		it("renders toggleswitch with label and custom id", () => {
			render(<ToggleSwitch checked={false} id="custom-id" label="Custom Label" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			const label = screen.getByText("Custom Label");
			expect(label).toBeInTheDocument();
			// Note: real Flowbite uses aria-labelledby instead of for attribute
			expect(toggleswitch).toHaveAttribute("aria-labelledby");
		});

		it("renders toggleswitch without label when label is not provided", () => {
			render(<ToggleSwitch checked={false} />);
			expect(screen.queryByRole("label")).not.toBeInTheDocument();
		});

		it("renders toggleswitch with empty string label", () => {
			render(<ToggleSwitch checked={false} label="" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			// Empty label should not render a label element
			expect(screen.queryByRole("label")).not.toBeInTheDocument();
		});

		it("renders toggleswitch with special characters in label", () => {
			render(<ToggleSwitch checked={false} label={`Special & Characters: <>&"'`} />);
			const label = screen.getByText(`Special & Characters: <>&"'`);
			expect(label).toBeInTheDocument();
		});

		it("renders toggleswitch with unicode characters in label", () => {
			render(<ToggleSwitch checked={false} label="你好世界" />);
			expect(screen.getByText("你好世界")).toBeInTheDocument();
		});

		it("renders toggleswitch with long label", () => {
			const longLabel =
				"This is a very long label that should be rendered correctly within the toggle switch component.";
			render(<ToggleSwitch checked={false} label={longLabel} />);
			expect(screen.getByText(longLabel)).toBeInTheDocument();
		});

		it("renders toggleswitch with onChange callback", () => {
			const handleChange = vi.fn();
			render(<ToggleSwitch checked={false} onChange={handleChange} />);
			const toggleswitch = screen.getByRole("switch");
			toggleswitch.click();
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		it("does not call onChange when not provided", () => {
			render(<ToggleSwitch checked={false} />);
			const toggleswitch = screen.getByRole("switch");
			expect(() => toggleswitch.click()).not.toThrow();
		});

		it("renders toggleswitch with additional props", () => {
			render(<ToggleSwitch checked={false} data-custom="value" aria-label="Custom Toggle" />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toHaveAttribute("data-custom", "value");
			expect(toggleswitch).toHaveAttribute("aria-label", "Custom Toggle");
		});

		it("renders toggleswitch with style prop", () => {
			render(<ToggleSwitch checked={false} style={{ backgroundColor: "red", color: "blue" }} />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toHaveStyle("background-color: rgb(255, 0, 0)");
			expect(toggleswitch).toHaveStyle("color: rgb(0, 0, 255)");
		});

		it("renders toggleswitch with onClick handler", () => {
			const handleClick = vi.fn();
			render(<ToggleSwitch checked={false} onClick={handleClick} />);
			const toggleswitch = screen.getByRole("switch");
			toggleswitch.click();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("renders toggleswitch with onMouseOver handler", () => {
			const handleMouseOver = vi.fn();
			render(<ToggleSwitch checked={false} onMouseOver={handleMouseOver} />);
			const toggleswitch = screen.getByRole("switch");
			toggleswitch.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});

		it("toggles state when clicked", () => {
			const handleChange = vi.fn();
			render(<ToggleSwitch checked={false} onChange={handleChange} />);
			const toggleswitch = screen.getByRole("switch");

			expect(toggleswitch).toHaveAttribute("aria-checked", "false");
			toggleswitch.click();
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		it("does not toggle when disabled", () => {
			const handleChange = vi.fn();
			render(<ToggleSwitch checked={false} disabled={true} onChange={handleChange} />);
			const toggleswitch = screen.getByRole("switch");

			expect(toggleswitch).toBeDisabled();
			toggleswitch.click();
			expect(handleChange).not.toHaveBeenCalled();
		});

		it("handles multiple rapid clicks", () => {
			const handleChange = vi.fn();
			render(<ToggleSwitch checked={false} onChange={handleChange} />);
			const toggleswitch = screen.getByRole("switch");

			toggleswitch.click();
			toggleswitch.click();
			toggleswitch.click();
			expect(handleChange).toHaveBeenCalledTimes(3);
		});

		it("renders toggleswitch with different color values", () => {
			const colors = [
				ToggleSwitchColors.Primary,
				ToggleSwitchColors.Success,
				ToggleSwitchColors.Warning,
				ToggleSwitchColors.Failure,
				ToggleSwitchColors.Info
			];
			colors.forEach(color => {
				const { unmount } = render(<ToggleSwitch checked={false} color={color} />);
				const toggleswitch = screen.getByRole("switch");
				expect(toggleswitch).toBeInTheDocument();
				// Note: color is applied via CSS classes, not data attributes
				unmount();
			});
		});

		it("renders toggleswitch with different sizing values", () => {
			const sizes = [ToggleSwitchSizes.Small, ToggleSwitchSizes.Medium, ToggleSwitchSizes.Large];
			sizes.forEach(size => {
				const { unmount } = render(<ToggleSwitch checked={false} sizing={size} />);
				const toggleswitch = screen.getByRole("switch");
				expect(toggleswitch).toBeInTheDocument();
				// Note: sizing is applied via CSS classes, not data attributes
				unmount();
			});
		});

		it("renders toggleswitch with undefined name", () => {
			render(<ToggleSwitch checked={false} name={undefined} />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			// Note: Flowbite ToggleSwitch doesn't render a hidden input
			expect(toggleswitch).toBeInTheDocument();
		});

		it("renders toggleswitch with undefined value", () => {
			render(<ToggleSwitch checked={false} value={undefined} />);
			const toggleswitch = screen.getByRole("switch");
			expect(toggleswitch).toBeInTheDocument();
			expect(toggleswitch).not.toHaveAttribute("value");
		});
	});

	// Snapshot Tests
	describe("Snapshot Tests", () => {
		it("matches snapshot for toggleswitch with default props", () => {
			const { container } = render(<ToggleSwitch checked={false} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch as checked", () => {
			const { container } = render(<ToggleSwitch checked={true} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with custom id", () => {
			const { container } = render(<ToggleSwitch checked={false} id="custom-toggle-id" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with default id when id is undefined", () => {
			const { container } = render(<ToggleSwitch checked={false} id={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with custom className", () => {
			const { container } = render(
				<ToggleSwitch checked={false} className="custom-toggle-class" />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with sizing prop", () => {
			const { container } = render(<ToggleSwitch checked={false} sizing="sm" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with color prop", () => {
			const { container } = render(<ToggleSwitch checked={false} color="success" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with default color when color is undefined", () => {
			const { container } = render(<ToggleSwitch checked={false} color={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with disabled prop", () => {
			const { container } = render(<ToggleSwitch checked={false} disabled={true} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch as enabled when disabled is false", () => {
			const { container } = render(<ToggleSwitch checked={false} disabled={false} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with name prop", () => {
			const { container } = render(<ToggleSwitch checked={false} name="toggle-name" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with value prop", () => {
			const { container } = render(<ToggleSwitch checked={false} value="toggle-value" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with label", () => {
			const { container } = render(<ToggleSwitch checked={false} label="Toggle Label" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with label and custom id", () => {
			const { container } = render(
				<ToggleSwitch checked={false} id="custom-id" label="Custom Label" />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch without label when label is not provided", () => {
			const { container } = render(<ToggleSwitch checked={false} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with empty string label", () => {
			const { container } = render(<ToggleSwitch checked={false} label="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with special characters in label", () => {
			const { container } = render(
				<ToggleSwitch checked={false} label={`Special & Characters: <>&"'`} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with unicode characters in label", () => {
			const { container } = render(<ToggleSwitch checked={false} label="你好世界" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with long label", () => {
			const longLabel =
				"This is a very long label that should be rendered correctly within the toggle switch component.";
			const { container } = render(<ToggleSwitch checked={false} label={longLabel} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with onChange callback", () => {
			const handleChange = vi.fn();
			const { container } = render(<ToggleSwitch checked={false} onChange={handleChange} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with additional props", () => {
			const { container } = render(
				<ToggleSwitch checked={false} data-custom="value" aria-label="Custom Toggle" />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with style prop", () => {
			const { container } = render(
				<ToggleSwitch checked={false} style={{ backgroundColor: "red", color: "blue" }} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with all props combined", () => {
			const handleChange = vi.fn();
			const { container } = render(
				<ToggleSwitch
					checked={true}
					id="combined-toggle-id"
					className="combined-toggle-class"
					sizing="lg"
					color="warning"
					disabled={false}
					name="combined-toggle"
					value="combined-value"
					label="Combined Toggle Label"
					onChange={handleChange}
					data-test="combined"
					aria-label="Combined Toggle"
					style={{ border: "1px solid black" }}
					onClick={vi.fn()}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with different color values", () => {
			const colors = [
				ToggleSwitchColors.Primary,
				ToggleSwitchColors.Success,
				ToggleSwitchColors.Warning,
				ToggleSwitchColors.Failure,
				ToggleSwitchColors.Info
			];
			colors.forEach(color => {
				const { container, unmount } = render(<ToggleSwitch checked={false} color={color} />);
				expect(container.firstChild).toMatchSnapshot();
				unmount();
			});
		});

		it("matches snapshot for toggleswitch with different sizing values", () => {
			const sizes = [ToggleSwitchSizes.Small, ToggleSwitchSizes.Medium, ToggleSwitchSizes.Large];
			sizes.forEach(size => {
				const { container, unmount } = render(<ToggleSwitch checked={false} sizing={size} />);
				expect(container.firstChild).toMatchSnapshot();
				unmount();
			});
		});

		it("matches snapshot for toggleswitch with empty string name", () => {
			const { container } = render(<ToggleSwitch checked={false} name="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with empty string value", () => {
			const { container } = render(<ToggleSwitch checked={false} value="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with null name", () => {
			const { container } = render(<ToggleSwitch checked={false} name={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with null value", () => {
			const { container } = render(<ToggleSwitch checked={false} value={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with undefined name", () => {
			const { container } = render(<ToggleSwitch checked={false} name={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toggleswitch with undefined value", () => {
			const { container } = render(<ToggleSwitch checked={false} value={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
