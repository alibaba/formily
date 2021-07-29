---
order: 1
---

# Field

Call the Field model returned by [createField](/api/models/form#createfield).

All model attributes are listed below. If the attribute is writable, then we can directly refer to it to modify the attribute, and @formily/reactive will respond to trigger the UI update.

## Attributes

| Property       | Description                                  | Type                                        | Read-only or not | Default value |
| -------------- | -------------------------------------------- | ------------------------------------------- | ---------------- | ------------- |
| initialized    | Has the field been initialized               | Boolean                                     | No               | `false`       |
| mounted        | Is the field mounted                         | Boolean                                     | No               | `false`       |
| unmounted      | Is the field unmounted                       | Boolean                                     | No               | `false`       |
| address        | Field node path                              | [FormPath](/api/entry/form-path)            | Yes              |               |
| path           | Field data path                              | [FormPath](/api/entry/form-path)            | Yes              |               |
| title          | Field Title                                  | [FieldMessage](#fieldmessage)               | No               | `""`          |
| description    | Field description                            | [FieldMessage](#fieldmessage)               | No               | `""`          |
| loading        | Field loading status                         | Boolean                                     | No               | `false`       |
| validating     | Is the field being validated                 | Boolean                                     | No               | `false`       |
| modified       | Whether the field has been manually modified | Boolean                                     | No               | `false`       |
| active         | Is the field active                          | Boolean                                     | No               | `false`       |
| visited        | Whether the field has been visited           | Boolean                                     | No               | `false`       |
| inputValue     | Field input value                            | Any                                         | No               | `null`        |
| inputValues    | Field input value collection                 | Array                                       | No               | `[]`          |
| dataSource     | Field data source                            | Array                                       | No               | `[]`          |
| validator      | Field validator                              | [FieldValidator](#fieldvalidator)           | No               | `null`        |
| decorator      | field decorator                              | Any[]                                       | No               | `null`        |
| component      | Field component                              | Any[]                                       | No               | `null`        |
| feedbacks      | Field feedback information                   | [IFieldFeedback](#ifieldfeedback)[]         | No               | `[]`          |
| parent         | Parent field                                 | [GeneralField](#generalfield)               | yes              | `null`        |
| errors         | Field error message                          | [FieldMessage](#fieldmessage)[]             | No               | `[]`          |
| warnings       | Field warning message                        | [FieldMessage](#fieldmessage)[]             | No               | `[]`          |
| successes      | Field success message                        | [FieldMessage](#fieldmessage)[]             | No               | `[]`          |
| valid          | Is the field valid                           | Boolean                                     | Yes              | `true`        |
| invalid        | Is the field illegal                         | Boolean                                     | Yes              | `true`        |
| value          | Field value                                  | Any                                         | No               |               |
| initialValue   | Field default value                          | Any                                         | No               |               |
| display        | Field display status                         | [FieldDisplayTypes](#fielddisplaytypes)     | No               | `"visible"`   |
| pattern        | Field interaction mode                       | [FieldPatternTypes](#fieldpatterntypes)     | No               | `"editable"`  |
| required       | Is the field required                        | Boolean                                     | No               | `false`       |
| hidden         | Whether the field is hidden                  | Boolean                                     | No               | `false`       |
| visible        | Whether the field is displayed               | Boolean                                     | No               | `true`        |
| disabled       | Whether the field is disabled                | Boolean                                     | No               | `false`       |
| readOnly       | Is the field read-only                       | Boolean                                     | No               | `false`       |
| readPretty     | Whether the field is in the reading state    | Boolean                                     | No               | `false`       |
| editable       | Field is editable                            | Boolean                                     | No               | `true`        |
| validateStatus | Field validation status                      | [FieldValidateStatus](#fieldvalidatestatus) | yes              | `null`        |

#### explain in detail

**active**

Trigger onFocus is true, trigger onBlur is false

**visited**

Triggered onFocus will always be true

**inputValue**

Trigger the value collected by onInput

**inputValues**

Trigger the multi-parameter values collected by onInput

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

### setDataSource

#### Description

Set field data source

#### Signature

```ts
interface setDataSource {
  (dataSource?: FieldDataSource): void
}
```

FieldDataSource Reference [FieldDataSource](#fielddatasource)

### setFeedback

#### Description

Set field message feedback

#### Signature

```ts
interface setFeedback {
  (feedback?: IFieldFeedback): void
}
```

IFieldFeedback Reference [IFieldFeedback](#ifieldfeedback)

### setErrors

#### Description

Set the field error message, here is a feedback update with EffectError as the code, mainly to prevent pollution of the checker result, if you want to force overwrite, you can use setFeedback

#### Signature

```ts
interface setErrors {
  (messages?: FieldMessage[]): void
}
```

### setWarnings

#### Description

Set the field warning information, here is a feedback update with EffectWarning as the code, mainly to prevent pollution of the checker result, if you want to force overwrite, you can use setFeedback

#### Signature

```ts
interface setWarning {
  (messages?: FieldMessage[]): void
}
```

### setSuccesses

#### Description

Set the field success information, here is a feedback update with EffectSuccess as the code, mainly to prevent pollution of the checker result, if you want to force overwrite, you can use setFeedback

#### Signature

```ts
interface setSuccesses {
  (messages?: FieldMessage[]): void
}
```

### setValidator

#### Description

Set field validator

#### Signature

```ts
interface setValidator {
  (validator?: FieldValidator): void
}
```

FieldValidator Reference [FieldValidator](#fieldvalidator)

### setRequired

#### Description

Whether the setting field is required

#### Signature

```ts
interface setRequired {
  (required?: boolean): void
}
```

### setValue

#### Description

Set field value

#### Signature

```ts
interface setValue {
  (value?: FieldValue): void
}
```

FieldValue Reference [FieldValue](#fieldvalue)

### setInitialValue

#### Description

Set field default value

#### Signature

```ts
interface setInitialValue {
  (initialValue?: FieldValue): void
}
```

FieldValue Reference [FieldValue](#fieldvalue)

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

### setLoading

#### Description

Set field loading status

#### Signature

```ts
interface setLoading {
  (loading?: boolean): void
}
```

### setValidating

#### Description

Set field verification status

#### Signature

```ts
interface setValidating {
  (validating?: boolean): void
}
```

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
  (state: IFieldState): void
  (callback: (state: IFieldState) => void): void
}
```

IFieldState Reference [IFieldState](#ifieldstate)

### getState

#### Description

Get field status

#### Signature

```ts
interface getState<T> {
  (): IFieldState
  (callback: (state: IFieldState) => T): T
}
```

IFieldState Reference [IFieldState](#ifieldstate)

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

### onInput

#### Description

Trigger field entry

#### Signature

```ts
interface onInput {
  (...args: any[]): Promise<void>
}
```

### onFocus

#### Description

Trigger field focus

#### Signature

```ts
interface onFocus {
  (...args: any[]): Promise<void>
}
```

### onBlur

#### Description

Trigger field out of focus

#### Signature

```ts
interface onBlur {
  (...args: any[]): Promise<void>
}
```

### validate

#### Description

Trigger field verification

#### Signature

```ts
interface validate {
  (triggerType?: 'onInput' | 'onFocus' | 'onBlur'): Promise<IValidateResults>
}
```

IValidateResults Reference [IValidateResults](#ivalidateresults)

### reset

#### Description

Trigger field reset, if verification is set, then the returned result is the verification result

#### Signature

```ts
interface reset {
  (options?: IFieldResetOptions): Promise<IValidateResults>
}
```

IFieldResetOptions Reference [IFieldResetOptions](#ifieldresetoptions)

IValidateResults Reference [IValidateResults](#ivalidateresults)

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

### queryFeedbacks

#### Description

Query the feedback information of the current field

#### Signature

```ts
interface queryFeedbacks {
  (search: ISearchFeedback): IFieldFeedback[]
}
```

ISearchFeedback Reference [ISearchFeedback](/api/models/field#isearchfeedback)

IFieldFeedback Reference [IFieldFeedback](#ifieldfeedback)

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

### FieldValidator

Field validator, the type is more complicated and needs to be digested carefully by the user

```ts
//String format validator
type ValidatorFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'number'
  | 'integer'
  | 'idcard'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | (string & {}) //Other format validators need to be registered through registerValidateFormats

//Object type verification result
interface IValidateResult {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}
//Object validator
interface IValidatorRules<Context = any> {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur'
  format?: ValidatorFormats
  validator?: ValidatorFunction<Context>
  required?: boolean
  pattern?: RegExp | string
  max?: number
  maximum?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
  minimum?: number
  min?: number
  len?: number
  whitespace?: boolean
  enum?: any[]
  message?: string
  [key: string]: any //Other attributes need to be registered through registerValidateRules
}
//Function type validator check result type
type ValidatorFunctionResponse = null | string | boolean | IValidateResult

//Functional validator
type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null

//Non-array validator
type ValidatorDescription =
  | ValidatorFormats
  | ValidatorFunction<Context>
  | IValidatorRules<Context>

//Array type validator
type MultiValidator<Context = any> = ValidatorDescription<Context>[]

type FieldValidator<Context = any> =
  | ValidatorDescription<Context>
  | MultiValidator<Context>
```

### FieldMessage

```ts
type FieldMessage = string | JSXElement
```

If under the UI framework that supports JSX, we can directly pass the Node of JSX, otherwise, we can only pass the string

### FieldDataSource

```ts
type FieldDataSource<ValueType> = Array<{
  label: string | JSXElement
  value: ValueType
  [key: string]: any
}>
```

The field data source is actually an array. The form of the content is determined by the user, but we recommend that users express the data source in the form of label/value. It should be noted here that if it is to be used in the UI framework, it is not set directly. To be effective, the dataSource property must be bound to a specific UI component to be effective. For example, using @formily/react, if you want to bind the state, you can use the connect function, or you can directly get the field instance through useField in the component. consumption.

### FieldValue

The field value type is actually the `Any` type, but it is important to mention that if it is a mandatory array type in ArrayField, it is a mandatory object type in ObjectField.

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

### FieldValidateStatus

```ts
type FieldValidateStatus = 'error' | 'warning' | 'success' | 'validating'
```

### GeneralField

```ts
type GeneralField = Field | VoidField | ArrayField | ObjectField
```

VoidField Reference [VoidField](/api/models/void-field)

ArrayField Reference [ArrayField](/api/models/array-field)

ObjectField Reference [ObjectField](/api/models/object-field)

### IFieldFeedback

```ts
interface IFieldFeedback {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' //Verify the trigger type
  type?: 'error' | 'success' | 'warning' //feedback type
  code?: //Feedback code
  | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  messages?: string[] //Feedback message
}
```

### ISearchFeedback

```ts
interface ISearchFeedback {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' //Verify the trigger type
  type?: 'error' | 'success' | 'warning' //feedback type
  code?: //Feedback code
  | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  address?: FormPathPattern
  path?: FormPathPattern
  messages?: string[]
}
```

### IFieldState

```ts
interface IFieldState {
  hidden?: boolean
  visible?: boolean
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  title?: any
  description?: any
  loading?: boolean
  validating?: boolean
  modified?: boolean
  active?: boolean
  visited?: boolean
  inputValue?: FieldValue
  inputValues?: any[]
  initialized?: boolean
  dataSource?: FieldDataSource
  mounted?: boolean
  unmounted?: boolean
  validator?: FieldValidator
  decorator?: FieldDecorator
  component?: FieldComponent
  readonly parent?: GeneralField
  errors?: FieldMessage[]
  warnings?: FieldMessage[]
  successes?: FieldMessage[]
  readonly valid?: boolean
  readonly invalid?: boolean
  value?: FieldValue
  initialValue?: FieldValue
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  required?: boolean
  readonly validateStatus?: 'error' | 'success' | 'warning' | 'validating'
}
```

### IGeneralFieldState

```ts
type IGeneralFieldState = IFieldState & IVoidFieldState
```

IVoidFieldState Reference [IVoidFieldState](/api/models/void-field#ivoidfieldstate)

### IFieldResetOptions

```ts
interface IFieldResetOptions {
  forceClear?: boolean //Whether to force clear
  validate?: boolean //Whether to verify
}
```

### IValidateResults

```ts
interface IValidateResults {
  error?: string[]
  warning?: string[]
  success?: string[]
}
```

> Formily Typescript type convention
>
> - Simple non-object data types or Union data types use type to define the type, and cannot start with an uppercase `I` character
> - Simple object types use interface to define the type uniformly, and start with an uppercase `I` character. If there are combinations of different interfaces (Intersection or Extends), use type to define the type, and also start with an uppercase `I` character
