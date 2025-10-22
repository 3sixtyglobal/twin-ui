// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "./label";

describe("Label - Unit Tests", () => {
	it("renders label with children content", () => {
		render(<Label>Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(screen.getByText("Label Text")).toBeInTheDocument();
	});

	it("renders label with value prop", () => {
		render(<Label value="Label Value" />);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(screen.getByText("Label Value")).toBeInTheDocument();
	});

	it("renders label with value prop overriding children", () => {
		render(<Label value="Label Value">Children Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(screen.getByText("Label Value")).toBeInTheDocument();
		expect(screen.queryByText("Children Text")).not.toBeInTheDocument();
	});

	it("renders label with custom className", () => {
		render(<Label className="custom-label-class">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass("custom-label-class");
	});

	it("renders label with htmlFor prop", () => {
		render(<Label htmlFor="input-id">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute("for", "input-id");
	});

	it("renders label with string children", () => {
		render(<Label>Simple Label</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText("Simple Label")).toBeInTheDocument();
	});

	it("renders label with JSX children", () => {
		render(
			<Label>
				<div>
					<span>Complex Label</span>
				</div>
			</Label>
		);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText("Complex Label")).toBeInTheDocument();
	});

	it("renders label with number children", () => {
		render(<Label>{42}</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();
	});

	it("renders label with boolean children", () => {
		render(<Label>{true}</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		// Boolean children are not rendered as text in the Label component
	});

	it("renders label with array children", () => {
		render(<Label>{["Label", "Part", "Two"]}</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		// Array children are rendered as concatenated text
	});

	it("renders label with fragment children", () => {
		render(
			<Label>
				<>
					<span>First</span>
					<span>Second</span>
				</>
			</Label>
		);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText("First")).toBeInTheDocument();
		expect(screen.getByText("Second")).toBeInTheDocument();
	});

	it("renders label with null children", () => {
		render(<Label>{null}</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
	});

	it("renders label with undefined children", () => {
		render(<Label>{undefined}</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
	});

	it("renders label with empty string children", () => {
		render(<Label></Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
	});

	it("renders label with all props combined", () => {
		render(
			<Label value="Complete Label" htmlFor="complete-input-id" className="complete-label-class">
				<span>Children Content</span>
			</Label>
		);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass("complete-label-class");
		expect(label).toHaveAttribute("for", "complete-input-id");
		expect(screen.getByText("Complete Label")).toBeInTheDocument();
		expect(screen.queryByText("Children Content")).not.toBeInTheDocument();
	});

	it("renders label with multiple classes", () => {
		render(<Label className="class1 class2 class3">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass("class1", "class2", "class3");
	});

	it("renders label with whitespace in className", () => {
		render(<Label className="spaced-class">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass("  spaced-class  ");
	});

	it("renders label with empty className", () => {
		render(<Label className="">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		// Flowbite Label component applies its own default classes even when className is empty
		expect(label).toHaveClass("text-sm", "font-medium", "text-gray-900", "dark:text-white");
	});

	it("renders label with undefined className", () => {
		render(<Label className={undefined}>Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
	});

	it("renders label with null className", () => {
		render(<Label className={null as any}>Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
	});

	it("renders label with empty htmlFor", () => {
		render(<Label htmlFor="">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute("for", "");
	});

	it("renders label with undefined htmlFor", () => {
		render(<Label htmlFor={undefined}>Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).not.toHaveAttribute("for");
	});

	it("renders label with null htmlFor", () => {
		render(<Label htmlFor={null as any}>Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).not.toHaveAttribute("for");
	});

	it("renders label with empty value", () => {
		render(<Label value="">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		// Empty value overrides children, so no text content should be visible
	});

	it("renders label with undefined value", () => {
		render(<Label value={undefined}>Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(screen.getByText("Label Text")).toBeInTheDocument();
	});

	it("renders label with null value", () => {
		render(<Label value={null as any}>Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(screen.getByText("Label Text")).toBeInTheDocument();
	});

	it("renders label with special characters in children", () => {
		render(<Label>Label with special chars: !@#$%^&*()</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText("Label with special chars: !@#$%^&*()")).toBeInTheDocument();
	});

	it("renders label with unicode characters in children", () => {
		render(<Label>Label with unicode: 🏷️ 📝</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText("Label with unicode: 🏷️ 📝")).toBeInTheDocument();
	});

	it("renders label with long text children", () => {
		const longText =
			"This is a very long label text that should be handled properly by the component and should not break the layout or functionality";

		render(<Label>{longText}</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText(longText)).toBeInTheDocument();
	});

	it("renders label with whitespace children", () => {
		render(<Label>{"   "}</Label>);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
	});

	it("renders label with special characters in value", () => {
		render(<Label value="Label value with special chars: !@#$%^&*()" />);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText("Label value with special chars: !@#$%^&*()")).toBeInTheDocument();
	});

	it("renders label with unicode characters in value", () => {
		render(<Label value="Label value with unicode: 🏷️ 📝" />);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText("Label value with unicode: 🏷️ 📝")).toBeInTheDocument();
	});

	it("renders label with long value", () => {
		const longValue =
			"This is a very long label value that should be handled properly by the component and should not break the layout or functionality";

		render(<Label value={longValue} />);

		expect(screen.getByTestId("flowbite-label")).toBeInTheDocument();
		expect(screen.getByText(longValue)).toBeInTheDocument();
	});

	it("renders label with special characters in htmlFor", () => {
		render(<Label htmlFor="input-with-special-chars-!@#$%^&*()">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute("for", "input-with-special-chars-!@#$%^&*()");
	});

	it("renders label with unicode characters in htmlFor", () => {
		render(<Label htmlFor="input-with-unicode-🏷️📝">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute("for", "input-with-unicode-🏷️📝");
	});

	it("renders label with long htmlFor", () => {
		const longHtmlFor =
			"input-with-very-long-id-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		render(<Label htmlFor={longHtmlFor}>Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute("for", longHtmlFor);
	});

	it("renders label with custom props", () => {
		render(<Label data-custom="test-value">Label Text</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute("data-custom", "test-value");
	});

	it("renders label with multiple custom props", () => {
		render(
			<Label data-custom="test-value" data-another="another-value" aria-label="Custom label">
				Label Text
			</Label>
		);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute("data-custom", "test-value");
		expect(label).toHaveAttribute("data-another", "another-value");
		expect(label).toHaveAttribute("aria-label", "Custom label");
	});

	it("renders label with value and no children", () => {
		render(<Label value="Only Value" />);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(screen.getByText("Only Value")).toBeInTheDocument();
	});

	it("renders label with children and no value", () => {
		render(<Label>Only Children</Label>);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		expect(screen.getByText("Only Children")).toBeInTheDocument();
	});

	it("renders label with neither value nor children", () => {
		render(<Label />);

		const label = screen.getByTestId("flowbite-label");
		expect(label).toBeInTheDocument();
		// No content should be rendered when neither value nor children are provided
	});
});

describe("Label - Snapshot Tests", () => {
	it("matches snapshot for label with children content", () => {
		const { container } = render(<Label>Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with value prop", () => {
		const { container } = render(<Label value="Label Value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with value prop overriding children", () => {
		const { container } = render(<Label value="Label Value">Children Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with custom className", () => {
		const { container } = render(<Label className="custom-label-class">Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with htmlFor prop", () => {
		const { container } = render(<Label htmlFor="input-id">Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with string children", () => {
		const { container } = render(<Label>Simple Label</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with JSX children", () => {
		const { container } = render(
			<Label>
				<div>
					<span>Complex Label</span>
				</div>
			</Label>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with number children", () => {
		const { container } = render(<Label>{42}</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with boolean children", () => {
		const { container } = render(<Label>{true}</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with array children", () => {
		const { container } = render(<Label>{["Label", "Part", "Two"]}</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with fragment children", () => {
		const { container } = render(
			<Label>
				<>
					<span>First</span>
					<span>Second</span>
				</>
			</Label>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with null children", () => {
		const { container } = render(<Label>{null}</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with undefined children", () => {
		const { container } = render(<Label>{undefined}</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with empty string children", () => {
		const { container } = render(<Label></Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with all props combined", () => {
		const { container } = render(
			<Label value="Complete Label" htmlFor="complete-input-id" className="complete-label-class">
				<span>Children Content</span>
			</Label>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with multiple classes", () => {
		const { container } = render(<Label className="class1 class2 class3">Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with whitespace in className", () => {
		const { container } = render(<Label className="spaced-class">Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with empty className", () => {
		const { container } = render(<Label className="">Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with undefined className", () => {
		const { container } = render(<Label className={undefined}>Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with null className", () => {
		const { container } = render(<Label className={null as any}>Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with empty htmlFor", () => {
		const { container } = render(<Label htmlFor="">Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with undefined htmlFor", () => {
		const { container } = render(<Label htmlFor={undefined}>Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with null htmlFor", () => {
		const { container } = render(<Label htmlFor={null as any}>Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with empty value", () => {
		const { container } = render(<Label value="">Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with undefined value", () => {
		const { container } = render(<Label value={undefined}>Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with null value", () => {
		const { container } = render(<Label value={null as any}>Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with special characters in children", () => {
		const { container } = render(<Label>Label with special chars: !@#$%^&*()</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with unicode characters in children", () => {
		const { container } = render(<Label>Label with unicode: 🏷️ 📝</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with long text children", () => {
		const longText =
			"This is a very long label text that should be handled properly by the component and should not break the layout or functionality";

		const { container } = render(<Label>{longText}</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with whitespace children", () => {
		const { container } = render(<Label>{"   "}</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with special characters in value", () => {
		const { container } = render(<Label value="Label value with special chars: !@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with unicode characters in value", () => {
		const { container } = render(<Label value="Label value with unicode: 🏷️ 📝" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with long value", () => {
		const longValue =
			"This is a very long label value that should be handled properly by the component and should not break the layout or functionality";

		const { container } = render(<Label value={longValue} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with special characters in htmlFor", () => {
		const { container } = render(
			<Label htmlFor="input-with-special-chars-!@#$%^&*()">Label Text</Label>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with unicode characters in htmlFor", () => {
		const { container } = render(<Label htmlFor="input-with-unicode-🏷️📝">Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with long htmlFor", () => {
		const longHtmlFor =
			"input-with-very-long-id-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		const { container } = render(<Label htmlFor={longHtmlFor}>Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with custom props", () => {
		const { container } = render(<Label data-custom="test-value">Label Text</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with multiple custom props", () => {
		const { container } = render(
			<Label data-custom="test-value" data-another="another-value" aria-label="Custom label">
				Label Text
			</Label>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with value and no children", () => {
		const { container } = render(<Label value="Only Value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with children and no value", () => {
		const { container } = render(<Label>Only Children</Label>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for label with neither value nor children", () => {
		const { container } = render(<Label />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
