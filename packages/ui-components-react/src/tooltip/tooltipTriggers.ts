// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { HOVER, CLICK } from "../constants/triggers";

/**
 * Tooltip triggers.
 */
export const TooltipTriggers = {
	/**
	 * Hover.
	 */
	Hover: HOVER,

	/**
	 * Click.
	 */
	Click: CLICK
} as const;

/**
 * Tooltip triggers.
 */
export type TooltipTrigger = (typeof TooltipTriggers)[keyof typeof TooltipTriggers];
