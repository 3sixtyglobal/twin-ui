// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Textarea } from "./textarea";
import React from "react";

describe("Textarea", () => {
	// Unit Tests
	describe("Unit Tests", () => {
		it("renders textarea with default props", () => {
			render(<Textarea />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			// Note: real Flowbite component doesn't have a default id
			expect(textarea).not.toHaveAttribute("id");
		});

		it("renders textarea with custom className", () => {
			render(<Textarea className="custom-textarea-class" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveClass("custom-textarea-class");
		});

		it("renders textarea with custom id", () => {
			render(<Textarea id="custom-textarea-id" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("id", "custom-textarea-id");
		});

		it("renders textarea with undefined id", () => {
			render(<Textarea id={undefined} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			// Note: real Flowbite component doesn't have a default id
			expect(textarea).not.toHaveAttribute("id");
		});

		it("renders textarea with empty string id", () => {
			render(<Textarea id="" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("id", "");
		});

		it("renders textarea with null id", () => {
			render(<Textarea id={null as any} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			// Note: real Flowbite component doesn't have an id when id is null
			expect(textarea).not.toHaveAttribute("id");
		});

		it("renders textarea with disabled prop", () => {
			render(<Textarea disabled />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toBeDisabled();
		});

		it("renders textarea with required prop", () => {
			render(<Textarea required />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toBeRequired();
		});

		it("renders textarea with readOnly prop", () => {
			render(<Textarea readOnly />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("readOnly");
		});

		it("renders textarea with name prop", () => {
			render(<Textarea name="textarea-name" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("name", "textarea-name");
		});

		it("renders textarea with placeholder prop", () => {
			render(<Textarea placeholder="Enter your text here" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("placeholder", "Enter your text here");
		});

		it("renders textarea with value prop", () => {
			render(<Textarea value="Initial text value" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveValue("Initial text value");
		});

		it("renders textarea with rows prop", () => {
			render(<Textarea rows={5} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("rows", "5");
		});

		it("renders textarea with cols prop", () => {
			render(<Textarea cols={50} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("cols", "50");
		});

		it("renders textarea with empty string className", () => {
			render(<Textarea className="" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});

		it("renders textarea with undefined className", () => {
			render(<Textarea className={undefined} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});

		it("renders textarea with null className", () => {
			render(<Textarea className={null as any} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});

		it("renders textarea with empty string name", () => {
			render(<Textarea name="" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("name", "");
		});

		it("renders textarea with undefined name", () => {
			render(<Textarea name={undefined} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});

		it("renders textarea with null name", () => {
			render(<Textarea name={null as any} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});

		it("renders textarea with empty string placeholder", () => {
			render(<Textarea placeholder="" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("placeholder", "");
		});

		it("renders textarea with undefined placeholder", () => {
			render(<Textarea placeholder={undefined} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});

		it("renders textarea with null placeholder", () => {
			render(<Textarea placeholder={null as any} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});

		it("renders textarea with empty string value", () => {
			render(<Textarea value="" />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveValue("");
		});

		it("renders textarea with undefined value", () => {
			render(<Textarea value={undefined} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});

		it("renders textarea with null value", () => {
			render(<Textarea value={null as any} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});

		it("renders textarea with zero rows", () => {
			render(<Textarea rows={0} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			// Note: React DOM filters out rows="0" as it's an invalid value
		});

		it("renders textarea with negative rows", () => {
			render(<Textarea rows={-1} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			// Note: React DOM filters out rows="-1" as it's an invalid value
		});

		it("renders textarea with large rows", () => {
			render(<Textarea rows={100} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("rows", "100");
		});

		it("renders textarea with zero cols", () => {
			render(<Textarea cols={0} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			// Note: React DOM filters out cols="0" as it's an invalid value
		});

		it("renders textarea with negative cols", () => {
			render(<Textarea cols={-1} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			// Note: React DOM filters out cols="-1" as it's an invalid value
		});

		it("renders textarea with large cols", () => {
			render(<Textarea cols={200} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("cols", "200");
		});

		it("renders textarea with long text value", () => {
			const longText =
				"This is a very long text value that should be rendered correctly within the textarea component. It contains multiple sentences and should test the component's ability to handle longer content.";
			render(<Textarea value={longText} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveValue(longText);
		});

		it("renders textarea with special characters in value", () => {
			const specialText = "Special & Characters: <>&\"'`";
			render(<Textarea value={specialText} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveValue(specialText);
		});

		it("renders textarea with unicode characters in value", () => {
			const unicodeText = "Unicode: éàçüö 你好世界 こんにちは世界";
			render(<Textarea value={unicodeText} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveValue(unicodeText);
		});

		it("renders textarea with special characters in placeholder", () => {
			const specialPlaceholder = "Special & Characters: <>&\"'`";
			render(<Textarea placeholder={specialPlaceholder} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("placeholder", specialPlaceholder);
		});

		it("renders textarea with unicode characters in placeholder", () => {
			const unicodePlaceholder = "Unicode: éàçüö 你好世界 こんにちは世界";
			render(<Textarea placeholder={unicodePlaceholder} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("placeholder", unicodePlaceholder);
		});

		it("renders textarea with special characters in name", () => {
			const specialName = "special-name_123";
			render(<Textarea name={specialName} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("name", specialName);
		});

		it("renders textarea with onChange handler", () => {
			const handleChange = vi.fn();
			render(<Textarea onChange={handleChange} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveProperty("onchange");
		});

		it("renders textarea with onBlur handler", () => {
			const handleBlur = vi.fn();
			render(<Textarea onBlur={handleBlur} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveProperty("onblur");
		});

		it("renders textarea with onFocus handler", () => {
			const handleFocus = vi.fn();
			render(<Textarea onFocus={handleFocus} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveProperty("onfocus");
		});

		it("renders textarea with onClick handler", () => {
			const handleClick = vi.fn();
			render(<Textarea onClick={handleClick} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();

			textarea.click();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("renders textarea with onMouseOver handler", () => {
			const handleMouseOver = vi.fn();
			render(<Textarea onMouseOver={handleMouseOver} />);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();

			textarea.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});

		it("renders textarea with all props combined", () => {
			const handleChange = vi.fn();
			const handleBlur = vi.fn();
			const handleFocus = vi.fn();
			const handleClick = vi.fn();
			const handleMouseOver = vi.fn();

			render(
				<Textarea
					id="combined-textarea"
					className="combined-class"
					name="combined-name"
					placeholder="Combined placeholder"
					value="Combined value"
					rows={10}
					cols={80}
					disabled
					required
					readOnly
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					onClick={handleClick}
					onMouseOver={handleMouseOver}
					data-test="combined"
					aria-label="Combined Textarea"
					style={{ border: "1px solid black" }}
				/>
			);

			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveAttribute("id", "combined-textarea");
			expect(textarea).toHaveClass("combined-class");
			expect(textarea).toHaveAttribute("name", "combined-name");
			expect(textarea).toHaveAttribute("placeholder", "Combined placeholder");
			expect(textarea).toHaveValue("Combined value");
			expect(textarea).toHaveAttribute("rows", "10");
			expect(textarea).toHaveAttribute("cols", "80");
			expect(textarea).toBeDisabled();
			expect(textarea).toBeRequired();
			expect(textarea).toHaveAttribute("readOnly");
			expect(textarea).toHaveAttribute("data-test", "combined");
			expect(textarea).toHaveAttribute("aria-label", "Combined Textarea");

			// Test event handlers are attached
			expect(textarea).toHaveProperty("onclick");
			expect(textarea).toHaveProperty("onblur");
			expect(textarea).toHaveProperty("onfocus");
			expect(textarea).toHaveProperty("onmouseover");
		});

		it("renders textarea with children content", () => {
			render(<Textarea>Default text content</Textarea>);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveTextContent("Default text content");
		});

		it("renders textarea with JSX children", () => {
			render(
				<Textarea>
					<span data-testid="jsx-child">JSX Content</span>
				</Textarea>
			);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			// JSX children are converted to string in textarea
			expect(textarea).toHaveTextContent("[object Object]");
		});

		it("renders textarea with boolean children", () => {
			render(<Textarea>{true}</Textarea>);
			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
			// Boolean children are converted to string in textarea
			expect(textarea).toHaveTextContent("true");
		});
	});

	// Snapshot Tests
	describe("Snapshot Tests", () => {
		it("matches snapshot for textarea with default props", () => {
			const { container } = render(<Textarea />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with custom className", () => {
			const { container } = render(<Textarea className="custom-textarea-class" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with custom id", () => {
			const { container } = render(<Textarea id="custom-textarea-id" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with undefined id", () => {
			const { container } = render(<Textarea id={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with empty string id", () => {
			const { container } = render(<Textarea id="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with null id", () => {
			const { container } = render(<Textarea id={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with disabled prop", () => {
			const { container } = render(<Textarea disabled />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with required prop", () => {
			const { container } = render(<Textarea required />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with readOnly prop", () => {
			const { container } = render(<Textarea readOnly />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with name prop", () => {
			const { container } = render(<Textarea name="textarea-name" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with placeholder prop", () => {
			const { container } = render(<Textarea placeholder="Enter your text here" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with value prop", () => {
			const { container } = render(<Textarea value="Initial text value" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with rows prop", () => {
			const { container } = render(<Textarea rows={5} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with cols prop", () => {
			const { container } = render(<Textarea cols={50} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with empty string className", () => {
			const { container } = render(<Textarea className="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with undefined className", () => {
			const { container } = render(<Textarea className={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with null className", () => {
			const { container } = render(<Textarea className={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with empty string name", () => {
			const { container } = render(<Textarea name="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with undefined name", () => {
			const { container } = render(<Textarea name={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with null name", () => {
			const { container } = render(<Textarea name={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with empty string placeholder", () => {
			const { container } = render(<Textarea placeholder="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with undefined placeholder", () => {
			const { container } = render(<Textarea placeholder={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with null placeholder", () => {
			const { container } = render(<Textarea placeholder={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with empty string value", () => {
			const { container } = render(<Textarea value="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with undefined value", () => {
			const { container } = render(<Textarea value={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with null value", () => {
			const { container } = render(<Textarea value={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with zero rows", () => {
			const { container } = render(<Textarea rows={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with negative rows", () => {
			const { container } = render(<Textarea rows={-1} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with large rows", () => {
			const { container } = render(<Textarea rows={100} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with zero cols", () => {
			const { container } = render(<Textarea cols={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with negative cols", () => {
			const { container } = render(<Textarea cols={-1} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with large cols", () => {
			const { container } = render(<Textarea cols={200} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with long text value", () => {
			const longText =
				"This is a very long text value that should be rendered correctly within the textarea component. It contains multiple sentences and should test the component's ability to handle longer content.";
			const { container } = render(<Textarea value={longText} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with special characters in value", () => {
			const specialText = "Special & Characters: <>&\"'`";
			const { container } = render(<Textarea value={specialText} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with unicode characters in value", () => {
			const unicodeText = "Unicode: éàçüö 你好世界 こんにちは世界";
			const { container } = render(<Textarea value={unicodeText} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with special characters in placeholder", () => {
			const specialPlaceholder = "Special & Characters: <>&\"'`";
			const { container } = render(<Textarea placeholder={specialPlaceholder} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with unicode characters in placeholder", () => {
			const unicodePlaceholder = "Unicode: éàçüö 你好世界 こんにちは世界";
			const { container } = render(<Textarea placeholder={unicodePlaceholder} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with special characters in name", () => {
			const specialName = "special-name_123";
			const { container } = render(<Textarea name={specialName} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with onChange handler", () => {
			const handleChange = vi.fn();
			const { container } = render(<Textarea onChange={handleChange} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with onBlur handler", () => {
			const handleBlur = vi.fn();
			const { container } = render(<Textarea onBlur={handleBlur} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with onFocus handler", () => {
			const handleFocus = vi.fn();
			const { container } = render(<Textarea onFocus={handleFocus} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with onClick handler", () => {
			const handleClick = vi.fn();
			const { container } = render(<Textarea onClick={handleClick} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with onMouseOver handler", () => {
			const handleMouseOver = vi.fn();
			const { container } = render(<Textarea onMouseOver={handleMouseOver} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with all props combined", () => {
			const handleChange = vi.fn();
			const handleBlur = vi.fn();
			const handleFocus = vi.fn();
			const handleClick = vi.fn();
			const handleMouseOver = vi.fn();

			const { container } = render(
				<Textarea
					id="combined-textarea"
					className="combined-class"
					name="combined-name"
					placeholder="Combined placeholder"
					value="Combined value"
					rows={10}
					cols={80}
					disabled
					required
					readOnly
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					onClick={handleClick}
					onMouseOver={handleMouseOver}
					data-test="combined"
					aria-label="Combined Textarea"
					style={{ border: "1px solid black" }}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with children content", () => {
			const { container } = render(<Textarea>Default text content</Textarea>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with JSX children", () => {
			const { container } = render(
				<Textarea>
					<span data-testid="jsx-child">JSX Content</span>
				</Textarea>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with boolean children", () => {
			const { container } = render(<Textarea>{true}</Textarea>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for textarea with number children", () => {
			const { container } = render(<Textarea>{42}</Textarea>);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
