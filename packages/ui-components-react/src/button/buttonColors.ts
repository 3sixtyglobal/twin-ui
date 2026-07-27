// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import {
	PRIMARY,
	SECONDARY,
	PLAIN,
	GHOST,
	ERROR,
	WARNING,
	SUCCESS,
	INFO,
	DARK
} from "../constants/colors";

/**
 * Button colors.
 */
export const ButtonColors = {
	/**
	 * Primary.
	 */
	Primary: PRIMARY,

	/**
	 * Secondary.
	 */
	Secondary: SECONDARY,

	/**
	 * Plain.
	 */
	Plain: PLAIN,

	/**
	 * Ghost.
	 */
	Ghost: GHOST,

	/**
	 * Error.
	 */
	Error: ERROR,

	/**
	 * Warning.
	 */
	Warning: WARNING,

	/**
	 * Success.
	 */
	Success: SUCCESS,

	/**
	 * Info.
	 */
	Info: INFO,

	/**
	 * Dark.
	 */
	Dark: DARK
} as const;

/**
 * Button colors.
 */
export type ButtonColor = (typeof ButtonColors)[keyof typeof ButtonColors];
