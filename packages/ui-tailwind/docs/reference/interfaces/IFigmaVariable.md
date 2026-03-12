# Interface: IFigmaVariable

Figma variable.

## Properties

### name {#name}

> **name**: `string`

The name of the variable.

***

### type {#type}

> **type**: `string`

The type of the variable.

***

### isAlias {#isalias}

> **isAlias**: `boolean`

Is the variable an alias.

***

### value {#value}

> **value**: `string` \| `number` \| [`IFigmaVariableAlias`](IFigmaVariableAlias.md) \| \{\[`id`: `string`\]: `unknown`; \}

The value of the variable.
