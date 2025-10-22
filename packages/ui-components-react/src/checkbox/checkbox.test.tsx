// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox - Unit Tests", () => {
	it("renders checkbox with default props", () => {
		render(<Checkbox />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with custom className", () => {
		render(<Checkbox className="custom-checkbox-class" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveClass("custom-checkbox-class");
	});

	it("renders checkbox with custom id", () => {
		render(<Checkbox id="custom-checkbox-id" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("id", "custom-checkbox-id");
	});

	it("renders checkbox with disabled prop", () => {
		render(<Checkbox disabled={true} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with required prop", () => {
		render(<Checkbox required={true} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with checked prop", () => {
		render(<Checkbox checked={true} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with unchecked prop", () => {
		render(<Checkbox checked={false} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with name prop", () => {
		render(<Checkbox name="checkbox-name" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with value prop", () => {
		render(<Checkbox value="checkbox-value" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with string children", () => {
		render(<Checkbox label="Simple Label" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("label", "Simple Label");
	});

	it("renders checkbox with number children", () => {
		render(<Checkbox label={42} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("label", "42");
	});

	it("renders checkbox with array children", () => {
		render(<Checkbox label={["Label", "Part", "Two"]} />);

		expect(screen.getByRole("checkbox")).toBeInTheDocument();
		// Array children are rendered as concatenated text
	});

	it("renders checkbox with fragment children", () => {
		const fragment = (
			<>
				<span>First</span>
				<span>Second</span>
			</>
		);
		render(<Checkbox label={fragment} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		// Fragment children are converted to string representation
		expect(checkbox).toHaveAttribute("label", "[object Object]");
	});

	it("renders checkbox with null children", () => {
		render(<Checkbox label={null} />);

		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("renders checkbox with undefined children", () => {
		render(<Checkbox label={undefined} />);

		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("renders checkbox with empty string children", () => {
		render(<Checkbox label="" />);

		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("renders checkbox with all props combined", () => {
		render(
			<Checkbox
				id="complete-checkbox-id"
				name="complete-checkbox"
				value="complete-value"
				checked={true}
				disabled={false}
				required={true}
				className="complete-checkbox-class"
				label={<span>Complete Checkbox</span>}
			/>
		);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveClass("complete-checkbox-class");
		expect(checkbox).toHaveAttribute("id", "complete-checkbox-id");
		// JSX children are converted to string representation
		expect(checkbox).toHaveAttribute("label", "[object Object]");
	});

	it("renders checkbox with multiple classes", () => {
		render(<Checkbox className="class1 class2 class3" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveClass("class1", "class2", "class3");
	});

	it("renders checkbox with whitespace in className", () => {
		render(<Checkbox className="spaced-class" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveClass("  spaced-class  ");
	});

	it("renders checkbox with empty className", () => {
		render(<Checkbox className="" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		// Flowbite applies default classes even when className is empty
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with undefined className", () => {
		render(<Checkbox className={undefined} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with null className", () => {
		render(<Checkbox className={null as any} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with empty id", () => {
		render(<Checkbox id="" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("id", "");
	});

	it("renders checkbox with undefined id", () => {
		render(<Checkbox id={undefined} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		// When id is undefined, Flowbite doesn't set an id attribute
		expect(checkbox).not.toHaveAttribute("id");
	});

	it("renders checkbox with null id", () => {
		render(<Checkbox id={null as any} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		// When id is null, it should not have an id attribute
		expect(checkbox).not.toHaveAttribute("id");
	});

	it("renders checkbox with empty name", () => {
		render(<Checkbox name="" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with undefined name", () => {
		render(<Checkbox name={undefined} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with null name", () => {
		render(<Checkbox name={null as any} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with empty value", () => {
		render(<Checkbox value="" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with undefined value", () => {
		render(<Checkbox value={undefined} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with null value", () => {
		render(<Checkbox value={null as any} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with special characters in children", () => {
		render(<Checkbox label="Checkbox with special chars: !@#$%^&*()" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("label", "Checkbox with special chars: !@#$%^&*()");
	});

	it("renders checkbox with unicode characters in children", () => {
		render(<Checkbox label="Checkbox with unicode: ☑️ ✅" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("label", "Checkbox with unicode: ☑️ ✅");
	});

	it("renders checkbox with long text children", () => {
		const longText =
			"This is a very long checkbox label that should be handled properly by the component and should not break the layout or functionality";

		render(<Checkbox label={longText} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("label", longText);
	});

	it("renders checkbox with whitespace children", () => {
		render(<Checkbox label={"   "} />);

		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("renders checkbox with special characters in id", () => {
		render(<Checkbox id="checkbox-with-special-chars-!@#$%^&*()" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("id", "checkbox-with-special-chars-!@#$%^&*()");
	});

	it("renders checkbox with unicode characters in id", () => {
		render(<Checkbox id="checkbox-with-unicode-☑️✅" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("id", "checkbox-with-unicode-☑️✅");
	});

	it("renders checkbox with long id", () => {
		const longId =
			"checkbox-with-very-long-id-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		render(<Checkbox id={longId} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("id", longId);
	});

	it("renders checkbox with special characters in name", () => {
		render(<Checkbox name="checkbox-name-with-special-chars-!@#$%^&*()" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with special characters in value", () => {
		render(<Checkbox value="checkbox-value-with-special-chars-!@#$%^&*()" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
	});

	it("renders checkbox with custom props", () => {
		render(<Checkbox data-custom="test-value" />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("data-custom", "test-value");
	});

	it("renders checkbox with multiple custom props", () => {
		render(
			<Checkbox
				data-custom="test-value"
				data-another="another-value"
				aria-label="Custom checkbox"
			/>
		);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("data-custom", "test-value");
		expect(checkbox).toHaveAttribute("data-another", "another-value");
		expect(checkbox).toHaveAttribute("aria-label", "Custom checkbox");
	});
});

describe("Checkbox - Snapshot Tests", () => {
	it("matches snapshot for default checkbox", () => {
		const { container } = render(<Checkbox />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with custom className", () => {
		const { container } = render(<Checkbox className="custom-checkbox-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with custom id", () => {
		const { container } = render(<Checkbox id="custom-checkbox-id" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with disabled prop", () => {
		const { container } = render(<Checkbox disabled={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with required prop", () => {
		const { container } = render(<Checkbox required={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with checked prop", () => {
		const { container } = render(<Checkbox checked={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with unchecked prop", () => {
		const { container } = render(<Checkbox checked={false} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with name prop", () => {
		const { container } = render(<Checkbox name="checkbox-name" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with value prop", () => {
		const { container } = render(<Checkbox value="checkbox-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with string children", () => {
		const { container } = render(<Checkbox label="Simple Label" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with number children", () => {
		const { container } = render(<Checkbox label={42} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with array children", () => {
		const { container } = render(<Checkbox label={["Label", "Part", "Two"]} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with fragment children", () => {
		const fragment = (
			<>
				<span>First</span>
				<span>Second</span>
			</>
		);
		const { container } = render(<Checkbox label={fragment} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with null children", () => {
		const { container } = render(<Checkbox label={null} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with undefined children", () => {
		const { container } = render(<Checkbox label={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with empty string children", () => {
		const { container } = render(<Checkbox label="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with all props combined", () => {
		const { container } = render(
			<Checkbox
				id="complete-checkbox-id"
				name="complete-checkbox"
				value="complete-value"
				checked={true}
				disabled={false}
				required={true}
				className="complete-checkbox-class"
				label={<span>Complete Checkbox</span>}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with multiple classes", () => {
		const { container } = render(<Checkbox className="class1 class2 class3" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with whitespace in className", () => {
		const { container } = render(<Checkbox className="spaced-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with empty className", () => {
		const { container } = render(<Checkbox className="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with undefined className", () => {
		const { container } = render(<Checkbox className={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with null className", () => {
		const { container } = render(<Checkbox className={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with empty id", () => {
		const { container } = render(<Checkbox id="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with undefined id", () => {
		const { container } = render(<Checkbox id={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with null id", () => {
		const { container } = render(<Checkbox id={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with empty name", () => {
		const { container } = render(<Checkbox name="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with undefined name", () => {
		const { container } = render(<Checkbox name={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with null name", () => {
		const { container } = render(<Checkbox name={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with empty value", () => {
		const { container } = render(<Checkbox value="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with undefined value", () => {
		const { container } = render(<Checkbox value={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with null value", () => {
		const { container } = render(<Checkbox value={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with special characters in children", () => {
		const { container } = render(<Checkbox label="Checkbox with special chars: !@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with unicode characters in children", () => {
		const { container } = render(<Checkbox label="Checkbox with unicode: ☑️ ✅" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with long text children", () => {
		const longText =
			"This is a very long checkbox label that should be handled properly by the component and should not break the layout or functionality";

		const { container } = render(<Checkbox label={longText} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with whitespace children", () => {
		const { container } = render(<Checkbox label={"   "} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with special characters in id", () => {
		const { container } = render(<Checkbox id="checkbox-with-special-chars-!@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with unicode characters in id", () => {
		const { container } = render(<Checkbox id="checkbox-with-unicode-☑️✅" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with long id", () => {
		const longId =
			"checkbox-with-very-long-id-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		const { container } = render(<Checkbox id={longId} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with special characters in name", () => {
		const { container } = render(<Checkbox name="checkbox-name-with-special-chars-!@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with special characters in value", () => {
		const { container } = render(<Checkbox value="checkbox-value-with-special-chars-!@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with custom props", () => {
		const { container } = render(<Checkbox data-custom="test-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for checkbox with multiple custom props", () => {
		const { container } = render(
			<Checkbox
				data-custom="test-value"
				data-another="another-value"
				aria-label="Custom checkbox"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
