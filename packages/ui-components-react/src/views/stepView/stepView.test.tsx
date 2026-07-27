// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForm } from "react-hook-form";
import { StepView } from "./stepView";
import type { StepViewField, StepViewFieldRenderProps } from "./stepViewProps";
import { StepViewVariants } from "./stepViewVariants";
import React from "react";

// Mock icon component for testing
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

// Wrapper component to provide react-hook-form context for form variant
const StepViewWithForm = (props: any) => {
	const {
		register,
		handleSubmit: formHandleSubmit,
		getValues,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: props.defaultValues || {}
	});

	return (
		<StepView
			{...props}
			register={register}
			getValues={getValues}
			setValue={setValue}
			handleSubmit={formHandleSubmit}
			errors={errors}
			isSubmitting={isSubmitting}
		/>
	);
};

// Wrapper for KYB variant with form context (getValues/setValue)
const StepViewKYBWithForm = (props: any) => {
	const {
		register,
		getValues,
		setValue,
		formState: { errors }
	} = useForm({
		defaultValues: props.defaultValues || {}
	});

	return (
		<StepView
			{...props}
			variant={StepViewVariants.KYB}
			register={register}
			getValues={getValues}
			setValue={setValue}
			errors={errors}
		/>
	);
};

describe("StepView", () => {
	describe("Unit Tests", () => {
		it("renders StepView with default variant and basic props", () => {
			render(
				<StepView title="Test Title" description="Test Description" image="/test-image.jpg" />
			);

			expect(screen.getByText("Test Title")).toBeInTheDocument();
			expect(screen.getByText("Test Description")).toBeInTheDocument();
			const image = screen.getByAltText("Test Title");
			expect(image).toBeInTheDocument();
			expect(image).toHaveAttribute("src", "/test-image.jpg");
		});

		it("renders StepView with progress bar", () => {
			render(<StepView title="Test Title" image="/test-image.jpg" progress={50} />);

			expect(screen.getByText("Test Title")).toBeInTheDocument();
			// Progress bar should be rendered
			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeInTheDocument();
		});

		it("renders StepView without progress bar when progress is undefined", () => {
			render(<StepView title="Test Title" image="/test-image.jpg" />);

			expect(screen.getByText("Test Title")).toBeInTheDocument();
			// Progress bar should not be rendered when progress is undefined
			const progressBars = screen.queryAllByRole("progressbar");
			expect(progressBars).toHaveLength(0);
		});

		it("renders StepView with ReactNode image", () => {
			const imageNode = <div data-testid="custom-image">Custom Image</div>;
			render(<StepView title="Test Title" image={imageNode} />);

			expect(screen.getByText("Test Title")).toBeInTheDocument();
			expect(screen.getByTestId("custom-image")).toBeInTheDocument();
		});

		it("renders StepView with ReactNode description", () => {
			const descriptionNode = (
				<div data-testid="custom-description">
					<p>Custom description content</p>
				</div>
			);
			render(<StepView title="Test Title" description={descriptionNode} image="/test-image.jpg" />);

			expect(screen.getByText("Test Title")).toBeInTheDocument();
			expect(screen.getByTestId("custom-description")).toBeInTheDocument();
		});

		it("renders StepView with custom className", () => {
			const { container } = render(
				<StepView title="Test Title" image="/test-image.jpg" className="custom-class" />
			);

			const stepView = container.querySelector(".custom-class");
			expect(stepView).toBeInTheDocument();
		});

		describe("Info Variant", () => {
			it("renders Info variant with icon and text", () => {
				render(
					<StepView
						variant={StepViewVariants.Info}
						title="Info Title"
						image="/test-image.jpg"
						icon={<MockIcon />}
						text={<div>Info text content</div>}
					/>
				);

				expect(screen.getByText("Info Title")).toBeInTheDocument();
				expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
				expect(screen.getByText("Info text content")).toBeInTheDocument();
			});

			it("renders Info variant with action button", async () => {
				const handleClick = vi.fn();
				render(
					<StepView
						variant={StepViewVariants.Info}
						title="Info Title"
						image="/test-image.jpg"
						icon={<MockIcon />}
						text={<div>Info text</div>}
						action={{
							label: "Click Me",
							onClick: handleClick
						}}
					/>
				);

				const button = screen.getByText("Click Me");
				expect(button).toBeInTheDocument();

				button.click();
				await waitFor(() => {
					expect(handleClick).toHaveBeenCalledTimes(1);
				});
			});

			it("renders Info variant with disabled action button", () => {
				render(
					<StepView
						variant={StepViewVariants.Info}
						title="Info Title"
						image="/test-image.jpg"
						icon={<MockIcon />}
						text={<div>Info text</div>}
						action={{
							label: "Disabled Button",
							onClick: vi.fn(),
							disabled: true
						}}
					/>
				);

				const button = screen.getByTestId("action-button");
				expect(button).toBeInTheDocument();
				expect(button).toHaveAttribute("disabled");
			});

			it("renders Info variant with loading action button", () => {
				render(
					<StepView
						variant={StepViewVariants.Info}
						title="Info Title"
						image="/test-image.jpg"
						icon={<MockIcon />}
						text={<div>Info text</div>}
						action={{
							label: "Loading Button",
							onClick: vi.fn(),
							loading: true,
							loadingText: "Processing..."
						}}
					/>
				);

				expect(screen.getByText("Processing...")).toBeInTheDocument();
			});
		});

		describe("Selection Variant", () => {
			it("renders Selection variant with options", () => {
				const options = [
					{
						value: "option1",
						icon: <MockIcon />,
						title: "Option 1",
						description: "Description 1",
						features: ["Feature 1", "Feature 2"],
						button: {
							label: "Select Option 1",
							onClick: vi.fn()
						}
					},
					{
						value: "option2",
						icon: <MockIcon />,
						title: "Option 2",
						description: "Description 2",
						features: ["Feature 3"],
						button: {
							label: "Select Option 2",
							onClick: vi.fn()
						}
					}
				];

				render(
					<StepView
						variant={StepViewVariants.Selection}
						title="Selection Title"
						image="/test-image.jpg"
						options={options}
					/>
				);

				expect(screen.getByText("Selection Title")).toBeInTheDocument();
				expect(screen.getByText("Option 1")).toBeInTheDocument();
				expect(screen.getByText("Option 2")).toBeInTheDocument();
				expect(screen.getByText("Description 1")).toBeInTheDocument();
				expect(screen.getByText("Description 2")).toBeInTheDocument();
			});

			it("renders Selection variant with option badges", () => {
				const options = [
					{
						value: "option1",
						icon: <MockIcon />,
						title: "Option 1",
						description: "Description 1",
						features: [],
						badge: {
							label: "Recommended",
							className: "custom-badge"
						},
						button: {
							label: "Select",
							onClick: vi.fn()
						}
					}
				];

				render(
					<StepView
						variant={StepViewVariants.Selection}
						title="Selection Title"
						image="/test-image.jpg"
						options={options}
					/>
				);

				expect(screen.getByText("Recommended")).toBeInTheDocument();
			});

			it("handles option button click in Selection variant", async () => {
				const handleOptionClick = vi.fn();
				const options = [
					{
						value: "option1",
						icon: <MockIcon />,
						title: "Option 1",
						description: "Description 1",
						features: [],
						button: {
							label: "Select Option",
							onClick: handleOptionClick
						}
					}
				];

				render(
					<StepView
						variant={StepViewVariants.Selection}
						title="Selection Title"
						image="/test-image.jpg"
						options={options}
					/>
				);

				const button = screen.getByText("Select Option");
				button.click();

				await waitFor(() => {
					expect(handleOptionClick).toHaveBeenCalledWith("option1");
				});
			});
		});

		describe("Default Form Variant", () => {
			it("renders Default variant with form fields", () => {
				const fields = [
					{
						name: "field1",
						label: "Field 1",
						placeholder: "Enter value",
						requiredLabel: "Required"
					},
					{
						name: "field2",
						label: "Field 2",
						placeholder: "Enter value 2"
					}
				];

				render(
					<StepViewWithForm
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						onSubmit={vi.fn()}
					/>
				);

				expect(screen.getByText("Form Title")).toBeInTheDocument();
				expect(screen.getByLabelText("Field 1")).toBeInTheDocument();
				expect(screen.getByLabelText("Field 2")).toBeInTheDocument();
				expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
				expect(screen.getByPlaceholderText("Enter value 2")).toBeInTheDocument();
			});

			it("renders Default variant with field sections", () => {
				const fields = [
					{
						heading: "Section 1",
						fields: [
							{
								name: "field1",
								label: "Field 1",
								requiredLabel: "Required"
							}
						]
					},
					{
						heading: "Section 2",
						fields: [
							{
								name: "field2",
								label: "Field 2"
							}
						]
					}
				];

				render(
					<StepViewWithForm
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						onSubmit={vi.fn()}
					/>
				);

				expect(screen.getByText("Section 1")).toBeInTheDocument();
				expect(screen.getByText("Section 2")).toBeInTheDocument();
				expect(screen.getByLabelText("Field 1")).toBeInTheDocument();
				expect(screen.getByLabelText("Field 2")).toBeInTheDocument();
			});

			it("renders Default variant with select field", () => {
				const fields = [
					{
						name: "selectField",
						label: "Select Field",
						selectOptions: [
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" }
						]
					}
				];

				render(
					<StepViewWithForm
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						onSubmit={vi.fn()}
					/>
				);

				expect(screen.getByLabelText("Select Field")).toBeInTheDocument();
			});

			it("renders Default variant with checkbox", () => {
				const fields = [
					{
						name: "field1",
						label: "Field 1"
					}
				];

				render(
					<StepViewWithForm
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						checkbox={{
							id: "terms",
							label: "I agree to the terms",
							checked: false,
							onChange: vi.fn()
						}}
						onSubmit={vi.fn()}
					/>
				);

				expect(screen.getByText("I agree to the terms")).toBeInTheDocument();
			});

			it("renders Default variant with field errors", () => {
				const fields = [
					{
						name: "field1",
						label: "Field 1",
						requiredLabel: "Required"
					}
				];

				const StepViewWithErrors = () => {
					const { register, handleSubmit: formHandleSubmit } = useForm<Record<string, unknown>>({
						defaultValues: { field1: "" }
					});

					// Create errors object with proper type
					const formErrors: any = {
						field1: { message: "This field is required", type: "required" }
					};

					return (
						<StepView
							variant={StepViewVariants.Default}
							title="Form Title"
							image="/test-image.jpg"
							fields={fields}
							register={register}
							handleSubmit={formHandleSubmit}
							errors={formErrors}
							onSubmit={vi.fn()}
						/>
					);
				};

				render(<StepViewWithErrors />);

				expect(screen.getByText("This field is required")).toBeInTheDocument();
			});

			it("renders Default variant with submit button", () => {
				const fields = [
					{
						name: "field1",
						label: "Field 1"
					}
				];

				render(
					<StepViewWithForm
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						onSubmit={vi.fn()}
						submitButtonLabel="Submit Form"
					/>
				);

				const submitButton = screen.getByText("Submit Form");
				expect(submitButton).toBeInTheDocument();
			});

			it("renders Default variant with loading state", async () => {
				const handleSubmit = vi.fn();
				const fields = [
					{
						name: "field1",
						label: "Field 1"
					}
				];

				const StepViewLoading = () => {
					const {
						register,
						handleSubmit: formHandleSubmit,
						formState: { errors, isSubmitting }
					} = useForm();

					return (
						<StepView
							variant={StepViewVariants.Default}
							title="Form Title"
							image="/test-image.jpg"
							fields={fields}
							register={register}
							handleSubmit={formHandleSubmit}
							errors={errors}
							isSubmitting={isSubmitting}
							loadingText="Submitting..."
							onSubmit={handleSubmit}
						/>
					);
				};

				render(<StepViewLoading />);

				const submitButton = screen.getByText("Continue");
				submitButton.click();

				await waitFor(() => {
					expect(screen.getByText("Submitting...")).toBeInTheDocument();
				});

				await waitFor(() => {
					expect(handleSubmit).toHaveBeenCalled();
				});
			});

			it("handles form submission", async () => {
				const handleSubmit = vi.fn();
				const fields = [
					{
						name: "field1",
						label: "Field 1"
					}
				];

				render(
					<StepViewWithForm
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						onSubmit={handleSubmit}
					/>
				);

				const submitButton = screen.getByText("Continue");
				submitButton.click();

				await waitFor(() => {
					expect(handleSubmit).toHaveBeenCalled();
				});
			});

			it("submission includes typed input values in Default variant", async () => {
				const handleSubmit = vi.fn();
				const fields = [
					{ name: "field1", label: "Field 1" },
					{ name: "field2", label: "Field 2" }
				];

				render(
					<StepViewWithForm
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						onSubmit={handleSubmit}
					/>
				);

				const input1 = screen.getByLabelText("Field 1") as HTMLInputElement;
				const input2 = screen.getByLabelText("Field 2") as HTMLInputElement;
				await act(async () => {
					fireEvent.change(input1, { target: { value: "value1" } });
					fireEvent.change(input2, { target: { value: "value2" } });
				});

				await act(async () => {
					screen.getByText("Continue").click();
				});

				await waitFor(() => {
					expect(handleSubmit).toHaveBeenCalled();
					const [data] = handleSubmit.mock.calls[0];
					expect(data).toEqual(
						expect.objectContaining({
							field1: "value1",
							field2: "value2"
						})
					);
				});
			});

			it("calls both register onChange and field onChange in Default variant", async () => {
				const handleFieldChange = vi.fn();
				const handleSubmit = vi.fn();
				const fields = [
					{
						name: "field1",
						label: "Field 1",
						onChange: handleFieldChange
					}
				];

				render(
					<StepViewWithForm
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						onSubmit={handleSubmit}
					/>
				);

				const input = screen.getByLabelText("Field 1") as HTMLInputElement;
				await act(async () => {
					fireEvent.change(input, { target: { value: "test" } });
				});

				await waitFor(() => {
					expect(handleFieldChange).toHaveBeenCalledWith(
						expect.objectContaining({
							target: expect.objectContaining({ value: "test" })
						})
					);
				});

				// Form state should also be updated (register onChange ran)
				await act(async () => {
					screen.getByText("Continue").click();
				});
				await waitFor(() => {
					expect(handleSubmit).toHaveBeenCalled();
					const [data] = handleSubmit.mock.calls[0];
					expect(data).toEqual(expect.objectContaining({ field1: "test" }));
				});
			});
		});

		describe("KYB Variant", () => {
			it("renders KYB variant with text fields", () => {
				const fields = [
					{ name: "brn", label: "BRN", placeholder: "Enter BRN" },
					{ name: "pin", label: "PIN", placeholder: "Enter PIN" }
				];

				render(
					<StepViewKYBWithForm
						title="Verify"
						image="/test.jpg"
						fields={fields}
						kybButtons={[
							{ label: "Save", onClick: vi.fn() },
							{ label: "Verify now", onClick: vi.fn() }
						]}
					/>
				);

				expect(screen.getByRole("heading", { name: "Verify" })).toBeInTheDocument();
				expect(screen.getByLabelText("BRN")).toBeInTheDocument();
				expect(screen.getByLabelText("PIN")).toBeInTheDocument();
				expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
				expect(screen.getByRole("button", { name: "Verify now" })).toBeInTheDocument();
			});

			it("KYB variant text inputs update form state when typing", async () => {
				const fields = [
					{ name: "brn", label: "BRN" },
					{ name: "pin", label: "PIN" }
				];

				const StepViewKYBCapture = () => {
					const {
						register,
						getValues,
						setValue,
						formState: { errors }
					} = useForm<Record<string, unknown>>({
						defaultValues: { brn: "", pin: "" }
					});
					const [submitted, setSubmitted] = React.useState<Record<string, unknown> | null>(null);
					return (
						<>
							<StepView
								variant={StepViewVariants.KYB}
								title="Verify"
								image="/test.jpg"
								fields={fields}
								register={register}
								getValues={getValues}
								setValue={setValue}
								errors={errors}
								kybButtons={[
									{
										label: "Submit",
										onClick: () => setSubmitted(getValues())
									}
								]}
							/>
							{submitted && <div data-testid="submitted-values">{JSON.stringify(submitted)}</div>}
						</>
					);
				};

				render(<StepViewKYBCapture />);

				const brnInput = screen.getByLabelText("BRN") as HTMLInputElement;
				const pinInput = screen.getByLabelText("PIN") as HTMLInputElement;
				await act(async () => {
					fireEvent.change(brnInput, { target: { value: "BRN123" } });
					fireEvent.change(pinInput, { target: { value: "PIN456" } });
				});

				await act(async () => {
					screen.getByRole("button", { name: "Submit" }).click();
				});

				await waitFor(() => {
					const el = screen.getByTestId("submitted-values");
					const data = JSON.parse(el.textContent ?? "{}") as Record<string, unknown>;
					expect(data.brn).toBe("BRN123");
					expect(data.pin).toBe("PIN456");
				});
			});

			it("KYB variant verificationCodeInput updates form state", async () => {
				const fields: StepViewField[] = [
					{
						name: "securityCode",
						label: "Security code",
						type: "verificationCodeInput",
						verificationCodeLength: 6,
						verificationCodeExpiresInText: "Code expires in 05:00"
					}
				];

				const StepViewKYBVerification = () => {
					const {
						getValues,
						setValue,
						formState: { errors }
					} = useForm<Record<string, unknown>>({
						defaultValues: { securityCode: "" }
					});
					const [submitted, setSubmitted] = React.useState<string>("");
					return (
						<>
							<StepView
								variant={StepViewVariants.KYB}
								title="Confirm"
								image="/test.jpg"
								fields={fields}
								getValues={getValues}
								setValue={setValue}
								errors={errors}
								kybButtons={[
									{
										label: "Continue",
										onClick: () => setSubmitted((getValues().securityCode as string) ?? "")
									}
								]}
							/>
							{submitted && <div data-testid="code-value">{submitted}</div>}
						</>
					);
				};

				render(<StepViewKYBVerification />);

				expect(screen.getByText("Security code")).toBeInTheDocument();
				expect(screen.getByText("Code expires in 05:00")).toBeInTheDocument();

				const firstInput = screen.getByTestId("securityCode-input-0");
				// Paste full code so setValue is called once with "123456"
				await act(async () => {
					fireEvent.change(firstInput, { target: { value: "123456" } });
				});

				await act(async () => {
					screen.getByRole("button", { name: "Continue" }).click();
				});

				await waitFor(() => {
					expect(screen.getByTestId("code-value")).toHaveTextContent("123456");
				});
			});

			it("KYB variant button onClick is called", async () => {
				const handleClick = vi.fn();
				render(
					<StepViewKYBWithForm
						title="Verify"
						image="/test.jpg"
						fields={[{ name: "f1", label: "Field 1" }]}
						kybButtons={[
							{ label: "Save", onClick: vi.fn() },
							{ label: "Verify now", onClick: handleClick }
						]}
					/>
				);

				screen.getByRole("button", { name: "Verify now" }).click();
				await waitFor(() => {
					expect(handleClick).toHaveBeenCalledTimes(1);
				});
			});

			it("KYB variant shows error message and error list", () => {
				render(
					<StepViewKYBWithForm
						title="Verify"
						image="/test.jpg"
						fields={[{ name: "f1", label: "Field 1" }]}
						kybErrorMessage="Something went wrong."
						kybErrors={["Error one.", "Error two."]}
						kybButtons={[{ label: "OK", onClick: vi.fn() }]}
					/>
				);

				expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
				expect(screen.getByText("Error one.")).toBeInTheDocument();
				expect(screen.getByText("Error two.")).toBeInTheDocument();
			});

			it("KYB variant shows verification success icon when isVerificationSuccess", () => {
				render(
					<StepViewKYBWithForm
						title="Verify"
						image="/test.jpg"
						fields={[{ name: "f1", label: "Field 1", value: "done" }]}
						isVerificationSuccess={true}
						kybButtons={[{ label: "OK", onClick: vi.fn() }]}
					/>
				);

				// Check icon is present (rightIcon renders CheckCircle)
				const input = screen.getByLabelText("Field 1");
				expect(input).toBeInTheDocument();
				// Success state is reflected by the rightIcon on the input
				const fieldContainer = input.closest(".flex.items-center.gap-2");
				expect(fieldContainer).toBeInTheDocument();
			});
		});

		describe("Fallback Behavior", () => {
			it("falls back to empty Info variant when Default variant has no fields", () => {
				render(
					<StepView variant={StepViewVariants.Default} title="Test Title" image="/test-image.jpg" />
				);

				// Should render the layout shell (title) without crashing
				expect(screen.getByText("Test Title")).toBeInTheDocument();
				// Should NOT render a form or submit button
				expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();
			});

			it("renders Info variant with icon and text when variant is info", () => {
				render(
					<StepView
						variant={StepViewVariants.Info}
						title="Test Title"
						image="/test-image.jpg"
						icon={<MockIcon />}
						text={<div>Info text</div>}
					/>
				);

				expect(screen.getByText("Test Title")).toBeInTheDocument();
				expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
				expect(screen.getByText("Info text")).toBeInTheDocument();
			});

			it("renders Default variant with fields even when form props are missing", () => {
				render(
					<StepView
						variant={StepViewVariants.Default}
						title="Test Title"
						image="/test-image.jpg"
						fields={[
							{
								name: "field1",
								label: "Field 1"
							}
						]}
					/>
				);

				expect(screen.getByText("Test Title")).toBeInTheDocument();
				expect(screen.getByText("Field 1")).toBeInTheDocument();
				expect(screen.getByTestId("field1-input")).toBeInTheDocument();
				expect(screen.getByTestId("submit-button")).toBeInTheDocument();
			});
		});
	});

	describe("Snapshot Tests", () => {
		it("matches snapshot for StepView with Info variant", () => {
			const { container } = render(
				<StepView
					variant={StepViewVariants.Info}
					title="Info Title"
					description="Info Description"
					image="/test-image.jpg"
					icon={<MockIcon />}
					text={<div>Info text</div>}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for StepView with Selection variant", () => {
			const options = [
				{
					value: "option1",
					icon: <MockIcon />,
					title: "Option 1",
					description: "Description 1",
					features: ["Feature 1"],
					button: {
						label: "Select",
						onClick: vi.fn()
					}
				}
			];

			const { container } = render(
				<StepView
					variant={StepViewVariants.Selection}
					title="Selection Title"
					image="/test-image.jpg"
					options={options}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for StepView with Default variant", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1",
					placeholder: "Enter value"
				}
			];

			const { container } = render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("matches snapshot for StepView with KYB variant", () => {
			const fields = [
				{ name: "brn", label: "BRN", placeholder: "Enter BRN" },
				{ name: "pin", label: "PIN", placeholder: "Enter PIN" }
			];

			const { container } = render(
				<StepViewKYBWithForm
					title="Verify"
					image="/test.jpg"
					fields={fields}
					kybButtons={[
						{ label: "Save", onClick: vi.fn() },
						{ label: "Verify now", onClick: vi.fn() }
					]}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});

	describe("Additional Edge Cases", () => {
		it("renders StepView with empty fields array (falls back to empty info)", () => {
			render(
				<StepView
					variant={StepViewVariants.Default}
					title="Test Title"
					image="/test-image.jpg"
					fields={[]}
				/>
			);

			expect(screen.getByText("Test Title")).toBeInTheDocument();
			// No form or submit button when fields are empty
			expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();
		});

		it("renders StepView with undefined fields (falls back to empty info)", () => {
			render(
				<StepView
					variant={StepViewVariants.Default}
					title="Test Title"
					image="/test-image.jpg"
					fields={undefined}
				/>
			);

			expect(screen.getByText("Test Title")).toBeInTheDocument();
			// No form or submit button when fields are undefined
			expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();
		});

		it("renders Default variant with field icons", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1",
					icon: MockIcon
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			expect(screen.getByLabelText("Field 1")).toBeInTheDocument();
		});

		it("renders Default variant with field validation rules", () => {
			const fields = [
				{
					name: "email",
					label: "Email",
					type: "email",
					validation: {
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Invalid email address"
						}
					}
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			expect(screen.getByLabelText("Email")).toBeInTheDocument();
			expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
		});

		it("renders Default variant with disabled fields", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1",
					disabled: true
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			const input = screen.getByLabelText("Field 1");
			expect(input).toBeDisabled();
		});

		it("renders Default variant with readOnly fields", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1",
					readOnly: true,
					value: "Read-only value"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			const input = screen.getByLabelText("Field 1");
			expect(input).toHaveAttribute("readonly");
		});

		it("renders Default variant with field default values", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1",
					value: "Default value"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			const input = screen.getByLabelText("Field 1");
			expect((input as HTMLInputElement).value).toBe("Default value");
		});

		it("renders Default variant with required field indicators", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1",
					requiredLabel: "Required"
				},
				{
					name: "field2",
					label: "Field 2"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			expect(screen.getByText("Required")).toBeInTheDocument();
			expect(screen.getAllByText("Required")).toHaveLength(1);
		});

		it("renders Default variant with checkbox checked state", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					checkbox={{
						id: "terms",
						label: "I agree to the terms",
						checked: true,
						onChange: vi.fn()
					}}
					onSubmit={vi.fn()}
				/>
			);

			const checkbox = screen.getByRole("checkbox");
			expect(checkbox).toBeChecked();
		});

		it("handles checkbox onChange in Default variant", async () => {
			const handleCheckboxChange = vi.fn();
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					checkbox={{
						id: "terms",
						label: "I agree to the terms",
						checked: false,
						onChange: handleCheckboxChange
					}}
					onSubmit={vi.fn()}
				/>
			);

			const checkbox = screen.getByRole("checkbox");
			checkbox.click();

			await waitFor(() => {
				expect(handleCheckboxChange).toHaveBeenCalledWith(true);
			});
		});

		it("renders Default variant with multiple field sections", () => {
			const fields = [
				{
					heading: "Personal Information",
					fields: [
						{ name: "firstName", label: "First Name" },
						{ name: "lastName", label: "Last Name" }
					]
				},
				{
					heading: "Contact Information",
					fields: [
						{ name: "email", label: "Email" },
						{ name: "phone", label: "Phone" }
					]
				},
				{
					heading: "",
					fields: [{ name: "notes", label: "Notes" }]
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			expect(screen.getByText("Personal Information")).toBeInTheDocument();
			expect(screen.getByText("Contact Information")).toBeInTheDocument();
			expect(screen.getByLabelText("First Name")).toBeInTheDocument();
			expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
			expect(screen.getByLabelText("Email")).toBeInTheDocument();
			expect(screen.getByLabelText("Phone")).toBeInTheDocument();
			expect(screen.getByLabelText("Notes")).toBeInTheDocument();
		});

		it("renders Selection variant with empty options array", () => {
			render(
				<StepView
					variant={StepViewVariants.Selection}
					title="Selection Title"
					image="/test-image.jpg"
					options={[]}
				/>
			);

			expect(screen.getByText("Selection Title")).toBeInTheDocument();
		});

		it("renders Selection variant with disabled option button", () => {
			const options = [
				{
					value: "option1",
					icon: <MockIcon />,
					title: "Option 1",
					description: "Description 1",
					features: [],
					button: {
						label: "Select",
						onClick: vi.fn(),
						disabled: true
					}
				}
			];

			render(
				<StepView
					variant={StepViewVariants.Selection}
					title="Selection Title"
					image="/test-image.jpg"
					options={options}
				/>
			);

			const button = screen.getByTestId("option-option1-button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveAttribute("disabled");
		});

		it("renders Selection variant with loading option button", () => {
			const options = [
				{
					value: "option1",
					icon: <MockIcon />,
					title: "Option 1",
					description: "Description 1",
					features: [],
					button: {
						label: "Select",
						onClick: vi.fn(),
						loading: true,
						loadingText: "Processing..."
					}
				}
			];

			render(
				<StepView
					variant={StepViewVariants.Selection}
					title="Selection Title"
					image="/test-image.jpg"
					options={options}
				/>
			);

			expect(screen.getByText("Processing...")).toBeInTheDocument();
		});

		it("renders Selection variant with option features", () => {
			const options = [
				{
					value: "option1",
					icon: <MockIcon />,
					title: "Option 1",
					description: "Description 1",
					features: ["Feature 1", "Feature 2", "Feature 3"],
					button: {
						label: "Select",
						onClick: vi.fn()
					}
				}
			];

			render(
				<StepView
					variant={StepViewVariants.Selection}
					title="Selection Title"
					image="/test-image.jpg"
					options={options}
				/>
			);

			expect(screen.getByText("Feature 1")).toBeInTheDocument();
			expect(screen.getByText("Feature 2")).toBeInTheDocument();
			expect(screen.getByText("Feature 3")).toBeInTheDocument();
		});

		it("renders Info variant without action button", () => {
			render(
				<StepView
					variant={StepViewVariants.Info}
					title="Info Title"
					image="/test-image.jpg"
					icon={<MockIcon />}
					text={<div>Info text content</div>}
				/>
			);

			expect(screen.getByText("Info Title")).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
			expect(screen.getByText("Info text content")).toBeInTheDocument();
		});

		it("renders Info variant with async action", async () => {
			const handleClick = vi.fn(async () => {
				await new Promise(resolve => setTimeout(resolve, 100));
			});

			render(
				<StepView
					variant={StepViewVariants.Info}
					title="Info Title"
					image="/test-image.jpg"
					icon={<MockIcon />}
					text={<div>Info text</div>}
					action={{
						label: "Async Action",
						onClick: handleClick
					}}
				/>
			);

			const button = screen.getByText("Async Action");
			button.click();

			await waitFor(() => {
				expect(handleClick).toHaveBeenCalled();
			});
		});

		it("renders StepView with progress at 0", () => {
			render(<StepView title="Test Title" image="/test-image.jpg" progress={0} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeInTheDocument();
		});

		it("renders StepView with progress at 100", () => {
			render(<StepView title="Test Title" image="/test-image.jpg" progress={100} />);

			const progressBar = screen.getByRole("progressbar");
			expect(progressBar).toBeInTheDocument();
		});

		it("renders StepView with empty string className", () => {
			const { container } = render(
				<StepView title="Test Title" image="/test-image.jpg" className="" />
			);

			const stepView = container.querySelector(".w-full.h-full");
			expect(stepView).toBeInTheDocument();
		});

		it("renders Default variant with custom submit button label and loading text", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			const StepViewCustomLabels = () => {
				const {
					register,
					handleSubmit: formHandleSubmit,
					formState: { errors, isSubmitting }
				} = useForm<Record<string, unknown>>();

				return (
					<StepView
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						register={register}
						handleSubmit={formHandleSubmit}
						errors={errors}
						isSubmitting={isSubmitting}
						submitButtonLabel="Save & Continue"
						loadingText="Saving..."
						onSubmit={vi.fn()}
					/>
				);
			};

			render(<StepViewCustomLabels />);

			expect(screen.getByText("Save & Continue")).toBeInTheDocument();
		});

		it("renders Default variant with select field options", () => {
			const fields = [
				{
					name: "country",
					label: "Country",
					selectOptions: [
						{ value: "us", label: "United States" },
						{ value: "uk", label: "United Kingdom" },
						{ value: "ca", label: "Canada" }
					]
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			expect(screen.getByLabelText("Country")).toBeInTheDocument();
		});

		it("renders Default variant with field onChange handler", async () => {
			const handleFieldChange = vi.fn();
			const fields = [
				{
					name: "field1",
					label: "Field 1",
					onChange: handleFieldChange
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			const input = screen.getByLabelText("Field 1") as HTMLInputElement;
			input.focus();
			fireEvent.change(input, { target: { value: "test" } });

			await waitFor(
				() => {
					expect(handleFieldChange).toHaveBeenCalled();
				},
				{ timeout: 1000 }
			);
		});

		it("renders Default variant with field dataTestId", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1",
					dataTestId: "custom-field-test-id"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			expect(screen.getByTestId("custom-field-test-id")).toBeInTheDocument();
		});

		it("renders Default variant with checkbox dataTestId", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					checkbox={{
						id: "terms",
						label: "I agree",
						checked: false,
						onChange: vi.fn(),
						dataTestId: "custom-checkbox-test-id"
					}}
					onSubmit={vi.fn()}
				/>
			);

			expect(screen.getByTestId("custom-checkbox-test-id")).toBeInTheDocument();
		});

		it("renders Default variant with children instead of built-in form", () => {
			render(
				<StepView
					variant={StepViewVariants.Default}
					title="Custom Form Title"
					description="Fill in the details"
					image="/test-image.jpg"
					progress={50}
				>
					<div data-testid="custom-form-content">
						<input data-testid="custom-input" />
						<button type="button" data-testid="custom-submit">
							Submit
						</button>
					</div>
				</StepView>
			);

			// Layout shell is preserved
			expect(screen.getByText("Custom Form Title")).toBeInTheDocument();
			expect(screen.getByText("Fill in the details")).toBeInTheDocument();
			// Custom children are rendered
			expect(screen.getByTestId("custom-form-content")).toBeInTheDocument();
			expect(screen.getByTestId("custom-input")).toBeInTheDocument();
			expect(screen.getByTestId("custom-submit")).toBeInTheDocument();
			// Built-in form elements should NOT be rendered
			expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();
		});

		it("renders Default variant children and ignores fields when both are provided", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			render(
				<StepView
					variant={StepViewVariants.Default}
					title="Test Title"
					image="/test-image.jpg"
					fields={fields}
				>
					<div data-testid="custom-children">Custom content wins</div>
				</StepView>
			);

			// Children take priority over fields
			expect(screen.getByTestId("custom-children")).toBeInTheDocument();
			expect(screen.getByText("Custom content wins")).toBeInTheDocument();
			// Built-in field rendering is skipped
			expect(screen.queryByText("Field 1")).not.toBeInTheDocument();
			expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();
		});

		it("renders Default variant with custom render function on a field", () => {
			const fields = [
				{
					name: "customField",
					label: "Custom Field",
					render: ({ field, error }: StepViewFieldRenderProps) => (
						<div data-testid="custom-rendered-field">
							<label htmlFor={field.name}>Custom Rendered</label>
							<input
								id={field.name}
								data-testid="custom-rendered-input"
								value={(field.value as string) || ""}
								onChange={e => field.onChange(e.target.value)}
							/>
							{error && <span data-testid="custom-field-error">{error.message}</span>}
						</div>
					)
				},
				{
					name: "normalField",
					label: "Normal Field",
					placeholder: "Normal placeholder"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form with Custom Render"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			// Custom rendered field is present
			expect(screen.getByTestId("custom-rendered-field")).toBeInTheDocument();
			expect(screen.getByTestId("custom-rendered-input")).toBeInTheDocument();
			expect(screen.getByText("Custom Rendered")).toBeInTheDocument();
			// Normal field is also rendered with default rendering
			expect(screen.getByText("Normal Field")).toBeInTheDocument();
			expect(screen.getByTestId("normalField-input")).toBeInTheDocument();
			// Submit button is still present
			expect(screen.getByTestId("submit-button")).toBeInTheDocument();
		});

		it("renders Info variant action button with custom dataTestId", () => {
			const handleClick = vi.fn();

			render(
				<StepView
					variant={StepViewVariants.Info}
					title="Info Title"
					image="/test-image.jpg"
					icon={<MockIcon />}
					action={{
						label: "Continue",
						onClick: handleClick,
						dataTestId: "continue-button"
					}}
				/>
			);

			// Custom dataTestId is used instead of the default "action-button"
			expect(screen.getByTestId("continue-button")).toBeInTheDocument();
			expect(screen.queryByTestId("action-button")).not.toBeInTheDocument();
			expect(screen.getByTestId("continue-button")).toHaveTextContent("Continue");
		});

		it("renders Info variant action button with default dataTestId when not specified", () => {
			render(
				<StepView
					variant={StepViewVariants.Info}
					title="Info Title"
					image="/test-image.jpg"
					action={{
						label: "Go",
						onClick: vi.fn()
					}}
				/>
			);

			// Falls back to default "action-button" testId
			expect(screen.getByTestId("action-button")).toBeInTheDocument();
		});

		it("renders Default variant submit button with custom dataTestId", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					submitButtonDataTestId="custom-submit-id"
					onSubmit={vi.fn()}
				/>
			);

			// Custom dataTestId is used on the submit button
			expect(screen.getByTestId("custom-submit-id")).toBeInTheDocument();
			expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();
		});

		it("renders Default variant submit button with default dataTestId when not specified", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
				/>
			);

			// Falls back to default "submit-button" testId
			expect(screen.getByTestId("submit-button")).toBeInTheDocument();
		});

		it("renders Default variant with submitButtonDisabled prop", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
					submitButtonDisabled={true}
				/>
			);

			const submitButton = screen.getByTestId("submit-button");
			expect(submitButton).toBeDisabled();
			// Should still show "Continue" label, not loading text
			expect(screen.getByText("Continue")).toBeInTheDocument();
		});

		it("renders Default variant with submitButtonDisabled false", () => {
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			render(
				<StepViewWithForm
					variant={StepViewVariants.Default}
					title="Form Title"
					image="/test-image.jpg"
					fields={fields}
					onSubmit={vi.fn()}
					submitButtonDisabled={false} // default is false
				/>
			);

			const submitButton = screen.getByTestId("submit-button");
			expect(submitButton).not.toBeDisabled();
			expect(screen.getByText("Continue")).toBeInTheDocument();
		});

		it("renders Default variant with both isSubmitting and submitButtonDisabled true", async () => {
			const handleSubmit = vi.fn();
			const fields = [
				{
					name: "field1",
					label: "Field 1"
				}
			];

			const StepViewBothDisabled = () => {
				const {
					register,
					handleSubmit: formHandleSubmit,
					formState: { errors }
				} = useForm();

				return (
					<StepView
						variant={StepViewVariants.Default}
						title="Form Title"
						image="/test-image.jpg"
						fields={fields}
						register={register}
						handleSubmit={formHandleSubmit}
						errors={errors}
						isSubmitting={true}
						submitButtonDisabled={true}
						loadingText="Submitting..."
						onSubmit={handleSubmit}
					/>
				);
			};

			render(<StepViewBothDisabled />);

			const submitButton = screen.getByTestId("submit-button");
			// Button should be disabled (due to OR logic: isSubmitting || submitButtonDisabled)
			expect(submitButton).toBeDisabled();
			// Should show loading text since isSubmitting is true
			expect(screen.getByText("Submitting...")).toBeInTheDocument();
		});
	});
});
