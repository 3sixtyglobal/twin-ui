# Class: TailwindConfig

The tailwind config.

## Constructors

### Constructor

> **new TailwindConfig**(): `TailwindConfig`

#### Returns

`TailwindConfig`

## Methods

### generateTheme() {#generatetheme}

> `static` **generateTheme**(`figmaVariablesCollections`, `replacements?`, `flattenSections?`, `removeSections?`): `Partial`\<`CustomThemeConfig` & `object`\> \| `undefined`

Generate the tailwind config theme from the figma variables.

#### Parameters

##### figmaVariablesCollections

[`IFigmaVariableCollection`](../interfaces/IFigmaVariableCollection.md)[]

The figma variables collection.

##### replacements?

`object`[] = `...`

The replacements to apply to the theme.

##### flattenSections?

`string`[] = `...`

The sections to flatten from the variables.

##### removeSections?

`string`[] = `...`

The sections to remove from the variables.

#### Returns

`Partial`\<`CustomThemeConfig` & `object`\> \| `undefined`

The tailwind config theme.

***

### buildContentPath() {#buildcontentpath}

> `static` **buildContentPath**(`npmRoot`, `pkg`, `extensions`): `string`

Build a content path.

#### Parameters

##### npmRoot

`string`

The root for the node modules.

##### pkg

`string`

The package to get the content from.

##### extensions

`string`[]

The extensions to use for content processing.

#### Returns

`string`

The content path.

***

### getPlugins() {#getplugins}

> `static` **getPlugins**(): (`PluginCreator` \| \{ \} \| ((`options`) => `object`) \| `undefined`)[] \| `undefined`

Get the plugins.

#### Returns

(`PluginCreator` \| \{ \} \| ((`options`) => `object`) \| `undefined`)[] \| `undefined`

The plugins.

***

### getDefaultThemeReplacements() {#getdefaultthemereplacements}

> `static` **getDefaultThemeReplacements**(): `object`[]

Get the default theme replacements.

#### Returns

`object`[]

The default theme replacements.

***

### getDefaultFlattenSections() {#getdefaultflattensections}

> `static` **getDefaultFlattenSections**(): `string`[]

Strip the sections from the variables.

#### Returns

`string`[]

The sections to strip from variables.

***

### getDefaultRemoveSections() {#getdefaultremovesections}

> `static` **getDefaultRemoveSections**(): `string`[]

Remove the specified sections.

#### Returns

`string`[]

The sections to remove from variables.
