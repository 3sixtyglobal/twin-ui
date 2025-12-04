// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { JSX } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "../../../button/button";
import { ButtonColors } from "../../../button/buttonColors";
import { Checkbox } from "../../../checkbox/checkbox";
import { TextInput } from "../../../textInput/textInput";
import { TextInputColors } from "../../../textInput/textInputColors";
import { TextInputSizes } from "../../../textInput/textInputSizes";
import { Select } from "../../../select/select";
import { SelectSizes } from "../../../select/selectSizes";
import { ArrowRight } from "../../../icons/arrowRight";
import type { StepViewField, StepViewFieldSection, StepViewCheckbox } from "../stepViewProps";

interface DefaultVariantProps {
	fields: StepViewField[] | StepViewFieldSection[];
	checkbox?: StepViewCheckbox;
	onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
	register?: UseFormRegister<Record<string, unknown>>;
	handleSubmit?: (
		onSubmit: (data: Record<string, unknown>) => void | Promise<void>
	) => (e?: React.BaseSyntheticEvent) => Promise<void>;
	errors?: FieldErrors<Record<string, unknown>>;
	isSubmitting?: boolean;
	submitButtonLabel?: string;
	loadingText?: string;
}

export const DefaultVariant = ({
	fields,
	checkbox,
	onSubmit,
	register,
	handleSubmit,
	errors,
	isSubmitting = false,
	submitButtonLabel = "Continue",
	loadingText = "Loading..."
}: DefaultVariantProps): JSX.Element => {
	// Render a single field
	const renderField = (field: StepViewField): JSX.Element => {
		const fieldError = errors?.[field.name];
		const validationRules = field.validation || {};

		// Use validation rules if register is available
		const registerOptions = register ? validationRules : undefined;

		// Get registered props if register is available
		const registeredProps =
			register && registerOptions ? register(field.name, registerOptions) : {};

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
				{/* This makes the input border color properly defined */}
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
						onChange={field.onChange}
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
			{fields && Array.isArray(fields) && fields.length > 0 && (
				<>
					{fields[0] && "heading" in fields[0] ? (
						// Render as sections
						(fields as StepViewFieldSection[]).map((section, sectionIndex) => (
							<div key={sectionIndex}>
								{section.heading && (
									<h2 className="text-brand-secondary mb-4 text-xl font-semibold">
										{section.heading}
									</h2>
								)}
								<div className="space-y-4">{section.fields.map(renderField)}</div>
							</div>
						))
					) : (
						// Render as flat fields
						<div className="space-y-4">{(fields as StepViewField[]).map(renderField)}</div>
					)}
				</>
			)}

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
				disabled={isSubmitting}
				color={ButtonColors.Secondary}
				data-testid="submit-button"
			>
				{isSubmitting ? loadingText : submitButtonLabel}
				<ArrowRight type="light" width={20} height={20} />
			</Button>
		</form>
	);
};
