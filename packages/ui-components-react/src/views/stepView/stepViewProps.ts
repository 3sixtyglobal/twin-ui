// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ReactNode } from "react";
import type {
	FieldError,
	FieldErrors,
	FieldValues,
	RegisterOptions,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue
} from "react-hook-form";
import type { ButtonProps } from "../../button/buttonProps";
import type { IconFC } from "../../types/iconTypes";
import type { StepViewVariants } from "./stepViewVariants";

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
 * Props passed to a custom field render function.
 * Follows the same pattern as react-hook-form's Controller render prop.
 */
export interface StepViewFieldRenderProps {
	/**
	 * Field state containing name, value, and change handlers.
	 */
	field: {
		name: string;
		value: unknown;
		onChange: (value: unknown) => void;
		onBlur: () => void;
		ref: React.Ref<unknown>;
	};
	/**
	 * Field error from react-hook-form, if any.
	 */
	error?: FieldError;
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
	/**
	 * Custom render function. When provided, replaces the default input rendering.
	 * Follows the same pattern as react-hook-form's Controller render prop.
	 *
	 * @example
	 * ```tsx
	 * {
	 *   name: "country",
	 *   label: "Country",
	 *   render: ({ field, error }) => (
	 *     <CountrySelect
	 *       value={field.value as string}
	 *       onChange={field.onChange}
	 *       error={error?.message}
	 *     />
	 *   ),
	 * }
	 * ```
	 */
	render?: (props: StepViewFieldRenderProps) => ReactNode;
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

// ---------------------------------------------------------------------------
// Discriminated union props — per-variant interfaces
// ---------------------------------------------------------------------------

/**
 * Shared base props common to all StepView variants.
 */
export interface StepViewBaseProps {
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
	 * Additional CSS class name.
	 */
	className?: string;
}

/**
 * Props for the Default (form) variant of StepView.
 *
 * When `children` is provided the built-in field/form rendering is skipped,
 * but the layout shell (image, progress, title, description) is preserved.
 */
export interface StepViewDefaultProps<
	T extends FieldValues = Record<string, unknown>
> extends StepViewBaseProps {
	/**
	 * Visual variant of the step view.
	 * @default "default"
	 */
	variant?: typeof StepViewVariants.Default;
	/**
	 * Custom content that replaces the built-in field rendering.
	 * When provided, fields, register, handleSubmit, etc. are ignored and
	 * children are rendered inside the variant area instead.
	 */
	children?: ReactNode;
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
	onSubmit?: (data: T) => void | Promise<void>;
	/**
	 * React Hook Form register function.
	 */
	register?: UseFormRegister<T>;
	/**
	 * React Hook Form getValues function.
	 */
	getValues?: UseFormGetValues<T>;
	/**
	 * React Hook Form setValue function.
	 */
	setValue?: UseFormSetValue<T>;
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
	errors?: FieldErrors<T>;
	/**
	 * Whether the form is currently submitting.
	 */
	isSubmitting?: boolean;
	/**
	 * Submit button label.
	 */
	submitButtonLabel?: string;
	/**
	 * Data test ID for the submit button.
	 * @default "submit-button"
	 */
	submitButtonDataTestId?: string;
	/**
	 * Loading text to show when submitting.
	 */
	loadingText?: string;
	/**
	 * Whether the submit button should be disabled independently of isSubmitting.
	 * Use this to disable the button without showing the loading text.
	 * @default false
	 */
	submitButtonDisabled?: boolean;
}

/**
 * Action button configuration for the Info variant.
 */
export interface StepViewAction {
	/**
	 * Button label text.
	 */
	label: string;
	/**
	 * Click handler.
	 */
	onClick: () => void | Promise<void>;
	/**
	 * Whether the button is disabled.
	 */
	disabled?: boolean;
	/**
	 * Whether the button is in a loading state.
	 */
	loading?: boolean;
	/**
	 * Text to display while loading.
	 */
	loadingText?: string;
	/**
	 * Data test ID for the action button.
	 * @default "action-button"
	 */
	dataTestId?: string;
}

/**
 * Props for the Info variant of StepView.
 */
export interface StepViewInfoProps extends StepViewBaseProps {
	/**
	 * Visual variant of the step view.
	 */
	variant: "info";
	/**
	 * Icon to display.
	 */
	icon?: ReactNode;
	/**
	 * Optional text content (can include steps/instructions).
	 */
	text?: ReactNode;
	/**
	 * Optional action button.
	 */
	action?: StepViewAction;
}

/**
 * Props for the Selection variant of StepView.
 */
export interface StepViewSelectionProps extends StepViewBaseProps {
	/**
	 * Visual variant of the step view.
	 */
	variant: "selection";
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
}

/**
 * Props for the KYB (Know Your Business) e.g. KRA variant of StepView.
 */
export interface StepViewKYBProps<
	T extends FieldValues = Record<string, unknown>
> extends StepViewBaseProps {
	/**
	 * Visual variant of the step view.
	 */
	variant: "kyb";
	/**
	 * Fields to render (can be flat array or sections).
	 */
	fields?: StepViewField[] | StepViewFieldSection[];
	/**
	 * React Hook Form register function.
	 */
	register?: UseFormRegister<T>;
	/**
	 * React Hook Form getValues function (e.g. for verificationCodeInput).
	 */
	getValues?: UseFormGetValues<T>;
	/**
	 * React Hook Form setValue function (e.g. for verificationCodeInput).
	 */
	setValue?: UseFormSetValue<T>;
	/**
	 * React Hook Form errors object.
	 */
	errors?: FieldErrors<T>;
	/**
	 * KYB variant: optional error message (displayed when provided).
	 */
	kybErrorMessage?: string | ReactNode;
	/**
	 * KYB variant: list of error strings, each rendered in its own styled block below kybErrorMessage.
	 */
	kybErrors?: string[];
	/**
	 * KYB variant: when true, shows a success tick icon on each input.
	 */
	isVerificationSuccess?: boolean;
	/**
	 * KYB variant: buttons. Uses Button component props (color, size, outline, leftIcon, rightIcon, etc.)
	 * plus required onClick and optional loading/loadingText.
	 * Use "label" as shorthand for children when not using children.
	 */
	kybButtons?: Array<
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
}

// ---------------------------------------------------------------------------
// Discriminated union type
// ---------------------------------------------------------------------------

/**
 * StepView component props — a discriminated union keyed on `variant`.
 *
 * TypeScript will narrow the available props based on the variant you specify:
 *
 * - `variant?: 'default'` — form fields, children, checkbox, react-hook-form integration
 * - `variant: 'info'` — icon, text, action button
 * - `variant: 'selection'` — option cards with badges and buttons
 * - `variant: 'kyb'` — verification fields, error messages, configurable buttons
 *
 * @example
 * ```tsx
 * // Default variant — TypeScript knows fields, register, etc. are available
 * <StepView variant="default" title="Details" image="/img.png" fields={[...]} register={register} />
 *
 * // Info variant — TypeScript knows icon, text, action are available
 * <StepView variant="info" title="Done!" image="/img.png" icon={<Check />} action={{ label: "Continue", onClick: handleContinue }} />
 * ```
 */
export type StepViewProps<T extends FieldValues = Record<string, unknown>> =
	| StepViewDefaultProps<T>
	| StepViewInfoProps
	| StepViewSelectionProps
	| StepViewKYBProps<T>;

// ---------------------------------------------------------------------------
// Legacy compat — the old monolithic interface is replaced by the union above.
// Re-export StepViewFormProps as an alias for backward compatibility.
// ---------------------------------------------------------------------------

/**
 * @deprecated Use {@link StepViewProps} instead. This alias exists for backward compatibility.
 */
export type StepViewFormProps<T extends FieldValues = Record<string, unknown>> = StepViewProps<T>;
