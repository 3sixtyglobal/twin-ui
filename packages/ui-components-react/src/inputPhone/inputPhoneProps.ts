// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { TextInputProps } from "../textInput/textInputProps";

/**
 * InputPhone component props.
 */
export interface InputPhoneProps
	extends Omit<TextInputProps, "onChange" | "value" | "helperText" | "color"> {
	/**
	 * Field label.
	 */
	label?: string;
	/**
	 * Locale for country names (e.g. "en", "es").
	 */
	locale?: string;
	/**
	 * Whether to show required indicator next to label.
	 */
	requiredLabel?: boolean;
	/**
	 * Text shown next to label when required (e.g. "Required" or "*").
	 */
	requiredLabelText?: string;
	/**
	 * Additional class name for the container.
	 */
	containerClassName?: string;
	/**
	 * Full phone value (with dial code).
	 */
	value?: string;
	/**
	 * ISO country code for the phone number (e.g., "us", "ca"). Takes precedence over parsing from value.
	 */
	countryCode?: string;
	/**
	 * Called when phone or country changes. (phone, countryCode)
	 */
	onChange?: (phone: string, countryCode: string) => void;
	/**
	 * Helper or error text below the input.
	 */
	helperText?: string;
	/**
	 * Visual state: "failure" for error styling.
	 */
	color?: "failure" | "";
	/**
	 * Accessibility label for country select button.
	 */
	selectCountryLabel?: string;
	/**
	 * Placeholder when no country selected.
	 */
	selectCodePlaceholder?: string;
	/**
	 * Search input placeholder in country list.
	 */
	searchCountryPlaceholder?: string;
	/**
	 * Shown when no country matches search.
	 */
	noCountryFoundText?: string;
	/**
	 * Option to clear country selection.
	 */
	noCountryText?: string;
	/**
	 * Accessibility label for phone number input when no label is provided.
	 */
	phoneNumberLabel?: string;
}
