# TWIN UI Component React

This package contains the react UI components.

## Installation

```shell
npm install @twin.org/ui-components-react
```

## Icons

Icons are available from the `@twin.org/ui-components-react/icons` entrypoint.

These icon components are generated wrappers around [`@phosphor-icons/react`](https://github.com/phosphor-icons/react), which lets this package keep a stable TWIN icon API while avoiding hand-maintained SVG component files.

### Usage

```ts
import { UserCircle, Plus } from '@twin.org/ui-components-react/icons';
```

### Props

TWIN icon components accept the existing `IconsProps` API, including:

- `color`
- `width`
- `height`
- `className`
- `type`

The `type` prop maps to Phosphor icon weights:

- `thin`
- `light`
- `regular`
- `bold`
- `fill`
- `duotone`

### Tree-shaking

For the smallest bundles, prefer named imports from `@twin.org/ui-components-react/icons`.

### Adding a new icon

Icons are generated from the manifest in `src/icons/iconManifest.ts`.

To add a new icon such as `User`, add a new manifest entry:

```ts
{ fileName: "user", exportName: "User", phosphorName: "User" }
```

Then regenerate the icon wrappers and exports:

```shell
npm run prebuild
```

If you prefer, you can also use the optional helper script to add the manifest entry for you:

```shell
node scripts/add-icon.mjs --export-name User --phosphor-name User
```

This regenerates:

- `src/icons/*.tsx`
- `src/icons/index.ts`
- package exports in `package.json`

After that, the icon can be imported as:

```ts
import { User } from '@twin.org/ui-components-react/icons';
```

`src/icons/iconManifest.ts` is the single source of truth for generated icons.

## Testing

This package uses [Vitest](https://vitest.dev/) for testing. The following test commands are available:

```shell
# Run tests
npm test

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Documentation

- [TypeScript React Best Practices](docs/typescript-react-best-practices.md) - Guidelines for TypeScript React component development
- [Tree-Shaking Best Practices](docs/tree-shaking-best-practices.md) - Optimize your bundle size with proper import strategies
- [Component Template Example](docs/component-template-example.md) - Complete example of a component following best practices
- [Centralized Constants Guide](docs/centralized-constants-guide.md) - Guide to using the centralized constants for improved maintainability and tree-shaking
- [Examples](docs/examples.md) - Usage examples of the components
- [Changelog](docs/changelog.md) - Changes between each version
