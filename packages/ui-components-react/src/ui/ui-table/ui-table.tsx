import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const tableVariants = cva("w-full caption-bottom text-sm", {
	variants: {
		variant: {
			default: "overflow-visible"
		}
	},
	defaultVariants: {
		variant: "default"
	}
});

const tableHeaderVariants = cva("[&_tr]:border-b", {
	variants: {
		variant: {
			default: "bg-surface-third"
		}
	},
	defaultVariants: {
		variant: "default"
	}
});

const tableBodyVariants = cva("[&_tr:last-child]:border-0", {
	variants: {
		variant: {
			default: ""
		}
	},
	defaultVariants: {
		variant: "default"
	}
});

const tableRowVariants = cva(
	"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
	{
		variants: {
			variant: {
				default: ""
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

const tableHeadVariants = cva(
	"h-10 whitespace-nowrap text-left align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
	{
		variants: {
			variant: {
				default: "p-4 text-secondary font-semibold"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

const tableCellVariants = cva(
	"whitespace-nowrap align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
	{
		variants: {
			variant: {
				default: "px-4 py-4"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

function Table({
	className,
	variant,
	...props
}: React.ComponentProps<"table"> & VariantProps<typeof tableVariants>) {
	return (
		<div data-slot="table-container" className="relative w-full overflow-x-visible">
			<table data-slot="table" className={cn(tableVariants({ variant, className }))} {...props} />
		</div>
	);
}

function TableHeader({
	className,
	variant,
	...props
}: React.ComponentProps<"thead"> & VariantProps<typeof tableHeaderVariants>) {
	return (
		<thead
			data-slot="table-header"
			className={cn(tableHeaderVariants({ variant, className }))}
			{...props}
		/>
	);
}

function TableBody({
	className,
	variant,
	...props
}: React.ComponentProps<"tbody"> & VariantProps<typeof tableBodyVariants>) {
	return (
		<tbody
			data-slot="table-body"
			className={cn(tableBodyVariants({ variant, className }))}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
			{...props}
		/>
	);
}

function TableRow({
	className,
	variant,
	...props
}: React.ComponentProps<"tr"> & VariantProps<typeof tableRowVariants>) {
	return (
		<tr data-slot="table-row" className={cn(tableRowVariants({ variant, className }))} {...props} />
	);
}

function TableHead({
	className,
	variant,
	...props
}: React.ComponentProps<"th"> & VariantProps<typeof tableHeadVariants>) {
	return (
		<th
			data-slot="table-head"
			className={cn(tableHeadVariants({ variant, className }))}
			{...props}
		/>
	);
}

function TableCell({
	className,
	variant,
	...props
}: React.ComponentProps<"td"> & VariantProps<typeof tableCellVariants>) {
	return (
		<td
			data-slot="table-cell"
			className={cn(tableCellVariants({ variant, className }))}
			{...props}
		/>
	);
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cn("text-muted-foreground mt-4 text-sm", className)}
			{...props}
		/>
	);
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
