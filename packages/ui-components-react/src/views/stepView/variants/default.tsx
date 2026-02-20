// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { JSX } from "react";
import { useRef } from "react";
import type {
	FieldError,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue
} from "react-hook-form";
import { Button } from "../../../button/button";
import { ButtonColors } from "../../../button/buttonColors";
import { Checkbox } from "../../../checkbox/checkbox";
import { TextInput } from "../../../textInput/textInput";
import { TextInputColors } from "../../../textInput/textInputColors";
import { TextInputSizes } from "../../../textInput/textInputSizes";
import { Select } from "../../../select/select";
import { SelectSizes } from "../../../select/selectSizes";
import { InputButton } from "../../../inputButton/inputButton";
import { InputPhone } from "../../../inputPhone/inputPhone";
import { ArrowRight } from "../../../icons/arrowRight";
import type { StepViewField, StepViewFieldSection, StepViewCheckbox } from "../stepViewProps";

interface DefaultVariantProps {
	fields: StepViewField[] | StepViewFieldSection[];
	checkbox?: StepViewCheckbox;
	onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
	register?: UseFormRegister<Record<string, unknown>>;
	getValues?: UseFormGetValues<Record<string, unknown>>;
	setValue?: UseFormSetValue<Record<string, unknown>>;
	handleSubmit?: (
		onSubmit: (data: Record<string, unknown>) => void | Promise<void>
	) => (e?: React.BaseSyntheticEvent) => Promise<void>;
	errors?: FieldErrors<Record<string, unknown>>;
	isSubmitting?: boolean;
	submitButtonLabel?: string;
	submitButtonDataTestId?: string;
	loadingText?: string;
	submitButtonDisabled?: boolean;
}

export const DefaultVariant = ({
	fields,
	checkbox,
	onSubmit,
	register,
	getValues,
	setValue,
	handleSubmit,
	errors,
	isSubmitting = false,
	submitButtonLabel = "Continue",
	submitButtonDataTestId = "submit-button",
	loadingText = "Loading...",
	submitButtonDisabled = false
}: DefaultVariantProps): JSX.Element => {
	// Ref used as a fallback for the custom render function
	const noopRef = useRef<unknown>(null);

	// Render a single field
	const renderField = (field: StepViewField): JSX.Element => {
		const fieldError = errors?.[field.name];
		const validationRules = field.validation || {};

		// Use validation rules if register is available
		const registerOptions = register ? validationRules : undefined;

		// Get registered props if register is available
		const registeredProps =
			register && registerOptions ? register(field.name, registerOptions) : {};

		// -----------------------------------------------------------
		// Custom render function — replaces all default input rendering
		// -----------------------------------------------------------
		if (field.render) {
			const currentValue = getValues?.()?.[field.name] ?? field.value;
			return (
				<div key={field.name} className="w-full">
					{field.render({
						field: {
							name: field.name,
							value: currentValue,
							onChange: (value: unknown) => {
								setValue?.(field.name, value);
							},
							onBlur: () => {
								// Trigger validation on blur if register is available
								const registered = registeredProps as {
									onBlur?: (e?: React.FocusEvent) => void;
								};
								registered.onBlur?.();
							},
							ref: noopRef
						},
						error: fieldError as FieldError | undefined
					})}
				</div>
			);
		}

		// If field has selectOptions, render as Select
		if (field.selectOptions && field.selectOptions.length > 0) {
			return (
				<div key={field.name} className="w-full">
					<div className="mb-1 flex w-full items-center justify-between">
						<label className="text-secondary text-sm font-medium" htmlFor={field.name}>
							{field.label}
						</label>
						{field.requiredLabel && (
							<span className="text-secondary text-sm font-normal">{field.requiredLabel}</span>
						)}
					</div>
					<Select
						id={field.name}
						name={field.name}
						{...registeredProps}
						options={field.selectOptions}
						sizing={SelectSizes.Large}
						className={field.className}
						data-testid={field.dataTestId || `${field.name}-select`}
						disabled={field.disabled}
					/>
					{fieldError && (
						<p className="mt-1 text-sm text-red-600">{fieldError.message as string}</p>
					)}
				</div>
			);
		}

		// If field type is inputButton, render as InputButton
		if (field.type === "inputButton") {
			return (
				<div key={field.name} className="w-full">
					<div className="mb-1 flex w-full items-center justify-between">
						<label className="text-secondary text-sm font-medium" htmlFor={field.name}>
							{field.label}
						</label>
						{field.requiredLabel && (
							<span className="text-secondary text-sm font-normal">{field.requiredLabel}</span>
						)}
					</div>
					<InputButton
						id={field.name}
						name={field.name}
						placeholder={field.placeholder}
						defaultValue={(getValues?.()?.[field.name] ?? field.value) as string | undefined}
						disabled={field.disabled}
						readOnly={field.readOnly}
						icon={field.icon}
						className={field.className}
						color={fieldError ? TextInputColors.Failure : TextInputColors.None}
						buttonLabel={field.buttonLabel ?? "Submit"}
						buttonDisabled={field.buttonDisabled}
						buttonLoading={field.buttonLoading}
						buttonLoadingText={field.buttonLoadingText}
						onButtonClick={field.onButtonClick}
						onChange={e => {
							setValue?.(field.name, e.target.value);
							field.onChange?.(e);
						}}
						dataTestId={field.dataTestId}
					/>
					{fieldError && (
						<p className="mt-1 text-sm text-red-600">{fieldError.message as string}</p>
					)}
				</div>
			);
		}

		// If field type is tel, render as InputPhone
		if (field.type === "tel") {
			const phoneValue = (getValues?.()?.[field.name] ?? field.value) as string | undefined;
			return (
				<div key={field.name} className="w-full">
					<InputPhone
						id={field.name}
						name={field.name}
						label={field.label}
						placeholder={field.placeholder}
						value={phoneValue}
						requiredLabel={field.requiredLabel !== undefined && field.requiredLabel !== null}
						requiredLabelText={field.requiredLabel}
						helperText={fieldError?.message as string | undefined}
						color={fieldError ? "failure" : ""}
						sizing={TextInputSizes.Large}
						onChange={phone => {
							setValue?.(field.name, phone);
							field.onChange?.({ target: { value: phone } } as React.ChangeEvent<HTMLInputElement>);
						}}
					/>
				</div>
			);
		}

		// Otherwise render as TextInput
		return (
			<div key={field.name} className="w-full">
				<div className="mb-1 flex w-full items-center justify-between">
					<label className="text-secondary text-sm font-medium" htmlFor={field.name}>
						{field.label}
					</label>
					{field.requiredLabel && (
						<span className="text-secondary text-sm font-normal">{field.requiredLabel}</span>
					)}
				</div>
				<div className="[&_input]:!border-[#DFE4EB]">
					<TextInput
						id={field.name}
						name={field.name}
						type={field.type || "text"}
						{...registeredProps}
						placeholder={field.placeholder}
						color={fieldError ? TextInputColors.Failure : TextInputColors.None}
						sizing={TextInputSizes.Large}
						helperText={fieldError?.message as string | undefined}
						icon={field.icon}
						onChange={e => {
							(
								registeredProps as { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }
							).onChange?.(e);
							field.onChange?.(e);
						}}
						className={field.className}
						data-testid={field.dataTestId || `${field.name}-input`}
						readOnly={field.readOnly}
						disabled={field.disabled}
						defaultValue={field.value}
					/>
				</div>
			</div>
		);
	};

	// Handle form submission
	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (handleSubmit && onSubmit) {
			// React Hook Form's handleSubmit expects BaseSyntheticEvent
			handleSubmit(onSubmit)(e as React.BaseSyntheticEvent);
		} else if (onSubmit) {
			// If only onSubmit is provided, collect form data manually
			const formData = new FormData(e.currentTarget);
			const data: Record<string, unknown> = {};
			formData.forEach((value, key) => {
				data[key] = value;
			});
			onSubmit(data);
		}
	};

	return (
		<form onSubmit={handleFormSubmit} className="w-full space-y-8">
			{fields &&
				Array.isArray(fields) &&
				fields.length > 0 &&
				(fields[0] && "heading" in fields[0] ? (
					// Render as sections
					(fields as StepViewFieldSection[]).map((section, sectionIndex) => (
						<div key={sectionIndex}>
							{section.heading && (
								<h2 className="text-brand-secondary mb-4 text-xl font-semibold">
									{section.heading}
								</h2>
							)}
							<div className="flex items-start gap-4">
								<div className="flex-1 space-y-4">{section.fields.map(renderField)}</div>
								{section.rightContent && (
									<div className="flex-shrink-0">{section.rightContent}</div>
								)}
							</div>
						</div>
					))
				) : (
					<div className="space-y-4">{(fields as StepViewField[]).map(renderField)}</div>
				))}

			{checkbox && (
				<div className="flex items-start gap-2">
					<label className="text-secondary" htmlFor={checkbox.id}>
						<Checkbox
							onChange={() => checkbox.onChange?.(!checkbox.checked)}
							checked={checkbox.checked}
							id={checkbox.id}
							data-testid={checkbox.dataTestId || "check"}
							className={
								checkbox.className || "text-brand-secondary-700 focus:ring-brand-secondary-700"
							}
						/>
						<span className="ms-2 text-sm">{checkbox.label}</span>
					</label>
				</div>
			)}

			<Button
				type="submit"
				disabled={isSubmitting || submitButtonDisabled}
				color={ButtonColors.Secondary}
				data-testid={submitButtonDataTestId}
				className="w-full md:w-fit"
			>
				{isSubmitting ? loadingText : submitButtonLabel}
				<ArrowRight type="light" width={20} height={20} />
			</Button>
		</form>
	);
};
