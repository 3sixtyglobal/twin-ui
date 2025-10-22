// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { FAILURE, WARNING, SUCCESS, INFO, GRAY } from "../constants/colors";

/**
 * TextInput colors.
 */
export const TextInputColors = {
	/**
	 * None.
	 */
	None: "",

	/**
	 * Failure.
	 */
	Failure: FAILURE,

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
	 * Gray.
	 */
	Gray: GRAY
} as const;

/**
 * TextInput colors.
 */
export type TextInputColor = (typeof TextInputColors)[keyof typeof TextInputColors];
