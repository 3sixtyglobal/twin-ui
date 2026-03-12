# Class: FigmaVariables

The figma variable processing.

## Constructors

### Constructor

> **new FigmaVariables**(): `FigmaVariables`

#### Returns

`FigmaVariables`

## Methods

### loadDefaultVariables() {#loaddefaultvariables}

> `static` **loadDefaultVariables**(): [`IFigmaVariableCollections`](../interfaces/IFigmaVariableCollections.md)

Load the default figma variables.

#### Returns

[`IFigmaVariableCollections`](../interfaces/IFigmaVariableCollections.md)

The default figma variables.

***

### getVariableCollection() {#getvariablecollection}

> `static` **getVariableCollection**(`figmaVariables`, `collectionName`): [`IFigmaVariableCollection`](../interfaces/IFigmaVariableCollection.md) \| `undefined`

Get the specified figma variables collection.

#### Parameters

##### figmaVariables

[`IFigmaVariableCollections`](../interfaces/IFigmaVariableCollections.md)

A complete figma variables object.

##### collectionName

`string`

The name of the collection to get.

#### Returns

[`IFigmaVariableCollection`](../interfaces/IFigmaVariableCollection.md) \| `undefined`

The tailwind config theme.

***

### getVariableFromCollection() {#getvariablefromcollection}

> `static` **getVariableFromCollection**(`collections`, `collectionName`, `variableName`): `string` \| `number` \| `undefined`

Get the specified variable from the collection.

#### Parameters

##### collections

A complete figma variables object.

##### collectionName

`string`

The name of the collection to get.

##### variableName

`string`

The name of the variable to get.

#### Returns

`string` \| `number` \| `undefined`

The variable if it exists.
