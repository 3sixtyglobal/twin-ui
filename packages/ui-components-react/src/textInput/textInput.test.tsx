// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TextInput } from "./textInput";

describe("TextInput - Unit Tests", () => {
	it("renders textinput with default props", () => {
		render(<TextInput />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("type", "text");
	});

	it("renders textinput with custom type", () => {
		render(<TextInput type="email" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("type", "email");
	});

	it("renders textinput with custom className", () => {
		const { container } = render(<TextInput className="custom-textinput-class" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		// Custom className is applied to the wrapper, not the input element directly
		expect(container.firstChild).toHaveClass("custom-textinput-class");
	});

	it("renders textinput with custom id", () => {
		render(<TextInput id="custom-textinput-id" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("id", "custom-textinput-id");
	});

	it("renders textinput with disabled prop", () => {
		render(<TextInput disabled={true} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with required prop", () => {
		render(<TextInput required={true} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with readOnly prop", () => {
		render(<TextInput readOnly={true} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with name prop", () => {
		render(<TextInput name="textinput-name" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with value prop", () => {
		render(<TextInput value="textinput-value" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with placeholder prop", () => {
		render(<TextInput placeholder="Enter text here" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with label prop", () => {
		render(<TextInput label="Input Label" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with helperText prop", () => {
		render(<TextInput helperText="Helper text content" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with addon prop", () => {
		render(<TextInput addon="Addon text" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with onChange handler", () => {
		const handleChange = vi.fn();
		render(<TextInput onChange={handleChange} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with all props combined", () => {
		const handleChange = vi.fn();
		const { container } = render(
			<TextInput
				id="complete-textinput-id"
				name="complete-textinput"
				value="complete-value"
				placeholder="Complete placeholder"
				label="Complete Label"
				helperText="Complete helper text"
				addon="Complete addon"
				type="password"
				disabled={false}
				required={true}
				readOnly={false}
				className="complete-textinput-class"
				onChange={handleChange}
			/>
		);

		// When using addon, the input might not be directly accessible by role
		const input = container.querySelector("input");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("id", "complete-textinput-id");
		expect(input).toHaveAttribute("type", "password");
		// Custom className is applied to the wrapper, not the input element directly
		expect(container.firstChild).toHaveClass("complete-textinput-class");
	});

	it("renders textinput with multiple classes", () => {
		const { container } = render(<TextInput className="class1 class2 class3" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		// Custom className is applied to the wrapper, not the input element directly
		expect(container.firstChild).toHaveClass("class1", "class2", "class3");
	});

	it("renders textinput with whitespace in className", () => {
		const { container } = render(<TextInput className="spaced-class" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		// Custom className is applied to the wrapper, not the input element directly
		expect(container.firstChild).toHaveClass("  spaced-class  ");
	});

	it("renders textinput with empty className", () => {
		const { container } = render(<TextInput className="" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		// Custom className is applied to the wrapper, not the input element directly
		expect(container.firstChild).toHaveClass("flex");
	});

	it("renders textinput with undefined className", () => {
		render(<TextInput className={undefined} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with null className", () => {
		render(<TextInput className={null as any} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with empty id", () => {
		render(<TextInput id="" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("id", "");
	});

	it("renders textinput with undefined id", () => {
		render(<TextInput id={undefined} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		// When id is undefined, it should not have an id attribute
		expect(textinput).not.toHaveAttribute("id");
	});

	it("renders textinput with null id", () => {
		render(<TextInput id={null as any} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		// When id is null, it should not have an id attribute
		expect(textinput).not.toHaveAttribute("id");
	});

	it("renders textinput with empty name", () => {
		render(<TextInput name="" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with undefined name", () => {
		render(<TextInput name={undefined} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with null name", () => {
		render(<TextInput name={null as any} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with empty value", () => {
		render(<TextInput value="" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with undefined value", () => {
		render(<TextInput value={undefined} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with null value", () => {
		render(<TextInput value={null as any} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with empty placeholder", () => {
		render(<TextInput placeholder="" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with undefined placeholder", () => {
		render(<TextInput placeholder={undefined} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with null placeholder", () => {
		render(<TextInput placeholder={null as any} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with empty label", () => {
		render(<TextInput label="" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with undefined label", () => {
		render(<TextInput label={undefined} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with null label", () => {
		render(<TextInput label={null as any} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with empty helperText", () => {
		render(<TextInput helperText="" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with undefined helperText", () => {
		render(<TextInput helperText={undefined} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with null helperText", () => {
		render(<TextInput helperText={null as any} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with empty addon", () => {
		render(<TextInput addon="" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with undefined addon", () => {
		render(<TextInput addon={undefined} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with null addon", () => {
		render(<TextInput addon={null as any} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with undefined type", () => {
		render(<TextInput type={undefined} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("type", "text");
	});

	it("renders textinput with null type", () => {
		render(<TextInput type={null as any} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("type", "text");
	});

	it("renders textinput with special characters in value", () => {
		render(<TextInput value="Value with special chars: !@#$%^&*()" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with unicode characters in value", () => {
		render(<TextInput value="Value with unicode: 📝 ✏️" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with long value", () => {
		const longValue =
			"This is a very long value that should be handled properly by the component and should not break the layout or functionality";

		render(<TextInput value={longValue} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with special characters in placeholder", () => {
		render(<TextInput placeholder="Placeholder with special chars: !@#$%^&*()" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with unicode characters in placeholder", () => {
		render(<TextInput placeholder="Placeholder with unicode: 📝 ✏️" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with long placeholder", () => {
		const longPlaceholder =
			"This is a very long placeholder that should be handled properly by the component and should not break the layout or functionality";

		render(<TextInput placeholder={longPlaceholder} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with special characters in name", () => {
		render(<TextInput name="input-name-with-special-chars-!@#$%^&*()" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
	});

	it("renders textinput with special characters in id", () => {
		render(<TextInput id="input-with-special-chars-!@#$%^&*()" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("id", "input-with-special-chars-!@#$%^&*()");
	});

	it("renders textinput with unicode characters in id", () => {
		render(<TextInput id="input-with-unicode-📝✏️" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("id", "input-with-unicode-📝✏️");
	});

	it("renders textinput with long id", () => {
		const longId =
			"input-with-very-long-id-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		render(<TextInput id={longId} />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("id", longId);
	});

	it("renders textinput with custom props", () => {
		render(<TextInput data-custom="test-value" />);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("data-custom", "test-value");
	});

	it("renders textinput with multiple custom props", () => {
		render(
			<TextInput
				data-custom="test-value"
				data-another="another-value"
				aria-label="Custom textinput"
			/>
		);

		const textinput = screen.getByRole("textbox");
		expect(textinput).toBeInTheDocument();
		expect(textinput).toHaveAttribute("data-custom", "test-value");
		expect(textinput).toHaveAttribute("data-another", "another-value");
		expect(textinput).toHaveAttribute("aria-label", "Custom textinput");
	});

	it("renders textinput with different input types", () => {
		const types = ["text", "email", "password", "number", "tel", "url", "search"];

		types.forEach(type => {
			const { container, unmount } = render(<TextInput type={type} />);
			// For password type, we need to query the input directly as it doesn't have textbox role
			const input = container.querySelector("input");
			expect(input).toBeInTheDocument();
			expect(input).toHaveAttribute("type", type);
			unmount();
		});
	});
});

describe("TextInput - Snapshot Tests", () => {
	it("matches snapshot for textinput with default props", () => {
		const { container } = render(<TextInput />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with custom type", () => {
		const { container } = render(<TextInput type="email" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with custom className", () => {
		const { container } = render(<TextInput className="custom-textinput-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with custom id", () => {
		const { container } = render(<TextInput id="custom-textinput-id" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with disabled prop", () => {
		const { container } = render(<TextInput disabled={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with required prop", () => {
		const { container } = render(<TextInput required={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with readOnly prop", () => {
		const { container } = render(<TextInput readOnly={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with name prop", () => {
		const { container } = render(<TextInput name="textinput-name" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with value prop", () => {
		const { container } = render(<TextInput value="textinput-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with placeholder prop", () => {
		const { container } = render(<TextInput placeholder="Enter text here" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with label prop", () => {
		const { container } = render(<TextInput label="Input Label" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with helperText prop", () => {
		const { container } = render(<TextInput helperText="Helper text content" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with addon prop", () => {
		const { container } = render(<TextInput addon="Addon text" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with onChange handler", () => {
		const handleChange = vi.fn();
		const { container } = render(<TextInput onChange={handleChange} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with all props combined", () => {
		const handleChange = vi.fn();
		const { container } = render(
			<TextInput
				id="complete-textinput-id"
				name="complete-textinput"
				value="complete-value"
				placeholder="Complete placeholder"
				label="Complete Label"
				helperText="Complete helper text"
				addon="Complete addon"
				type="password"
				disabled={false}
				required={true}
				readOnly={false}
				className="complete-textinput-class"
				onChange={handleChange}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with multiple classes", () => {
		const { container } = render(<TextInput className="class1 class2 class3" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with whitespace in className", () => {
		const { container } = render(<TextInput className="spaced-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with empty className", () => {
		const { container } = render(<TextInput className="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with undefined className", () => {
		const { container } = render(<TextInput className={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with null className", () => {
		const { container } = render(<TextInput className={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with empty id", () => {
		const { container } = render(<TextInput id="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with undefined id", () => {
		const { container } = render(<TextInput id={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with empty name", () => {
		const { container } = render(<TextInput name="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with undefined name", () => {
		const { container } = render(<TextInput name={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with null name", () => {
		const { container } = render(<TextInput name={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with empty value", () => {
		const { container } = render(<TextInput value="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with undefined value", () => {
		const { container } = render(<TextInput value={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with null value", () => {
		const { container } = render(<TextInput value={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with empty placeholder", () => {
		const { container } = render(<TextInput placeholder="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with undefined placeholder", () => {
		const { container } = render(<TextInput placeholder={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with null placeholder", () => {
		const { container } = render(<TextInput placeholder={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with empty label", () => {
		const { container } = render(<TextInput label="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with undefined label", () => {
		const { container } = render(<TextInput label={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with null label", () => {
		const { container } = render(<TextInput label={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with empty helperText", () => {
		const { container } = render(<TextInput helperText="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with undefined helperText", () => {
		const { container } = render(<TextInput helperText={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with null helperText", () => {
		const { container } = render(<TextInput helperText={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with empty addon", () => {
		const { container } = render(<TextInput addon="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with undefined addon", () => {
		const { container } = render(<TextInput addon={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with null addon", () => {
		const { container } = render(<TextInput addon={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with empty type", () => {
		const { container } = render(<TextInput type="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with undefined type", () => {
		const { container } = render(<TextInput type={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with null type", () => {
		const { container } = render(<TextInput type={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with special characters in value", () => {
		const { container } = render(<TextInput value="Value with special chars: !@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with unicode characters in value", () => {
		const { container } = render(<TextInput value="Value with unicode: 📝 ✏️" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with long value", () => {
		const longValue =
			"This is a very long value that should be handled properly by the component and should not break the layout or functionality";

		const { container } = render(<TextInput value={longValue} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with special characters in placeholder", () => {
		const { container } = render(
			<TextInput placeholder="Placeholder with special chars: !@#$%^&*()" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with unicode characters in placeholder", () => {
		const { container } = render(<TextInput placeholder="Placeholder with unicode: 📝 ✏️" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with long placeholder", () => {
		const longPlaceholder =
			"This is a very long placeholder that should be handled properly by the component and should not break the layout or functionality";

		const { container } = render(<TextInput placeholder={longPlaceholder} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with special characters in name", () => {
		const { container } = render(<TextInput name="input-name-with-special-chars-!@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with special characters in id", () => {
		const { container } = render(<TextInput id="input-with-special-chars-!@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with unicode characters in id", () => {
		const { container } = render(<TextInput id="input-with-unicode-📝✏️" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with long id", () => {
		const longId =
			"input-with-very-long-id-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		const { container } = render(<TextInput id={longId} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with custom props", () => {
		const { container } = render(<TextInput data-custom="test-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with multiple custom props", () => {
		const { container } = render(
			<TextInput
				data-custom="test-value"
				data-another="another-value"
				aria-label="Custom textinput"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for textinput with different input types", () => {
		const types = ["text", "email", "password", "number", "tel", "url", "search"];

		types.forEach(type => {
			const { container, unmount } = render(<TextInput type={type} />);
			expect(container.firstChild).toMatchSnapshot(`${type} type textinput`);
			unmount();
		});
	});
});
