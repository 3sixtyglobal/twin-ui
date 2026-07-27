// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { TOP, RIGHT, BOTTOM, LEFT } from "../constants/positions";

/**
 * Tooltip placements.
 */
export const TooltipPlacements = {
	/**
	 * Top.
	 */
	Top: TOP,

	/**
	 * Right.
	 */
	Right: RIGHT,

	/**
	 * Bottom.
	 */
	Bottom: BOTTOM,

	/**
	 * Left.
	 */
	Left: LEFT
} as const;

/**
 * Tooltip placements.
 */
export type TooltipPlacement = (typeof TooltipPlacements)[keyof typeof TooltipPlacements];
