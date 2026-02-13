// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * StepView variant constants.
 * These are the variants that are currently designed and implemented.
 */
export const StepViewVariants = {
	/**
	 * Default form variant - displays a form with fields.
	 */
	Default: "default",
	/**
	 * Info variant - displays informational content with icon and optional action.
	 */
	Info: "info",
	/**
	 * Selection variant - displays selection options with cards.
	 */
	Selection: "selection",
	/**
	 * Kra variant - verification step with fields, optional error/success messages, and configurable buttons.
	 */
	Kra: "kra"
} as const;

/**
 * StepView variant type.
 */
export type StepViewVariant = (typeof StepViewVariants)[keyof typeof StepViewVariants];
