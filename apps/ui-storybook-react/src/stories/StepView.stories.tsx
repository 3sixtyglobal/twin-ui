// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	ButtonColors,
	StepView,
	StepViewVariants,
	type StepViewField,
	type StepViewFieldSection,
	type StepViewProps,
	type StepViewBaseProps,
	type StepViewDefaultProps,
	type StepViewInfoProps,
	type StepViewSelectionProps,
	type StepViewKYBProps,
	type StepViewCheckbox
} from "@twin.org/ui-components-react";
import { ArrowRight, Building, Lock, UsersThree } from "@twin.org/ui-components-react/icons";

/**
 * Flattened props type for storybook compatibility.
 * Storybook's `Meta` / `StoryObj` types use `Partial<Props>` which collapses
 * discriminated unions, so we merge all variant props into a single interface.
 *
 * We exclude `variant` from each member before intersecting to avoid collapsing
 * the literal types (`'default' | undefined` & `'info'` → `never`), then add
 * `variant` back as a simple optional union string.
 */
type VariantSpecificKeys = keyof StepViewBaseProps | "variant";

type StepViewStoryProps = StepViewBaseProps &
	Partial<
		Omit<StepViewDefaultProps, VariantSpecificKeys> &
			Omit<StepViewInfoProps, VariantSpecificKeys> &
			Omit<StepViewSelectionProps, VariantSpecificKeys> &
			Omit<StepViewKYBProps, VariantSpecificKeys>
	> & {
		variant?: "default" | "info" | "selection" | "kyb";
	};

// Wrapper component to provide react-hook-form context
const StepViewWrapper = (args: StepViewStoryProps) => {
	// Extract default values from fields
	const getDefaultValues = (): Record<string, unknown> => {
		const defaults: Record<string, unknown> = {};
		if (args.fields && Array.isArray(args.fields)) {
			args.fields.forEach((fieldOrSection: StepViewField | StepViewFieldSection) => {
				if ("fields" in fieldOrSection) {
					// It's a section
					fieldOrSection.fields.forEach((field: StepViewField) => {
						if (field.type === "verificationCodeInput") {
							defaults[field.name] = field.value ?? "";
						} else if ("value" in field && field.value !== undefined) {
							defaults[field.name] = field.value;
						}
					});
				} else {
					// It's a direct field
					const field = fieldOrSection as StepViewField;
					if (field.type === "verificationCodeInput") {
						defaults[field.name] = field.value ?? "";
					} else if ("value" in field && field.value !== undefined) {
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
		getValues,
		setValue,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: getDefaultValues()
	});

	// Subscribe to form values so KYB variant (e.g. verificationCodeInput) re-renders when setValue is called
	watch();

	const onSubmit = async (data: Record<string, unknown>) => {
		console.log("Form submitted:", data);
		await new Promise(resolve => setTimeout(resolve, 1000));
	};

	// Only pass form props if fields are provided and variant is default (form variant)
	const isFormVariant = args.variant === StepViewVariants.Default || args.variant === undefined;
	const isKYBVariant = args.variant === StepViewVariants.KYB;
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

	if (isKYBVariant && hasFields) {
		return (
			<StepView
				{...args}
				register={register}
				getValues={getValues}
				setValue={setValue}
				errors={errors}
			/>
		);
	}

	// Info/Introduction variant - no form props needed
	return <StepView {...args} />;
};

const meta: Meta<typeof StepViewWrapper> = {
	title: "Views/StepView",
	component: StepViewWrapper,
	argTypes: {
		variant: {
			options: [
				StepViewVariants.Default,
				StepViewVariants.Info,
				StepViewVariants.Selection,
				StepViewVariants.KYB
			],
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
};

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
				<a href="#" className="font-semibold text-brand-primary hover:underline">
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
			<img src="/images/emailConfirmation.svg" alt="Email verification" width={120} height={120} />
		),
		text: (
			<div className="text-lg font-semibold text-brand-secondary">Next: Setup your account</div>
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
const PersonalDetailsComponent: Story["render"] = storyArgs => {
	const args = storyArgs as StepViewStoryProps;
	const checkbox = args.checkbox;
	const [agreementChecked, setAgreementChecked] = useState(checkbox?.checked ?? true);
	return (
		<StepViewWrapper
			{...args}
			checkbox={
				checkbox
					? {
							...checkbox,
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
						disabled: true
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
						requiredLabel: "*",
						validation: {
							required: "First name is required"
						}
					},
					{
						name: "surname",
						label: "Surname",
						placeholder: "Enter surname",
						requiredLabel: "*",
						validation: {
							required: "Surname is required"
						}
					},
					{
						name: "jobTitle",
						label: "Job title",
						placeholder: "e.g. Manager"
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
					onClick: async (value: any) => {
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
					onClick: async (value: any) => {
						console.log("Selected:", value);
						await new Promise(resolve => setTimeout(resolve, 1000));
					},
					dataTestId: "join-organisation-button"
				}
			}
		]
	}
};

// Organization Details variant - matches "Register your organisation" design
export const OrganizationDetails: Story = {
	args: {
		variant: StepViewVariants.Default,
		title: "Register your organisation",
		description: (
			<>
				If you are a listed organisation in the LEI registry, we recommend using an LEI to find your
				organisation&apos;s verified details.
				<br />
				<a href="#" className="font-semibold text-brand-primary hover:underline">
					Learn more about the LEI registry
				</a>
			</>
		),
		progress: 75,
		image: "/images/organization-details.webp",
		fields: [
			{
				heading: "Search",
				fields: [
					{
						name: "leiNumber",
						label: "Find your company by LEI",
						placeholder: "Enter your LEI number",
						type: "inputButton",
						buttonLabel: "Find",
						onButtonClick: async (value: string) => {
							console.log("Searching for LEI:", value);
							await new Promise(resolve => setTimeout(resolve, 1000));
						}
					}
				]
			},
			{
				heading: "About your company",
				fields: [
					{
						name: "organisationLegalName",
						label: "Organisation Legal Name",
						placeholder: "e.g. Your Company Ltd.",
						requiredLabel: "*",
						validation: { required: "Organisation legal name is required" }
					}
				]
			},
			{
				heading: "Registered legal address",
				fields: [
					{
						name: "addressLine1",
						label: "Address line 1",
						placeholder: "e.g., The Business Hub",
						requiredLabel: "*",
						validation: { required: "Address line 1 is required" }
					},
					{
						name: "addressLine2",
						label: "Address line 2",
						placeholder: "e.g., Business Road"
					},
					{
						name: "city",
						label: "City",
						placeholder: "Add your city location",
						requiredLabel: "*",
						validation: { required: "City is required" }
					},
					{
						name: "region",
						label: "Region",
						placeholder: "Add your state, province or county",
						requiredLabel: "*",
						validation: { required: "Region is required" }
					},
					{
						name: "postCode",
						label: "Post Code",
						placeholder: "Add your postal or zip code",
						requiredLabel: "*",
						validation: { required: "Post code is required" }
					},
					{
						name: "country",
						label: "Country",
						placeholder: "Add your country",
						requiredLabel: "*",
						validation: { required: "Country is required" }
					}
				]
			}
		] as StepViewFieldSection[],
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
const SetPasswordComponent: Story["render"] = storyArgs => {
	const args = storyArgs as StepViewStoryProps;
	const checkbox = args.checkbox as StepViewCheckbox | undefined;
	const [termsChecked, setTermsChecked] = useState(checkbox?.checked ?? true);
	return (
		<StepViewWrapper
			{...args}
			checkbox={
				checkbox
					? {
							...checkbox,
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
						requiredLabel: "*",
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
						requiredLabel: "*",
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

// Verification Loading (KYB variant) - Verify your business with BRN and PIN, two actions
export const KYBVerificationLoading: Story = {
	args: {
		variant: StepViewVariants.KYB,
		title: "Verify your business",
		description:
			"We collect this information to verify your business identity and keep your account safe.",
		progress: 25,
		image: "/images/kyb.webp",
		fields: [
			{
				name: "brn",
				label: "Business registration number (BRN)",
				placeholder: "ABC-1234567"
			},
			{
				name: "businessPin",
				label: "Business PIN Number",
				placeholder: "A123456789B"
			}
		] as StepViewField[],
		kybButtons: [
			{
				label: "Save and verify later",
				color: ButtonColors.Plain,
				disabled: false,
				onClick: async () => {
					console.log("Save and verify later");
					await new Promise(resolve => setTimeout(resolve, 500));
				},
				"data-testid": "save-and-verify-later"
			},
			{
				label: "Verify now",
				color: ButtonColors.Secondary,
				rightIcon: ArrowRight,
				showRightIcon: true,
				disabled: false,
				onClick: async () => {
					console.log("Verify now");
					await new Promise(resolve => setTimeout(resolve, 1000));
				},
				"data-testid": "verify-now"
			}
		]
	}
};

// KYB variant with optional error message
export const KYBVerificationLoadingWithError: Story = {
	args: {
		variant: StepViewVariants.KYB,
		title: "Verify your business",
		description:
			"We collect this information to verify your business identity and keep your account safe.",
		progress: 25,
		image: "/images/kyb.webp",
		fields: [
			{ name: "brn", label: "Business registration number (BRN)", placeholder: "ABC-1234567" },
			{ name: "businessPin", label: "Business PIN Number", placeholder: "A123456789B" }
		] as StepViewField[],
		kybErrorMessage: "Verification failed due to technical issue, save or try again.",
		kybButtons: [
			{
				label: "Save and verify later",
				color: ButtonColors.Plain,
				onClick: async () => {},
				"data-testid": "save-and-verify-later"
			},
			{
				label: "Verify now",
				color: ButtonColors.Secondary,
				rightIcon: ArrowRight,
				showRightIcon: true,
				onClick: async () => {},
				"data-testid": "verify-now"
			}
		]
	}
};

// KYB variant with verification success (tick icon on each input)
export const KYBVerificationSuccess: Story = {
	args: {
		variant: StepViewVariants.KYB,
		title: "Verify your business",
		description:
			"We collect this information to verify your business identity and keep your account safe.",
		progress: 25,
		image: "/images/kyb.webp",
		fields: [
			{
				name: "brn",
				label: "Business registration number (BRN)",
				placeholder: "ABC-1234567",
				value: "ABC-1234567"
			},
			{
				name: "businessPin",
				label: "Business PIN Number",
				placeholder: "A123456789B",
				value: "A123456789B"
			}
		] as StepViewField[],
		isVerificationSuccess: true,
		kybButtons: [
			{
				label: "Save and verify later",
				color: ButtonColors.Plain,
				onClick: async () => {},
				"data-testid": "save-and-verify-later"
			},
			{
				label: "Verify now",
				color: ButtonColors.Secondary,
				rightIcon: ArrowRight,
				showRightIcon: true,
				onClick: async () => {},
				"data-testid": "verify-now"
			}
		]
	}
};

// KYB variant with list of errors (kybErrors array)
export const KYBVerificationLoadingWithErrorsList: Story = {
	args: {
		variant: StepViewVariants.KYB,
		title: "Verify your business",
		description:
			"We collect this information to verify your business identity and keep your account safe.",
		progress: 25,
		image: "/images/kyb.webp",
		fields: [
			{ name: "brn", label: "Business registration number (BRN)", placeholder: "ABC-1234567" },
			{ name: "businessPin", label: "Business PIN Number", placeholder: "A123456789B" }
		] as StepViewField[],
		kybErrorMessage: "Please fix the following issues:",
		kybErrors: [
			"Business registration number is invalid or not found.",
			"Business PIN does not match our records.",
			"Verification service is temporarily unavailable."
		],
		kybButtons: [
			{
				label: "Save and verify later",
				color: ButtonColors.Plain,
				onClick: async () => {},
				"data-testid": "save-and-verify-later"
			},
			{
				label: "Verify now",
				color: ButtonColors.Secondary,
				rightIcon: ArrowRight,
				showRightIcon: true,
				onClick: async () => {},
				"data-testid": "verify-now"
			}
		]
	}
};

// KYB variant – Confirm Your Authorization with security code input (verificationCodeInput)
export const KYBConfirmAuthorization: Story = {
	args: {
		variant: StepViewVariants.KYB,
		title: "Confirm Your Authorization",
		description:
			"Enter the security code sent to the email linked to the verified PIN. This confirms you're authorized to create this account.",
		progress: 50,
		image: "/images/kyb.webp",
		fields: [
			{
				name: "securityCode",
				label: "Security code",
				type: "verificationCodeInput",
				verificationCodeLength: 6,
				verificationCodeExpiresInText: "Code expires in 05:00 minutes"
			}
		] as StepViewField[],
		kybButtons: [
			{
				label: "Save and verify later",
				color: ButtonColors.Plain,
				onClick: async () => {},
				"data-testid": "save-and-verify-later"
			},
			{
				label: "Continue",
				color: ButtonColors.Secondary,
				rightIcon: ArrowRight,
				showRightIcon: true,
				onClick: async () => {},
				"data-testid": "continue"
			}
		]
	}
};
