// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { memo, useState, type JSX } from "react";
import { TextInput } from "../textInput/textInput";
import { TextInputColors } from "../textInput/textInputColors";
import { TextInputSizes } from "../textInput/textInputSizes";
import { Button } from "../button/button";
import { ButtonColors } from "../button/buttonColors";
import type { InputButtonProps } from "./inputButtonProps";

/**
 * InputButton component - combines a text input with an action button on the right side.
 * Useful for search inputs, LEI lookups, etc.
 */
export const InputButton = memo(
	({
		id,
		name,
		type = "text",
		placeholder,
		value,
		defaultValue,
		disabled,
		readOnly,
		icon,
		className,
		color = TextInputColors.None,
		sizing = TextInputSizes.Large,
		buttonLabel,
		buttonColor = ButtonColors.Secondary,
		buttonDisabled,
		buttonLoading,
		buttonLoadingText = "Loading...",
		onButtonClick,
		onChange,
		dataTestId
	}: InputButtonProps): JSX.Element => {
		const [inputValue, setInputValue] = useState(defaultValue || value || "");

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
			onChange?.(e);
		};

		const handleButtonClick = () => {
			onButtonClick?.(inputValue);
		};

		return (
			<div className="flex gap-2">
				<div className="flex-1 [&_input]:!border-[#DFE4EB]">
					<TextInput
						id={id}
						name={name}
						type={type}
						placeholder={placeholder}
						value={value}
						defaultValue={defaultValue}
						disabled={disabled}
						readOnly={readOnly}
						icon={icon}
						className={className}
						color={color}
						sizing={sizing}
						onChange={handleChange}
						data-testid={dataTestId || `${name}-input`}
					/>
				</div>
				<Button
					type="button"
					color={buttonColor}
					disabled={buttonDisabled || buttonLoading || disabled}
					onClick={handleButtonClick}
					data-testid={dataTestId ? `${dataTestId}-button` : `${name}-button`}
				>
					{buttonLoading ? buttonLoadingText : buttonLabel}
				</Button>
			</div>
		);
	}
);

InputButton.displayName = "InputButton";
