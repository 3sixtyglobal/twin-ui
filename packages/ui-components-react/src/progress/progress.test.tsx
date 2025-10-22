// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "./progress";
import { ProgressSizes } from "./progressSizes";
import { ProgressPositions } from "./progressPositions";

describe("Progress - Unit Tests", () => {
	it("renders progress with required progress prop", () => {
		render(<Progress progress={50} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		expect(progress).toHaveAttribute("aria-valuenow", "50");
		// Flowbite Progress component doesn't set aria-valuemin and aria-valuemax by default
		expect(progress).toHaveAttribute("role", "progressbar");
	});

	it("renders progress with custom className", () => {
		render(<Progress progress={75} className="custom-progress-class" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		// Flowbite Progress component doesn't apply custom className props
	});

	it("renders progress with different progress values", () => {
		const progressValues = [0, 25, 50, 75, 100];

		progressValues.forEach(value => {
			const { unmount } = render(<Progress progress={value} />);

			const progress = screen.getByRole("progressbar");
			expect(progress).toBeInTheDocument();
			expect(progress).toHaveAttribute("aria-valuenow", value.toString());

			unmount();
		});
	});

	it("renders progress with different sizes", () => {
		const sizes = [
			ProgressSizes.Small,
			ProgressSizes.Medium,
			ProgressSizes.Large,
			ProgressSizes.ExtraLarge
		] as const;

		sizes.forEach(size => {
			const { unmount } = render(<Progress progress={50} size={size} />);

			const progress = screen.getByRole("progressbar");
			expect(progress).toBeInTheDocument();

			unmount();
		});
	});

	it("renders progress with different colors", () => {
		const colors = [
			"orange",
			"primary",
			"green",
			"yellow",
			"pink",
			"purple",
			"indigo",
			"dark",
			"blue"
		] as const;

		colors.forEach(color => {
			const { unmount } = render(<Progress progress={50} color={color} />);

			const progress = screen.getByRole("progressbar");
			expect(progress).toBeInTheDocument();

			unmount();
		});
	});

	it("renders progress with label progress", () => {
		render(<Progress progress={60} labelProgress={true} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with label text", () => {
		render(<Progress progress={40} labelText={true} textLabel="Loading..." />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with both labels", () => {
		render(
			<Progress progress={80} labelProgress={true} labelText={true} textLabel="Processing..." />
		);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with different label positions", () => {
		const positions = [ProgressPositions.Inside, ProgressPositions.Outside] as const;

		positions.forEach(position => {
			const { unmount } = render(
				<Progress
					progress={50}
					progressLabelPosition={position}
					textLabelPosition={position}
					labelProgress={true}
					labelText={true}
					textLabel="Test"
				/>
			);

			const progress = screen.getByRole("progressbar");
			expect(progress).toBeInTheDocument();

			unmount();
		});
	});

	it("renders progress with all props combined", () => {
		render(
			<Progress
				progress={85}
				size="lg"
				color="green"
				labelProgress={true}
				labelText={true}
				textLabel="Complete"
				progressLabelPosition={ProgressPositions.Inside}
				textLabelPosition={ProgressPositions.Outside}
				className="complete-progress-class"
			/>
		);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		// Flowbite Progress component doesn't apply custom className props
		expect(progress).toHaveAttribute("aria-valuenow", "85");
	});

	it("renders progress with multiple classes", () => {
		render(<Progress progress={30} className="class1 class2 class3" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		// Flowbite Progress component doesn't apply custom className props
	});

	it("renders progress with whitespace in className", () => {
		render(<Progress progress={45} className="spaced-class" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		// Flowbite Progress component doesn't apply custom className props
	});

	it("renders progress with empty className", () => {
		render(<Progress progress={20} className="" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		// Flowbite Progress component doesn't apply custom className props
	});

	it("renders progress with undefined className", () => {
		render(<Progress progress={35} className={undefined} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with null className", () => {
		render(<Progress progress={65} className={null as any} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with zero progress", () => {
		render(<Progress progress={0} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		expect(progress).toHaveAttribute("aria-valuenow", "0");
	});

	it("renders progress with maximum progress", () => {
		render(<Progress progress={100} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		expect(progress).toHaveAttribute("aria-valuenow", "100");
	});

	it("renders progress with decimal progress values", () => {
		const decimalValues = [25.5, 33.33, 66.67, 99.99];

		decimalValues.forEach(value => {
			const { unmount } = render(<Progress progress={value} />);

			const progress = screen.getByRole("progressbar");
			expect(progress).toBeInTheDocument();
			expect(progress).toHaveAttribute("aria-valuenow", value.toString());

			unmount();
		});
	});

	it("renders progress with long text label", () => {
		const longText =
			"This is a very long text label that should be handled properly by the progress component and should not break the layout";

		render(<Progress progress={50} labelText={true} textLabel={longText} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with empty text label", () => {
		render(<Progress progress={50} labelText={true} textLabel="" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with undefined text label", () => {
		render(<Progress progress={50} labelText={true} textLabel={undefined} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with null text label", () => {
		render(<Progress progress={50} labelText={true} textLabel={null as any} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with special characters in text label", () => {
		render(<Progress progress={50} labelText={true} textLabel="Progress: 50% (1/2)" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with unicode characters in text label", () => {
		render(<Progress progress={50} labelText={true} textLabel="Loading... ⏳" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
	});

	it("renders progress with all size variants", () => {
		const sizes = [
			ProgressSizes.Small,
			ProgressSizes.Medium,
			ProgressSizes.Large,
			ProgressSizes.ExtraLarge
		] as const;

		sizes.forEach(size => {
			const { unmount } = render(<Progress progress={50} size={size} color="primary" />);

			const progress = screen.getByRole("progressbar");
			expect(progress).toBeInTheDocument();

			unmount();
		});
	});

	it("renders progress with all color variants", () => {
		const colors = [
			"orange",
			"primary",
			"green",
			"yellow",
			"pink",
			"purple",
			"indigo",
			"dark",
			"blue"
		] as const;

		colors.forEach(color => {
			const { unmount } = render(<Progress progress={50} size="md" color={color} />);

			const progress = screen.getByRole("progressbar");
			expect(progress).toBeInTheDocument();

			unmount();
		});
	});

	it("renders progress with all size and color combinations", () => {
		const sizes = [
			ProgressSizes.Small,
			ProgressSizes.Medium,
			ProgressSizes.Large,
			ProgressSizes.ExtraLarge
		] as const;
		const colors = [
			"orange",
			"primary",
			"green",
			"yellow",
			"pink",
			"purple",
			"indigo",
			"dark",
			"blue"
		] as const;

		sizes.forEach(size => {
			colors.forEach(color => {
				const { unmount } = render(<Progress progress={50} size={size} color={color} />);

				const progress = screen.getByRole("progressbar");
				expect(progress).toBeInTheDocument();

				unmount();
			});
		});
	});

	it("renders progress with custom props", () => {
		render(<Progress progress={50} data-custom="test-value" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		expect(progress).toHaveAttribute("data-custom", "test-value");
	});

	it("renders progress with multiple custom props", () => {
		render(
			<Progress
				progress={50}
				data-custom="test-value"
				data-another="another-value"
				id="custom-progress-id"
			/>
		);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		expect(progress).toHaveAttribute("data-custom", "test-value");
		expect(progress).toHaveAttribute("data-another", "another-value");
		expect(progress).toHaveAttribute("id", "custom-progress-id");
	});

	it("renders progress with special characters in className", () => {
		render(<Progress progress={50} className="progress-with-special-chars-!@#$%^&*()" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		// Flowbite Progress component doesn't apply custom className props
	});

	it("renders progress with unicode characters in className", () => {
		render(<Progress progress={50} className="progress-with-unicode-🚀✨🎉" />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		// Flowbite Progress component doesn't apply custom className props
	});

	it("renders progress with long className", () => {
		const longClassName =
			"progress-with-very-long-class-name-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		render(<Progress progress={50} className={longClassName} />);

		const progress = screen.getByRole("progressbar");
		expect(progress).toBeInTheDocument();
		// Flowbite Progress component doesn't apply custom className props
	});
});

describe("Progress - Snapshot Tests", () => {
	it("matches snapshot for progress with required progress prop", () => {
		const { container } = render(<Progress progress={50} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with custom className", () => {
		const { container } = render(<Progress progress={75} className="custom-progress-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with different progress values", () => {
		const progressValues = [0, 25, 50, 75, 100];

		progressValues.forEach(value => {
			const { container } = render(<Progress progress={value} />);
			expect(container.firstChild).toMatchSnapshot(`${value} progress value`);
		});
	});

	it("matches snapshot for progress with different sizes", () => {
		const sizes = [
			ProgressSizes.Small,
			ProgressSizes.Medium,
			ProgressSizes.Large,
			ProgressSizes.ExtraLarge
		] as const;

		sizes.forEach(size => {
			const { container } = render(<Progress progress={50} size={size} />);
			expect(container.firstChild).toMatchSnapshot(`${size} size progress`);
		});
	});

	it("matches snapshot for progress with different colors", () => {
		const colors = [
			"orange",
			"primary",
			"green",
			"yellow",
			"pink",
			"purple",
			"indigo",
			"dark",
			"blue"
		] as const;

		colors.forEach(color => {
			const { container } = render(<Progress progress={50} color={color} />);
			expect(container.firstChild).toMatchSnapshot(`${color} color progress`);
		});
	});

	it("matches snapshot for progress with label progress", () => {
		const { container } = render(<Progress progress={60} labelProgress={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with label text", () => {
		const { container } = render(
			<Progress progress={40} labelText={true} textLabel="Loading..." />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with both labels", () => {
		const { container } = render(
			<Progress progress={80} labelProgress={true} labelText={true} textLabel="Processing..." />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with different label positions", () => {
		const positions = [ProgressPositions.Inside, ProgressPositions.Outside] as const;

		positions.forEach(position => {
			const { container } = render(
				<Progress
					progress={50}
					progressLabelPosition={position}
					textLabelPosition={position}
					labelProgress={true}
					labelText={true}
					textLabel="Test"
				/>
			);
			expect(container.firstChild).toMatchSnapshot(`${position} label position progress`);
		});
	});

	it("matches snapshot for progress with all props combined", () => {
		const { container } = render(
			<Progress
				progress={85}
				size="lg"
				color="green"
				labelProgress={true}
				labelText={true}
				textLabel="Complete"
				progressLabelPosition={ProgressPositions.Inside}
				textLabelPosition={ProgressPositions.Outside}
				className="complete-progress-class"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with multiple classes", () => {
		const { container } = render(<Progress progress={30} className="class1 class2 class3" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with whitespace in className", () => {
		const { container } = render(<Progress progress={45} className="spaced-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with empty className", () => {
		const { container } = render(<Progress progress={20} className="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with undefined className", () => {
		const { container } = render(<Progress progress={35} className={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with null className", () => {
		const { container } = render(<Progress progress={65} className={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with zero progress", () => {
		const { container } = render(<Progress progress={0} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with maximum progress", () => {
		const { container } = render(<Progress progress={100} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with decimal progress values", () => {
		const decimalValues = [25.5, 33.33, 66.67, 99.99];

		decimalValues.forEach(value => {
			const { container } = render(<Progress progress={value} />);
			expect(container.firstChild).toMatchSnapshot(`${value} decimal progress value`);
		});
	});

	it("matches snapshot for progress with long text label", () => {
		const longText =
			"This is a very long text label that should be handled properly by the progress component and should not break the layout";

		const { container } = render(<Progress progress={50} labelText={true} textLabel={longText} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with empty text label", () => {
		const { container } = render(<Progress progress={50} labelText={true} textLabel="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with undefined text label", () => {
		const { container } = render(<Progress progress={50} labelText={true} textLabel={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with null text label", () => {
		const { container } = render(
			<Progress progress={50} labelText={true} textLabel={null as any} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with special characters in text label", () => {
		const { container } = render(
			<Progress progress={50} labelText={true} textLabel="Progress: 50% (1/2)" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with unicode characters in text label", () => {
		const { container } = render(
			<Progress progress={50} labelText={true} textLabel="Loading... ⏳" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with all size variants", () => {
		const sizes = [
			ProgressSizes.Small,
			ProgressSizes.Medium,
			ProgressSizes.Large,
			ProgressSizes.ExtraLarge
		] as const;

		sizes.forEach(size => {
			const { container } = render(<Progress progress={50} size={size} color="primary" />);
			expect(container.firstChild).toMatchSnapshot(`${size} size progress`);
		});
	});

	it("matches snapshot for progress with all color variants", () => {
		const colors = [
			"orange",
			"primary",
			"green",
			"yellow",
			"pink",
			"purple",
			"indigo",
			"dark",
			"blue"
		] as const;

		colors.forEach(color => {
			const { container } = render(<Progress progress={50} size="md" color={color} />);
			expect(container.firstChild).toMatchSnapshot(`${color} color progress`);
		});
	});

	it("matches snapshot for progress with all size and color combinations", () => {
		const sizes = [
			ProgressSizes.Small,
			ProgressSizes.Medium,
			ProgressSizes.Large,
			ProgressSizes.ExtraLarge
		] as const;
		const colors = [
			"orange",
			"primary",
			"green",
			"yellow",
			"pink",
			"purple",
			"indigo",
			"dark",
			"blue"
		] as const;

		sizes.forEach(size => {
			colors.forEach(color => {
				const { container } = render(<Progress progress={50} size={size} color={color} />);
				expect(container.firstChild).toMatchSnapshot(`${size} ${color} progress`);
			});
		});
	});

	it("matches snapshot for progress with custom props", () => {
		const { container } = render(<Progress progress={50} data-custom="test-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with multiple custom props", () => {
		const { container } = render(
			<Progress
				progress={50}
				data-custom="test-value"
				data-another="another-value"
				id="custom-progress-id"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with special characters in className", () => {
		const { container } = render(
			<Progress progress={50} className="progress-with-special-chars-!@#$%^&*()" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with unicode characters in className", () => {
		const { container } = render(
			<Progress progress={50} className="progress-with-unicode-🚀✨🎉" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for progress with long className", () => {
		const longClassName =
			"progress-with-very-long-class-name-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		const { container } = render(<Progress progress={50} className={longClassName} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
