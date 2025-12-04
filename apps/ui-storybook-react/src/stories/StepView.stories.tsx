// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	StepView,
	StepViewVariants,
	type StepViewField,
	type StepViewFieldSection,
	type StepViewProps
} from "@twin.org/ui-components-react";
import {
	Envelope,
	UserCircle,
	Building,
	Lock,
	UsersThree
} from "@twin.org/ui-components-react/icons";

// Wrapper component to provide react-hook-form context
const StepViewWrapper = (
	args: Omit<StepViewProps, "register" | "handleSubmit" | "errors" | "onSubmit">
) => {
	// Extract default values from fields
	const getDefaultValues = (): Record<string, unknown> => {
		const defaults: Record<string, unknown> = {};
		if (args.fields && Array.isArray(args.fields)) {
			args.fields.forEach(fieldOrSection => {
				if ("fields" in fieldOrSection) {
					// It's a section
					fieldOrSection.fields.forEach((field: StepViewField) => {
						if ("value" in field && field.value !== undefined) {
							defaults[field.name] = field.value;
						}
					});
				} else {
					// It's a direct field
					const field = fieldOrSection as StepViewField;
					if ("value" in field && field.value !== undefined) {
						defaults[field.name] = field.value;
					}
				}
			});
		}
		return defaults;
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: getDefaultValues()
	});

	const onSubmit = async (data: Record<string, unknown>) => {
		console.log("Form submitted:", data);
		await new Promise(resolve => setTimeout(resolve, 1000));
	};

	// Only pass form props if fields are provided and variant is default (form variant)
	const isFormVariant = args.variant === StepViewVariants.Default;
	const hasFields = args.fields != null && Array.isArray(args.fields) && args.fields.length > 0;

	if (isFormVariant && hasFields) {
		return (
			<StepView
				{...args}
				register={register}
				handleSubmit={handleSubmit}
				errors={errors}
				isSubmitting={isSubmitting}
				onSubmit={onSubmit}
			/>
		);
	}

	// Info/Introduction variant - no form props needed
	return <StepView {...args} />;
};

const meta = {
	title: "Views/StepView",
	component: StepViewWrapper,
	argTypes: {
		variant: {
			options: [StepViewVariants.Default, StepViewVariants.Info, StepViewVariants.Selection],
			control: { type: "inline-radio" }
		},
		title: {
			control: "text"
		},
		description: {
			control: "text"
		},
		progress: {
			control: { type: "range", min: 0, max: 100, step: 1 }
		},
		submitButtonLabel: {
			control: "text"
		},
		loadingText: {
			control: "text"
		}
	},
	parameters: {
		layout: "fullscreen"
	},
	decorators: [
		(Story: React.ComponentType) => (
			<div className="h-screen w-full overflow-hidden" style={{ padding: "40px" }}>
				<Story />
			</div>
		)
	]
} satisfies Meta<typeof StepViewWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Email Received step implementation (`info` variant)
export const EmailReceived: Story = {
	args: {
		variant: StepViewVariants.Info,
		title: "You've got mail",
		description: (
			<>
				We sent a verification link to <strong>jim.stevenson@asda.com</strong>. Please click the
				link in the email we sent you.
			</>
		),
		progress: 50,
		image: "/images/email-received.webp",
		icon: (
			<img src="/images/emailVerification.svg" alt="Email verification" width={120} height={120} />
		),
		text: (
			<>
				If required, you can{" "}
				<a href="#" className="text-brand-primary font-semibold hover:underline">
					resend the email
				</a>
				.
			</>
		)
	}
};

// Email Confirmation variant
export const EmailConfirmation: Story = {
	args: {
		variant: StepViewVariants.Info,
		title: "Email confirmed",
		description: "Your email has been successfully verified.",
		progress: 50,
		image: "/images/email-confirmation.webp",
		icon: (
			<img src="/images/emailVerification.svg" alt="Email verification" width={120} height={120} />
		),
		text: (
			<div className="text-brand-secondary text-lg font-semibold">Next: Setup your account</div>
		),
		action: {
			label: "Continue",
			onClick: async () => {
				console.log("Continuing to account setup...");
				await new Promise(resolve => setTimeout(resolve, 1000));
			},
			loadingText: "Loading..."
		}
	}
};

// Personal Details variant (Default form)
const PersonalDetailsComponent = (args: typeof PersonalDetails.args) => {
	const [agreementChecked, setAgreementChecked] = useState(args.checkbox?.checked ?? true);
	return (
		<StepViewWrapper
			{...args}
			checkbox={
				args.checkbox
					? {
							...args.checkbox,
							checked: agreementChecked,
							onChange: setAgreementChecked
						}
					: undefined
			}
		/>
	);
};

export const PersonalDetails: Story = {
	render: PersonalDetailsComponent,
	args: {
		variant: StepViewVariants.Default,
		title: "About you",
		description:
			"Complete your account and password information below to create your TWIN registration.",
		progress: 50,
		image: "/images/personal-details.webp",
		fields: [
			{
				heading: "Account login",
				fields: [
					{
						name: "registeredEmail",
						label: "Registered email",
						placeholder: "Enter your email",
						type: "email",
						value: "jim.stevenson@asda.com",
						readOnly: true,
						disabled: true,
						icon: Envelope
					}
				]
			},
			{
				heading: "Your details",
				fields: [
					{
						name: "firstName",
						label: "First name",
						placeholder: "Enter first name",
						requiredLabel: "Required",
						icon: UserCircle,
						validation: {
							required: "First name is required"
						}
					},
					{
						name: "surname",
						label: "Surname",
						placeholder: "Enter surname",
						requiredLabel: "Required",
						icon: UserCircle,
						validation: {
							required: "Surname is required"
						}
					},
					{
						name: "jobTitle",
						label: "Job title",
						placeholder: "e.g. Manager",
						icon: UserCircle
					}
				]
			}
		] as StepViewFieldSection[],
		checkbox: {
			id: "agreement",
			label: (
				<>
					By registering, I agree to the{" "}
					<a href="#" className="text-brand-primary hover:underline">
						TWIN Customer Agreement
					</a>{" "}
					and acknowledge the{" "}
					<a href="#" className="text-brand-primary hover:underline">
						Privacy Policy
					</a>
					.
				</>
			),
			checked: true,
			onChange: () => {}
		},
		submitButtonLabel: "Continue",
		loadingText: "Loading..."
	}
};

// Welcome to TWIN ID variant
export const WelcomeToTwinId: Story = {
	args: {
		variant: StepViewVariants.Selection,
		title: "Welcome to TWIN ID",
		description:
			"You have successfully created your individual continue, please connect to an organisation.",
		progress: 75,
		image: "/images/welcome-to-twin-id.webp",
		options: [
			{
				value: "create",
				icon: <Building type="fill" width={48} height={48} className="!text-tertiary" />,
				title: "Create a New Organisation",
				description:
					"Choose this path if your business or organisation is not yet registered on TWIN ID.",
				features: [],
				button: {
					label: "Create Organisation",
					onClick: async value => {
						console.log("Selected:", value);
						await new Promise(resolve => setTimeout(resolve, 1000));
					},
					dataTestId: "create-organisation-button"
				}
			},
			{
				value: "join",
				icon: <UsersThree type="fill" width={48} height={48} className="!text-tertiary" />,
				title: "Join an Organisation",
				description: "If your organisation is already on TWIN ID, you must be invited.",
				features: [],
				button: {
					label: "More information",
					onClick: async value => {
						console.log("Selected:", value);
						await new Promise(resolve => setTimeout(resolve, 1000));
					},
					dataTestId: "join-organisation-button"
				}
			}
		]
	}
};

// Organization Details variant
const OrganizationDetailsComponent = (args: typeof OrganizationDetails.args) => {
	const [termsChecked, setTermsChecked] = useState(args.checkbox?.checked ?? false);
	return (
		<StepViewWrapper
			{...args}
			checkbox={
				args.checkbox
					? {
							...args.checkbox,
							checked: termsChecked,
							onChange: setTermsChecked
						}
					: undefined
			}
		/>
	);
};

export const OrganizationDetails: Story = {
	render: OrganizationDetailsComponent,
	args: {
		variant: StepViewVariants.Default,
		title: "Set up organisation profile",
		description:
			"Tell other TWIN users about your Organisation. The information you will provide here will be displayed on your profile.",
		progress: 75,
		image: "/images/organization-details.webp",
		fields: [
			{
				heading: "About your company",
				fields: [
					{
						name: "organizationName",
						label: "Organisation name",
						placeholder: "Add your organisation name",
						requiredLabel: "Required",
						validation: {
							required: "Organisation name is required"
						}
					},
					{
						name: "industry",
						label: "Industry",
						placeholder: "Add your organisation industry",
						requiredLabel: "Required",
						validation: {
							required: "Industry is required"
						}
					}
				]
			},
			{
				heading: "Contact Details",
				fields: [
					{
						name: "contactEmail",
						label: "Public email address",
						placeholder: "Add a public email contact",
						type: "email",
						requiredLabel: "Required",
						icon: UserCircle,
						validation: {
							required: "Public email address is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Please enter a valid email address"
							}
						}
					},
					{
						name: "website",
						label: "Website address",
						placeholder: "Add your organisation website",
						type: "url",
						requiredLabel: "Required",
						validation: {
							required: "Website address is required",
							pattern: {
								value: /^(https?):\/\/[^\s/$.?#].[^\s]*$/,
								message: "Please enter a valid website URL"
							}
						}
					},
					{
						name: "telephone",
						label: "Contact telephone",
						placeholder: "Add a public tel number",
						type: "tel",
						requiredLabel: "Required",
						validation: {
							required: "Contact telephone is required",
							pattern: {
								value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
								message: "Please enter a valid telephone number"
							}
						}
					}
				]
			}
		] as StepViewFieldSection[],
		checkbox: {
			id: "termsAgreement",
			label: (
				<>
					My business agrees to adhere to the{" "}
					<a href="#" className="text-brand-primary hover:underline">
						Terms and Conditions
					</a>{" "}
					and{" "}
					<a href="#" className="text-brand-primary hover:underline">
						Privacy Policy
					</a>{" "}
					of TWIN ID Platform.
				</>
			),
			checked: false,
			onChange: () => {}
		},
		submitButtonLabel: "Continue",
		loadingText: "Loading..."
	}
};

// Build Your Business Profile variant
export const BuildYourBusinessProfile: Story = {
	args: {
		variant: StepViewVariants.Default,
		title: "Build your business profile",
		description:
			"Tell other TWIN users about your registered organisation. The information you will provide here will be displayed on your profile.",
		progress: 85,
		image: "/images/build-your-business-profile.webp",
		fields: [
			{
				heading: "Business Contact Details",
				fields: [
					{
						name: "publicEmail",
						label: "Public email address",
						placeholder: "e.g. contact@your-company.com",
						type: "email",
						icon: UserCircle,
						validation: {
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Please enter a valid email address"
							}
						}
					},
					{
						name: "website",
						label: "Website address",
						placeholder: "e.g., https://your-company.com",
						type: "url",
						validation: {
							pattern: {
								value: /^(https?):\/\/[^\s/$.?#].[^\s]*$/,
								message: "Please enter a valid website URL"
							}
						}
					},
					{
						name: "contactTelephone",
						label: "Contact telephone",
						placeholder: "Add a public business tel number",
						type: "tel",
						validation: {
							pattern: {
								value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
								message: "Please enter a valid telephone number"
							}
						}
					}
				]
			},
			{
				heading: "Add company identifiers",
				fields: [
					{
						name: "eoriNumber",
						label: "EORI Number",
						placeholder: "e.g. GB123456789000"
					},
					{
						name: "leiNumber",
						label: "LEI number",
						placeholder: "e.g. 984500BEF7D76AF6D669"
					},
					{
						name: "tradeIdentifier",
						label: "Add a trade identifier",
						placeholder: "Select identifier",
						selectOptions: [
							{ value: "", label: "Select identifier" },
							{ value: "duns", label: "DUNS Number" },
							{ value: "vat", label: "VAT Number" },
							{ value: "tax", label: "Tax ID" },
							{ value: "other", label: "Other" }
						]
					}
				]
			}
		] as StepViewFieldSection[],
		submitButtonLabel: "Continue",
		loadingText: "Loading..."
	}
};

// Set Password variant
const SetPasswordComponent = (args: typeof SetPassword.args) => {
	const [termsChecked, setTermsChecked] = useState(args.checkbox?.checked ?? true);
	return (
		<StepViewWrapper
			{...args}
			checkbox={
				args.checkbox
					? {
							...args.checkbox,
							checked: termsChecked,
							onChange: setTermsChecked
						}
					: undefined
			}
		/>
	);
};

export const SetPassword: Story = {
	render: SetPasswordComponent,
	args: {
		variant: StepViewVariants.Default,
		title: "Complete your registration",
		description:
			"You are one step away from completing your profile. Add a secure password to complete your registration process and start using TWIN ID.",
		progress: 75,
		image: "/images/set-password.webp",
		fields: [
			{
				heading: "Create a secure login",
				fields: [
					{
						name: "password",
						label: "Enter a password",
						placeholder: "Enter a password",
						type: "password",
						requiredLabel: "Required",
						icon: Lock,
						validation: {
							required: "Password is required",
							minLength: {
								value: 8,
								message: "Password must be at least 8 characters long"
							}
						}
					},
					{
						name: "repeatPassword",
						label: "Repeat password",
						placeholder: "Repeat your password",
						type: "password",
						requiredLabel: "Required",
						icon: Lock,
						validation: {
							required: "Repeat password is required",
							validate: (value: string, formValues: Record<string, unknown>) => {
								const password = typeof formValues.password === "string" ? formValues.password : "";
								return value === password || "Passwords do not match";
							}
						}
					}
				]
			}
		] as StepViewFieldSection[],
		checkbox: {
			id: "termsAgreement",
			label: (
				<>
					By registering, my organisation agrees to adhere to the{" "}
					<a href="#" className="text-brand-primary hover:underline">
						Terms and Conditions
					</a>{" "}
					and{" "}
					<a href="#" className="text-brand-primary hover:underline">
						Privacy Policy
					</a>{" "}
					of TWIN ID Platform.
				</>
			),
			checked: true,
			onChange: () => {}
		},
		submitButtonLabel: "Finish",
		loadingText: "Loading..."
	}
};
