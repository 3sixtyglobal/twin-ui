// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { JSX } from "react";
import { Progress } from "../../progress/progress";
import { ProgressColors } from "../../progress/progressColors";
import { ProgressSizes } from "../../progress/progressSizes";
import type {
	StepViewProps,
	StepViewDefaultProps,
	StepViewInfoProps,
	StepViewSelectionProps,
	StepViewKYBProps
} from "./stepViewProps";
import { StepViewVariants } from "./stepViewVariants";
import { DefaultVariant } from "./variants/default";
import { InfoVariant } from "./variants/info";
import { KYBVariant } from "./variants/kyb";
import { SelectionVariant } from "./variants/selection";
import { cn } from "../../lib/utils";
import { FieldValues } from "react-hook-form";

/**
 * StepView component for creating multi-step forms with fields, validation, and submission.
 *
 * Uses a discriminated union on the `variant` prop so TypeScript guides consumers
 * to only the props relevant for the chosen variant.
 *
 * @example
 * ```tsx
 * // Default variant with fields
 * <StepView
 *   title="Company Information"
 *   description="Please provide your company details"
 *   fields={[
 *     { name: "organizationName", label: "Organization Name", placeholder: "Enter name" },
 *     { name: "industry", label: "Industry", placeholder: "Enter industry" }
 *   ]}
 *   onSubmit={handleSubmit((data) => console.log(data))}
 *   register={register}
 *   errors={errors}
 *   isSubmitting={isSubmitting}
 *   image="/step-image.png"
 * />
 *
 * // Default variant with custom children (replaces built-in form)
 * <StepView
 *   title="Organization Details"
 *   description="Fill in the details below"
 *   image="/step-image.png"
 *   progress={50}
 * >
 *   <MyCustomForm />
 * </StepView>
 *
 * // Info variant
 * <StepView
 *   variant="info"
 *   title="Email Sent"
 *   image="/email.png"
 *   icon={<MailIcon />}
 *   text={<p>Check your inbox</p>}
 *   action={{ label: "Continue", onClick: handleContinue, dataTestId: "continue-button" }}
 * />
 * ```
 */
export const StepView = <T extends FieldValues = Record<string, unknown>>(
	props: StepViewProps<T>
): JSX.Element => {
	const { title, description, image, progress, className } = props;

	const variant = props.variant ?? StepViewVariants.Default;

	// Determine which variant to render
	let renderVariant: JSX.Element;

	// Selection variant
	if (variant === StepViewVariants.Selection) {
		const selectionProps = props as StepViewSelectionProps;
		renderVariant = <SelectionVariant options={selectionProps.options} />;
	}
	// Info variant (explicit)
	else if (variant === StepViewVariants.Info) {
		const infoProps = props as StepViewInfoProps;
		renderVariant = (
			<InfoVariant icon={infoProps.icon} text={infoProps.text} action={infoProps.action} />
		);
	}
	// KYB variant - verification step with fields, error/success messages, and buttons
	else if (variant === StepViewVariants.KYB) {
		const kybProps = props as StepViewKYBProps;
		renderVariant = (
			<KYBVariant
				{...kybProps}
				fields={kybProps.fields ?? []}
				errorMessage={kybProps.kybErrorMessage}
				errorList={kybProps.kybErrors}
				buttons={kybProps.kybButtons ?? []}
			/>
		);
	}
	// Default form variant
	else {
		const defaultProps = props as StepViewDefaultProps;

		// When children are provided, render them directly (custom form content)
		if (defaultProps.children) {
			renderVariant = <>{defaultProps.children}</>;
		} else {
			// For form variants, check fields
			const safeFields = defaultProps.fields || [];
			const hasValidFields = Array.isArray(safeFields) && safeFields.length > 0;

			// Default form variant - render fields if present, form props are optional
			if (hasValidFields) {
				renderVariant = <DefaultVariant {...defaultProps} fields={safeFields} />;
			}
			// Fallback to info variant if no fields and no children
			else {
				renderVariant = <InfoVariant />;
			}
		}
	}

	return (
		<div className={cn("h-full w-full", className)}>
			<div className="flex h-full w-full overflow-y-auto">
				<div className="relative hidden flex-shrink-0 overflow-hidden md:block md:h-[400px] md:w-[300px] lg:h-[600px] lg:w-[450px]">
					{typeof image === "string" ? (
						<img src={image} alt={title} className="h-full w-full object-cover object-left-top" />
					) : (
						<div className="h-full w-full">{image}</div>
					)}
				</div>

				<div className="flex-1 pb-8 pr-8 md:pl-24">
					<div className="w-full md:max-w-[670px]">
						{typeof progress === "number" && (
							<div className="mb-6 w-full md:w-1/2">
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

						<div className="w-full">
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

							<div
								className={variant === StepViewVariants.Selection ? "w-full" : "md:max-w-[450px]"}
							>
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
