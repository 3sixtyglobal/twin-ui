// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { TOP, BOTTOM, LEFT, RIGHT } from "../constants/positions";

/**
 * Popover positions.
 */
export const PopoverPositions = {
	/**
	 * Top.
	 */
	Top: TOP,

	/**
	 * Left.
	 */
	Left: LEFT,

	/**
	 * Right.
	 */
	Right: RIGHT,

	/**
	 * Bottom.
	 */
	Bottom: BOTTOM
} as const;

/**
 * Popover positions.
 */
export type PopoverPosition = (typeof PopoverPositions)[keyof typeof PopoverPositions];
