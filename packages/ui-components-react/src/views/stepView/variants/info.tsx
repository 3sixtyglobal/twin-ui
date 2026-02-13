// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { JSX, ReactNode } from "react";
import { Button } from "../../../button/button";
import { ButtonColors } from "../../../button/buttonColors";
import { ArrowRight } from "../../../icons/arrowRight";

interface InfoVariantProps {
	icon?: ReactNode;
	text?: ReactNode;
	action?: {
		label: string;
		onClick: () => void | Promise<void>;
		disabled?: boolean;
		loading?: boolean;
		loadingText?: string;
	};
}

export const InfoVariant = ({ icon, text, action }: InfoVariantProps): JSX.Element => {
	return (
		<div className="w-full space-y-6">
			{icon && (
				<div className="mx-auto mb-12 w-fit md:mx-0">
					<div className="flex h-48 w-48 items-center justify-center rounded-full bg-neutral-50">
						{icon}
					</div>
				</div>
			)}

			{text && <div className="text-tertiary space-y-2 text-left">{text}</div>}

			{action && (
				<div className="mt-6">
					<Button
						type="button"
						onClick={action.onClick}
						disabled={action.disabled || action.loading}
						color={ButtonColors.Secondary}
						data-testid="action-button"
						className="w-full md:w-fit"
					>
						{action.loading ? action.loadingText || "Loading..." : action.label}
						<ArrowRight type="light" width={20} height={20} />
					</Button>
				</div>
			)}
		</div>
	);
};
