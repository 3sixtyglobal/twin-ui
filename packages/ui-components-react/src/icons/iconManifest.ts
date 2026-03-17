// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Manifest of icons exported by this package and their corresponding
 * component names from `@phosphor-icons/react`.
 *
 * The `fileName` is used for generating wrapper files in `src/icons`.
 * The `exportName` is the public component name exported by this package.
 * The `phosphorName` is the source component imported from `@phosphor-icons/react`.
 */
export interface IconManifestEntry {
	fileName: string;
	exportName: string;
	phosphorName: string;
}

/**
 * Central source of truth for generated icon wrappers and `src/icons/index.ts`.
 */
export const iconManifest: ReadonlyArray<IconManifestEntry> = [
	{ fileName: "arrowRight", exportName: "ArrowRight", phosphorName: "ArrowRight" },
	{ fileName: "arrowRightFat", exportName: "ArrowRightFat", phosphorName: "ArrowFatRight" },
	{ fileName: "bag", exportName: "Bag", phosphorName: "Bag" },
	{ fileName: "bell", exportName: "Bell", phosphorName: "Bell" },
	{ fileName: "briefcase", exportName: "Briefcase", phosphorName: "Briefcase" },
	{ fileName: "building", exportName: "Building", phosphorName: "Building" },
	{ fileName: "calendarDots", exportName: "CalendarDots", phosphorName: "CalendarDots" },
	{ fileName: "camera", exportName: "Camera", phosphorName: "Camera" },
	{ fileName: "caretDown", exportName: "CaretDown", phosphorName: "CaretDown" },
	{ fileName: "caretLeft", exportName: "CaretLeft", phosphorName: "CaretLeft" },
	{ fileName: "chartBar", exportName: "ChartBar", phosphorName: "ChartBar" },
	{ fileName: "check", exportName: "Check", phosphorName: "Check" },
	{ fileName: "checkCircle", exportName: "CheckCircle", phosphorName: "CheckCircle" },
	{ fileName: "clipboard", exportName: "Clipboard", phosphorName: "Clipboard" },
	{ fileName: "clock", exportName: "Clock", phosphorName: "Clock" },
	{
		fileName: "dotsThreeVertical",
		exportName: "DotsThreeVertical",
		phosphorName: "DotsThreeVertical"
	},
	{ fileName: "envelope", exportName: "Envelope", phosphorName: "Envelope" },
	{ fileName: "eye", exportName: "Eye", phosphorName: "Eye" },
	{ fileName: "file", exportName: "File", phosphorName: "File" },
	{ fileName: "fileLock", exportName: "FileLock", phosphorName: "FileLock" },
	{ fileName: "filePdf", exportName: "FilePdf", phosphorName: "FilePdf" },
	{ fileName: "fileText", exportName: "FileText", phosphorName: "FileText" },
	{ fileName: "fingerprint", exportName: "Fingerprint", phosphorName: "Fingerprint" },
	{ fileName: "fire", exportName: "Fire", phosphorName: "Fire" },
	{ fileName: "folders", exportName: "Folders", phosphorName: "Folders" },
	{ fileName: "gear", exportName: "Gear", phosphorName: "Gear" },
	{ fileName: "globe", exportName: "Globe", phosphorName: "Globe" },
	{ fileName: "house", exportName: "House", phosphorName: "House" },
	{
		fileName: "identificationCard",
		exportName: "IdentificationCard",
		phosphorName: "IdentificationCard"
	},
	{ fileName: "image", exportName: "Image", phosphorName: "Image" },
	{ fileName: "info", exportName: "Info", phosphorName: "Info" },
	{ fileName: "keyboard", exportName: "Keyboard", phosphorName: "Keyboard" },
	{ fileName: "link", exportName: "Link", phosphorName: "Link" },
	{ fileName: "list", exportName: "List", phosphorName: "List" },
	{ fileName: "lock", exportName: "Lock", phosphorName: "Lock" },
	{ fileName: "magnifyingGlass", exportName: "MagnifyingGlass", phosphorName: "MagnifyingGlass" },
	{ fileName: "mapPin", exportName: "MapPin", phosphorName: "MapPin" },
	{ fileName: "megaphone", exportName: "Megaphone", phosphorName: "Megaphone" },
	{ fileName: "notePencil", exportName: "NotePencil", phosphorName: "NotePencil" },
	{ fileName: "paperClip", exportName: "PaperClip", phosphorName: "Paperclip" },
	{ fileName: "pencilLine", exportName: "PencilLine", phosphorName: "PencilLine" },
	{ fileName: "phone", exportName: "Phone", phosphorName: "Phone" },
	{ fileName: "plus", exportName: "Plus", phosphorName: "Plus" },
	{ fileName: "question", exportName: "Question", phosphorName: "Question" },
	{ fileName: "sealCheck", exportName: "SealCheck", phosphorName: "SealCheck" },
	{ fileName: "sealPercent", exportName: "SealPercent", phosphorName: "SealPercent" },
	{ fileName: "shieldCheck", exportName: "ShieldCheck", phosphorName: "ShieldCheck" },
	{ fileName: "shieldWarning", exportName: "ShieldWarning", phosphorName: "ShieldWarning" },
	{ fileName: "shoppingCart", exportName: "ShoppingCart", phosphorName: "ShoppingCart" },
	{ fileName: "star", exportName: "Star", phosphorName: "Star" },
	{ fileName: "trash", exportName: "Trash", phosphorName: "Trash" },
	{ fileName: "upload", exportName: "Upload", phosphorName: "Upload" },
	{ fileName: "user", exportName: "User", phosphorName: "User" },
	{ fileName: "userCircle", exportName: "UserCircle", phosphorName: "UserCircle" },
	{ fileName: "userPlus", exportName: "UserPlus", phosphorName: "UserPlus" },
	{ fileName: "userRectangle", exportName: "UserRectangle", phosphorName: "IdentificationCard" },
	{ fileName: "usersThree", exportName: "UsersThree", phosphorName: "UsersThree" },
	{ fileName: "warningCircle", exportName: "WarningCircle", phosphorName: "WarningCircle" },
	{ fileName: "x", exportName: "X", phosphorName: "X" },
	{ fileName: "xCircle", exportName: "XCircle", phosphorName: "XCircle" }
] as const;
