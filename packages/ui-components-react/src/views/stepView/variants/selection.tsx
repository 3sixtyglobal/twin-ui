// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { JSX, ReactNode } from "react";
import { Button } from "../../../button/button";
import { ButtonColors } from "../../../button/buttonColors";
import { ArrowRight } from "../../../icons/arrowRight";

interface SelectionVariantProps {
	options?: Array<{
		value: string;
		icon: ReactNode;
		title: string;
		description: string;
		features: string[];
		badge?: {
			label: string;
			className?: string;
		};
		button: {
			label: string;
			onClick: (value: string) => void | Promise<void>;
			disabled?: boolean;
			loading?: boolean;
			loadingText?: string;
			dataTestId?: string;
		};
	}>;
}

export const SelectionVariant = ({ options }: SelectionVariantProps): JSX.Element => {
	if (!options || !Array.isArray(options) || options.length === 0) {
		return <div className="w-full">No options available</div>;
	}

	return (
		<div className="w-full space-y-6">
			<div className="w-full">
				<div className="grid gap-6 md:grid-cols-2">
					{options.map(option => (
						<div
							key={option.value}
							className="relative rounded-md border border-neutral-200 bg-white p-6 shadow-sm"
						>
							{option.badge && (
								<div className="absolute right-6 top-6">
									<div
										className={`rounded-lg px-2 py-1 text-xs ${
											option.badge.className || "bg-neutral-200 text-primary"
										}`}
									>
										{option.badge.label}
									</div>
								</div>
							)}

							<div className="mb-6 flex">{option.icon}</div>

							<h2 className="mb-3 text-xl font-semibold text-brand-secondary">{option.title}</h2>

							<p className="mb-6 text-xs font-semibold text-secondary">{option.description}</p>

							{option.features && option.features.length > 0 && (
								<ul className="mb-8 list-inside list-disc space-y-2 text-xs text-tertiary">
									{option.features.map((feature, index) => (
										<li key={index} className="ml-1">
											<span>{feature}</span>
										</li>
									))}
								</ul>
							)}

							<Button
								className="shrink-0"
								type="button"
								onClick={() => option.button.onClick(option.value)}
								color={ButtonColors.Secondary}
								disabled={option.button.disabled || option.button.loading}
								data-testid={option.button.dataTestId || `option-${option.value}-button`}
							>
								{option.button.loading
									? option.button.loadingText || "Processing..."
									: option.button.label}
								<ArrowRight type="bold" width={20} height={20} className="ml-2" />
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
