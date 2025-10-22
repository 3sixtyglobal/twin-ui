// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Toast } from "./toast";
import React from "react";

describe("Toast", () => {
	// Unit Tests
	describe("Unit Tests", () => {
		it("renders toast with default props", () => {
			render(<Toast>Toast message</Toast>);
			const toast = screen.getByTestId("flowbite-toast");
			expect(toast).toBeInTheDocument();
			expect(toast).toHaveAttribute("role", "alert");
			expect(toast).toHaveAttribute("aria-live", "polite");
			expect(screen.getByText("Toast message")).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "Close notification" })).toBeInTheDocument();
		});

		it("renders toast with custom role", () => {
			render(<Toast role="status">Status message</Toast>);
			const toast = screen.getByTestId("flowbite-toast");
			expect(toast).toHaveAttribute("role", "status");
		});

		it("renders toast with custom close label", () => {
			render(<Toast closeLabel="Custom close">Toast message</Toast>);
			const toggle = screen.getByRole("button", { name: "Custom close" });
			expect(toggle).toHaveAttribute("aria-label", "Custom close");
		});

		it("renders toast with duration", () => {
			render(<Toast duration={5000}>Toast message</Toast>);
			const toast = screen.getByRole("alert");
			expect(toast).toBeInTheDocument();
			// Note: duration is used internally for auto-dismiss, not passed as attribute
		});

		it("renders toast with onDismiss callback", () => {
			const handleDismiss = vi.fn();
			render(<Toast onDismiss={handleDismiss}>Toast message</Toast>);
			const toggle = screen.getByRole("button", { name: "Close notification" });
			toggle.click();
			expect(handleDismiss).toHaveBeenCalledTimes(1);
		});

		it("renders toast with custom className", () => {
			render(<Toast className="custom-toast-class">Toast message</Toast>);
			const toast = screen.getByRole("alert");
			expect(toast).toHaveClass("custom-toast-class");
		});

		it("renders toast with children content", () => {
			render(
				<Toast>
					<div data-testid="toast-content">Custom content</div>
				</Toast>
			);
			expect(screen.getByTestId("toast-content")).toBeInTheDocument();
		});

		it("renders toast with string children", () => {
			render(<Toast>Simple string message</Toast>);
			expect(screen.getByText("Simple string message")).toBeInTheDocument();
		});

		it("renders toast with number children", () => {
			render(<Toast>{42}</Toast>);
			expect(screen.getByText("42")).toBeInTheDocument();
		});

		it("renders toast with boolean children", () => {
			render(<Toast>{true}</Toast>);
			// React renders boolean true as empty string in the DOM
			const toast = screen.getByTestId("flowbite-toast");
			expect(toast).toBeInTheDocument();
		});

		it("renders toast with array children", () => {
			render(<Toast>{["Message 1", "Message 2"]}</Toast>);
			expect(screen.getByText("Message 1Message 2")).toBeInTheDocument();
		});

		it("renders toast with null children", () => {
			render(<Toast>{null}</Toast>);
			const toast = screen.getByTestId("flowbite-toast");
			expect(toast).toBeInTheDocument();
		});

		it("renders toast with undefined children", () => {
			render(<Toast>{undefined}</Toast>);
			const toast = screen.getByTestId("flowbite-toast");
			expect(toast).toBeInTheDocument();
		});

		it("renders toast with empty string children", () => {
			render(<Toast>{""}</Toast>);
			const toast = screen.getByTestId("flowbite-toast");
			expect(toast).toBeInTheDocument();
		});

		it("renders toast with unicode characters in children", () => {
			render(<Toast>你好世界</Toast>);
			expect(screen.getByText("你好世界")).toBeInTheDocument();
		});

		it("renders toast with long text content", () => {
			const longText =
				"This is a very long toast message that should be rendered correctly within the toast component.";
			render(<Toast>{longText}</Toast>);
			expect(screen.getByText(longText)).toBeInTheDocument();
		});

		it("renders toast with mixed content types", () => {
			render(
				<Toast>
					<span>Text</span>
					{123}
					{true}
					<div>JSX</div>
				</Toast>
			);
			expect(screen.getByText("Text")).toBeInTheDocument();
			expect(screen.getByText("123")).toBeInTheDocument();
			expect(screen.getByText("JSX")).toBeInTheDocument();
		});

		it("renders toast with additional props", () => {
			render(
				<Toast data-custom="value" aria-live="assertive">
					Toast message
				</Toast>
			);
			const toast = screen.getByTestId("flowbite-toast");
			expect(toast).toHaveAttribute("data-custom", "value");
			// Note: aria-live is set to 'polite' by default in the component
			expect(toast).toHaveAttribute("aria-live", "polite");
		});

		it("renders toast with style prop", () => {
			render(<Toast style={{ backgroundColor: "red", color: "blue" }}>Toast message</Toast>);
			const toast = screen.getByTestId("flowbite-toast");
			expect(toast).toHaveStyle("background-color: rgb(255, 0, 0)");
			expect(toast).toHaveStyle("color: rgb(0, 0, 255)");
		});

		it("renders toast with onClick handler", () => {
			const handleClick = vi.fn();
			render(<Toast onClick={handleClick}>Toast message</Toast>);
			const toast = screen.getByTestId("flowbite-toast");
			toast.click();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("renders toast with onMouseOver handler", () => {
			const handleMouseOver = vi.fn();
			render(<Toast onMouseOver={handleMouseOver}>Toast message</Toast>);
			const toast = screen.getByTestId("flowbite-toast");
			toast.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});

		it("auto-dismisses toast after duration", async () => {
			const handleDismiss = vi.fn();
			render(
				<Toast duration={100} onDismiss={handleDismiss}>
					Auto dismiss toast
				</Toast>
			);

			expect(screen.getByTestId("flowbite-toast")).toBeInTheDocument();

			await waitFor(
				() => {
					expect(handleDismiss).toHaveBeenCalledTimes(1);
				},
				{ timeout: 200 }
			);
		});

		it("does not auto-dismiss when duration is not provided", async () => {
			const handleDismiss = vi.fn();
			render(<Toast onDismiss={handleDismiss}>Persistent toast</Toast>);

			expect(screen.getByTestId("flowbite-toast")).toBeInTheDocument();

			// Wait a bit to ensure it doesn't auto-dismiss
			await new Promise(resolve => setTimeout(resolve, 100));
			expect(handleDismiss).not.toHaveBeenCalled();
		});

		it("does not auto-dismiss when duration is 0", async () => {
			const handleDismiss = vi.fn();
			render(
				<Toast duration={0} onDismiss={handleDismiss}>
					No auto dismiss toast
				</Toast>
			);

			expect(screen.getByTestId("flowbite-toast")).toBeInTheDocument();

			// Wait a bit to ensure it doesn't auto-dismiss
			await new Promise(resolve => setTimeout(resolve, 100));
			expect(handleDismiss).not.toHaveBeenCalled();
		});

		it("calls onDismiss when manually dismissed", () => {
			const handleDismiss = vi.fn();
			render(<Toast onDismiss={handleDismiss}>Manual dismiss toast</Toast>);

			const toggle = screen.getByRole("button", { name: "Close notification" });
			toggle.click();
			expect(handleDismiss).toHaveBeenCalledTimes(1);
		});

		it("does not call onDismiss when not provided", () => {
			render(<Toast>No dismiss handler toast</Toast>);

			const toggle = screen.getByRole("button", { name: "Close notification" });
			expect(() => toggle.click()).not.toThrow();
		});
	});

	// Snapshot Tests
	describe("Snapshot Tests", () => {
		it("matches snapshot for toast with default props", () => {
			const { container } = render(<Toast>Toast message</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with custom role", () => {
			const { container } = render(<Toast role="status">Status message</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with custom close label", () => {
			const { container } = render(<Toast closeLabel="Custom close">Toast message</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with duration", () => {
			const { container } = render(<Toast duration={5000}>Toast message</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with onDismiss callback", () => {
			const handleDismiss = vi.fn();
			const { container } = render(<Toast onDismiss={handleDismiss}>Toast message</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with custom className", () => {
			const { container } = render(<Toast className="custom-toast-class">Toast message</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with children content", () => {
			const { container } = render(
				<Toast>
					<div data-testid="toast-content">Custom content</div>
				</Toast>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with string children", () => {
			const { container } = render(<Toast>Simple string message</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with number children", () => {
			const { container } = render(<Toast>{42}</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with boolean children", () => {
			const { container } = render(<Toast>{true}</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with array children", () => {
			const { container } = render(<Toast>{["Message 1", "Message 2"]}</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with null children", () => {
			const { container } = render(<Toast>{null}</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with undefined children", () => {
			const { container } = render(<Toast>{undefined}</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with empty string children", () => {
			const { container } = render(<Toast>{""}</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with special characters in children", () => {
			const { container } = render(<Toast>{`Special & Characters: <>&"'`}</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with unicode characters in children", () => {
			const { container } = render(<Toast>你好世界</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with long text content", () => {
			const longText =
				"This is a very long toast message that should be rendered correctly within the toast component.";
			const { container } = render(<Toast>{longText}</Toast>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with mixed content types", () => {
			const { container } = render(
				<Toast>
					<span>Text</span>
					{123}
					{true}
					<div>JSX</div>
				</Toast>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with additional props", () => {
			const { container } = render(
				<Toast data-custom="value" aria-live="assertive">
					Toast message
				</Toast>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for toast with style prop", () => {
			const { container } = render(
				<Toast style={{ backgroundColor: "red", color: "blue" }}>Toast message</Toast>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
