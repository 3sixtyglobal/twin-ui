// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { JSX } from "react";
import { useRef, useCallback } from "react";
import type {
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue
} from "react-hook-form";
import { Button } from "../../../button/button";
import { TextInput } from "../../../textInput/textInput";
import { TextInputColors } from "../../../textInput/textInputColors";
import { TextInputSizes } from "../../../textInput/textInputSizes";
import { CheckCircle } from "../../../icons/checkCircle";
import { Info } from "../../../icons/info";
import { XCircle } from "../../../icons/xCircle";
import type { IconsProps } from "../../../types/iconTypes";
import type { StepViewField, StepViewFieldSection } from "../stepViewProps";
import type { ButtonProps } from "../../../button/buttonProps";

const VERIFICATION_INPUT_CLASS =
	"h-10 w-10 md:h-12 md:w-12 rounded-lg border border-gray-300 bg-gray-50 text-center text-lg font-medium text-gray-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20";

interface VerificationCodeInputProps {
	value: string;
	length: number;
	onChange: (code: string) => void;
	expiresInText?: string;
	disabled?: boolean;
	readOnly?: boolean;
	dataTestId?: string;
}

function VerificationCodeInput({
	value,
	length,
	onChange,
	expiresInText,
	disabled,
	readOnly,
	dataTestId
}: VerificationCodeInputProps): JSX.Element {
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const digits = Array.from({ length }, (_, i) => value[i] ?? "");

	const setCode = useCallback(
		(newDigits: string[]) => {
			const code = newDigits.join("").slice(0, length);
			onChange(code);
		},
		[length, onChange]
	);

	const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		if (readOnly || disabled) return;
		if (raw.length > 1) {
			const pasted = raw.replace(/\D/g, "").slice(0, length);
			const newDigits = Array.from({ length }, (_, i) => pasted[i] ?? "");
			setCode(newDigits);
			const next = Math.min(pasted.length, length - 1);
			inputRefs.current[next]?.focus();
			return;
		}
		const char = raw.replace(/\D/g, "").slice(-1);
		const newDigits = [...digits];
		newDigits[index] = char;
		setCode(newDigits);
		if (char && index < length - 1) inputRefs.current[index + 1]?.focus();
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && !digits[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	return (
		<div className="w-full">
			<div className="flex flex-wrap gap-2">
				{Array.from({ length }, (_, i) => (
					<input
						key={i}
						ref={el => {
							inputRefs.current[i] = el;
						}}
						type="text"
						inputMode="numeric"
						autoComplete="one-time-code"
						maxLength={length}
						value={digits[i]}
						onChange={e => handleChange(i, e)}
						onKeyDown={e => handleKeyDown(i, e)}
						disabled={disabled}
						readOnly={readOnly}
						className={VERIFICATION_INPUT_CLASS}
						aria-label={`Digit ${i + 1} of ${length}`}
						data-testid={dataTestId ? `${dataTestId}-${i}` : undefined}
					/>
				))}
			</div>
			{expiresInText && <p className="text-secondary mt-2 text-sm">{expiresInText}</p>}
		</div>
	);
}

const VerificationSuccessIcon: React.FC<IconsProps> = props => (
	<CheckCircle {...props} type="bold" width={20} height={20} color="#23BD12" />
);

type KYBButtonItem = ButtonProps & {
	onClick: () => void | Promise<void>;
	loading?: boolean;
	loadingText?: string;
	label?: string;
};

interface KYBVariantProps {
	fields: StepViewField[] | StepViewFieldSection[];
	register?: UseFormRegister<Record<string, unknown>>;
	getValues?: UseFormGetValues<Record<string, unknown>>;
	setValue?: UseFormSetValue<Record<string, unknown>>;
	errors?: FieldErrors<Record<string, unknown>>;
	errorMessage?: string | React.ReactNode;
	errorList?: string[];
	isVerificationSuccess?: boolean;
	buttons: KYBButtonItem[];
}

export const KYBVariant = ({
	fields,
	register,
	getValues,
	setValue,
	errors,
	errorMessage,
	errorList,
	isVerificationSuccess = false,
	buttons
}: KYBVariantProps): JSX.Element => {
	const renderField = (field: StepViewField): JSX.Element => {
		const fieldError = errors?.[field.name];
		const validationRules = field.validation || {};
		const registerOptions = register ? validationRules : undefined;
		const registeredProps =
			register && registerOptions ? register(field.name, registerOptions) : {};

		if (field.type === "verificationCodeInput") {
			const length = field.verificationCodeLength ?? 6;
			const currentValue = (getValues?.()?.[field.name] ?? field.value ?? "") as string;
			return (
				<div key={field.name} className="w-full">
					<div className="mb-1 flex w-full items-center justify-between">
						<label className="text-secondary text-sm font-medium" htmlFor={field.name}>
							{field.label}
						</label>
						{field.requiredLabel && (
							<span className="text-secondary text-sm font-normal">{field.requiredLabel}</span>
						)}
					</div>
					<VerificationCodeInput
						value={currentValue}
						length={length}
						onChange={code => setValue?.(field.name, code)}
						expiresInText={field.verificationCodeExpiresInText}
						disabled={field.disabled}
						readOnly={field.readOnly}
						dataTestId={field.dataTestId ?? `${field.name}-input`}
					/>
					{fieldError?.message && (
						<p className="text-error mt-1 text-sm">{fieldError.message as string}</p>
					)}
				</div>
			);
		}

		return (
			<div key={field.name} className="w-full">
				<div className="mb-1 flex w-full items-center justify-between">
					<label className="text-secondary text-sm font-medium" htmlFor={field.name}>
						{field.label}
					</label>
					{field.requiredLabel && (
						<span className="text-secondary text-sm font-normal">{field.requiredLabel}</span>
					)}
				</div>
				<div className="flex items-center gap-2 [&_input]:!border-[#DFE4EB]">
					<div className="min-w-0 flex-1">
						<TextInput
							id={field.name}
							name={field.name}
							type="text"
							{...registeredProps}
							placeholder={field.placeholder}
							color={fieldError ? TextInputColors.Failure : TextInputColors.None}
							sizing={TextInputSizes.Large}
							helperText={fieldError?.message as string | undefined}
							icon={field.icon}
							onChange={e => {
								(
									registeredProps as { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }
								).onChange?.(e);
								field.onChange?.(e);
							}}
							className={field.className}
							data-testid={field.dataTestId || `${field.name}-input`}
							readOnly={field.readOnly}
							disabled={field.disabled}
							defaultValue={field.value}
							rightIcon={isVerificationSuccess ? VerificationSuccessIcon : undefined}
						/>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full space-y-8">
			{fields && Array.isArray(fields) && fields.length > 0 && (
				<>
					{fields[0] && "heading" in fields[0] ? (
						(fields as StepViewFieldSection[]).map((section, sectionIndex) => (
							<div key={sectionIndex}>
								{section.heading && (
									<h2 className="text-brand-secondary mb-4 text-xl font-semibold">
										{section.heading}
									</h2>
								)}
								<div className="flex items-start gap-4">
									<div className="flex-1 space-y-4">{section.fields.map(renderField)}</div>
									{section.rightContent && (
										<div className="flex-shrink-0">{section.rightContent}</div>
									)}
								</div>
							</div>
						))
					) : (
						<div className="space-y-4">{(fields as StepViewField[]).map(renderField)}</div>
					)}
				</>
			)}

			{(errorMessage || (errorList && errorList.length > 0)) && (
				<div className="space-y-3">
					{errorMessage && (
						<div className="border-system-alerts-system-error bg-system-error-tints-50 flex items-center gap-2 rounded-lg border-2 p-4">
							<Info
								type="fill"
								width={16}
								height={16}
								color="black"
								className="text-system-alerts-system-error"
							/>
							<p className="text-system-error-tints-900 text-xs">{errorMessage}</p>
						</div>
					)}
					{errorList && errorList.length > 0 && (
						<div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4">
							{errorList.map((msg, index) => (
								<div key={index} className="flex gap-2">
									<XCircle
										type="fill"
										width={16}
										height={16}
										color="#DB3614"
										className="flex-shrink-0"
									/>
									<p className="text-xs text-gray-600">{msg}</p>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			<div className="flex flex-wrap gap-3">
				{buttons.map((btn, index) => {
					const { onClick, loading, loadingText, label, ...buttonProps } = btn;
					const content = loading
						? (loadingText ?? "Loading...")
						: (buttonProps.children ?? label ?? "");
					return (
						<Button
							key={index}
							{...buttonProps}
							type="button"
							disabled={(buttonProps.disabled ?? false) || loading}
							className={`w-full md:w-fit ${buttonProps.className ?? ""}`.trim()}
							onClick={onClick}
						>
							{content}
						</Button>
					);
				})}
			</div>
		</div>
	);
};
