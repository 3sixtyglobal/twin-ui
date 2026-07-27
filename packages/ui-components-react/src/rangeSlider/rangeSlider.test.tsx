// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RangeSlider } from "./rangeSlider";

describe("RangeSlider", () => {
	describe("Unit Tests", () => {
		it("renders rangeslider with default props", () => {
			render(<RangeSlider />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with custom className", () => {
			const { container } = render(<RangeSlider className="custom-rangeslider" />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
			// Custom className is applied to the wrapper, not the slider element directly
			expect(container.firstChild).toHaveClass("custom-rangeslider");
		});

		it("renders rangeslider with sizing prop", () => {
			render(<RangeSlider sizing="sm" />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with different sizing values", () => {
			const sizes = ["sm", "md", "lg"];

			sizes.forEach(size => {
				const { unmount } = render(<RangeSlider sizing={size as any} />);

				const rangeslider = screen.getByRole("slider");
				expect(rangeslider).toBeInTheDocument();
				unmount();
			});
		});

		it("renders rangeslider with id prop", () => {
			render(<RangeSlider id="rangeslider-1" />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toHaveAttribute("id", "rangeslider-1");
		});

		it("renders rangeslider with disabled prop", () => {
			render(<RangeSlider disabled />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with required prop", () => {
			render(<RangeSlider required />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with name prop", () => {
			render(<RangeSlider name="volume" />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with value prop", () => {
			render(<RangeSlider value="50" />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with min prop", () => {
			render(<RangeSlider min={0} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with max prop", () => {
			render(<RangeSlider max={100} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with min and max props", () => {
			render(<RangeSlider min={10} max={90} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with all props combined", () => {
			const { container } = render(
				<RangeSlider
					sizing="lg"
					id="volume-slider"
					disabled
					required
					name="volume"
					value="75"
					min={0}
					max={100}
					className="custom-rangeslider"
				/>
			);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
			expect(rangeslider).toHaveAttribute("id", "volume-slider");
			// Custom className is applied to the wrapper, not the slider element directly
			expect(container.firstChild).toHaveClass("custom-rangeslider");
		});

		it("renders rangeslider with additional props", () => {
			render(<RangeSlider data-testid="custom-rangeslider" data-custom="value" />);

			const rangeslider = screen.getByTestId("custom-rangeslider");
			expect(rangeslider).toBeInTheDocument();
			expect(rangeslider).toHaveAttribute("data-custom", "value");
		});

		it("renders rangeslider with aria attributes", () => {
			render(
				<RangeSlider
					role="slider"
					aria-label="Volume control"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={50}
				/>
			);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toHaveAttribute("role", "slider");
			expect(rangeslider).toHaveAttribute("aria-label", "Volume control");
			expect(rangeslider).toHaveAttribute("aria-valuemin", "0");
			expect(rangeslider).toHaveAttribute("aria-valuemax", "100");
			expect(rangeslider).toHaveAttribute("aria-valuenow", "50");
		});

		it("renders rangeslider with style prop", () => {
			render(<RangeSlider style={{ backgroundColor: "red", width: "200px" }} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toHaveStyle("background-color: rgb(255, 0, 0)");
			expect(rangeslider).toHaveStyle("width: 200px");
		});

		it("renders rangeslider with onChange handler", () => {
			const handleChange = vi.fn();
			render(<RangeSlider onChange={handleChange} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
			// Note: The actual change event would be triggered by user interaction
		});

		it("renders rangeslider with onInput handler", () => {
			const handleInput = vi.fn();
			render(<RangeSlider onInput={handleInput} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with onClick handler", () => {
			const handleClick = vi.fn();
			render(<RangeSlider onClick={handleClick} />);

			const rangeslider = screen.getByRole("slider");
			rangeslider.click();
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("renders rangeslider with onMouseOver handler", () => {
			const handleMouseOver = vi.fn();
			render(<RangeSlider onMouseOver={handleMouseOver} />);

			const rangeslider = screen.getByRole("slider");
			rangeslider.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});

		it("renders rangeslider with edge case values", () => {
			render(<RangeSlider min={-100} max={100} value="0" />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with large values", () => {
			render(<RangeSlider min={0} max={10000} value="5000" />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with decimal values", () => {
			render(<RangeSlider min={0.1} max={1.0} value="0.5" />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with empty string value", () => {
			render(<RangeSlider value="" />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with undefined value", () => {
			render(<RangeSlider value={undefined} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with null value", () => {
			render(<RangeSlider value={null as any} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with boolean props", () => {
			render(<RangeSlider disabled={false} required={true} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with step prop", () => {
			render(<RangeSlider step={5} />);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();
		});

		it("renders rangeslider with multiple event handlers", () => {
			const handleChange = vi.fn();
			const handleInput = vi.fn();
			const handleClick = vi.fn();
			const handleMouseOver = vi.fn();

			render(
				<RangeSlider
					onChange={handleChange}
					onInput={handleInput}
					onClick={handleClick}
					onMouseOver={handleMouseOver}
				/>
			);

			const rangeslider = screen.getByRole("slider");
			expect(rangeslider).toBeInTheDocument();

			rangeslider.click();
			expect(handleClick).toHaveBeenCalledTimes(1);

			rangeslider.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
			expect(handleMouseOver).toHaveBeenCalledTimes(1);
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for rangeslider with default props", () => {
			const { container } = render(<RangeSlider />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with custom className", () => {
			const { container } = render(<RangeSlider className="custom-rangeslider" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with sizing prop", () => {
			const { container } = render(<RangeSlider sizing="sm" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with different sizing values", () => {
			const sizes = ["sm", "md", "lg"];

			sizes.forEach(size => {
				const { container, unmount } = render(<RangeSlider sizing={size as any} />);

				expect(container.firstChild).toMatchSnapshot();
				unmount();
			});
		});

		it("matches snapshot for rangeslider with id prop", () => {
			const { container } = render(<RangeSlider id="rangeslider-1" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with disabled prop", () => {
			const { container } = render(<RangeSlider disabled />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with required prop", () => {
			const { container } = render(<RangeSlider required />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with name prop", () => {
			const { container } = render(<RangeSlider name="volume" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with value prop", () => {
			const { container } = render(<RangeSlider value="50" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with min prop", () => {
			const { container } = render(<RangeSlider min={0} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with max prop", () => {
			const { container } = render(<RangeSlider max={100} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with min and max props", () => {
			const { container } = render(<RangeSlider min={10} max={90} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with all props combined", () => {
			const { container } = render(
				<RangeSlider
					sizing="lg"
					id="volume-slider"
					disabled
					required
					name="volume"
					value="75"
					min={0}
					max={100}
					className="custom-rangeslider"
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with additional props", () => {
			const { container } = render(
				<RangeSlider data-testid="custom-rangeslider" data-custom="value" />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with aria attributes", () => {
			const { container } = render(
				<RangeSlider
					role="slider"
					aria-label="Volume control"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={50}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with style prop", () => {
			const { container } = render(
				<RangeSlider style={{ backgroundColor: "red", width: "200px" }} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with edge case values", () => {
			const { container } = render(<RangeSlider min={-100} max={100} value="0" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with large values", () => {
			const { container } = render(<RangeSlider min={0} max={10000} value="5000" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with decimal values", () => {
			const { container } = render(<RangeSlider min={0.1} max={1.0} value="0.5" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with empty string value", () => {
			const { container } = render(<RangeSlider value="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with undefined value", () => {
			const { container } = render(<RangeSlider value={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with null value", () => {
			const { container } = render(<RangeSlider value={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with boolean props", () => {
			const { container } = render(<RangeSlider disabled={false} required={true} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with step prop", () => {
			const { container } = render(<RangeSlider step={5} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for rangeslider with multiple event handlers", () => {
			const handleChange = vi.fn();
			const handleInput = vi.fn();
			const handleClick = vi.fn();
			const handleMouseOver = vi.fn();

			const { container } = render(
				<RangeSlider
					onChange={handleChange}
					onInput={handleInput}
					onClick={handleClick}
					onMouseOver={handleMouseOver}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
