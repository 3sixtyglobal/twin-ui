// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { JSX } from "react";
import { Progress } from "../../progress/progress";
import { ProgressColors } from "../../progress/progressColors";
import { ProgressSizes } from "../../progress/progressSizes";
import type { StepViewProps } from "./stepViewProps";
import { StepViewVariants } from "./stepViewVariants";
import { DefaultVariant } from "./variants/default";
import { InfoVariant } from "./variants/info";
import { SelectionVariant } from "./variants/selection";
import { cn } from "../../lib/utils";

/**
 * StepView component for creating multi-step forms with fields, validation, and submission.
 *
 * @example
 * ```tsx
 * const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
 *
 * <StepView
 *   title="Company Information"
 *   description="Please provide your company details"
 *   fields={[
 *     { name: "organizationName", label: "Organization Name", placeholder: "Enter name", required: true },
 *     { name: "industry", label: "Industry", placeholder: "Enter industry", required: true }
 *   ]}
 *   onSubmit={handleSubmit((data) => console.log(data))}
 *   register={register}
 *   errors={errors}
 *   isSubmitting={isSubmitting}
 * />
 * ```
 */
export const StepView = ({
	variant = StepViewVariants.Default,
	title,
	description,
	image,
	progress,
	icon,
	text,
	action,
	options,
	fields,
	checkbox,
	onSubmit,
	register,
	handleSubmit,
	errors,
	isSubmitting = false,
	submitButtonLabel = "Continue",
	loadingText = "Loading...",
	className
}: StepViewProps): JSX.Element => {
	// Determine which variant to render
	let renderVariant: JSX.Element;

	// Selection variant
	if (variant === StepViewVariants.Selection) {
		renderVariant = <SelectionVariant options={options} />;
	}
	// Info variant (explicit)
	else if (variant === StepViewVariants.Info) {
		renderVariant = <InfoVariant icon={icon} text={text} action={action} />;
	}
	// Default form variant
	else {
		// For form variants, check fields
		const safeFields = fields || [];
		const hasValidFields = Array.isArray(safeFields) && safeFields.length > 0;

		// Default form variant - render fields if present, form props are optional
		if (hasValidFields) {
			renderVariant = (
				<DefaultVariant
					fields={safeFields}
					checkbox={checkbox}
					onSubmit={onSubmit}
					register={register}
					handleSubmit={handleSubmit}
					errors={errors}
					isSubmitting={isSubmitting}
					submitButtonLabel={submitButtonLabel}
					loadingText={loadingText}
				/>
			);
		}
		// Fallback to info variant if no fields
		else {
			renderVariant = <InfoVariant icon={icon} text={text} action={action} />;
		}
	}

	return (
		<div className={cn("h-full w-full", className)}>
			<div className="flex h-full w-full overflow-y-auto">
				<div className="relative hidden h-[600px] w-[450px] flex-shrink-0 overflow-hidden md:block">
					{typeof image === "string" ? (
						<img src={image} alt={title} className="h-full w-full object-cover object-left-top" />
					) : (
						<div className="h-full w-full">{image}</div>
					)}
				</div>

				{/* Content column */}
				<div className="flex-1 pb-8 pr-8 md:pl-24">
					<div className="w-full max-w-[670px]">
						{typeof progress === "number" && (
							<div className="mb-6 w-1/2">
								<Progress
									progressLabelPosition="outside"
									progress={progress}
									size={ProgressSizes.Small}
									color={ProgressColors.Primary}
									labelProgress
									labelText={true}
									textLabelPosition="outside"
									textLabel={" "}
								/>
							</div>
						)}

						{/* Content */}
						<div className="w-full">
							<div>
								<div className="mb-6">
									<h1 className="text-brand-primary text-3xl font-semibold">{title}</h1>
								</div>

								{description && (
									<div className="mb-6">
										{typeof description === "string" ? (
											<p className="text-primary text-md">{description}</p>
										) : (
											<div className="text-primary text-md">{description}</div>
										)}
									</div>
								)}
							</div>

							<div className={variant === StepViewVariants.Selection ? "w-full" : "max-w-[450px]"}>
								{renderVariant}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

StepView.displayName = "StepView";
