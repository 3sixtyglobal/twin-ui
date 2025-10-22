// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal } from "./modal";
import { ModalPositions } from "./modalPositions";
import { ModalSizes } from "./modalSizes";

describe("Modal - Unit Tests", () => {
	it("renders modal when show is true", () => {
		render(
			<Modal show={true} header="Test Header" body="Test Body">
				Test Content
			</Modal>
		);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Test Header")).toBeInTheDocument();
		expect(screen.getByText("Test Body")).toBeInTheDocument();
		// Children are not rendered when header/body props are provided
	});

	it("does not render modal when show is false", () => {
		render(
			<Modal show={false} header="Test Header" body="Test Body">
				Test Content
			</Modal>
		);

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("renders modal with header only", () => {
		render(<Modal show={true} header="Test Header" />);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByRole("heading")).toBeInTheDocument();
		expect(screen.getByText("Test Header")).toBeInTheDocument();
		// Modal body and footer are not rendered when not provided
	});

	it("renders modal with body only", () => {
		render(<Modal show={true} body="Test Body" />);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Test Body")).toBeInTheDocument();
		// Modal header and footer are not rendered when not provided
	});

	it("renders modal with footer buttons only", () => {
		const footerButtons = [
			{ label: "Save", variant: "primary" as const, onClick: vi.fn() },
			{ label: "Cancel", variant: "secondary" as const, onClick: vi.fn() }
		];

		render(<Modal show={true} footerButtons={footerButtons} />);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Save")).toBeInTheDocument();
		expect(screen.getByText("Cancel")).toBeInTheDocument();
		// Modal header and body are not rendered when not provided
	});

	it("renders modal with all sections", () => {
		const footerButtons = [
			{ label: "Save", variant: "primary" as const, onClick: vi.fn() },
			{ label: "Cancel", variant: "secondary" as const, onClick: vi.fn() }
		];

		render(
			<Modal show={true} header="Test Header" body="Test Body" footerButtons={footerButtons}>
				Test Content
			</Modal>
		);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByRole("heading")).toBeInTheDocument();
		expect(screen.getByText("Test Header")).toBeInTheDocument();
		expect(screen.getByText("Test Body")).toBeInTheDocument();
		// Children are not rendered when header/body props are provided
		expect(screen.getByText("Save")).toBeInTheDocument();
		expect(screen.getByText("Cancel")).toBeInTheDocument();
	});

	it("renders modal with JSX header", () => {
		render(<Modal show={true} header={<h2>JSX Header</h2>} />);

		expect(screen.getByText("JSX Header")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
	});

	it("renders modal with JSX body", () => {
		render(
			<Modal
				show={true}
				body={
					<div>
						<p>Paragraph 1</p>
						<p>Paragraph 2</p>
					</div>
				}
			/>
		);

		expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
		expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
	});

	it("renders modal with multiple footer buttons", () => {
		const footerButtons = [
			{ label: "Save", variant: "primary" as const, onClick: vi.fn() },
			{ label: "Cancel", variant: "secondary" as const, onClick: vi.fn() },
			{ label: "Delete", variant: "error" as const, onClick: vi.fn() }
		];

		render(<Modal show={true} footerButtons={footerButtons} />);

		expect(screen.getByText("Save")).toBeInTheDocument();
		expect(screen.getByText("Cancel")).toBeInTheDocument();
		expect(screen.getByText("Delete")).toBeInTheDocument();
	});

	it("renders modal with empty footer buttons array", () => {
		render(<Modal show={true} footerButtons={[]} />);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		// Modal footer is not rendered when footerButtons is empty
	});

	it("renders modal with undefined footer buttons", () => {
		render(<Modal show={true} footerButtons={undefined} />);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		// Modal footer is not rendered when footerButtons is undefined
	});

	it("renders modal with different positions", () => {
		const { rerender } = render(<Modal show={true} position={ModalPositions.Center} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		rerender(<Modal show={true} position={ModalPositions.TopCenter} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		rerender(<Modal show={true} position={ModalPositions.BottomCenter} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("renders modal with different sizes", () => {
		const { rerender } = render(<Modal show={true} size={ModalSizes.Small} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		rerender(<Modal show={true} size={ModalSizes.Medium} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		rerender(<Modal show={true} size={ModalSizes.Large} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		rerender(<Modal show={true} size={ModalSizes.ExtraLarge} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("renders modal with dismissible prop", () => {
		render(<Modal show={true} dismissible={true} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("renders modal with popup prop", () => {
		render(<Modal show={true} popup={true} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("renders modal with custom className", () => {
		render(<Modal show={true} className="custom-modal-class" />);
		const modal = screen.getByRole("dialog");
		expect(modal).toBeInTheDocument();
	});

	it("renders modal with complex footer button props", () => {
		const footerButtons = [
			{
				label: "Complex Button",
				variant: "primary" as const,
				onClick: vi.fn(),
				disabled: true,
				size: "sm" as const
			}
		];

		render(<Modal show={true} footerButtons={footerButtons} />);

		expect(screen.getByText("Complex Button")).toBeInTheDocument();
	});

	it("renders modal with footer button without onClick", () => {
		const footerButtons = [{ label: "No Click Button", variant: "secondary" as const }];

		render(<Modal show={true} footerButtons={footerButtons} />);

		expect(screen.getByText("No Click Button")).toBeInTheDocument();
	});

	it("renders modal with footer button without variant", () => {
		const footerButtons = [{ label: "Default Button", onClick: vi.fn() }];

		render(<Modal show={true} footerButtons={footerButtons} />);

		expect(screen.getByText("Default Button")).toBeInTheDocument();
	});

	it("renders modal with all props combined", () => {
		const footerButtons = [
			{ label: "Save", variant: "primary" as const, onClick: vi.fn() },
			{ label: "Cancel", variant: "secondary" as const, onClick: vi.fn() }
		];

		render(
			<Modal
				show={true}
				header="Complete Modal"
				body="This is a complete modal with all features"
				footerButtons={footerButtons}
				position={ModalPositions.Center}
				size={ModalSizes.Large}
				dismissible={true}
				popup={false}
				className="complete-modal"
			>
				<div>Additional content</div>
			</Modal>
		);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Complete Modal")).toBeInTheDocument();
		expect(screen.getByText("This is a complete modal with all features")).toBeInTheDocument();
		// Children are not rendered when header/body props are provided
		expect(screen.getByText("Save")).toBeInTheDocument();
		expect(screen.getByText("Cancel")).toBeInTheDocument();
	});

	it("renders modal with null header", () => {
		render(<Modal show={true} header={null} />);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		// Modal header is not rendered when null
	});

	it("renders modal with null body", () => {
		render(<Modal show={true} body={null} />);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		// Modal body is not rendered when null
	});

	it("renders modal with empty string header", () => {
		render(<Modal show={true} header="" />);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		// Modal header is not rendered when empty string
	});

	it("renders modal with empty string body", () => {
		render(<Modal show={true} body="" />);

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		// Modal body is not rendered when empty string
	});
});

describe("Modal - Snapshot Tests", () => {
	it("matches snapshot for basic modal", () => {
		const { container } = render(<Modal show={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with header", () => {
		const { container } = render(<Modal show={true} header="Test Header" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with body", () => {
		const { container } = render(<Modal show={true} body="Test Body" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with children", () => {
		const { container } = render(
			<Modal show={true}>
				<div>Test Content</div>
			</Modal>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with footer buttons", () => {
		const footerButtons = [
			{ label: "Save", variant: "primary" as const, onClick: vi.fn() },
			{ label: "Cancel", variant: "secondary" as const, onClick: vi.fn() }
		];

		const { container } = render(<Modal show={true} footerButtons={footerButtons} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with all sections", () => {
		const footerButtons = [
			{ label: "Save", variant: "primary" as const, onClick: vi.fn() },
			{ label: "Cancel", variant: "secondary" as const, onClick: vi.fn() }
		];

		const { container } = render(
			<Modal show={true} header="Test Header" body="Test Body" footerButtons={footerButtons}>
				<div>Test Content</div>
			</Modal>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with JSX content", () => {
		const { container } = render(
			<Modal
				show={true}
				header={<h2>JSX Header</h2>}
				body={
					<div>
						<p>Paragraph 1</p>
						<p>Paragraph 2</p>
					</div>
				}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with multiple footer buttons", () => {
		const footerButtons = [
			{ label: "Save", variant: "primary" as const, onClick: vi.fn() },
			{ label: "Cancel", variant: "secondary" as const, onClick: vi.fn() },
			{ label: "Delete", variant: "error" as const, onClick: vi.fn() }
		];

		const { container } = render(<Modal show={true} footerButtons={footerButtons} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with different positions", () => {
		const { container } = render(<Modal show={true} position={ModalPositions.TopCenter} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with different sizes", () => {
		const { container } = render(<Modal show={true} size={ModalSizes.Large} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with dismissible prop", () => {
		const { container } = render(<Modal show={true} dismissible={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with popup prop", () => {
		const { container } = render(<Modal show={true} popup={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with custom className", () => {
		const { container } = render(<Modal show={true} className="custom-modal-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with complex footer button props", () => {
		const footerButtons = [
			{
				label: "Complex Button",
				variant: "primary" as const,
				onClick: vi.fn(),
				disabled: true,
				size: "sm" as const
			}
		];

		const { container } = render(<Modal show={true} footerButtons={footerButtons} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with all props combined", () => {
		const footerButtons = [
			{ label: "Save", variant: "primary" as const, onClick: vi.fn() },
			{ label: "Cancel", variant: "secondary" as const, onClick: vi.fn() }
		];

		const { container } = render(
			<Modal
				show={true}
				header="Complete Modal"
				body="This is a complete modal with all features"
				footerButtons={footerButtons}
				position={ModalPositions.Center}
				size={ModalSizes.Large}
				dismissible={true}
				popup={false}
				className="complete-modal"
			>
				<div>Additional content</div>
			</Modal>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with null content", () => {
		const { container } = render(
			<Modal show={true} header={null} body={null} footerButtons={undefined} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with empty content", () => {
		const { container } = render(<Modal show={true} header="" body="" footerButtons={[]} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for modal with all positions", () => {
		const positions = [
			ModalPositions.Center,
			ModalPositions.TopCenter,
			ModalPositions.BottomCenter,
			ModalPositions.TopLeft,
			ModalPositions.TopRight,
			ModalPositions.BottomLeft,
			ModalPositions.BottomRight
		];

		positions.forEach(position => {
			const { container } = render(<Modal show={true} position={position} />);
			expect(container.firstChild).toMatchSnapshot(`modal with ${position} position`);
		});
	});

	it("matches snapshot for modal with all sizes", () => {
		const sizes = [ModalSizes.Small, ModalSizes.Medium, ModalSizes.Large, ModalSizes.ExtraLarge];

		sizes.forEach(size => {
			const { container } = render(<Modal show={true} size={size} />);
			expect(container.firstChild).toMatchSnapshot(`modal with ${size} size`);
		});
	});
});
