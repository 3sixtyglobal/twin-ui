// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { Meta, StoryObj } from "@storybook/react";
import { InputPhone, TextInputSizes } from "@twin.org/ui-components-react";

const meta = {
	title: "Components/InputPhone",
	component: InputPhone,
	argTypes: {
		locale: {
			options: ["en", "es", "de", "fr", "pt"],
			control: { type: "select" }
		},
		sizing: {
			options: Object.values(TextInputSizes),
			control: { type: "inline-radio" }
		},
		requiredLabel: {
			control: "boolean"
		},
		disabled: {
			control: "boolean"
		},
		color: {
			options: ["", "failure"],
			control: { type: "inline-radio" }
		}
	},
	args: {
		label: "Phone number",
		placeholder: "Enter your phone number"
	}
} satisfies Meta<typeof InputPhone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};

export const WithLabel: Story = {
	args: {
		label: "Contact telephone",
		placeholder: "e.g. 555 123 4567"
	}
};

export const Required: Story = {
	args: {
		label: "Phone number",
		requiredLabel: true,
		requiredLabelText: "*"
	}
};

export const WithHelperText: Story = {
	args: {
		label: "Business phone",
		helperText: "We'll use this to contact you about your order."
	}
};

export const Failure: Story = {
	args: {
		label: "Phone number",
		helperText: "Please enter a valid phone number.",
		color: "failure"
	}
};

export const WithValue: Story = {
	args: {
		label: "Phone number",
		value: "+44 7700 900123",
		countryCode: "gb"
	}
};

export const Disabled: Story = {
	args: {
		label: "Phone number",
		value: "+1 555 123 4567",
		disabled: true
	}
};

export const Large: Story = {
	args: {
		label: "Phone number",
		sizing: TextInputSizes.Large
	}
};

export const Small: Story = {
	args: {
		label: "Phone number",
		sizing: TextInputSizes.Small
	}
};

export const LocaleSpanish: Story = {
	args: {
		label: "Telephone",
		locale: "es",
		selectCountryLabel: "Select country",
		selectCodePlaceholder: "Code",
		searchCountryPlaceholder: "Search country",
		noCountryFoundText: "No country found",
		noCountryText: "No country selected",
		phoneNumberLabel: "Phone number"
	}
};

export const CustomLabels: Story = {
	args: {
		label: "Mobile number",
		requiredLabelText: "Required",
		selectCountryLabel: "Choose country code",
		selectCodePlaceholder: "Code",
		searchCountryPlaceholder: "Search countries...",
		noCountryFoundText: "No countries match your search",
		noCountryText: "No country selected",
		phoneNumberLabel: "Phone number"
	}
};

export const WithOnChange: Story = {
	args: {
		label: "Phone number",
		onChange: (phone: string, countryCode: string) => {
			console.log("Phone:", phone, "Country:", countryCode);
		}
	}
};
