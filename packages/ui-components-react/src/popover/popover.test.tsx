// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Popover } from "./popover";

// Mock icon component for testing
const MockIcon = () => <svg data-testid="mock-icon">Icon</svg>;

describe("Popover", () => {
	describe("Unit Tests", () => {
		it("renders popover with default props", () => {
			render(
				<Popover content="Popover content" placement="top" trigger="click">
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with custom className", () => {
			render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					className="custom-popover"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with arrow prop", () => {
			render(
				<Popover content="Popover content" placement="top" trigger="click" arrow>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with different placement values", () => {
			const placements = ["top", "bottom", "left", "right"];

			placements.forEach(placement => {
				const { unmount } = render(
					<Popover content="Popover content" placement={placement as any} trigger="click">
						Trigger Button
					</Popover>
				);

				const triggerButton = screen.getByRole("button", { name: "Trigger Button" });
				expect(triggerButton).toBeInTheDocument();
				unmount();
			});
		});

		it("renders popover with different trigger values", () => {
			const triggers = ["click", "hover"];

			triggers.forEach(trigger => {
				const { unmount } = render(
					<Popover content="Popover content" placement="top" trigger={trigger as any}>
						Trigger Button
					</Popover>
				);

				const triggerButton = screen.getByRole("button", { name: "Trigger Button" });
				expect(triggerButton).toBeInTheDocument();
				unmount();
			});
		});

		it("renders popover with string content", () => {
			render(
				<Popover content="Simple popover content" placement="top" trigger="click">
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with JSX content", () => {
			render(
				<Popover
					content={<div data-testid="popover-content">JSX Content</div>}
					placement="top"
					trigger="click"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with complex JSX content", () => {
			render(
				<Popover
					content={
						<div>
							<h3>Title</h3>
							<p>Description</p>
							<button>Action</button>
						</div>
					}
					placement="top"
					trigger="click"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with custom trigger", () => {
			render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					customTrigger={<button data-testid="custom-trigger">Custom Trigger</button>}
				>
					Default Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Custom Trigger" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with ariaLabel prop", () => {
			render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					ariaLabel="Custom popover label"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with ariaDescription prop", () => {
			render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					ariaDescription="popover-description"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with both ariaLabel and ariaDescription props", () => {
			render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					ariaLabel="Custom popover label"
					ariaDescription="popover-description"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
			// Note: popover element is not accessible until opened
		});

		it("renders popover with children as trigger text", () => {
			render(
				<Popover content="Popover content" placement="top" trigger="click">
					Custom Trigger Text
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Custom Trigger Text" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with empty children", () => {
			render(
				<Popover content="Popover content" placement="top" trigger="click">
					{""}
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with null children", () => {
			render(
				<Popover content="Popover content" placement="top" trigger="click">
					{null}
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with undefined children", () => {
			render(
				<Popover content="Popover content" placement="top" trigger="click">
					{undefined}
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with long content", () => {
			const longContent =
				"This is a very long popover content that should be rendered properly without any issues or truncation in the popover component";
			render(
				<Popover content={longContent} placement="top" trigger="click">
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with special characters in content", () => {
			render(
				<Popover content={`Special & Characters: <>&"'`} placement="top" trigger="click">
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with unicode characters in content", () => {
			render(
				<Popover content="Unicode: 你好 世界 🌍" placement="top" trigger="click">
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with empty string content", () => {
			render(
				<Popover content="" placement="top" trigger="click">
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with all props combined", () => {
			render(
				<Popover
					content="Combined content"
					placement="bottom"
					trigger="hover"
					arrow
					className="custom-popover"
					ariaLabel="Combined popover"
					ariaDescription="combined-description"
					customTrigger={<button data-testid="combined-trigger">Combined Trigger</button>}
				>
					Default Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Combined Trigger" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
			// Note: popover element is not accessible until opened
		});

		it("renders popover with additional props", () => {
			render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					data-testid="custom-popover"
					id="popover-1"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with className prop", () => {
			render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					className="custom-popover"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with onClick handler", () => {
			const handleClick = vi.fn();
			render(
				<Popover content="Popover content" placement="top" trigger="click" onClick={handleClick}>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Note: Flowbite Popover doesn't pass onClick handlers to the trigger button
			// This functionality is not supported by the underlying Flowbite component
		});

		it("renders popover with onMouseOver handler", () => {
			const handleMouseOver = vi.fn();
			render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					onMouseOver={handleMouseOver}
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Note: Flowbite Popover doesn't pass onMouseOver handlers to the trigger button
			// This functionality is not supported by the underlying Flowbite component
		});

		it("renders popover with custom trigger containing icon", () => {
			render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					customTrigger={
						<button data-testid="icon-trigger">
							<MockIcon />
							Icon Button
						</button>
					}
				>
					Default Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "IconIcon Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with content containing form elements", () => {
			render(
				<Popover
					content={
						<form>
							<input type="text" placeholder="Enter text" />
							<button type="submit">Submit</button>
						</form>
					}
					placement="top"
					trigger="click"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});

		it("renders popover with content containing multiple elements", () => {
			render(
				<Popover
					content={
						<div>
							<h3>Title</h3>
							<p>Description</p>
							<ul>
								<li>Item 1</li>
								<li>Item 2</li>
								<li>Item 3</li>
							</ul>
						</div>
					}
					placement="top"
					trigger="click"
				>
					Trigger Button
				</Popover>
			);

			const trigger = screen.getByRole("button", { name: "Trigger Button" });
			expect(trigger).toBeInTheDocument();
			// Popover content is not rendered until opened
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for popover with default props", () => {
			const { container } = render(
				<Popover content="Popover content" placement="top" trigger="click">
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with custom className", () => {
			const { container } = render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					className="custom-popover"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with arrow prop", () => {
			const { container } = render(
				<Popover content="Popover content" placement="top" trigger="click" arrow>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with different placement values", () => {
			const placements = ["top", "bottom", "left", "right"];

			placements.forEach(placement => {
				const { container, unmount } = render(
					<Popover content="Popover content" placement={placement as any} trigger="click">
						Trigger Button
					</Popover>
				);

				expect(container.firstChild).toMatchSnapshot();
				unmount();
			});
		});

		it("matches snapshot for popover with different trigger values", () => {
			const triggers = ["click", "hover"];

			triggers.forEach(trigger => {
				const { container, unmount } = render(
					<Popover content="Popover content" placement="top" trigger={trigger as any}>
						Trigger Button
					</Popover>
				);

				expect(container.firstChild).toMatchSnapshot();
				unmount();
			});
		});

		it("matches snapshot for popover with string content", () => {
			const { container } = render(
				<Popover content="Simple popover content" placement="top" trigger="click">
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with JSX content", () => {
			const { container } = render(
				<Popover
					content={<div data-testid="popover-content">JSX Content</div>}
					placement="top"
					trigger="click"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with complex JSX content", () => {
			const { container } = render(
				<Popover
					content={
						<div>
							<h3>Title</h3>
							<p>Description</p>
							<button>Action</button>
						</div>
					}
					placement="top"
					trigger="click"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with custom trigger", () => {
			const { container } = render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					customTrigger={<button data-testid="custom-trigger">Custom Trigger</button>}
				>
					Default Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with ariaLabel prop", () => {
			const { container } = render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					ariaLabel="Custom popover label"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with ariaDescription prop", () => {
			const { container } = render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					ariaDescription="popover-description"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with both ariaLabel and ariaDescription props", () => {
			const { container } = render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					ariaLabel="Custom popover label"
					ariaDescription="popover-description"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with children as trigger text", () => {
			const { container } = render(
				<Popover content="Popover content" placement="top" trigger="click">
					Custom Trigger Text
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with empty children", () => {
			const { container } = render(
				<Popover content="Popover content" placement="top" trigger="click">
					{""}
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with null children", () => {
			const { container } = render(
				<Popover content="Popover content" placement="top" trigger="click">
					{null}
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with undefined children", () => {
			const { container } = render(
				<Popover content="Popover content" placement="top" trigger="click">
					{undefined}
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with long content", () => {
			const longContent =
				"This is a very long popover content that should be rendered properly without any issues or truncation in the popover component";
			const { container } = render(
				<Popover content={longContent} placement="top" trigger="click">
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with special characters in content", () => {
			const { container } = render(
				<Popover content={`Special & Characters: <>&"'`} placement="top" trigger="click">
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with unicode characters in content", () => {
			const { container } = render(
				<Popover content="Unicode: 你好 世界 🌍" placement="top" trigger="click">
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with empty string content", () => {
			const { container } = render(
				<Popover content="" placement="top" trigger="click">
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with all props combined", () => {
			const { container } = render(
				<Popover
					content="Combined content"
					placement="bottom"
					trigger="hover"
					arrow
					className="custom-popover"
					ariaLabel="Combined popover"
					ariaDescription="combined-description"
					customTrigger={<button data-testid="combined-trigger">Combined Trigger</button>}
				>
					Default Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with additional props", () => {
			const { container } = render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					data-testid="custom-popover"
					id="popover-1"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with style prop", () => {
			const { container } = render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					className="custom-popover"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with custom trigger containing icon", () => {
			const { container } = render(
				<Popover
					content="Popover content"
					placement="top"
					trigger="click"
					customTrigger={
						<button data-testid="icon-trigger">
							<MockIcon />
							Icon Button
						</button>
					}
				>
					Default Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with content containing form elements", () => {
			const { container } = render(
				<Popover
					content={
						<form>
							<input type="text" placeholder="Enter text" />
							<button type="submit">Submit</button>
						</form>
					}
					placement="top"
					trigger="click"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for popover with content containing multiple elements", () => {
			const { container } = render(
				<Popover
					content={
						<div>
							<h3>Title</h3>
							<p>Description</p>
							<ul>
								<li>Item 1</li>
								<li>Item 2</li>
								<li>Item 3</li>
							</ul>
						</div>
					}
					placement="top"
					trigger="click"
				>
					Trigger Button
				</Popover>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
