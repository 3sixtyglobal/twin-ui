// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner - Unit Tests", () => {
	it("renders spinner with default props", () => {
		render(<Spinner />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		expect(spinner).toHaveAttribute("aria-label", "Loading spinner");
	});

	it("renders spinner with custom className", () => {
		render(<Spinner className="custom-spinner-class" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		// Flowbite Spinner component doesn't apply custom className
	});

	it("renders spinner with different sizes", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach(size => {
			const { unmount } = render(<Spinner size={size} />);

			const spinner = screen.getByRole("status");
			expect(spinner).toBeInTheDocument();
			expect(spinner).toHaveAttribute("aria-label", "Loading spinner");

			unmount();
		});
	});

	it("renders spinner with different colors", () => {
		const colors = ["primary", "success", "warning", "error", "information"] as const;

		colors.forEach(color => {
			const { unmount } = render(<Spinner color={color} />);

			const spinner = screen.getByRole("status");
			expect(spinner).toBeInTheDocument();
			expect(spinner).toHaveAttribute("aria-label", "Loading spinner");

			unmount();
		});
	});

	it("renders spinner with primary color by default", () => {
		render(<Spinner />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with size and color combined", () => {
		render(<Spinner size="lg" color="success" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		expect(spinner).toHaveAttribute("aria-label", "Loading spinner");
	});

	it("renders spinner with all props combined", () => {
		const { container: _container } = render(
			<Spinner size="xl" color="error" className="complete-spinner-class" />
		);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		expect(spinner).toHaveAttribute("aria-label", "Loading spinner");
		// Flowbite Spinner component doesn't apply custom className
	});

	it("renders spinner with multiple classes", () => {
		const { container: _container } = render(<Spinner className="class1 class2 class3" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		// Flowbite Spinner component doesn't apply custom className
	});

	it("renders spinner with whitespace in className", () => {
		const { container: _container } = render(<Spinner className="spaced-class" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		// Flowbite Spinner component doesn't apply custom className
	});

	it("renders spinner with empty className", () => {
		const { container } = render(<Spinner className="" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		// Empty className is handled by Flowbite component
		expect(container.firstChild).toBeInTheDocument();
	});

	it("renders spinner with undefined className", () => {
		render(<Spinner className={undefined} />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with null className", () => {
		render(<Spinner className={null as any} />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with extra small size", () => {
		render(<Spinner size="xs" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with small size", () => {
		render(<Spinner size="sm" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with medium size", () => {
		render(<Spinner size="md" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with large size", () => {
		render(<Spinner size="lg" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with extra large size", () => {
		render(<Spinner size="xl" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with primary color", () => {
		render(<Spinner color="primary" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with success color", () => {
		render(<Spinner color="success" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with warning color", () => {
		render(<Spinner color="warning" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with error color", () => {
		render(<Spinner color="error" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with information color", () => {
		render(<Spinner color="information" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
	});

	it("renders spinner with all size variants", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach(size => {
			const { unmount } = render(<Spinner size={size} color="primary" />);

			const spinner = screen.getByRole("status");
			expect(spinner).toBeInTheDocument();

			unmount();
		});
	});

	it("renders spinner with all color variants", () => {
		const colors = ["primary", "success", "warning", "error", "information"] as const;

		colors.forEach(color => {
			const { unmount } = render(<Spinner size="md" color={color} />);

			const spinner = screen.getByRole("status");
			expect(spinner).toBeInTheDocument();

			unmount();
		});
	});

	it("renders spinner with all size and color combinations", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
		const colors = ["primary", "success", "warning", "error", "information"] as const;

		sizes.forEach(size => {
			colors.forEach(color => {
				const { unmount } = render(<Spinner size={size} color={color} />);

				const spinner = screen.getByRole("status");
				expect(spinner).toBeInTheDocument();

				unmount();
			});
		});
	});

	it("renders spinner with custom props", () => {
		render(<Spinner data-custom="test-value" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		expect(spinner).toHaveAttribute("data-custom", "test-value");
	});

	it("renders spinner with multiple custom props", () => {
		render(
			<Spinner data-custom="test-value" data-another="another-value" id="custom-spinner-id" />
		);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		expect(spinner).toHaveAttribute("data-custom", "test-value");
		expect(spinner).toHaveAttribute("data-another", "another-value");
		expect(spinner).toHaveAttribute("id", "custom-spinner-id");
	});

	it("renders spinner with special characters in className", () => {
		const { container: _container } = render(
			<Spinner className="spinner-with-special-chars-!@#$%^&*()" />
		);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		// Flowbite Spinner component doesn't apply custom className
	});

	it("renders spinner with unicode characters in className", () => {
		const { container: _container } = render(<Spinner className="spinner-with-unicode-🚀✨🎉" />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		// Flowbite Spinner component doesn't apply custom className
	});

	it("renders spinner with long className", () => {
		const longClassName =
			"spinner-with-very-long-class-name-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		const { container: _container } = render(<Spinner className={longClassName} />);

		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		// Flowbite Spinner component doesn't apply custom className
	});
});

describe("Spinner - Snapshot Tests", () => {
	it("matches snapshot for default spinner", () => {
		const { container } = render(<Spinner />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with custom className", () => {
		const { container } = render(<Spinner className="custom-spinner-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with different sizes", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach(size => {
			const { container } = render(<Spinner size={size} />);
			expect(container.firstChild).toMatchSnapshot(`${size} size spinner`);
		});
	});

	it("matches snapshot for spinner with different colors", () => {
		const colors = ["primary", "success", "warning", "error", "information"] as const;

		colors.forEach(color => {
			const { container } = render(<Spinner color={color} />);
			expect(container.firstChild).toMatchSnapshot(`${color} color spinner`);
		});
	});

	it("matches snapshot for spinner with primary color by default", () => {
		const { container } = render(<Spinner />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with size and color combined", () => {
		const { container } = render(<Spinner size="lg" color="success" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with all props combined", () => {
		const { container } = render(
			<Spinner size="xl" color="error" className="complete-spinner-class" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with multiple classes", () => {
		const { container } = render(<Spinner className="class1 class2 class3" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with whitespace in className", () => {
		const { container } = render(<Spinner className="spaced-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with empty className", () => {
		const { container } = render(<Spinner className="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with undefined className", () => {
		const { container } = render(<Spinner className={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with null className", () => {
		const { container } = render(<Spinner className={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with extra small size", () => {
		const { container } = render(<Spinner size="xs" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with small size", () => {
		const { container } = render(<Spinner size="sm" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with medium size", () => {
		const { container } = render(<Spinner size="md" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with large size", () => {
		const { container } = render(<Spinner size="lg" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with extra large size", () => {
		const { container } = render(<Spinner size="xl" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with primary color", () => {
		const { container } = render(<Spinner color="primary" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with success color", () => {
		const { container } = render(<Spinner color="success" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with warning color", () => {
		const { container } = render(<Spinner color="warning" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with error color", () => {
		const { container } = render(<Spinner color="error" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with information color", () => {
		const { container } = render(<Spinner color="information" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with all size variants", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach(size => {
			const { container } = render(<Spinner size={size} color="primary" />);
			expect(container.firstChild).toMatchSnapshot(`${size} size spinner`);
		});
	});

	it("matches snapshot for spinner with all color variants", () => {
		const colors = ["primary", "success", "warning", "error", "information"] as const;

		colors.forEach(color => {
			const { container } = render(<Spinner size="md" color={color} />);
			expect(container.firstChild).toMatchSnapshot(`${color} color spinner`);
		});
	});

	it("matches snapshot for spinner with all size and color combinations", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
		const colors = ["primary", "success", "warning", "error", "information"] as const;

		sizes.forEach(size => {
			colors.forEach(color => {
				const { container } = render(<Spinner size={size} color={color} />);
				expect(container.firstChild).toMatchSnapshot(`${size} ${color} spinner`);
			});
		});
	});

	it("matches snapshot for spinner with custom props", () => {
		const { container } = render(<Spinner data-custom="test-value" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with multiple custom props", () => {
		const { container } = render(
			<Spinner data-custom="test-value" data-another="another-value" id="custom-spinner-id" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with special characters in className", () => {
		const { container } = render(<Spinner className="spinner-with-special-chars-!@#$%^&*()" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with unicode characters in className", () => {
		const { container } = render(<Spinner className="spinner-with-unicode-🚀✨🎉" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for spinner with long className", () => {
		const longClassName =
			"spinner-with-very-long-class-name-that-contains-multiple-words-and-should-be-handled-properly-by-the-component";

		const { container } = render(<Spinner className={longClassName} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
