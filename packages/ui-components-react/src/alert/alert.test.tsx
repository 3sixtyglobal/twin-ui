// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Alert } from "./alert";

describe("Alert - Unit Tests", () => {
	it("renders alert with default props", () => {
		render(<Alert>Default Alert</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("Default Alert")).toBeInTheDocument();
	});

	it("renders alert with info color by default", () => {
		render(<Alert>Info Alert</Alert>);

		const alert = screen.getByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass("border-current", "bg-blue-100", "text-blue-700");
	});

	it("renders alert with error color", () => {
		render(<Alert color="error">Error Alert</Alert>);

		const alert = screen.getByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass("border-current", "bg-red-100", "text-red-700");
	});

	it("renders alert with warning color", () => {
		render(<Alert color="warning">Warning Alert</Alert>);

		const alert = screen.getByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass("border-current", "bg-system-warning-tints-50", "text-warning");
	});

	it("renders alert with success color", () => {
		render(<Alert color="success">Success Alert</Alert>);

		const alert = screen.getByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass(
			"border-current",
			"bg-system-success-tints-100",
			"text-system-success-tints-700"
		);
	});

	it("renders alert with gray color", () => {
		render(<Alert color="gray">Gray Alert</Alert>);

		const alert = screen.getByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass("border-current", "bg-gray-100", "text-gray-700");
	});

	it("renders alert with custom className", () => {
		render(<Alert className="custom-alert-class">Custom Alert</Alert>);

		const alert = screen.getByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass("custom-alert-class");
	});

	it("renders alert with JSX children", () => {
		render(
			<Alert>
				<div>
					<strong>Bold text</strong> and <em>italic text</em>
				</div>
			</Alert>
		);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("Bold text")).toBeInTheDocument();
		expect(screen.getByText("italic text")).toBeInTheDocument();
	});

	it("renders alert with string children", () => {
		render(<Alert>Simple string content</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("Simple string content")).toBeInTheDocument();
	});

	it("renders alert with number children", () => {
		render(<Alert>{42}</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();
	});

	it("renders alert with boolean children", () => {
		render(<Alert>{true}</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		// Boolean children are rendered as strings in the Alert component
	});

	it("renders alert with array children", () => {
		render(<Alert>{["Item 1", "Item 2", "Item 3"]}</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		// Array children are rendered as concatenated text in the Alert component
	});

	it("renders alert with fragment children", () => {
		render(
			<Alert>
				<>
					<span>Fragment content 1</span>
					<span>Fragment content 2</span>
				</>
			</Alert>
		);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("Fragment content 1")).toBeInTheDocument();
		expect(screen.getByText("Fragment content 2")).toBeInTheDocument();
	});

	it("renders alert with empty children", () => {
		render(<Alert></Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("renders alert with null children", () => {
		render(<Alert>{null}</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("renders alert with undefined children", () => {
		render(<Alert>{undefined}</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("renders alert with long text content", () => {
		const longText =
			"This is a very long alert message that contains multiple sentences and should be displayed properly within the alert component. It tests how the component handles lengthy content.";

		render(<Alert>{longText}</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText(longText)).toBeInTheDocument();
	});

	it("renders alert with complex nested content", () => {
		render(
			<Alert>
				<div>
					<h3>Alert Title</h3>
					<p>
						This is a paragraph with <a href="#">a link</a> inside.
					</p>
					<ul>
						<li>List item 1</li>
						<li>List item 2</li>
					</ul>
				</div>
			</Alert>
		);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("Alert Title")).toBeInTheDocument();
		expect(screen.getByText("a link")).toBeInTheDocument();
		expect(screen.getByText("List item 1")).toBeInTheDocument();
		expect(screen.getByText("List item 2")).toBeInTheDocument();
	});

	it("renders alert with all color variants", () => {
		const colors = ["info", "error", "warning", "success", "gray"] as const;

		colors.forEach(color => {
			const { unmount } = render(<Alert color={color}>{color} alert</Alert>);

			expect(screen.getByRole("alert")).toBeInTheDocument();
			expect(screen.getByText(`${color} alert`)).toBeInTheDocument();

			unmount();
		});
	});

	it("renders alert with combined props", () => {
		render(
			<Alert color="success" className="custom-class additional-class">
				Combined props alert
			</Alert>
		);

		const alert = screen.getByRole("alert");
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass("custom-class", "additional-class");
		expect(screen.getByText("Combined props alert")).toBeInTheDocument();
	});

	it("renders alert with whitespace children", () => {
		render(<Alert>{"   "}</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("renders alert with special characters", () => {
		render(<Alert>Alert with special chars: !@#$%^&*()</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("Alert with special chars: !@#$%^&*()")).toBeInTheDocument();
	});

	it("renders alert with unicode characters", () => {
		render(<Alert>Alert with unicode: 🚨 ⚠️ ✅ ❌</Alert>);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("Alert with unicode: 🚨 ⚠️ ✅ ❌")).toBeInTheDocument();
	});
});

describe("Alert - Snapshot Tests", () => {
	it("matches snapshot for default alert", () => {
		const { container } = render(<Alert>Default Alert</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for info alert", () => {
		const { container } = render(<Alert color="info">Info Alert</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for error alert", () => {
		const { container } = render(<Alert color="error">Error Alert</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for warning alert", () => {
		const { container } = render(<Alert color="warning">Warning Alert</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for success alert", () => {
		const { container } = render(<Alert color="success">Success Alert</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for gray alert", () => {
		const { container } = render(<Alert color="gray">Gray Alert</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with custom className", () => {
		const { container } = render(<Alert className="custom-alert-class">Custom Alert</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with JSX children", () => {
		const { container } = render(
			<Alert>
				<div>
					<strong>Bold text</strong> and <em>italic text</em>
				</div>
			</Alert>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with string children", () => {
		const { container } = render(<Alert>Simple string content</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with number children", () => {
		const { container } = render(<Alert>{42}</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with boolean children", () => {
		const { container } = render(<Alert>{true}</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with array children", () => {
		const { container } = render(<Alert>{["Item 1", "Item 2", "Item 3"]}</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with fragment children", () => {
		const { container } = render(
			<Alert>
				<>
					<span>Fragment content 1</span>
					<span>Fragment content 2</span>
				</>
			</Alert>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with empty children", () => {
		const { container } = render(<Alert></Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with null children", () => {
		const { container } = render(<Alert>{null}</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with undefined children", () => {
		const { container } = render(<Alert>{undefined}</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with long text content", () => {
		const longText =
			"This is a very long alert message that contains multiple sentences and should be displayed properly within the alert component. It tests how the component handles lengthy content.";

		const { container } = render(<Alert>{longText}</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with complex nested content", () => {
		const { container } = render(
			<Alert>
				<div>
					<h3>Alert Title</h3>
					<p>
						This is a paragraph with <a href="#">a link</a> inside.
					</p>
					<ul>
						<li>List item 1</li>
						<li>List item 2</li>
					</ul>
				</div>
			</Alert>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with combined props", () => {
		const { container } = render(
			<Alert color="success" className="custom-class additional-class">
				Combined props alert
			</Alert>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with whitespace children", () => {
		const { container } = render(<Alert>{"   "}</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with special characters", () => {
		const { container } = render(<Alert>Alert with special chars: !@#$%^&*()</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for alert with unicode characters", () => {
		const { container } = render(<Alert>Alert with unicode: 🚨 ⚠️ ✅ ❌</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for all color variants", () => {
		const colors = ["info", "error", "warning", "success", "gray"] as const;

		colors.forEach(color => {
			const { container } = render(<Alert color={color}>{color} alert</Alert>);
			expect(container.firstChild).toMatchSnapshot(`${color} color alert`);
		});
	});
});
