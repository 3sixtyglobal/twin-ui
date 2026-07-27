// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { SMALL, MEDIUM, LARGE } from "../constants/sizes";

/**
 * FileInput sizes.
 */
export const FileInputSizes = {
	/**
	 * Small.
	 */
	Small: SMALL,

	/**
	 * Medium.
	 */
	Medium: MEDIUM,

	/**
	 * Large.
	 */
	Large: LARGE
} as const;

/**
 * FileInput sizes.
 */
export type FileInputSize = (typeof FileInputSizes)[keyof typeof FileInputSizes];
