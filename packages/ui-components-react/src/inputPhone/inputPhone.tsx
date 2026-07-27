import { useCallback, useEffect, useMemo, useState } from "react";
import { TextInput } from "../textInput/textInput";
import { CaretDown } from "../icons/caretDown";
import { cn } from "../lib/utils";
import {
	getCountriesWithDialCodes,
	normalizeDialCode,
	type CountryWithDialCode
} from "../constants/countries";
import { Popover } from "../popover/popover";
import { PopoverPositions } from "../popover/popoverPositions";
import { PopoverTriggers } from "../popover/popoverTriggers";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "../constants/command";
import type { InputPhoneProps } from "./inputPhoneProps";

export function InputPhone({
	label,
	requiredLabel,
	requiredLabelText = "Required",
	containerClassName,
	value = "",
	locale = "en",
	countryCode,
	onChange,
	sizing,
	helperText,
	color,
	selectCountryLabel = "Select country",
	selectCodePlaceholder = "Select code",
	searchCountryPlaceholder = "Search country",
	noCountryFoundText = "No country found",
	noCountryText = "No country",
	phoneNumberLabel = "Phone number",
	...rest
}: InputPhoneProps) {
	const countries = useMemo<CountryWithDialCode[]>(
		() => getCountriesWithDialCodes(locale),
		[locale]
	);

	// Memoize countries sorted by dial code length descending (for parsing)
	const sortedCountriesByDialCodeLength = useMemo(
		() => [...countries].sort((a, b) => b.dialCode.length - a.dialCode.length),
		[countries]
	);

	// Resolve country from: countryCode > parsed value > null
	const resolveCountry = useCallback(
		(telephoneCountry?: string, phoneValue?: string): CountryWithDialCode | null => {
			// If explicit country code provided, use it
			if (telephoneCountry) {
				const found = countries.find(c => c.code === telephoneCountry.toLowerCase());
				if (found) return found;
			}
			// If phone value starts with +, try to parse country from it
			if (phoneValue?.startsWith("+")) {
				const parsed = sortedCountriesByDialCodeLength.find(c =>
					phoneValue.startsWith(normalizeDialCode(c.dialCode))
				);
				if (parsed) return parsed;
			}
			// Return null if no country code and no parseable phone
			return null;
		},
		[countries, sortedCountriesByDialCodeLength]
	);

	// Extract phone number without dial code
	const extractPhoneNumber = useCallback(
		(fullValue: string, country: CountryWithDialCode | null): string => {
			if (!country) return fullValue;
			const normalized = normalizeDialCode(country.dialCode);
			if (fullValue.startsWith(normalized)) {
				return fullValue.slice(normalized.length).trim();
			}
			return fullValue.startsWith("+") ? "" : fullValue;
		},
		[]
	);

	const [selectedCountry, setSelectedCountry] = useState<CountryWithDialCode | null>(() =>
		resolveCountry(countryCode, value)
	);
	const [phoneNumber, setPhoneNumber] = useState(() => {
		const country = resolveCountry(countryCode, value);
		return extractPhoneNumber(value, country);
	});

	// Sync state when value/countryCode props change externally (e.g., form load, reset)
	useEffect(() => {
		const country = resolveCountry(countryCode, value);
		setSelectedCountry(country);
		setPhoneNumber(value ? extractPhoneNumber(value, country) : "");
	}, [value, countryCode, resolveCountry, extractPhoneNumber]);

	const notifyChange = (phone: string, country: CountryWithDialCode | null) => {
		if (country) {
			const normalizedDialCode = normalizeDialCode(country.dialCode);
			const fullNumber = phone ? `${normalizedDialCode}${phone}` : "";
			onChange?.(fullNumber, country.code);
		} else {
			onChange?.(phone, "");
		}
	};

	const handleCountrySelect = (country: CountryWithDialCode | null) => {
		setSelectedCountry(country);
		notifyChange(phoneNumber, country);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newNumber = e.target.value.replace(/[^\d\s]/g, "");
		setPhoneNumber(newNumber);
		notifyChange(newNumber, selectedCountry);
	};

	return (
		<div className={cn("space-y-2", containerClassName)}>
			{label && (
				<div className="mb-1 flex justify-between">
					<label htmlFor={rest.id} className="block text-sm font-medium text-secondary">
						{label}
					</label>
					{requiredLabel && (
						<span className="text-sm font-medium text-tertiary">{requiredLabelText}</span>
					)}
				</div>
			)}
			<div className="flex gap-2">
				<Popover
					content={
						<div className="w-[280px] bg-white p-0">
							<Command className="bg-white">
								<CommandInput
									data-testid="country-select-input"
									placeholder={searchCountryPlaceholder}
								/>
								<CommandList>
									<CommandEmpty>{noCountryFoundText}</CommandEmpty>
									<CommandGroup>
										<CommandItem
											value="none"
											onSelect={() => handleCountrySelect(null)}
											className="cursor-pointer"
										>
											<span className="text-gray-400">{noCountryText}</span>
										</CommandItem>
										{countries.map(country => (
											<CommandItem
												key={country.code}
												value={`${country.name} ${country.dialCode}`}
												onSelect={() => handleCountrySelect(country)}
												className="cursor-pointer"
											>
												<span className="mr-2 text-lg">{country.flag}</span>
												<span className="flex-1">{country.name}</span>
												<span className="text-muted-foreground">{country.dialCode}</span>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</div>
					}
					placement={PopoverPositions.Bottom}
					trigger={PopoverTriggers.Click}
					ariaLabel={selectCountryLabel}
					customTrigger={
						<button
							type="button"
							role="combobox"
							aria-label={selectCountryLabel}
							data-testid="country-select-button"
							className={cn(
								"flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-50 px-3",
								"hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-primary",
								"min-w-[120px] justify-between text-sm font-medium",
								{ lg: "h-14", md: "h-12", sm: "h-10" }[sizing ?? "sm"] ?? "h-10",
								color === "failure" && "border-red-500"
							)}
						>
							{selectedCountry ? (
								<span className="flex items-center gap-2">
									<span className="text-lg">{selectedCountry.flag}</span>
									<span>{selectedCountry.dialCode}</span>
								</span>
							) : (
								<span className="text-gray-400">{selectCodePlaceholder}</span>
							)}
							<CaretDown type="regular" width={16} height={16} />
						</button>
					}
				/>
				<TextInput
					type="tel"
					value={phoneNumber}
					onChange={handlePhoneChange}
					className="flex-1"
					sizing={sizing}
					maxLength={20}
					aria-label={label ? undefined : phoneNumberLabel}
					{...rest}
				/>
			</div>
			{helperText && (
				<p className={cn("text-sm", color === "failure" ? "text-red-600" : "text-gray-500")}>
					{helperText}
				</p>
			)}
		</div>
	);
}
