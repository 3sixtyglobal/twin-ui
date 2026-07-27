// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Carousel } from "./carousel";

describe("Carousel", () => {
	describe("Unit Tests", () => {
		it("renders carousel with basic items", () => {
			const items = [
				<div key="1">Slide 1</div>,
				<div key="2">Slide 2</div>,
				<div key="3">Slide 3</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
			expect(screen.getByText("Slide 2")).toBeInTheDocument();
			expect(screen.getByText("Slide 3")).toBeInTheDocument();
		});

		it("renders carousel with single item", () => {
			const items = [<div key="1">Single Slide</div>];

			render(<Carousel items={items} />);

			expect(screen.getByText("Single Slide")).toBeInTheDocument();
		});

		it("renders carousel with empty items array", () => {
			render(<Carousel items={[]} />);

			// Should render the carousel container but no slides
			expect(screen.getByTestId("carousel")).toBeInTheDocument();
		});

		it("renders carousel with undefined items", () => {
			render(<Carousel items={undefined} />);

			// Should render the carousel container but no slides
			expect(screen.getByTestId("carousel")).toBeInTheDocument();
		});

		it("renders carousel with slide prop", () => {
			const items = [<div key="1">Slide 1</div>];

			render(<Carousel items={items} slide />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
		});

		it("renders carousel with slideInterval prop", () => {
			const items = [<div key="1">Slide 1</div>];

			render(<Carousel items={items} slideInterval={3000} />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
		});

		it("renders carousel with indicators prop", () => {
			const items = [<div key="1">Slide 1</div>];

			render(<Carousel items={items} indicators />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
		});

		it("renders carousel with pauseOnHover prop", () => {
			const items = [<div key="1">Slide 1</div>];

			render(<Carousel items={items} pauseOnHover />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
		});

		it("renders carousel with custom leftControl", () => {
			const items = [<div key="1">Slide 1</div>];
			const leftControl = <button>Previous</button>;

			render(<Carousel items={items} leftControl={leftControl} />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
			expect(screen.getByText("Previous")).toBeInTheDocument();
		});

		it("renders carousel with custom rightControl", () => {
			const items = [<div key="1">Slide 1</div>];
			const rightControl = <button>Next</button>;

			render(<Carousel items={items} rightControl={rightControl} />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
			expect(screen.getByText("Next")).toBeInTheDocument();
		});

		it("renders carousel with both custom controls", () => {
			const items = [<div key="1">Slide 1</div>];
			const leftControl = <button>Previous</button>;
			const rightControl = <button>Next</button>;

			render(<Carousel items={items} leftControl={leftControl} rightControl={rightControl} />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
			expect(screen.getByText("Previous")).toBeInTheDocument();
			expect(screen.getByText("Next")).toBeInTheDocument();
		});

		it("renders carousel with className prop", () => {
			const items = [<div key="1">Slide 1</div>];

			render(<Carousel items={items} className="custom-carousel-class" />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
		});

		it("renders carousel with onSlideChange callback", () => {
			const items = [<div key="1">Slide 1</div>];
			const onSlideChange = vi.fn();

			render(<Carousel items={items} onSlideChange={onSlideChange} />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
		});

		it("renders carousel with all props provided", () => {
			const items = [<div key="1">Slide 1</div>, <div key="2">Slide 2</div>];
			const leftControl = <button>Previous</button>;
			const rightControl = <button>Next</button>;
			const onSlideChange = vi.fn();

			render(
				<Carousel
					items={items}
					slide
					slideInterval={5000}
					indicators
					pauseOnHover
					leftControl={leftControl}
					rightControl={rightControl}
					className="custom-carousel-class"
					onSlideChange={onSlideChange}
				/>
			);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
			expect(screen.getByText("Slide 2")).toBeInTheDocument();
			expect(screen.getByText("Previous")).toBeInTheDocument();
			expect(screen.getByText("Next")).toBeInTheDocument();
		});

		it("renders carousel with complex items", () => {
			const items = [
				<div key="1">
					<h2>Title 1</h2>
					<p>Description 1</p>
				</div>,
				<div key="2">
					<h2>Title 2</h2>
					<p>Description 2</p>
				</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByText("Title 1")).toBeInTheDocument();
			expect(screen.getByText("Description 1")).toBeInTheDocument();
			expect(screen.getByText("Title 2")).toBeInTheDocument();
			expect(screen.getByText("Description 2")).toBeInTheDocument();
		});

		it("renders carousel with many items", () => {
			const items = Array.from({ length: 10 }, (_, i) => <div key={i}>Slide {i + 1}</div>);

			render(<Carousel items={items} />);

			expect(screen.getByText("Slide 1")).toBeInTheDocument();
			expect(screen.getByText("Slide 10")).toBeInTheDocument();
		});

		it("renders carousel with items containing images", () => {
			const items = [
				<div key="1">
					<img src="image1.jpg" alt="Image 1" />
					<p>Caption 1</p>
				</div>,
				<div key="2">
					<img src="image2.jpg" alt="Image 2" />
					<p>Caption 2</p>
				</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByAltText("Image 1")).toBeInTheDocument();
			expect(screen.getByText("Caption 1")).toBeInTheDocument();
			expect(screen.getByAltText("Image 2")).toBeInTheDocument();
			expect(screen.getByText("Caption 2")).toBeInTheDocument();
		});

		it("renders carousel with items containing forms", () => {
			const items = [
				<div key="1">
					<form>
						<input type="text" placeholder="Name" />
						<button type="submit">Submit</button>
					</form>
				</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
			expect(screen.getByText("Submit")).toBeInTheDocument();
		});

		it("renders carousel with items containing buttons", () => {
			const items = [
				<div key="1">
					<button>Action 1</button>
					<button>Action 2</button>
				</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByText("Action 1")).toBeInTheDocument();
			expect(screen.getByText("Action 2")).toBeInTheDocument();
		});

		it("renders carousel with items containing links", () => {
			const items = [
				<div key="1">
					<a href="/page1">Link 1</a>
					<a href="/page2">Link 2</a>
				</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByText("Link 1")).toBeInTheDocument();
			expect(screen.getByText("Link 2")).toBeInTheDocument();
		});

		it("renders carousel with items containing mixed content", () => {
			const items = [
				<div key="1">
					<h1>Title</h1>
					<p>Description</p>
					<img src="image.jpg" alt="Image" />
					<button>Action</button>
					<a href="/link">Link</a>
				</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByText("Title")).toBeInTheDocument();
			expect(screen.getByText("Description")).toBeInTheDocument();
			expect(screen.getByAltText("Image")).toBeInTheDocument();
			expect(screen.getByText("Action")).toBeInTheDocument();
			expect(screen.getByText("Link")).toBeInTheDocument();
		});

		it("renders carousel with no props", () => {
			render(<Carousel />);

			// Should render the carousel container but no slides
			expect(screen.getByTestId("carousel")).toBeInTheDocument();
		});

		it("renders carousel with null items", () => {
			render(<Carousel items={null as any} />);

			// Should render the carousel container but no slides
			expect(screen.getByTestId("carousel")).toBeInTheDocument();
		});

		it("renders carousel with items containing special characters", () => {
			const items = [
				<div key="1">
					Special & Characters: <script>alert("test")</script>
				</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByText("Special & Characters:")).toBeInTheDocument();
		});

		it("renders carousel with items containing unicode characters", () => {
			const items = [<div key="1">Unicode: 首页 🏠</div>];

			render(<Carousel items={items} />);

			expect(screen.getByText("Unicode: 首页 🏠")).toBeInTheDocument();
		});

		it("renders carousel with items containing long text", () => {
			const items = [
				<div key="1">
					This is a very long text that should be handled properly by the carousel component and
					should not break the layout or cause any issues with the rendering
				</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByText(/This is a very long text/)).toBeInTheDocument();
		});

		it("renders carousel with items containing empty content", () => {
			const items = [<div key="1"></div>, <div key="2">Valid content</div>];

			render(<Carousel items={items} />);

			expect(screen.getByText("Valid content")).toBeInTheDocument();
		});

		it("renders carousel with items containing null content", () => {
			const items = [<div key="1">{null}</div>, <div key="2">Valid content</div>];

			render(<Carousel items={items} />);

			expect(screen.getByText("Valid content")).toBeInTheDocument();
		});

		it("renders carousel with items containing undefined content", () => {
			const items = [<div key="1">{undefined}</div>, <div key="2">Valid content</div>];

			render(<Carousel items={items} />);

			expect(screen.getByText("Valid content")).toBeInTheDocument();
		});

		it("renders carousel with items containing boolean content", () => {
			const items = [<div key="1">{true}</div>, <div key="2">Valid content</div>];

			render(<Carousel items={items} />);

			expect(screen.getByText("Valid content")).toBeInTheDocument();
		});

		it("renders carousel with items containing number content", () => {
			const items = [<div key="1">{42}</div>, <div key="2">Valid content</div>];

			render(<Carousel items={items} />);

			expect(screen.getByText("42")).toBeInTheDocument();
			expect(screen.getByText("Valid content")).toBeInTheDocument();
		});

		it("renders carousel with items containing array content", () => {
			const items = [
				<div key="1">{["Array", " ", "content"]}</div>,
				<div key="2">Valid content</div>
			];

			render(<Carousel items={items} />);

			expect(screen.getByText("Array content")).toBeInTheDocument();
			expect(screen.getByText("Valid content")).toBeInTheDocument();
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for carousel with basic items", () => {
			const items = [
				<div key="1">Slide 1</div>,
				<div key="2">Slide 2</div>,
				<div key="3">Slide 3</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with single item", () => {
			const items = [<div key="1">Single Slide</div>];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with empty items array", () => {
			const { container } = render(<Carousel items={[]} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with undefined items", () => {
			const { container } = render(<Carousel items={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with slide prop", () => {
			const items = [<div key="1">Slide 1</div>];

			const { container } = render(<Carousel items={items} slide />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with slideInterval prop", () => {
			const items = [<div key="1">Slide 1</div>];

			const { container } = render(<Carousel items={items} slideInterval={3000} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with indicators prop", () => {
			const items = [<div key="1">Slide 1</div>];

			const { container } = render(<Carousel items={items} indicators />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with pauseOnHover prop", () => {
			const items = [<div key="1">Slide 1</div>];

			const { container } = render(<Carousel items={items} pauseOnHover />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with custom leftControl", () => {
			const items = [<div key="1">Slide 1</div>];
			const leftControl = <button>Previous</button>;

			const { container } = render(<Carousel items={items} leftControl={leftControl} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with custom rightControl", () => {
			const items = [<div key="1">Slide 1</div>];
			const rightControl = <button>Next</button>;

			const { container } = render(<Carousel items={items} rightControl={rightControl} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with both custom controls", () => {
			const items = [<div key="1">Slide 1</div>];
			const leftControl = <button>Previous</button>;
			const rightControl = <button>Next</button>;

			const { container } = render(
				<Carousel items={items} leftControl={leftControl} rightControl={rightControl} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with className prop", () => {
			const items = [<div key="1">Slide 1</div>];

			const { container } = render(<Carousel items={items} className="custom-carousel-class" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with onSlideChange callback", () => {
			const items = [<div key="1">Slide 1</div>];
			const onSlideChange = vi.fn();

			const { container } = render(<Carousel items={items} onSlideChange={onSlideChange} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with all props provided", () => {
			const items = [<div key="1">Slide 1</div>, <div key="2">Slide 2</div>];
			const leftControl = <button>Previous</button>;
			const rightControl = <button>Next</button>;
			const onSlideChange = vi.fn();

			const { container } = render(
				<Carousel
					items={items}
					slide
					slideInterval={5000}
					indicators
					pauseOnHover
					leftControl={leftControl}
					rightControl={rightControl}
					className="custom-carousel-class"
					onSlideChange={onSlideChange}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with complex items", () => {
			const items = [
				<div key="1">
					<h2>Title 1</h2>
					<p>Description 1</p>
				</div>,
				<div key="2">
					<h2>Title 2</h2>
					<p>Description 2</p>
				</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with many items", () => {
			const items = Array.from({ length: 5 }, (_, i) => <div key={i}>Slide {i + 1}</div>);

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing images", () => {
			const items = [
				<div key="1">
					<img src="image1.jpg" alt="Image 1" />
					<p>Caption 1</p>
				</div>,
				<div key="2">
					<img src="image2.jpg" alt="Image 2" />
					<p>Caption 2</p>
				</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing forms", () => {
			const items = [
				<div key="1">
					<form>
						<input type="text" placeholder="Name" />
						<button type="submit">Submit</button>
					</form>
				</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing buttons", () => {
			const items = [
				<div key="1">
					<button>Action 1</button>
					<button>Action 2</button>
				</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing links", () => {
			const items = [
				<div key="1">
					<a href="/page1">Link 1</a>
					<a href="/page2">Link 2</a>
				</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing mixed content", () => {
			const items = [
				<div key="1">
					<h1>Title</h1>
					<p>Description</p>
					<img src="image.jpg" alt="Image" />
					<button>Action</button>
					<a href="/link">Link</a>
				</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with no props", () => {
			const { container } = render(<Carousel />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with null items", () => {
			const { container } = render(<Carousel items={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing special characters", () => {
			const items = [
				<div key="1">
					Special & Characters: <script>alert("test")</script>
				</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing unicode characters", () => {
			const items = [<div key="1">Unicode: 首页 🏠</div>];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing long text", () => {
			const items = [
				<div key="1">
					This is a very long text that should be handled properly by the carousel component and
					should not break the layout or cause any issues with the rendering
				</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing empty content", () => {
			const items = [<div key="1"></div>, <div key="2">Valid content</div>];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing null content", () => {
			const items = [<div key="1">{null}</div>, <div key="2">Valid content</div>];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing undefined content", () => {
			const items = [<div key="1">{undefined}</div>, <div key="2">Valid content</div>];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing boolean content", () => {
			const items = [<div key="1">{true}</div>, <div key="2">Valid content</div>];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing number content", () => {
			const items = [<div key="1">{42}</div>, <div key="2">Valid content</div>];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with items containing array content", () => {
			const items = [
				<div key="1">{["Array", " ", "content"]}</div>,
				<div key="2">Valid content</div>
			];

			const { container } = render(<Carousel items={items} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for carousel with all slide prop combinations", () => {
			const items = [<div key="1">Slide 1</div>];

			const combinations = [{ slide: undefined }, { slide: true }, { slide: false }];

			combinations.forEach(({ slide }, index) => {
				const { container } = render(<Carousel items={items} slide={slide} />);
				expect(container.firstChild).toMatchSnapshot(`carousel slide ${index}`);
			});
		});

		it("matches snapshot for carousel with all indicators prop combinations", () => {
			const items = [<div key="1">Slide 1</div>];

			const combinations = [{ indicators: undefined }, { indicators: true }, { indicators: false }];

			combinations.forEach(({ indicators }, index) => {
				const { container } = render(<Carousel items={items} indicators={indicators} />);
				expect(container.firstChild).toMatchSnapshot(`carousel indicators ${index}`);
			});
		});

		it("matches snapshot for carousel with all pauseOnHover prop combinations", () => {
			const items = [<div key="1">Slide 1</div>];

			const combinations = [
				{ pauseOnHover: undefined },
				{ pauseOnHover: true },
				{ pauseOnHover: false }
			];

			combinations.forEach(({ pauseOnHover }, index) => {
				const { container } = render(<Carousel items={items} pauseOnHover={pauseOnHover} />);
				expect(container.firstChild).toMatchSnapshot(`carousel pauseOnHover ${index}`);
			});
		});

		it("matches snapshot for carousel with all className combinations", () => {
			const items = [<div key="1">Slide 1</div>];

			const combinations = [
				{ className: undefined },
				{ className: "custom-class" },
				{ className: "" }
			];

			combinations.forEach(({ className }, index) => {
				const { container } = render(<Carousel items={items} className={className} />);
				expect(container.firstChild).toMatchSnapshot(`carousel className ${index}`);
			});
		});
	});
});
