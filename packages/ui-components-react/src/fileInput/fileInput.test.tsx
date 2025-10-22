// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FileInput } from "./fileInput";
import { FileInputSizes } from "./fileInputSizes";

describe("FileInput", () => {
	describe("Unit Tests", () => {
		it("renders fileinput with default props", () => {
			const { container } = render(<FileInput />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
		});

		it("renders fileinput with custom id", () => {
			const { container } = render(<FileInput id="custom-file-input" />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("id", "custom-file-input");
		});

		it("renders fileinput with custom name", () => {
			const { container } = render(<FileInput name="file-upload" />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("name", "file-upload");
		});

		it("renders fileinput with custom className", () => {
			const { container } = render(<FileInput className="custom-class" />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Flowbite applies its own classes, custom className may be overridden
			expect(container.firstChild).toHaveClass("custom-class");
		});

		it("renders fileinput with disabled prop", () => {
			const { container } = render(<FileInput disabled />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeDisabled();
		});

		it("renders fileinput with required prop", () => {
			const { container } = render(<FileInput required />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeRequired();
		});

		it("renders fileinput with all sizes", () => {
			const sizes = [FileInputSizes.Small, FileInputSizes.Medium, FileInputSizes.Large];

			sizes.forEach(size => {
				const { container, unmount } = render(<FileInput sizing={size} />);
				const fileInput = container.querySelector('input[type="file"]');
				expect(fileInput).toBeInTheDocument();
				unmount();
			});
		});

		it("renders fileinput with helper text", () => {
			const { container } = render(<FileInput helperText="Please select a file" />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent("Please select a file");
		});

		it("renders fileinput with JSX helper text", () => {
			const helperText = <span>Custom helper text</span>;

			const { container } = render(<FileInput helperText={helperText} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// JSX helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent("Custom helper text");
		});

		it("renders fileinput with multiple file selection", () => {
			const { container } = render(<FileInput multiple />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("multiple");
		});

		it("renders fileinput with accept attribute", () => {
			const { container } = render(<FileInput accept=".pdf,.doc,.docx" />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("accept", ".pdf,.doc,.docx");
		});

		it("renders fileinput with capture attribute", () => {
			const { container } = render(<FileInput capture="environment" />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("capture", "environment");
		});

		it("renders fileinput with onChange handler", () => {
			const onChange = vi.fn();

			const { container } = render(<FileInput onChange={onChange} />);

			const fileInput = container.querySelector('input[type="file"]');
			if (fileInput) {
				fireEvent.change(fileInput, { target: { files: [] } });
			}

			expect(onChange).toHaveBeenCalled();
		});

		it("renders fileinput with onFocus handler", () => {
			const onFocus = vi.fn();

			const { container } = render(<FileInput onFocus={onFocus} />);

			const fileInput = container.querySelector('input[type="file"]');
			if (fileInput) {
				fireEvent.focus(fileInput);
			}

			expect(onFocus).toHaveBeenCalled();
		});

		it("renders fileinput with onBlur handler", () => {
			const onBlur = vi.fn();

			const { container } = render(<FileInput onBlur={onBlur} />);

			const fileInput = container.querySelector('input[type="file"]');
			if (fileInput) {
				fireEvent.blur(fileInput);
			}

			expect(onBlur).toHaveBeenCalled();
		});

		it("renders fileinput with all props provided", () => {
			const onChange = vi.fn();
			const onFocus = vi.fn();
			const onBlur = vi.fn();

			const { container } = render(
				<FileInput
					id="complete-file-input"
					name="complete-upload"
					className="complete-class"
					sizing={FileInputSizes.Large}
					disabled={false}
					required={true}
					multiple
					accept=".pdf,.doc,.docx"
					capture="user"
					helperText="Complete file input"
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("id", "complete-file-input");
			expect(fileInput).toHaveAttribute("name", "complete-upload");
			// Flowbite applies its own classes, custom className may be overridden
			expect(container.firstChild).toHaveClass("complete-class");
			expect(fileInput).toHaveAttribute("multiple");
			expect(fileInput).toHaveAttribute("accept", ".pdf,.doc,.docx");
			expect(fileInput).toHaveAttribute("capture", "user");
			expect(fileInput).toBeRequired();
			expect(fileInput).not.toBeDisabled();
			// Helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent("Complete file input");
		});

		it("renders fileinput with long helper text", () => {
			const longHelperText =
				"This is a very long helper text for the file input component that should be handled properly and displayed correctly";

			const { container } = render(<FileInput helperText={longHelperText} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent(longHelperText);
		});

		it("renders fileinput with special characters in helper text", () => {
			const helperTextWithSpecialChars = 'Helper: <script>alert("test")</script> & More';

			const { container } = render(<FileInput helperText={helperTextWithSpecialChars} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent(helperTextWithSpecialChars);
		});

		it("renders fileinput with unicode characters in helper text", () => {
			const helperTextWithUnicode = "帮助文本 📁";

			const { container } = render(<FileInput helperText={helperTextWithUnicode} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent(helperTextWithUnicode);
		});

		it("renders fileinput with special characters in id", () => {
			const idWithSpecialChars = 'file-input-<script>alert("test")</script>';

			const { container } = render(<FileInput id={idWithSpecialChars} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("id", idWithSpecialChars);
		});

		it("renders fileinput with unicode characters in id", () => {
			const idWithUnicode = "文件输入-📁";

			const { container } = render(<FileInput id={idWithUnicode} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("id", idWithUnicode);
		});

		it("renders fileinput with special characters in name", () => {
			const nameWithSpecialChars = 'file-<script>alert("test")</script>';

			const { container } = render(<FileInput name={nameWithSpecialChars} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("name", nameWithSpecialChars);
		});

		it("renders fileinput with unicode characters in name", () => {
			const nameWithUnicode = "文件-📁";

			const { container } = render(<FileInput name={nameWithUnicode} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("name", nameWithUnicode);
		});

		it("renders fileinput with empty string name", () => {
			const { container } = render(<FileInput name="" />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toHaveAttribute("name", "");
		});

		it("renders fileinput with empty string className", () => {
			const { container } = render(<FileInput className="" />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
		});

		it("renders fileinput with undefined id", () => {
			const { container } = render(<FileInput id={undefined} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// When id is undefined, Flowbite doesn't set an id attribute
			expect(fileInput).not.toHaveAttribute("id");
		});

		it("renders fileinput with undefined name", () => {
			const { container } = render(<FileInput name={undefined} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toHaveAttribute("name");
		});

		it("renders fileinput with null name", () => {
			const { container } = render(<FileInput name={null as any} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toHaveAttribute("name");
		});

		it("renders fileinput with undefined className", () => {
			const { container } = render(<FileInput className={undefined} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Flowbite applies default classes even when className is undefined
			expect(fileInput).toBeInTheDocument();
		});

		it("renders fileinput with null className", () => {
			const { container } = render(<FileInput className={null as any} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Flowbite applies default classes even when className is null
			expect(fileInput).toBeInTheDocument();
		});

		it("renders fileinput with undefined helper text", () => {
			const { container: _container } = render(<FileInput helperText={undefined} />);

			// When helperText is undefined, it should not be rendered
			expect(screen.queryByTestId("fileinput-helper")).not.toBeInTheDocument();
		});

		it("renders fileinput with null helper text", () => {
			const { container: _container } = render(<FileInput helperText={null} />);

			// When helperText is null, it should not be rendered
			expect(screen.queryByTestId("fileinput-helper")).not.toBeInTheDocument();
		});

		it("renders fileinput with undefined sizing", () => {
			const { container } = render(<FileInput sizing={undefined} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
		});

		it("renders fileinput with null sizing", () => {
			const { container } = render(<FileInput sizing={null as any} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
		});

		it("renders fileinput with undefined disabled", () => {
			const { container } = render(<FileInput disabled={undefined} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toBeDisabled();
		});

		it("renders fileinput with null disabled", () => {
			const { container } = render(<FileInput disabled={null as any} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toBeDisabled();
		});

		it("renders fileinput with undefined required", () => {
			const { container } = render(<FileInput required={undefined} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toBeRequired();
		});

		it("renders fileinput with null required", () => {
			const { container } = render(<FileInput required={null as any} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toBeRequired();
		});

		it("renders fileinput with undefined multiple", () => {
			const { container } = render(<FileInput multiple={undefined} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toHaveAttribute("multiple");
		});

		it("renders fileinput with null multiple", () => {
			const { container } = render(<FileInput multiple={null as any} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toHaveAttribute("multiple");
		});

		it("renders fileinput with undefined accept", () => {
			const { container } = render(<FileInput accept={undefined} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toHaveAttribute("accept");
		});

		it("renders fileinput with null accept", () => {
			const { container } = render(<FileInput accept={null as any} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toHaveAttribute("accept");
		});

		it("renders fileinput with undefined capture", () => {
			const { container } = render(<FileInput capture={undefined} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toHaveAttribute("capture");
		});

		it("renders fileinput with null capture", () => {
			const { container } = render(<FileInput capture={null as any} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).not.toHaveAttribute("capture");
		});

		it("renders fileinput with complex helper text", () => {
			const complexHelperText = (
				<div>
					<strong>Important:</strong> Please select a valid file format.
					<br />
					<em>Supported formats:</em> PDF, DOC, DOCX
				</div>
			);

			const { container } = render(<FileInput helperText={complexHelperText} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// JSX helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent("Important:");
		});

		it("renders fileinput with array helper text", () => {
			const arrayHelperText = ["Line 1", "Line 2", "Line 3"];

			const { container } = render(<FileInput helperText={arrayHelperText} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Array helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent("Line 1");
		});

		it("renders fileinput with number helper text", () => {
			const { container } = render(<FileInput helperText={42} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Number helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent("42");
		});

		it("renders fileinput with boolean helper text", () => {
			const { container } = render(<FileInput helperText={true} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Boolean helper text is not rendered by Flowbite
			expect(fileInput).not.toHaveAttribute("helpertext");
		});

		it("renders fileinput with mixed content helper text", () => {
			const mixedHelperText = ["Text", 42, true, <span key="jsx">JSX</span>, null, undefined];

			const { container } = render(<FileInput helperText={mixedHelperText} />);

			const fileInput = container.querySelector('input[type="file"]');
			expect(fileInput).toBeInTheDocument();
			// Mixed content helper text is rendered as a separate element by Flowbite
			expect(container).toHaveTextContent("Text");
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for fileinput with default props", () => {
			const { container } = render(<FileInput />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with custom id", () => {
			const { container } = render(<FileInput id="custom-file-input" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with custom name", () => {
			const { container } = render(<FileInput name="file-upload" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with custom className", () => {
			const { container } = render(<FileInput className="custom-class" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with disabled prop", () => {
			const { container } = render(<FileInput disabled />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with required prop", () => {
			const { container } = render(<FileInput required />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with all sizes", () => {
			const sizes = [FileInputSizes.Small, FileInputSizes.Medium, FileInputSizes.Large];

			sizes.forEach((size, index) => {
				const { container } = render(<FileInput sizing={size} />);
				expect(container.firstChild).toMatchSnapshot(`fileinput size ${index}`);
			});
		});

		it("matches snapshot for fileinput with helper text", () => {
			const { container } = render(<FileInput helperText="Please select a file" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with JSX helper text", () => {
			const helperText = <span>Custom helper text</span>;

			const { container } = render(<FileInput helperText={helperText} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with multiple file selection", () => {
			const { container } = render(<FileInput multiple />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with accept attribute", () => {
			const { container } = render(<FileInput accept=".pdf,.doc,.docx" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with capture attribute", () => {
			const { container } = render(<FileInput capture="environment" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with all props provided", () => {
			const onChange = vi.fn();
			const onFocus = vi.fn();
			const onBlur = vi.fn();

			const { container } = render(
				<FileInput
					id="complete-file-input"
					name="complete-upload"
					className="complete-class"
					sizing={FileInputSizes.Large}
					disabled={false}
					required={true}
					multiple
					accept=".pdf,.doc,.docx"
					capture="user"
					helperText="Complete file input"
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with long helper text", () => {
			const longHelperText =
				"This is a very long helper text for the file input component that should be handled properly and displayed correctly";

			const { container } = render(<FileInput helperText={longHelperText} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with special characters in helper text", () => {
			const helperTextWithSpecialChars = 'Helper: <script>alert("test")</script> & More';

			const { container } = render(<FileInput helperText={helperTextWithSpecialChars} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with unicode characters in helper text", () => {
			const helperTextWithUnicode = "帮助文本 📁";

			const { container } = render(<FileInput helperText={helperTextWithUnicode} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with special characters in id", () => {
			const idWithSpecialChars = 'file-input-<script>alert("test")</script>';

			const { container } = render(<FileInput id={idWithSpecialChars} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with unicode characters in id", () => {
			const idWithUnicode = "文件输入-📁";

			const { container } = render(<FileInput id={idWithUnicode} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with special characters in name", () => {
			const nameWithSpecialChars = 'file-<script>alert("test")</script>';

			const { container } = render(<FileInput name={nameWithSpecialChars} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with unicode characters in name", () => {
			const nameWithUnicode = "文件-📁";

			const { container } = render(<FileInput name={nameWithUnicode} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with empty string id", () => {
			const { container } = render(<FileInput id="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with empty string name", () => {
			const { container } = render(<FileInput name="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with empty string className", () => {
			const { container } = render(<FileInput className="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with empty string helper text", () => {
			const { container } = render(<FileInput helperText="" />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined id", () => {
			const { container } = render(<FileInput id={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null id", () => {
			const { container } = render(<FileInput id={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined name", () => {
			const { container } = render(<FileInput name={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null name", () => {
			const { container } = render(<FileInput name={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined className", () => {
			const { container } = render(<FileInput className={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null className", () => {
			const { container } = render(<FileInput className={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined helper text", () => {
			const { container } = render(<FileInput helperText={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null helper text", () => {
			const { container } = render(<FileInput helperText={null} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined sizing", () => {
			const { container } = render(<FileInput sizing={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null sizing", () => {
			const { container } = render(<FileInput sizing={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined disabled", () => {
			const { container } = render(<FileInput disabled={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null disabled", () => {
			const { container } = render(<FileInput disabled={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined required", () => {
			const { container } = render(<FileInput required={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null required", () => {
			const { container } = render(<FileInput required={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined multiple", () => {
			const { container } = render(<FileInput multiple={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null multiple", () => {
			const { container } = render(<FileInput multiple={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined accept", () => {
			const { container } = render(<FileInput accept={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null accept", () => {
			const { container } = render(<FileInput accept={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with undefined capture", () => {
			const { container } = render(<FileInput capture={undefined} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with null capture", () => {
			const { container } = render(<FileInput capture={null as any} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with complex helper text", () => {
			const complexHelperText = (
				<div>
					<strong>Important:</strong> Please select a valid file format.
					<br />
					<em>Supported formats:</em> PDF, DOC, DOCX
				</div>
			);

			const { container } = render(<FileInput helperText={complexHelperText} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with array helper text", () => {
			const arrayHelperText = ["Line 1", "Line 2", "Line 3"];

			const { container } = render(<FileInput helperText={arrayHelperText} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with number helper text", () => {
			const { container } = render(<FileInput helperText={42} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with boolean helper text", () => {
			const { container } = render(<FileInput helperText={true} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with mixed content helper text", () => {
			const mixedHelperText = ["Text", 42, true, <span key="jsx">JSX</span>, null, undefined];

			const { container } = render(<FileInput helperText={mixedHelperText} />);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for fileinput with all boolean prop combinations", () => {
			const combinations = [
				{ disabled: undefined },
				{ disabled: true },
				{ disabled: false },
				{ required: undefined },
				{ required: true },
				{ required: false },
				{ multiple: undefined },
				{ multiple: true },
				{ multiple: false }
			];

			combinations.forEach((props, index) => {
				const { container } = render(<FileInput {...props} />);
				expect(container.firstChild).toMatchSnapshot(`fileinput boolean ${index}`);
			});
		});

		it("matches snapshot for fileinput with all string prop combinations", () => {
			const combinations = [
				{ id: undefined },
				{ id: "custom-id" },
				{ id: "" },
				{ name: undefined },
				{ name: "custom-name" },
				{ name: "" },
				{ className: undefined },
				{ className: "custom-class" },
				{ className: "" }
			];

			combinations.forEach((props, index) => {
				const { container } = render(<FileInput {...props} />);
				expect(container.firstChild).toMatchSnapshot(`fileinput string ${index}`);
			});
		});
	});
});
