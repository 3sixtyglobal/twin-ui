// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ReactNode } from "react";
import type {
	FieldErrors,
	RegisterOptions,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue
} from "react-hook-form";
import type { ButtonProps } from "../../button/buttonProps";
import type { IconFC } from "../../types/iconTypes";
import type { StepViewVariant } from "./stepViewVariants";

/**
 * Field validation rule for StepView fields.
 * Extends react-hook-form's RegisterOptions for type compatibility.
 */
export type FieldValidationRule = Omit<
	RegisterOptions<Record<string, unknown>, string>,
	"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

export type FieldType =
	| "text"
	| "email"
	| "url"
	| "tel"
	| "password"
	| "number"
	| "search"
	| "date"
	| "time"
	| "datetime-local"
	| "month"
	| "week"
	| "color"
	| "file"
	| "range"
	| "textarea"
	| "select"
	| "checkbox"
	| "radio"
	| "submit"
	| "reset"
	| "button"
	| "inputButton"
	| "verificationCodeInput";

/**
 * Select option for StepView fields.
 */
export interface StepViewSelectOption {
	/**
	 * The value of the option.
	 */
	value: string;
	/**
	 * The label to display for the option.
	 */
	label: string;
}

/**
 * StepView field definition.
 */
export interface StepViewField {
	/**
	 * Field name/identifier (used as form field name).
	 */
	name: string;
	/**
	 * Field label text.
	 */
	label: string;
	/**
	 * Field placeholder text.
	 */
	placeholder?: string;
	/**
	 * Field type (text, email, url, tel, etc.).
	 */
	type?: FieldType;
	/**
	 * Required label text. If provided, the field is marked as required and this label is displayed.
	 */
	requiredLabel?: string;
	/**
	 * Field icon component.
	 */
	icon?: IconFC;
	/**
	 * Field validation rules.
	 */
	validation?: FieldValidationRule;
	/**
	 * Custom onChange handler.
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * Additional CSS class name.
	 */
	className?: string;
	/**
	 * Data test ID for testing.
	 */
	dataTestId?: string;
	/**
	 * Options for Select component. If provided, field will render as Select instead of TextInput.
	 */
	selectOptions?: StepViewSelectOption[];
	/**
	 * Whether the field is read-only.
	 */
	readOnly?: boolean;
	/**
	 * Whether the field is disabled.
	 */
	disabled?: boolean;
	/**
	 * Field value (for pre-filled fields).
	 */
	value?: string;
	/**
	 * Button label text (for inputButton type).
	 */
	buttonLabel?: string;
	/**
	 * Button click handler (for inputButton type). Receives the current input value.
	 */
	onButtonClick?: (value: string) => void | Promise<void>;
	/**
	 * Whether the button is disabled (for inputButton type).
	 */
	buttonDisabled?: boolean;
	/**
	 * Whether the button is in loading state (for inputButton type).
	 */
	buttonLoading?: boolean;
	/**
	 * Loading text to show when button is loading (for inputButton type).
	 * @default "Loading..."
	 */
	buttonLoadingText?: string;
	/**
	 * Number of digits/boxes (for verificationCodeInput type).
	 * @default 6
	 */
	verificationCodeLength?: number;
	/**
	 * Optional text shown below the code inputs (e.g. "Code expires in 05:00 minutes").
	 */
	verificationCodeExpiresInText?: string;
}

/**
 * StepView field section (groups fields with a heading).
 */
export interface StepViewFieldSection {
	/**
	 * Section heading text.
	 */
	heading: string;
	/**
	 * Fields in this section.
	 */
	fields: StepViewField[];
	/**
	 * Optional content to render on the right side of the section (e.g., avatar, badge, etc.).
	 */
	rightContent?: ReactNode;
}

/**
 * StepView checkbox field definition.
 */
export interface StepViewCheckbox {
	/**
	 * Checkbox ID.
	 */
	id: string;
	/**
	 * Checkbox label text (can include HTML/links).
	 */
	label: ReactNode;
	/**
	 * Whether the checkbox is checked.
	 */
	checked?: boolean;
	/**
	 * Checkbox onChange handler.
	 */
	onChange?: (checked: boolean) => void;
	/**
	 * Additional CSS class name.
	 */
	className?: string;
	/**
	 * Data test ID for testing.
	 */
	dataTestId?: string;
}

/**
 * StepView component props interface.
 */
export interface StepViewProps {
	/**
	 * Visual variant of the step view.
	 * @default "default"
	 */
	variant?: StepViewVariant;
	/**
	 * Title text displayed at the top.
	 */
	title: string;
	/**
	 * Description text displayed below the title.
	 */
	description?: string | ReactNode;
	/**
	 * Image to display (can be a URL string or ReactNode).
	 */
	image: string | ReactNode;
	/**
	 * Progress value (0-100) to display in the progress bar.
	 */
	progress?: number;
	/**
	 * Icon to display (for Info variant).
	 */
	icon?: ReactNode;
	/**
	 * Optional text content (for Info variant, can include steps/instructions).
	 */
	text?: ReactNode;
	/**
	 * Optional action button (for Info variant).
	 */
	action?: {
		label: string;
		onClick: () => void | Promise<void>;
		disabled?: boolean;
		loading?: boolean;
		loadingText?: string;
	};
	/**
	 * Selection options for selection variant.
	 */
	options?: Array<{
		value: string;
		icon: ReactNode;
		title: string;
		description: string;
		features: string[];
		badge?: {
			label: string;
			className?: string;
		};
		button: {
			label: string;
			onClick: (value: string) => void | Promise<void>;
			disabled?: boolean;
			loading?: boolean;
			loadingText?: string;
			dataTestId?: string;
		};
	}>;
	/**
	 * Fields to render (can be flat array or sections). Required for form variant.
	 */
	fields?: StepViewField[] | StepViewFieldSection[];
	/**
	 * Optional checkbox field (e.g., terms agreement).
	 */
	checkbox?: StepViewCheckbox;
	/**
	 * Form submit handler. Required for form variant.
	 */
	onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
	/**
	 * React Hook Form register function.
	 */
	register?: UseFormRegister<Record<string, unknown>>;
	/**
	 * React Hook Form getValues function (e.g. for verificationCodeInput in Kra).
	 */
	getValues?: UseFormGetValues<Record<string, unknown>>;
	/**
	 * React Hook Form setValue function (e.g. for verificationCodeInput in Kra).
	 */
	setValue?: UseFormSetValue<Record<string, unknown>>;
	/**
	 * React Hook Form handleSubmit function.
	 * This is the handleSubmit function returned from useForm().
	 */
	handleSubmit?: (
		onSubmit: (data: Record<string, unknown>) => void | Promise<void>
	) => (e?: React.BaseSyntheticEvent) => Promise<void>;
	/**
	 * React Hook Form errors object.
	 */
	errors?: FieldErrors<Record<string, unknown>>;
	/**
	 * Whether the form is currently submitting.
	 */
	isSubmitting?: boolean;
	/**
	 * Submit button label.
	 */
	submitButtonLabel?: string;
	/**
	 * Loading text to show when submitting.
	 */
	loadingText?: string;
	/**
	 * Kra variant: optional error message (displayed when provided).
	 */
	kraErrorMessage?: string | ReactNode;
	/**
	 * Kra variant: list of error strings, each rendered in its own styled block below kraErrorMessage.
	 */
	kraErrors?: string[];
	/**
	 * Kra variant: when true, shows a success tick icon on each input.
	 */
	isVerificationSuccess?: boolean;
	/**
	 * Kra variant: buttons. Uses Button component props (color, size, outline, leftIcon, rightIcon, etc.) plus required onClick and optional loading/loadingText. Use "label" as shorthand for children when not using children.
	 */
	kraButtons?: Array<
		Omit<ButtonProps, "onClick"> & {
			onClick: () => void | Promise<void>;
			loading?: boolean;
			loadingText?: string;
			/** Shorthand for button text when not using children */
			label?: string;
			/** For testing */
			"data-testid"?: string;
		}
	>;
	/**
	 * Additional CSS class name.
	 */
	className?: string;
}
