import type { Meta, StoryObj } from "@storybook/react";
import {
	UITable,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
	Badge,
	BadgeColors
} from "@twin.org/ui-components-react";

const meta = {
	title: "UI/Table",
	component: UITable,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A [Data Table](https://ui.shadcn.com/docs/components/data-table) ShadCN component. Use it [TanStack Table](https://tanstack.com/table/v8/docs/framework/react/react-table)."
			}
		}
	},
	// cspell:ignore autodocs
	tags: ["autodocs"]
} satisfies Meta<typeof UITable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for invoice tables
const invoiceData = [
	{ id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
	{ id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
	{ id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
	{ id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
	{ id: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" }
];

// Sample data for user table with badges
const userData = [
	{
		name: "John Doe",
		email: "john@example.com",
		status: "Active",
		statusColor: BadgeColors.Success,
		role: "Admin"
	},
	{
		name: "Jane Smith",
		email: "jane@example.com",
		status: "Pending",
		statusColor: BadgeColors.Warning,
		role: "User"
	},
	{
		name: "Bob Johnson",
		email: "bob@example.com",
		status: "Inactive",
		statusColor: BadgeColors.Failure,
		role: "User"
	},
	{
		name: "Alice Brown",
		email: "alice@example.com",
		status: "Active",
		statusColor: BadgeColors.Success,
		role: "Moderator"
	}
];

// Sample data for settings table
const settingsData = [
	{ name: "Setting 1", value: "Enabled" },
	{ name: "Setting 2", value: "Disabled" },
	{ name: "Setting 3", value: "Auto" }
];

// Sample data for wide table
const wideTableData = [
	["Data 1-1", "Data 1-2", "Data 1-3", "Data 1-4", "Data 1-5", "Data 1-6", "Data 1-7", "Data 1-8"],
	["Data 2-1", "Data 2-2", "Data 2-3", "Data 2-4", "Data 2-5", "Data 2-6", "Data 2-7", "Data 2-8"]
];

// Sample data for orders table
const orderData = [
	{
		id: "ORD001",
		customer: "John Smith",
		status: "Completed",
		statusColor: BadgeColors.Success,
		total: "$1,234.56",
		selected: true
	},
	{
		id: "ORD002",
		customer: "Jane Doe",
		status: "Processing",
		statusColor: BadgeColors.Warning,
		total: "$987.65",
		selected: false
	},
	{
		id: "ORD003",
		customer: "Bob Wilson",
		status: "Shipped",
		statusColor: BadgeColors.Info,
		total: "$543.21",
		selected: false
	}
];

/**
 * Basic table with header and body
 */
export const Default: Story = {
	render: () => (
		<UITable>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoiceData.map(invoice => (
					<TableRow key={invoice.id}>
						<TableCell className="font-medium">{invoice.id}</TableCell>
						<TableCell>{invoice.status}</TableCell>
						<TableCell>{invoice.method}</TableCell>
						<TableCell className="text-right">{invoice.amount}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</UITable>
	)
};

/**
 * Table with a caption
 */
export const WithCaption: Story = {
	render: () => (
		<UITable>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoiceData.slice(0, 3).map(invoice => (
					<TableRow key={invoice.id}>
						<TableCell className="font-medium">{invoice.id}</TableCell>
						<TableCell>{invoice.status}</TableCell>
						<TableCell>{invoice.method}</TableCell>
						<TableCell className="text-right">{invoice.amount}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</UITable>
	)
};

/**
 * Table with footer row showing totals
 */
export const WithFooter: Story = {
	render: () => (
		<UITable>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoiceData.slice(0, 3).map(invoice => (
					<TableRow key={invoice.id}>
						<TableCell className="font-medium">{invoice.id}</TableCell>
						<TableCell>{invoice.status}</TableCell>
						<TableCell>{invoice.method}</TableCell>
						<TableCell className="text-right">{invoice.amount}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$750.00</TableCell>
				</TableRow>
			</TableFooter>
		</UITable>
	)
};

/**
 * Table with badges for status indicators
 */
export const WithBadgesComponent: Story = {
	render: () => (
		<UITable>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Role</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{userData.map(user => (
					<TableRow key={user.email}>
						<TableCell className="font-medium">{user.name}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>
							<Badge color={user.statusColor}>{user.status}</Badge>
						</TableCell>
						<TableCell>{user.role}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</UITable>
	)
};

/**
 * Compact table with minimal content
 */
export const Compact: Story = {
	render: () => (
		<UITable>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Value</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{settingsData.map((setting, index) => (
					<TableRow key={setting.name}>
						<TableCell>{setting.name}</TableCell>
						<TableCell>{setting.value}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</UITable>
	)
};

/**
 * Wide table demonstrating overflow handling
 */
export const WideTable: Story = {
	render: () => (
		<UITable>
			<TableHeader>
				<TableRow>
					{Array.from({ length: 8 }, (_, i) => (
						<TableHead key={i}>Column {i + 1}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{wideTableData.map((row, rowIndex) => (
					<TableRow key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<TableCell key={cell}>{cell}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</UITable>
	)
};

/**
 * Complete example with all features
 */
export const Complete: Story = {
	render: () => (
		<UITable>
			<TableCaption>A complete example with header, body, footer, and caption.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Order</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Total</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orderData.map(order => (
					<TableRow key={order.id} data-state={order.selected ? "selected" : undefined}>
						<TableCell className="font-medium">{order.id}</TableCell>
						<TableCell>{order.customer}</TableCell>
						<TableCell>
							<Badge color={order.statusColor}>{order.status}</Badge>
						</TableCell>
						<TableCell className="text-right">{order.total}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total Revenue</TableCell>
					<TableCell className="text-right font-medium">$2,765.42</TableCell>
				</TableRow>
			</TableFooter>
		</UITable>
	)
};
