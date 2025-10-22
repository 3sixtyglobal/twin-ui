// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./select";

describe("Select", () => {
	const mockOptions = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" }
	];

	describe("Unit Tests", () => {
		it("renders select with default props", () => {
			render(<Select options={mockOptions} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with custom className", () => {
			const { container } = render(<Select options={mockOptions} className="custom-select" />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
			// Custom className is applied to the wrapper, not the select element directly
			expect(container.firstChild).toHaveClass("custom-select");
		});

		it("renders select with sizing prop", () => {
			render(<Select options={mockOptions} sizing="sm" />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with different sizing values", () => {
			const sizes = ["sm", "md", "lg"];

			sizes.forEach(size => {
				const { unmount } = render(<Select options={mockOptions} sizing={size as any} />);

				const select = screen.getByRole("combobox");
				expect(select).toBeInTheDocument();
				unmount();
			});
		});

		it("renders select with id prop", () => {
			render(<Select options={mockOptions} id="select-1" />);

			const select = screen.getByRole("combobox");
			expect(select).toHaveAttribute("id", "select-1");
		});

		it("renders select with disabled prop", () => {
			render(<Select options={mockOptions} disabled />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with required prop", () => {
			render(<Select options={mockOptions} required />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with name prop", () => {
			render(<Select options={mockOptions} name="country" />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with value prop", () => {
			render(<Select options={mockOptions} value="option2" />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with defaultValue prop", () => {
			render(<Select options={mockOptions} defaultValue="option1" />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with multiple prop", () => {
			render(<Select options={mockOptions} multiple />);

			const select = screen.getByRole("listbox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with all props combined", () => {
			const { container } = render(
				<Select
					options={mockOptions}
					sizing="lg"
					id="country-select"
					disabled
					required
					name="country"
					value="option2"
					className="custom-select"
				/>
			);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
			expect(select).toHaveAttribute("id", "country-select");
			// Custom className is applied to the wrapper, not the select element directly
			expect(container.firstChild).toHaveClass("custom-select");
		});

		it("renders select with additional props", () => {
			render(<Select options={mockOptions} data-testid="custom-select" data-custom="value" />);

			const select = screen.getByTestId("custom-select");
			expect(select).toBeInTheDocument();
			expect(select).toHaveAttribute("data-custom", "value");
		});

		it("renders select with aria attributes", () => {
			render(
				<Select
					options={mockOptions}
					role="combobox"
					aria-label="Country selection"
					aria-describedby="country-help"
				/>
			);

			const select = screen.getByRole("combobox");
			expect(select).toHaveAttribute("role", "combobox");
			expect(select).toHaveAttribute("aria-label", "Country selection");
			expect(select).toHaveAttribute("aria-describedby", "country-help");
		});

		it("renders select with style prop", () => {
			render(<Select options={mockOptions} style={{ backgroundColor: "red", width: "200px" }} />);

			const select = screen.getByRole("combobox");
			expect(select).toHaveStyle("background-color: rgb(255, 0, 0)");
			expect(select).toHaveStyle("width: 200px");
		});

		it("renders select with onChange handler", () => {
			const handleChange = vi.fn();
			render(<Select options={mockOptions} onChange={handleChange} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
			// Note: The actual change event would be triggered by user interaction
		});

		it("renders select with onBlur handler", () => {
			const handleBlur = vi.fn();
			render(<Select options={mockOptions} onBlur={handleBlur} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with onFocus handler", () => {
			const handleFocus = vi.fn();
			render(<Select options={mockOptions} onFocus={handleFocus} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with onClick handler", () => {
			const handleClick = vi.fn();
			render(<Select options={mockOptions} onClick={handleClick} />);

			const select = screen.getByRole("combobox");
			select.click();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("renders select with onMouseOver handler", () => {
			const handleMouseOver = vi.fn();
			render(<Select options={mockOptions} onMouseOver={handleMouseOver} />);

			const select = screen.getByRole("combobox");
			select.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});

		it("renders select with empty options array", () => {
			render(<Select options={[]} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with single option", () => {
			const singleOption = [{ value: "only", label: "Only Option" }];
			render(<Select options={singleOption} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with options having undefined values", () => {
			const optionsWithUndefined = [
				{ value: undefined, label: "Option 1" },
				{ value: "option2", label: "Option 2" }
			];
			render(<Select options={optionsWithUndefined} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with options having undefined labels", () => {
			const optionsWithUndefined = [
				{ value: "option1", label: undefined },
				{ value: "option2", label: "Option 2" }
			];
			render(<Select options={optionsWithUndefined} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with options having null values", () => {
			const optionsWithNull = [
				{ value: undefined, label: "Option 1" },
				{ value: "option2", label: "Option 2" }
			];
			render(<Select options={optionsWithNull} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with options having null labels", () => {
			const optionsWithNull = [
				{ value: "option1", label: undefined },
				{ value: "option2", label: "Option 2" }
			];
			render(<Select options={optionsWithNull} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with options having empty string values", () => {
			const optionsWithEmpty = [
				{ value: "", label: "Empty Value" },
				{ value: "option2", label: "Option 2" }
			];
			render(<Select options={optionsWithEmpty} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with options having empty string labels", () => {
			const optionsWithEmpty = [
				{ value: "option1", label: "" },
				{ value: "option2", label: "Option 2" }
			];
			render(<Select options={optionsWithEmpty} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with many options", () => {
			const manyOptions = Array.from({ length: 50 }, (_, i) => ({
				value: `option${i + 1}`,
				label: `Option ${i + 1}`
			}));
			render(<Select options={manyOptions} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with special characters in option values", () => {
			const specialOptions = [
				{ value: "option&<>\"'", label: "Special Characters" },
				{ value: "option2", label: "Normal Option" }
			];
			render(<Select options={specialOptions} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with special characters in option labels", () => {
			const specialOptions = [
				{ value: "option1", label: "Special & Characters: <>&\"'`" },
				{ value: "option2", label: "Normal Option" }
			];
			render(<Select options={specialOptions} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with unicode characters in options", () => {
			const unicodeOptions = [
				{ value: "option1", label: "Café" },
				{ value: "option2", label: "Naïve" },
				{ value: "option3", label: "Zürich" }
			];
			render(<Select options={unicodeOptions} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with long option labels", () => {
			const longOptions = [
				{
					value: "option1",
					label: "This is a very long option label that might wrap to multiple lines"
				},
				{ value: "option2", label: "Short" }
			];
			render(<Select options={longOptions} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with boolean props", () => {
			render(<Select options={mockOptions} disabled={false} required={true} multiple={false} />);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();
		});

		it("renders select with multiple event handlers", () => {
			const handleChange = vi.fn();
			const handleBlur = vi.fn();
			const handleFocus = vi.fn();
			const handleClick = vi.fn();
			const handleMouseOver = vi.fn();

			render(
				<Select
					options={mockOptions}
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					onClick={handleClick}
					onMouseOver={handleMouseOver}
				/>
			);

			const select = screen.getByRole("combobox");
			expect(select).toBeInTheDocument();

			select.click();
			expect(handleClick).toHaveBeenCalledTimes(1);

			select.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for select with default props", () => {
			const { container } = render(<Select options={mockOptions} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with custom className", () => {
			const { container } = render(<Select options={mockOptions} className="custom-select" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with sizing prop", () => {
			const { container } = render(<Select options={mockOptions} sizing="sm" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with different sizing values", () => {
			const sizes = ["sm", "md", "lg"];

			sizes.forEach(size => {
				const { container, unmount } = render(
					<Select options={mockOptions} sizing={size as any} />
				);

				expect(container.firstChild).toMatchSnapshot();
				unmount();
			});
		});

		it("matches snapshot for select with id prop", () => {
			const { container } = render(<Select options={mockOptions} id="select-1" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with disabled prop", () => {
			const { container } = render(<Select options={mockOptions} disabled />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with required prop", () => {
			const { container } = render(<Select options={mockOptions} required />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with name prop", () => {
			const { container } = render(<Select options={mockOptions} name="country" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with value prop", () => {
			const { container } = render(<Select options={mockOptions} value="option2" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with defaultValue prop", () => {
			const { container } = render(<Select options={mockOptions} defaultValue="option1" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with multiple prop", () => {
			const { container } = render(<Select options={mockOptions} multiple />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with all props combined", () => {
			const { container } = render(
				<Select
					options={mockOptions}
					sizing="lg"
					id="country-select"
					disabled
					required
					name="country"
					value="option2"
					className="custom-select"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with additional props", () => {
			const { container } = render(
				<Select options={mockOptions} data-testid="custom-select" data-custom="value" />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with aria attributes", () => {
			const { container } = render(
				<Select
					options={mockOptions}
					role="combobox"
					aria-label="Country selection"
					aria-describedby="country-help"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with style prop", () => {
			const { container } = render(
				<Select options={mockOptions} style={{ backgroundColor: "red", width: "200px" }} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with empty options array", () => {
			const { container } = render(<Select options={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with single option", () => {
			const singleOption = [{ value: "only", label: "Only Option" }];
			const { container } = render(<Select options={singleOption} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with options having undefined values", () => {
			const optionsWithUndefined = [
				{ value: undefined, label: "Option 1" },
				{ value: "option2", label: "Option 2" }
			];
			const { container } = render(<Select options={optionsWithUndefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with options having undefined labels", () => {
			const optionsWithUndefined = [
				{ value: "option1", label: undefined },
				{ value: "option2", label: "Option 2" }
			];
			const { container } = render(<Select options={optionsWithUndefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with options having null values", () => {
			const optionsWithNull = [
				{ value: undefined, label: "Option 1" },
				{ value: "option2", label: "Option 2" }
			];
			const { container } = render(<Select options={optionsWithNull} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with options having null labels", () => {
			const optionsWithNull = [
				{ value: "option1", label: undefined },
				{ value: "option2", label: "Option 2" }
			];
			const { container } = render(<Select options={optionsWithNull} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with options having empty string values", () => {
			const optionsWithEmpty = [
				{ value: "", label: "Empty Value" },
				{ value: "option2", label: "Option 2" }
			];
			const { container } = render(<Select options={optionsWithEmpty} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with options having empty string labels", () => {
			const optionsWithEmpty = [
				{ value: "option1", label: "" },
				{ value: "option2", label: "Option 2" }
			];
			const { container } = render(<Select options={optionsWithEmpty} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with many options", () => {
			const manyOptions = Array.from({ length: 50 }, (_, i) => ({
				value: `option${i + 1}`,
				label: `Option ${i + 1}`
			}));
			const { container } = render(<Select options={manyOptions} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with special characters in option values", () => {
			const specialOptions = [
				{ value: "option&<>\"'", label: "Special Characters" },
				{ value: "option2", label: "Normal Option" }
			];
			const { container } = render(<Select options={specialOptions} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with special characters in option labels", () => {
			const specialOptions = [
				{ value: "option1", label: `Special & Characters: <>&"'` },
				{ value: "option2", label: "Normal Option" }
			];
			const { container } = render(<Select options={specialOptions} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with unicode characters in options", () => {
			const unicodeOptions = [
				{ value: "option1", label: "Café" },
				{ value: "option2", label: "Naïve" },
				{ value: "option3", label: "Zürich" }
			];
			const { container } = render(<Select options={unicodeOptions} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with long option labels", () => {
			const longOptions = [
				{
					value: "option1",
					label: "This is a very long option label that might wrap to multiple lines"
				},
				{ value: "option2", label: "Short" }
			];
			const { container } = render(<Select options={longOptions} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with boolean props", () => {
			const { container } = render(
				<Select options={mockOptions} disabled={false} required={true} multiple={false} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for select with multiple event handlers", () => {
			const handleChange = vi.fn();
			const handleBlur = vi.fn();
			const handleFocus = vi.fn();
			const handleClick = vi.fn();
			const handleMouseOver = vi.fn();

			const { container } = render(
				<Select
					options={mockOptions}
					onChange={handleChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					onClick={handleClick}
					onMouseOver={handleMouseOver}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
