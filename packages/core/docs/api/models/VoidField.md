---
order: 4
---

# VoidField

Call the VoidField model returned by [createVoidField](/api/models/form#createvoidfield).

All model attributes are listed below. If the attribute is writable, then we can directly refer to it to modify the attribute, and @formily/reactive will respond to trigger the UI update.

## Attributes

| Property    | Description                               | Type                                    | Read-only or not | Default value |
| ----------- | ----------------------------------------- | --------------------------------------- | ---------------- | ------------- |
| initialized | Whether the field has been initialized    | Boolean                                 | No               | `false`       |
| mounted     | Is the field mounted                      | Boolean                                 | No               | `false`       |
| unmounted   | Is the field unmounted                    | Boolean                                 | No               | `false`       |
| address     | Field node path                           | [FormPath](/api/entry/form-path)        | Yes              |               |
| path        | Field data path                           | [FormPath](/api/entry/form-path)        | Yes              |               |
| title       | Field Title                               | [FieldMessage](#fieldmessage)           | No               | `""`          |
| description | Field description                         | [FieldMessage](#fieldmessage)           | No               | `""`          |
| decorator   | field decorator                           | Any[]                                   | No               | `null`        |
| component   | Field component                           | Any[]                                   | No               | `null`        |
| parent      | Parent field                              | [GeneralField](#generalfield)           | yes              | `null`        |
| display     | Field display status                      | [FieldDisplayTypes](#fielddisplaytypes) | No               | `"visible"`   |
| pattern     | Field interaction mode                    | [FieldPatternTypes](#fieldpatterntypes) | No               | `"editable"`  |
| hidden      | Whether the field is hidden               | Boolean                                 | No               | `false`       |
| visible     | Whether the field is displayed            | Boolean                                 | No               | `true`        |
| disabled    | Whether the field is disabled             | Boolean                                 | No               | `false`       |
| readOnly    | Is the field read-only                    | Boolean                                 | No               | `false`       |
| readPretty  | Whether the field is in the reading state | Boolean                                 | No               | `false`       |
| editable    | Field is editable                         | Boolean                                 | No               | `true`        |

#### explain in detail

**hidden**

When true, display is hidden, when false, display is visible

**visible**

When true, display is visible, when false, display is none

## Method

### setTitle

#### Description

Set field title

#### Signature

```ts
interface setTitle {
  (title?: FieldMessage): void
}
```

FieldMessage Reference [FieldMessage](#fieldmessage)

### setDescription

#### Description

Set field description information

#### Signature

```ts
interface setDescription {
  (title?: FieldMessage): void
}
```

FieldMessage Reference [FieldMessage](#fieldmessage)

### setDisplay

#### Description

Set field display status

#### Signature

```ts
interface setDisplay {
  (display?: FieldDisplayTypes): void
}
```

FieldDisplayTypes Reference [FieldDisplayTypes](#fielddisplaytypes)

### setPattern

#### Description

Set field interaction mode

#### Signature

```ts
interface setPattern {
  (pattern?: FieldPatternTypes): void
}
```

FieldPatternTypes Reference [FieldPatternTypes](#fieldpatterntypes)

### setComponent

#### Description

Set field component

#### Signature

```ts
interface setComponent {
  (component?: FieldComponent, props?: any): void
}
```

FieldComponent Reference [FieldComponent](#fieldcomponent)

### setComponentProps

#### Description

Set field component properties

#### Signature

```ts
interface setComponentProps {
  (props?: any): void
}
```

### setDecorator

#### Description

Set field decorator

#### Signature

```ts
interface setDecorator {
  (decorator?: FieldDecorator, props?: any): void
}
```

FieldDecorator Reference [FieldDecorator](#fielddecorator)

### setDecoratorProps

#### Description

Set field decorator properties

#### Signature

```ts
interface setDecoratorProps {
  (props?: any): void
}
```

### setState

#### Description

Set field status

#### Signature

```ts
interface setState {
  (state: IVoidFieldState): void
  (callback: (state: IVoidFieldState) => void): void
}
```

IVoidFieldState Reference [IVoidFieldState](#ifieldstate)

### getState

#### Description

Get field status

#### Signature

```ts
interface getState<T> {
  (): IVoidFieldState
  (callback: (state: IVoidFieldState) => T): T
}
```

IVoidFieldState Reference [IVoidFieldState](#ifieldstate)

### onInit

#### Description

Trigger field initialization, no need to call manually

#### Signature

```ts
interface onInit {
  (): void
}
```

### onMount

#### Description

Trigger field mount

#### Signature

```ts
interface onMount {
  (): void
}
```

### onUnmount

#### Description

Trigger field unloading

#### Signature

```ts
interface onUnmount {
  (): void
}
```

### query

#### Description

Query field, you can query adjacent fields based on the current field

#### Signature

```ts
interface query {
  (pattern: FormPathPattern): Query
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

Query object API reference [Query](/api/models/query)

### dispose

#### Description

Release observer, no need to release manually by default

#### Signature

```ts
interface dispose {
  (): void
}
```

### destroy

#### Description

Release observer, and remove current field model

#### Signature

```ts
interface destroy {
  (): void
}
```

### match

#### Description

Match fields based on path

#### Signature

```ts
interface match {
  (pattern: FormPathPattern): boolean
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

## Types of

<Alert>
Note: If you want to manually consume the type, just export it directly from the package module
</Alert>

### FieldMessage

```ts
type FieldMessage = string | JSXElement
```

If under the UI framework that supports JSX, we can directly pass the Node of JSX, otherwise, we can only pass the string

### FieldComponent

```ts
type FieldComponent = string | JSXComponentConstructor
```

Field component, if we use it in a framework that supports JSX, FieldComponent recommends to store the JSX component reference directly, otherwise it can store a component identification string and distribute it during actual rendering.

### FieldDecorator

```ts
type FieldDecorator = string | JSXComponentConstructor
```

Field decorator, if we use it in a framework that supports JSX, FieldDecorator recommends to store the JSX component reference directly, otherwise it can store a component identification string and distribute it during actual rendering.

### FieldReaction

```ts
type FieldReaction = (field: GeneralField) => void
```

### FieldDisplayTypes

```ts
type FieldDisplayTypes = 'none' | 'hidden' | 'visible'
```

### FieldPatternTypes

```ts
type FieldPatternTypes = 'editable' | 'disabled' | 'readOnly' | 'readPretty'
```

### GeneralField

```ts
type GeneralField = Field | VoidField | ArrayField | ObjectField
```

Field Reference [Field](/api/models/field)

ArrayField Reference [ArrayField](/api/models/array-field)

ObjectField Reference [ObjectField](/api/models/object-field)

### IVoidFieldState

```ts
interface IVoidFieldState {
  hidden?: boolean
  visible?: boolean
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  title?: any
  description?: any
  modified?: boolean
  active?: boolean
  visited?: boolean
  initialized?: boolean
  mounted?: boolean
  unmounted?: boolean
  decorator?: FieldDecorator
  component?: FieldComponent
  readonly parent?: GeneralField
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
}
```

### IGeneralFieldState

```ts
type IGeneralFieldState = IVoidFieldState & IFieldState
```

IFieldState Reference [IFieldState](/api/models/field#ifieldstate)
