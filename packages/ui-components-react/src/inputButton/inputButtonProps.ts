// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { TextInputColor } from "../textInput/textInputColors";
import type { TextInputSize } from "../textInput/textInputSizes";
import type { ButtonColor } from "../button/buttonColors";
import type { IconFC } from "../types/iconTypes";

/**
 * InputButton component props.
 */
export interface InputButtonProps {
	/**
	 * Input ID.
	 */
	id?: string;
	/**
	 * Input name.
	 */
	name: string;
	/**
	 * Input type.
	 * @default "text"
	 */
	type?: "text" | "email" | "url" | "tel" | "search" | "number";
	/**
	 * Input placeholder text.
	 */
	placeholder?: string;
	/**
	 * Controlled input value.
	 */
	value?: string;
	/**
	 * Default input value (uncontrolled).
	 */
	defaultValue?: string;
	/**
	 * Whether the input is disabled.
	 */
	disabled?: boolean;
	/**
	 * Whether the input is read-only.
	 */
	readOnly?: boolean;
	/**
	 * Icon component to display inside the input.
	 */
	icon?: IconFC;
	/**
	 * Additional CSS class name for the input.
	 */
	className?: string;
	/**
	 * Input color (for validation states).
	 */
	color?: TextInputColor;
	/**
	 * Input sizing.
	 */
	sizing?: TextInputSize;
	/**
	 * Button label text.
	 */
	buttonLabel: string;
	/**
	 * Button color.
	 * @default ButtonColors.Secondary
	 */
	buttonColor?: ButtonColor;
	/**
	 * Whether the button is disabled.
	 */
	buttonDisabled?: boolean;
	/**
	 * Whether the button is in loading state.
	 */
	buttonLoading?: boolean;
	/**
	 * Loading text to show when button is loading.
	 * @default "Loading..."
	 */
	buttonLoadingText?: string;
	/**
	 * Button click handler. Receives the current input value.
	 */
	onButtonClick?: (value: string) => void | Promise<void>;
	/**
	 * Input change handler.
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * Data test ID for testing.
	 */
	dataTestId?: string;
}
