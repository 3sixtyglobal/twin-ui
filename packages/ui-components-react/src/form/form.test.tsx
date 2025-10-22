// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Form } from "./form";

describe("Form - Unit Tests", () => {
	it("renders form with content", () => {
		const { container } = render(<Form content="Form content" />);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByText("Form content")).toBeInTheDocument();
	});

	it("renders form with JSX content", () => {
		const { container } = render(
			<Form
				content={
					<div>
						<input type="text" placeholder="Enter text" />
						<button type="submit">Submit</button>
					</div>
				}
			/>
		);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
	});

	it("renders form with custom className", () => {
		const { container } = render(<Form content="Form content" className="custom-form-class" />);

		const form = container.querySelector("form");
		expect(form).toBeInTheDocument();
		expect(form).toHaveClass("custom-form-class");
	});

	it("renders form with empty className", () => {
		const { container } = render(<Form content="Form content" className="" />);

		const form = container.querySelector("form");
		expect(form).toBeInTheDocument();
		expect(form).toHaveAttribute("class", "");
	});

	it("renders form with undefined className", () => {
		const { container } = render(<Form content="Form content" className={undefined} />);

		const form = container.querySelector("form");
		expect(form).toBeInTheDocument();
		expect(form).toHaveAttribute("class", "");
	});

	it("renders form with null className", () => {
		const { container } = render(<Form content="Form content" className={null as any} />);

		const form = container.querySelector("form");
		expect(form).toBeInTheDocument();
		expect(form).toHaveAttribute("class", "");
	});

	it("renders form with string content", () => {
		const { container } = render(<Form content="Simple string content" />);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByText("Simple string content")).toBeInTheDocument();
	});

	it("renders form with number content", () => {
		const { container } = render(<Form content={42} />);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();
	});

	it("renders form with boolean content", () => {
		const { container } = render(<Form content={true} />);

		expect(container.querySelector("form")).toBeInTheDocument();
		// Boolean content is not rendered as text in the form
	});

	it("renders form with array content", () => {
		const { container } = render(<Form content={["Item 1", "Item 2", "Item 3"]} />);

		expect(container.querySelector("form")).toBeInTheDocument();
		// Array content is rendered as concatenated text
	});

	it("renders form with fragment content", () => {
		const { container } = render(
			<Form
				content={
					<>
						<span>Fragment content 1</span>
						<span>Fragment content 2</span>
					</>
				}
			/>
		);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByText("Fragment content 1")).toBeInTheDocument();
		expect(screen.getByText("Fragment content 2")).toBeInTheDocument();
	});

	it("renders form with null content", () => {
		const { container } = render(<Form content={null} />);

		expect(container.querySelector("form")).toBeInTheDocument();
	});

	it("renders form with undefined content", () => {
		const { container } = render(<Form content={undefined} />);

		expect(container.querySelector("form")).toBeInTheDocument();
	});

	it("renders form with complex nested content", () => {
		const { container } = render(
			<Form
				content={
					<div>
						<h2>Form Title</h2>
						<div>
							<label htmlFor="name">Name:</label>
							<input type="text" id="name" name="name" />
						</div>
						<div>
							<label htmlFor="email">Email:</label>
							<input type="email" id="email" name="email" />
						</div>
						<div>
							<label htmlFor="message">Message:</label>
							<textarea id="message" name="message"></textarea>
						</div>
						<div>
							<button type="submit">Submit</button>
							<button type="reset">Reset</button>
						</div>
					</div>
				}
			/>
		);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByText("Form Title")).toBeInTheDocument();
		expect(screen.getByLabelText("Name:")).toBeInTheDocument();
		expect(screen.getByLabelText("Email:")).toBeInTheDocument();
		expect(screen.getByLabelText("Message:")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
	});

	it("renders form with form elements", () => {
		const { container } = render(
			<Form
				content={
					<div>
						<input type="text" name="username" placeholder="Username" />
						<input type="password" name="password" placeholder="Password" />
						<input type="checkbox" name="remember" />
						<label htmlFor="remember">Remember me</label>
						<select name="country">
							<option value="us">United States</option>
							<option value="ca">Canada</option>
						</select>
						<button type="submit">Login</button>
					</div>
				}
			/>
		);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
		expect(screen.getByRole("combobox")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
	});

	it("renders form with multiple classes", () => {
		const { container } = render(<Form content="Form content" className="class1 class2 class3" />);

		const form = container.querySelector("form");
		expect(form).toBeInTheDocument();
		expect(form).toHaveClass("class1", "class2", "class3");
	});

	it("renders form with whitespace in className", () => {
		const { container } = render(<Form content="Form content" className="spaced-class" />);

		const form = container.querySelector("form");
		expect(form).toBeInTheDocument();
		expect(form).toHaveClass("  spaced-class  ");
	});

	it("renders form with special characters in content", () => {
		const { container } = render(<Form content="Form with special chars: !@#$%^&*()" />);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByText("Form with special chars: !@#$%^&*()")).toBeInTheDocument();
	});

	it("renders form with unicode characters in content", () => {
		const { container } = render(<Form content="Form with unicode: 🚀 ✨ 🎉" />);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByText("Form with unicode: 🚀 ✨ 🎉")).toBeInTheDocument();
	});

	it("renders form with long text content", () => {
		const longText =
			"This is a very long form content that contains multiple sentences and should be displayed properly within the form component. It tests how the component handles lengthy content.";

		const { container } = render(<Form content={longText} />);

		expect(container.querySelector("form")).toBeInTheDocument();
		expect(screen.getByText(longText)).toBeInTheDocument();
	});

	it("renders form with empty string content", () => {
		const { container } = render(<Form content="" />);

		expect(container.querySelector("form")).toBeInTheDocument();
	});

	it("renders form with whitespace content", () => {
		const { container } = render(<Form content="   " />);

		expect(container.querySelector("form")).toBeInTheDocument();
	});
});

describe("Form - Snapshot Tests", () => {
	it("matches snapshot for basic form", () => {
		const { container } = render(<Form content="Form content" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with JSX content", () => {
		const { container } = render(
			<Form
				content={
					<div>
						<input type="text" placeholder="Enter text" />
						<button type="submit">Submit</button>
					</div>
				}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with custom className", () => {
		const { container } = render(<Form content="Form content" className="custom-form-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with empty className", () => {
		const { container } = render(<Form content="Form content" className="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with undefined className", () => {
		const { container } = render(<Form content="Form content" className={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with null className", () => {
		const { container } = render(<Form content="Form content" className={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with string content", () => {
		const { container } = render(<Form content="Simple string content" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with number content", () => {
		const { container } = render(<Form content={42} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with boolean content", () => {
		const { container } = render(<Form content={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with array content", () => {
		const { container } = render(<Form content={["Item 1", "Item 2", "Item 3"]} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with fragment content", () => {
		const { container } = render(
			<Form
				content={
					<>
						<span>Fragment content 1</span>
						<span>Fragment content 2</span>
					</>
				}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with null content", () => {
		const { container } = render(<Form content={null} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with undefined content", () => {
		const { container } = render(<Form content={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with complex nested content", () => {
		const { container } = render(
			<Form
				content={
					<div>
						<h2>Form Title</h2>
						<div>
							<label htmlFor="name">Name:</label>
							<input type="text" id="name" name="name" />
						</div>
						<div>
							<label htmlFor="email">Email:</label>
							<input type="email" id="email" name="email" />
						</div>
						<div>
							<label htmlFor="message">Message:</label>
							<textarea id="message" name="message"></textarea>
						</div>
						<div>
							<button type="submit">Submit</button>
							<button type="reset">Reset</button>
						</div>
					</div>
				}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with form elements", () => {
		const { container } = render(
			<Form
				content={
					<div>
						<input type="text" name="username" placeholder="Username" />
						<input type="password" name="password" placeholder="Password" />
						<input type="checkbox" name="remember" />
						<label htmlFor="remember">Remember me</label>
						<select name="country">
							<option value="us">United States</option>
							<option value="ca">Canada</option>
						</select>
						<button type="submit">Login</button>
					</div>
				}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with multiple classes", () => {
		const { container } = render(<Form content="Form content" className="class1 class2 class3" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with whitespace in className", () => {
		const { container } = render(<Form content="Form content" className="spaced-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with special characters in content", () => {
		const { container } = render(<Form content="Form with special chars: !@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with unicode characters in content", () => {
		const { container } = render(<Form content="Form with unicode: 🚀 ✨ 🎉" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with long text content", () => {
		const longText =
			"This is a very long form content that contains multiple sentences and should be displayed properly within the form component. It tests how the component handles lengthy content.";

		const { container } = render(<Form content={longText} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with empty string content", () => {
		const { container } = render(<Form content="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for form with whitespace content", () => {
		const { container } = render(<Form content="   " />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
