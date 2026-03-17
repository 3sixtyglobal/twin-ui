#!/usr/bin/env node
// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Safely add a new icon entry to `src/icons/iconManifest.ts`.
 *
 * Usage:
 *   node scripts/add-icon.mjs --export-name User --phosphor-name User
 *
 * Optional:
 *   --file-name user
 *   --dry-run
 *
 * Rules:
 * - `exportName` is required and must be PascalCase.
 * - `phosphorName` is required and must be PascalCase.
 * - `fileName` defaults to camelCase derived from `exportName`.
 * - The manifest remains sorted by `fileName`.
 * - Duplicate `fileName` or `exportName` entries are rejected.
 *
 * After adding an icon, run:
 *   npm run prebuild
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MANIFEST_PATH = path.resolve(__dirname, '../src/icons/iconManifest.ts');

function printUsage() {
	process.stdout.write(`Usage:
  node scripts/add-icon.mjs --export-name User --phosphor-name User

Options:
  --export-name <PascalCase>    Public TWIN export name, e.g. UserCircle
  --phosphor-name <PascalCase>  Source icon from @phosphor-icons/react, e.g. UserCircle
  --file-name <camelCase>       Optional generated file name, defaults from export name
  --dry-run                     Print the updated manifest instead of writing it
  --help                        Show this message
`);
}

function parseArgs(argv) {
	const args = {
		exportName: undefined,
		phosphorName: undefined,
		fileName: undefined,
		dryRun: false,
		help: false
	};

	for (let index = 0; index < argv.length; index++) {
		const arg = argv[index];

		switch (arg) {
			case '--export-name':
				args.exportName = argv[index + 1];
				index++;
				break;
			case '--phosphor-name':
				args.phosphorName = argv[index + 1];
				index++;
				break;
			case '--file-name':
				args.fileName = argv[index + 1];
				index++;
				break;
			case '--dry-run':
				args.dryRun = true;
				break;
			case '--help':
			case '-h':
				args.help = true;
				break;
			default:
				if (arg.startsWith('--')) {
					throw new Error(`Unknown argument: ${arg}`);
				}
		}
	}

	return args;
}

function isPascalCase(value) {
	return /^[A-Z][A-Za-z0-9]*$/.test(value);
}

function isCamelCase(value) {
	return /^[a-z][A-Za-z0-9]*$/.test(value);
}

function pascalToCamel(value) {
	return value.charAt(0).toLowerCase() + value.slice(1);
}

function readManifestFile() {
	if (!fs.existsSync(MANIFEST_PATH)) {
		throw new Error(`Manifest file not found: ${MANIFEST_PATH}`);
	}

	return fs.readFileSync(MANIFEST_PATH, 'utf8');
}

async function loadManifestEntries() {
	const manifestModule = await import(pathToFileURL(MANIFEST_PATH).href);
	const entries = manifestModule.iconManifest;

	if (!Array.isArray(entries) || entries.length === 0) {
		throw new Error('Could not load any icon manifest entries.');
	}

	return entries.map(entry => {
		if (
			!entry ||
			typeof entry !== 'object' ||
			typeof entry.fileName !== 'string' ||
			typeof entry.exportName !== 'string' ||
			typeof entry.phosphorName !== 'string'
		) {
			throw new Error(
				'Each icon manifest entry must include string fileName, exportName, and phosphorName values.'
			);
		}

		return {
			fileName: entry.fileName,
			exportName: entry.exportName,
			phosphorName: entry.phosphorName
		};
	});
}

function validateNewEntry(entries, newEntry) {
	if (!isPascalCase(newEntry.exportName)) {
		throw new Error(
			`Invalid exportName "${newEntry.exportName}". Expected PascalCase, e.g. "UserCircle".`
		);
	}

	if (!isPascalCase(newEntry.phosphorName)) {
		throw new Error(
			`Invalid phosphorName "${newEntry.phosphorName}". Expected PascalCase, e.g. "UserCircle".`
		);
	}

	if (!isCamelCase(newEntry.fileName)) {
		throw new Error(
			`Invalid fileName "${newEntry.fileName}". Expected camelCase, e.g. "userCircle".`
		);
	}

	const duplicateFile = entries.find(entry => entry.fileName === newEntry.fileName);
	if (duplicateFile) {
		throw new Error(
			`An icon with fileName "${newEntry.fileName}" already exists (exportName: "${duplicateFile.exportName}").`
		);
	}

	const duplicateExport = entries.find(entry => entry.exportName === newEntry.exportName);
	if (duplicateExport) {
		throw new Error(
			`An icon with exportName "${newEntry.exportName}" already exists (fileName: "${duplicateExport.fileName}").`
		);
	}
}

function formatEntry(entry) {
	return `\t{ fileName: "${entry.fileName}", exportName: "${entry.exportName}", phosphorName: "${entry.phosphorName}" }`;
}

function rebuildManifestContent(originalContent, entries) {
	const startMarker = 'export const iconManifest: ReadonlyArray<IconManifestEntry> = [';
	const endMarker = '] as const;';

	const startIndex = originalContent.indexOf(startMarker);
	const endIndex = originalContent.indexOf(endMarker, startIndex);

	if (startIndex === -1 || endIndex === -1) {
		throw new Error('Could not locate iconManifest array boundaries.');
	}

	const before = originalContent.slice(0, startIndex + startMarker.length);
	const after = originalContent.slice(endIndex);

	const formattedEntries = entries.map(formatEntry).join(',\n');

	return `${before}\n${formattedEntries}\n${after}`;
}

async function main() {
	const args = parseArgs(process.argv.slice(2));

	if (args.help) {
		printUsage();
		return;
	}

	if (!args.exportName || !args.phosphorName) {
		printUsage();
		throw new Error('Both --export-name and --phosphor-name are required.');
	}

	const fileName = args.fileName ?? pascalToCamel(args.exportName);

	const originalContent = readManifestFile();
	const entries = await loadManifestEntries();

	const newEntry = {
		fileName,
		exportName: args.exportName,
		phosphorName: args.phosphorName
	};

	validateNewEntry(entries, newEntry);

	const updatedEntries = [...entries, newEntry].sort((left, right) =>
		left.fileName.localeCompare(right.fileName)
	);

	const updatedContent = rebuildManifestContent(originalContent, updatedEntries);

	if (args.dryRun) {
		process.stdout.write(`${updatedContent}\n`);
		process.stdout.write(
			`\nDry run complete. Would add icon "${newEntry.exportName}" as "${newEntry.fileName}".\n`
		);
		return;
	}

	fs.writeFileSync(MANIFEST_PATH, `${updatedContent}\n`, 'utf8');

	process.stdout.write(
		`✅ Added icon "${newEntry.exportName}" to iconManifest.ts with fileName "${newEntry.fileName}" and phosphorName "${newEntry.phosphorName}".\n`
	);
	process.stdout.write(
		'Next step: run `npm run prebuild` to regenerate icon wrappers and exports.\n'
	);
}

try {
	await main();
} catch (error) {
	process.stderr.write(`❌ ${error.message}\n`);
	process.exit(1);
}
