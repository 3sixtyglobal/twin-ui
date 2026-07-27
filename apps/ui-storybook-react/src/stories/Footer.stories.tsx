// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "@twin.org/ui-components-react";
import { House, Envelope, File } from "@twin.org/ui-components-react/icons";

/**
 * Storybook metadata for Footer component
 */
const meta: Meta<typeof Footer> = {
	title: "Components/Footer",
	component: Footer,
	parameters: {
		layout: "fullscreen"
	}
};

export default meta;

/**
 * Story collection for the Footer component.
 * Demonstrates various configurations and use cases of the Footer component.
 * @type {Story}
 */
type Story = StoryObj<typeof meta>;

/**
 * Default Footer story
 */
export const Default: Story = {
	args: {
		body: (
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<Footer.Brand
							href="https://www.twin.org"
							src="https://assets.weforum.org/sites/a0eTG000008PHKPYA4/3LI3Z9COsps.jpg"
							alt="Twin Logo"
							name="TWIN"
						/>
					</div>
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
						<div>
							{/* Mobile */}
							<div className="my-4 sm:hidden">
								<h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
									Documentation
								</h2>
							</div>
							<div className="sm:hidden [&_a]:text-gray-600">
								<Footer.LinkGroup col>
									<Footer.Link href="#">Introduction</Footer.Link>
									<Footer.Link href="#">Application</Footer.Link>
									<Footer.Link href="#">Quick Start</Footer.Link>
								</Footer.LinkGroup>
							</div>

							{/* Desktop (original) */}
							<div className="hidden sm:block">
								<Footer.Title title="About" />
							</div>
							<div className="hidden sm:block">
								<Footer.LinkGroup col>
									<Footer.Link href="#">About TWIN</Footer.Link>
									<Footer.Link href="#">Documentation</Footer.Link>
									<Footer.Link href="#">Resources</Footer.Link>
								</Footer.LinkGroup>
							</div>
						</div>
						<div>
							{/* Mobile */}
							<div className="mb-4 mt-4 sm:hidden">
								<h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
									Resources
								</h2>
							</div>
							<div className="sm:hidden [&_a]:text-gray-600">
								<Footer.LinkGroup col>
									<Footer.Link href="#">Trade Guidelines</Footer.Link>
									<Footer.Link href="#">Commodity Lookup</Footer.Link>
								</Footer.LinkGroup>
							</div>

							{/* Desktop (original) */}
							<div className="hidden sm:block">
								<Footer.Title title="Follow us" />
							</div>
							<div className="hidden sm:block">
								<Footer.LinkGroup col>
									<Footer.Link href="#">Github</Footer.Link>
									<Footer.Link href="#">Discord</Footer.Link>
									<Footer.Link href="#">Twitter</Footer.Link>
								</Footer.LinkGroup>
							</div>
						</div>
						<div>
							{/* Mobile */}
							<div className="mb-4 sm:hidden">
								<h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
									Help
								</h2>
							</div>
							<div className="sm:hidden [&_a]:text-gray-600">
								<Footer.LinkGroup col>
									<Footer.Link href="#">FAQs</Footer.Link>
									<Footer.Link href="#">Support</Footer.Link>
								</Footer.LinkGroup>
							</div>

							{/* Desktop (original) */}
							<div className="hidden sm:block">
								<Footer.Title title="Legal" />
							</div>
							<div className="hidden sm:block">
								<Footer.LinkGroup col>
									<Footer.Link href="#">Privacy Policy</Footer.Link>
									<Footer.Link href="#">Terms & Conditions</Footer.Link>
									<Footer.Link href="#">Cookie Policy</Footer.Link>
								</Footer.LinkGroup>
							</div>
						</div>
					</div>
				</div>
				<Footer.Divider />
				<div className="sm:flex sm:items-center sm:justify-between">
					{/* Mobile */}
					<div className="text-sm text-gray-600 sm:hidden">
						© 2025 3rd Chain Ltd. All rights reserved.
					</div>
					{/* Desktop (original) */}
					<div className="hidden sm:block">
						<Footer.Copyright href="https://www.twin.org" by="TWIN™" year={2025} />
					</div>
					<div className="mt-4 hidden space-x-6 sm:mt-0 sm:flex sm:justify-center">
						<Footer.Icon href="#" icon={House} ariaLabel="Visit our homepage" />
						<Footer.Icon href="#" icon={Envelope} ariaLabel="Contact us" />
						<Footer.Icon href="#" icon={File} ariaLabel="View updates" />
						<Footer.Icon href="#" icon={File} ariaLabel="View documentation" />
					</div>
				</div>
			</div>
		)
	}
};
