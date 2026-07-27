// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { CLICK, HOVER } from "../constants/triggers";

/**
 * Popover Triggers.
 */
export const PopoverTriggers = {
	/**
	 * Click.
	 */
	Click: CLICK,

	/**
	 * Hover.
	 */
	Hover: HOVER
} as const;

/**
 * Popover Triggers.
 */
export type PopoverTrigger = (typeof PopoverTriggers)[keyof typeof PopoverTriggers];
