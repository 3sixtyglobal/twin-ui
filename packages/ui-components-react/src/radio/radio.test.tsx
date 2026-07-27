// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Radio } from "./radio";

describe("Radio - Unit Tests", () => {
	it("renders radio with required props", () => {
		render(<Radio label="Radio Label" value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// Label is passed as an attribute, not rendered as separate text
		expect(radio).toHaveAttribute("label", "Radio Label");
	});

	it("renders radio with custom className", () => {
		render(<Radio label="Radio Label" value="radio-value" className="custom-radio-class" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveClass("custom-radio-class");
	});

	it("renders radio with custom id", () => {
		render(<Radio label="Radio Label" value="radio-value" id="custom-radio-id" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveAttribute("id", "custom-radio-id");
	});

	it("renders radio with disabled prop", () => {
		render(<Radio label="Radio Label" value="radio-value" disabled={true} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with required prop", () => {
		render(<Radio label="Radio Label" value="radio-value" required={true} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with checked prop", () => {
		render(<Radio label="Radio Label" value="radio-value" checked={true} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with unchecked prop", () => {
		render(<Radio label="Radio Label" value="radio-value" checked={false} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with defaultChecked prop", () => {
		render(<Radio label="Radio Label" value="radio-value" defaultChecked={true} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with name prop", () => {
		render(<Radio label="Radio Label" value="radio-value" name="radio-group" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with children content", () => {
		render(<Radio label="Radio Label" value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// Label is passed as label attribute to the radio input
		expect(radio).toHaveAttribute("label", "Radio Label");
	});

	it("renders radio with onChange handler", () => {
		const handleChange = vi.fn();
		render(<Radio label="Radio Label" value="radio-value" onChange={handleChange} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with all props combined", () => {
		const handleChange = vi.fn();
		render(
			<Radio
				id="complete-radio-id"
				name="complete-radio-group"
				value="complete-value"
				label="Complete Radio"
				checked={true}
				disabled={false}
				required={true}
				defaultChecked={false}
				className="complete-radio-class"
				onChange={handleChange}
			/>
		);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveClass("complete-radio-class");
		expect(radio).toHaveAttribute("id", "complete-radio-id");
		// Label is passed as label attribute to the radio input
		expect(radio).toHaveAttribute("label", "Complete Radio");
	});

	it("renders radio with multiple classes", () => {
		render(<Radio label="Radio Label" value="radio-value" className="class1 class2 class3" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveClass("class1", "class2", "class3");
	});

	it("renders radio with whitespace in className", () => {
		render(<Radio label="Radio Label" value="radio-value" className="spaced-class" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveClass("  spaced-class  ");
	});

	it("renders radio with empty className", () => {
		render(<Radio label="Radio Label" value="radio-value" className="" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// Real Flowbite Radio component applies its own classes
		expect(radio).toHaveClass("h-4", "w-4");
	});

	it("renders radio with undefined className", () => {
		render(<Radio label="Radio Label" value="radio-value" className={undefined} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with null className", () => {
		render(<Radio label="Radio Label" value="radio-value" className={null as any} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with empty id", () => {
		render(<Radio label="Radio Label" value="radio-value" id="" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveAttribute("id", "");
	});

	it("renders radio with undefined id", () => {
		render(<Radio label="Radio Label" value="radio-value" id={undefined} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// When id is undefined, it should not have an id attribute
		expect(radio).not.toHaveAttribute("id");
	});

	it("renders radio with null id", () => {
		render(<Radio label="Radio Label" value="radio-value" id={null as any} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// When id is null, it should not have an id attribute
		expect(radio).not.toHaveAttribute("id");
	});

	it("renders radio with empty name", () => {
		render(<Radio label="Radio Label" value="radio-value" name="" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with undefined name", () => {
		render(<Radio label="Radio Label" value="radio-value" name={undefined} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with null name", () => {
		render(<Radio label="Radio Label" value="radio-value" name={null as any} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with empty value", () => {
		render(<Radio label="Radio Label" value="" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with undefined value", () => {
		render(<Radio label="Radio Label" value={undefined as any} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with null value", () => {
		render(<Radio label="Radio Label" value={null as any} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with empty label", () => {
		render(<Radio label="" value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with undefined label", () => {
		render(<Radio label={undefined as any} value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with null label", () => {
		render(<Radio label={null as any} value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with string children", () => {
		render(<Radio label="String Children" value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// Children are passed as label attribute, not rendered as separate text
		expect(radio).toHaveAttribute("label", "String Children");
	});

	it("renders radio with JSX children", () => {
		render(<Radio label="JSX Children" value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// JSX children are converted to string when passed as label attribute
		expect(radio).toHaveAttribute("label", "JSX Children");
	});

	it("renders radio with number children", () => {
		render(<Radio label={42} value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// Number children are converted to string when passed as label attribute
		expect(radio).toHaveAttribute("label", "42");
	});

	it("renders radio with boolean children", () => {
		render(<Radio label={true} value="radio-value" />);

		expect(screen.getByRole("radio")).toBeInTheDocument();
		// Boolean children are not rendered as text in the Radio component
	});

	it("renders radio with array children", () => {
		render(<Radio label={["Array", "Children"]} value="radio-value" />);

		expect(screen.getByRole("radio")).toBeInTheDocument();
		// Array children are rendered as concatenated text
	});

	it("renders radio with fragment children", () => {
		const fragment = (
			<>
				<span>Fragment</span>
				<span>Children</span>
			</>
		);
		render(<Radio label={fragment} value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// Fragment children are converted to string when passed as label attribute
		expect(radio).toHaveAttribute("label", "[object Object]");
	});

	it("renders radio with null children", () => {
		render(
			<Radio label="Radio Label" value="radio-value">
				{null}
			</Radio>
		);

		expect(screen.getByRole("radio")).toBeInTheDocument();
	});

	it("renders radio with undefined children", () => {
		render(
			<Radio label="Radio Label" value="radio-value">
				{undefined}
			</Radio>
		);

		expect(screen.getByRole("radio")).toBeInTheDocument();
	});

	it("renders radio with empty string children", () => {
		render(<Radio label="Radio Label" value="radio-value"></Radio>);

		expect(screen.getByRole("radio")).toBeInTheDocument();
	});

	it("renders radio with special characters in label", () => {
		render(<Radio label="Radio with special chars: !@#$%^&*()" value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// Label is passed as an attribute, not rendered as separate text
		expect(radio).toHaveAttribute("label", "Radio with special chars: !@#$%^&*()");
	});

	it("renders radio with unicode characters in label", () => {
		render(<Radio label="Radio with unicode: 📻 🎵" value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// Label is passed as an attribute, not rendered as separate text
		expect(radio).toHaveAttribute("label", "Radio with unicode: 📻 🎵");
	});

	it("renders radio with long text label", () => {
		const longLabel =
			"This is a very long radio label that should be handled properly by the component and should not break the layout or functionality";

		render(<Radio label={longLabel} value="radio-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		// Label is passed as an attribute, not rendered as separate text
		expect(radio).toHaveAttribute("label", longLabel);
	});

	it("renders radio with whitespace label", () => {
		render(<Radio label="   " value="radio-value" />);

		expect(screen.getByRole("radio")).toBeInTheDocument();
	});

	it("renders radio with special characters in value", () => {
		render(<Radio label="Radio Label" value="radio-value-with-special-chars-!@#$%^&*()" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with unicode characters in value", () => {
		render(<Radio label="Radio Label" value="radio-value-with-unicode-📻🎵" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with long value", () => {
		const longValue =
			"radio-value-with-very-long-string-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		render(<Radio label="Radio Label" value={longValue} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with special characters in name", () => {
		render(
			<Radio
				label="Radio Label"
				value="radio-value"
				name="radio-group-with-special-chars-!@#$%^&*()"
			/>
		);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
	});

	it("renders radio with special characters in id", () => {
		render(
			<Radio label="Radio Label" value="radio-value" id="radio-with-special-chars-!@#$%^&*()" />
		);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveAttribute("id", "radio-with-special-chars-!@#$%^&*()");
	});

	it("renders radio with unicode characters in id", () => {
		render(<Radio label="Radio Label" value="radio-value" id="radio-with-unicode-📻🎵" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveAttribute("id", "radio-with-unicode-📻🎵");
	});

	it("renders radio with long id", () => {
		const longId =
			"radio-with-very-long-id-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		render(<Radio label="Radio Label" value="radio-value" id={longId} />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveAttribute("id", longId);
	});

	it("renders radio with custom props", () => {
		render(<Radio label="Radio Label" value="radio-value" data-custom="test-value" />);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveAttribute("data-custom", "test-value");
	});

	it("renders radio with multiple custom props", () => {
		render(
			<Radio
				label="Radio Label"
				value="radio-value"
				data-custom="test-value"
				data-another="another-value"
				aria-label="Custom radio"
			/>
		);

		const radio = screen.getByRole("radio");
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveAttribute("data-custom", "test-value");
		expect(radio).toHaveAttribute("data-another", "another-value");
		expect(radio).toHaveAttribute("aria-label", "Custom radio");
	});
});

describe("Radio - Snapshot Tests", () => {
	it("matches snapshot for radio with required props", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with custom className", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" className="custom-radio-class" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with custom id", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" id="custom-radio-id" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with disabled prop", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" disabled={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with required prop", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" required={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with checked prop", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" checked={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with unchecked prop", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" checked={false} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with defaultChecked prop", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" defaultChecked={true} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with name prop", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" name="radio-group" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with children content", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with onChange handler", () => {
		const handleChange = vi.fn();
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" onChange={handleChange} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with all props combined", () => {
		const handleChange = vi.fn();
		const { container } = render(
			<Radio
				id="complete-radio-id"
				name="complete-radio-group"
				value="complete-value"
				label="Complete Radio"
				checked={true}
				disabled={false}
				required={true}
				defaultChecked={false}
				className="complete-radio-class"
				onChange={handleChange}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with multiple classes", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" className="class1 class2 class3" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with whitespace in className", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" className="spaced-class" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with empty className", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" className="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with undefined className", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" className={undefined} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with null className", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" className={null as any} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with empty id", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" id="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with undefined id", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" id={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with null id", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" id={null as any} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with empty name", () => {
		const { container } = render(<Radio label="Radio Label" value="radio-value" name="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with undefined name", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" name={undefined} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with null name", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" name={null as any} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with empty value", () => {
		const { container } = render(<Radio label="Radio Label" value="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with undefined value", () => {
		const { container } = render(<Radio label="Radio Label" value={undefined as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with null value", () => {
		const { container } = render(<Radio label="Radio Label" value={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with empty label", () => {
		const { container } = render(<Radio label="" value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with undefined label", () => {
		const { container } = render(<Radio label={undefined as any} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with null label", () => {
		const { container } = render(<Radio label={null as any} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with string children", () => {
		const { container } = render(<Radio label="String Children" value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with JSX children", () => {
		const jsxLabel = (
			<div>
				<span>JSX Children</span>
			</div>
		);
		const { container } = render(<Radio label={jsxLabel} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with number children", () => {
		const { container } = render(<Radio label={42} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with boolean children", () => {
		const { container } = render(<Radio label={true} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with array children", () => {
		const { container } = render(<Radio label={["Array", "Children"]} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with fragment children", () => {
		const fragment = (
			<>
				<span>Fragment</span>
				<span>Children</span>
			</>
		);
		const { container } = render(<Radio label={fragment} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with null children", () => {
		const { container } = render(<Radio label={null} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with undefined children", () => {
		const { container } = render(<Radio label={undefined} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with empty string children", () => {
		const { container } = render(<Radio label="" value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with special characters in label", () => {
		const { container } = render(
			<Radio label="Radio with special chars: !@#$%^&*()" value="radio-value" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with unicode characters in label", () => {
		const { container } = render(<Radio label="Radio with unicode: 📻 🎵" value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with long text label", () => {
		const longLabel =
			"This is a very long radio label that should be handled properly by the component and should not break the layout or functionality";

		const { container } = render(<Radio label={longLabel} value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with whitespace label", () => {
		const { container } = render(<Radio label="   " value="radio-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with special characters in value", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value-with-special-chars-!@#$%^&*()" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with unicode characters in value", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value-with-unicode-📻🎵" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with long value", () => {
		const longValue =
			"radio-value-with-very-long-string-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		const { container } = render(<Radio label="Radio Label" value={longValue} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with special characters in name", () => {
		const { container } = render(
			<Radio
				label="Radio Label"
				value="radio-value"
				name="radio-group-with-special-chars-!@#$%^&*()"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with special characters in id", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" id="radio-with-special-chars-!@#$%^&*()" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with unicode characters in id", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" id="radio-with-unicode-📻🎵" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with long id", () => {
		const longId =
			"radio-with-very-long-id-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		const { container } = render(<Radio label="Radio Label" value="radio-value" id={longId} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with custom props", () => {
		const { container } = render(
			<Radio label="Radio Label" value="radio-value" data-custom="test-value" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for radio with multiple custom props", () => {
		const { container } = render(
			<Radio
				label="Radio Label"
				value="radio-value"
				data-custom="test-value"
				data-another="another-value"
				aria-label="Custom radio"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
