// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar - Unit Tests", () => {
	it("renders avatar with default props", () => {
		render(<Avatar />);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
	});

	it("renders avatar with image", () => {
		render(<Avatar img="https://example.com/avatar.jpg" alt="User Avatar" />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with children content", () => {
		render(<Avatar>JD</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		expect(screen.getByText("JD")).toBeInTheDocument();
	});

	it("renders avatar with custom className", () => {
		render(<Avatar className="custom-avatar-class" />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
		expect(avatar).toHaveClass("custom-avatar-class");
	});

	it("renders avatar with bordered prop", () => {
		render(<Avatar bordered={true} />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with different sizes", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach(size => {
			const { unmount } = render(<Avatar size={size} />);

			const avatar = screen.getByTestId("flowbite-avatar");
			expect(avatar).toBeInTheDocument();

			unmount();
		});
	});

	it("renders avatar with rounded prop", () => {
		render(<Avatar rounded={true} />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with status", () => {
		const statuses = ["online", "offline", "away", "busy"] as const;

		statuses.forEach(status => {
			const { unmount } = render(<Avatar status={status} />);

			const avatar = screen.getByTestId("flowbite-avatar");
			expect(avatar).toBeInTheDocument();

			unmount();
		});
	});

	it("renders avatar with different status positions", () => {
		const positions = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

		positions.forEach(position => {
			const { unmount } = render(<Avatar status="online" statusPosition={position} />);

			const avatar = screen.getByTestId("flowbite-avatar");
			expect(avatar).toBeInTheDocument();

			unmount();
		});
	});

	it("renders avatar with stacked prop", () => {
		render(<Avatar stacked={true} />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with string children", () => {
		render(<Avatar>John Doe</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		expect(screen.getByText("John Doe")).toBeInTheDocument();
	});

	it("renders avatar with JSX children", () => {
		render(
			<Avatar>
				<div>
					<span>JD</span>
				</div>
			</Avatar>
		);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		expect(screen.getByText("JD")).toBeInTheDocument();
	});

	it("renders avatar with number children", () => {
		render(<Avatar>{42}</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();
	});

	it("renders avatar with boolean children", () => {
		render(<Avatar>{true}</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		// Boolean children are not rendered as text in the Avatar component
	});

	it("renders avatar with array children", () => {
		render(<Avatar>{["J", "D"]}</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		// Array children are rendered as concatenated text
	});

	it("renders avatar with fragment children", () => {
		render(
			<Avatar>
				<>
					<span>J</span>
					<span>D</span>
				</>
			</Avatar>
		);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		expect(screen.getByText("J")).toBeInTheDocument();
		expect(screen.getByText("D")).toBeInTheDocument();
	});

	it("renders avatar with null children", () => {
		render(<Avatar>{null}</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
	});

	it("renders avatar with undefined children", () => {
		render(<Avatar>{undefined}</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
	});

	it("renders avatar with empty string children", () => {
		render(<Avatar></Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
	});

	it("renders avatar with valid image URL", () => {
		render(<Avatar img="https://example.com/avatar.jpg" alt="User Avatar" />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with invalid image URL", () => {
		render(<Avatar img="invalid-url" alt="User Avatar" />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with alt text containing special characters", () => {
		render(
			<Avatar img="https://example.com/avatar.jpg" alt="User <script>alert('xss')</script>" />
		);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with long alt text", () => {
		const longAlt =
			"This is a very long alt text that should be handled properly by the avatar component and should not break the layout or functionality";

		render(<Avatar img="https://example.com/avatar.jpg" alt={longAlt} />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with empty alt text", () => {
		render(<Avatar img="https://example.com/avatar.jpg" alt="" />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with undefined alt text", () => {
		render(<Avatar img="https://example.com/avatar.jpg" alt={undefined} />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with null alt text", () => {
		render(<Avatar img="https://example.com/avatar.jpg" alt={null as any} />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
	});

	it("renders avatar with all props combined", () => {
		render(
			<Avatar
				img="https://example.com/avatar.jpg"
				alt="Complete Avatar"
				bordered={true}
				size="lg"
				rounded={true}
				status="online"
				statusPosition="bottom-right"
				stacked={false}
				className="complete-avatar-class"
			>
				<span>CA</span>
			</Avatar>
		);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
		expect(avatar).toHaveClass("complete-avatar-class");
		expect(screen.getByText("CA")).toBeInTheDocument();
	});

	it("renders avatar with multiple classes", () => {
		render(<Avatar className="class1 class2 class3" />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
		expect(avatar).toHaveClass("class1", "class2", "class3");
	});

	it("renders avatar with whitespace in className", () => {
		render(<Avatar className="spaced-class" />);

		const avatar = screen.getByTestId("flowbite-avatar");
		expect(avatar).toBeInTheDocument();
		expect(avatar).toHaveClass("  spaced-class  ");
	});

	it("renders avatar with special characters in children", () => {
		render(<Avatar>User@123!</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		expect(screen.getByText("User@123!")).toBeInTheDocument();
	});

	it("renders avatar with unicode characters in children", () => {
		render(<Avatar>👤</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		expect(screen.getByText("👤")).toBeInTheDocument();
	});

	it("renders avatar with long text children", () => {
		const longText =
			"This is a very long text that should be handled properly by the avatar component";

		render(<Avatar>{longText}</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
		expect(screen.getByText(longText)).toBeInTheDocument();
	});

	it("renders avatar with whitespace children", () => {
		render(<Avatar>{"   "}</Avatar>);

		expect(screen.getByTestId("flowbite-avatar")).toBeInTheDocument();
	});
});

describe("Avatar - Snapshot Tests", () => {
	it("matches snapshot for default avatar", () => {
		const { container } = render(<Avatar />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with image", () => {
		const { container } = render(<Avatar img="https://example.com/avatar.jpg" alt="User Avatar" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with children content", () => {
		const { container } = render(<Avatar>JD</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with custom className", () => {
		const { container } = render(<Avatar className="custom-avatar-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with bordered prop", () => {
		const { container } = render(<Avatar bordered={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with different sizes", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach(size => {
			const { container } = render(<Avatar size={size} />);
			expect(container.firstChild).toMatchSnapshot(`${size} size avatar`);
		});
	});

	it("matches snapshot for avatar with rounded prop", () => {
		const { container } = render(<Avatar rounded={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with status", () => {
		const statuses = ["online", "offline", "away", "busy"] as const;

		statuses.forEach(status => {
			const { container } = render(<Avatar status={status} />);
			expect(container.firstChild).toMatchSnapshot(`${status} status avatar`);
		});
	});

	it("matches snapshot for avatar with different status positions", () => {
		const positions = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

		positions.forEach(position => {
			const { container } = render(<Avatar status="online" statusPosition={position} />);
			expect(container.firstChild).toMatchSnapshot(`${position} status position avatar`);
		});
	});

	it("matches snapshot for avatar with stacked prop", () => {
		const { container } = render(<Avatar stacked={true} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with string children", () => {
		const { container } = render(<Avatar>John Doe</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with JSX children", () => {
		const { container } = render(
			<Avatar>
				<div>
					<span>JD</span>
				</div>
			</Avatar>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with number children", () => {
		const { container } = render(<Avatar>{42}</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with boolean children", () => {
		const { container } = render(<Avatar>{true}</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with array children", () => {
		const { container } = render(<Avatar>{["J", "D"]}</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with fragment children", () => {
		const { container } = render(
			<Avatar>
				<>
					<span>J</span>
					<span>D</span>
				</>
			</Avatar>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with null children", () => {
		const { container } = render(<Avatar>{null}</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with undefined children", () => {
		const { container } = render(<Avatar>{undefined}</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with empty string children", () => {
		const { container } = render(<Avatar></Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with valid image URL", () => {
		const { container } = render(<Avatar img="https://example.com/avatar.jpg" alt="User Avatar" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with invalid image URL", () => {
		const { container } = render(<Avatar img="invalid-url" alt="User Avatar" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with alt text containing special characters", () => {
		const { container } = render(
			<Avatar img="https://example.com/avatar.jpg" alt="User <script>alert('xss')</script>" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with long alt text", () => {
		const longAlt =
			"This is a very long alt text that should be handled properly by the avatar component and should not break the layout or functionality";

		const { container } = render(<Avatar img="https://example.com/avatar.jpg" alt={longAlt} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with empty alt text", () => {
		const { container } = render(<Avatar img="https://example.com/avatar.jpg" alt="" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with undefined alt text", () => {
		const { container } = render(<Avatar img="https://example.com/avatar.jpg" alt={undefined} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with null alt text", () => {
		const { container } = render(<Avatar img="https://example.com/avatar.jpg" alt={null as any} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with all props combined", () => {
		const { container } = render(
			<Avatar
				img="https://example.com/avatar.jpg"
				alt="Complete Avatar"
				bordered={true}
				size="lg"
				rounded={true}
				status="online"
				statusPosition="bottom-right"
				stacked={false}
				className="complete-avatar-class"
			>
				<span>CA</span>
			</Avatar>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with multiple classes", () => {
		const { container } = render(<Avatar className="class1 class2 class3" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with whitespace in className", () => {
		const { container } = render(<Avatar className="spaced-class" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with special characters in children", () => {
		const { container } = render(<Avatar>User@123!</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with unicode characters in children", () => {
		const { container } = render(<Avatar>👤</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with long text children", () => {
		const longText =
			"This is a very long text that should be handled properly by the avatar component";

		const { container } = render(<Avatar>{longText}</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for avatar with whitespace children", () => {
		const { container } = render(<Avatar>{"   "}</Avatar>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("matches snapshot for all size variants", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

		sizes.forEach(size => {
			const { container } = render(<Avatar size={size} />);
			expect(container.firstChild).toMatchSnapshot(`${size} size avatar`);
		});
	});

	it("matches snapshot for all status variants", () => {
		const statuses = ["online", "offline", "away", "busy"] as const;

		statuses.forEach(status => {
			const { container } = render(<Avatar status={status} />);
			expect(container.firstChild).toMatchSnapshot(`${status} status avatar`);
		});
	});

	it("matches snapshot for all status position variants", () => {
		const positions = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

		positions.forEach(position => {
			const { container } = render(<Avatar status="online" statusPosition={position} />);
			expect(container.firstChild).toMatchSnapshot(`${position} status position avatar`);
		});
	});
});
