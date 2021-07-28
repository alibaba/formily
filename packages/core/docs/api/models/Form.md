---
order: 0
---

# Form

Call the core [Form Model](/guide/form) API returned by [createForm](/api/entry/create-form), the following will list all model attributes, if the attribute is writable, then we can directly The reference is to modify the attribute, and @formily/reactive will respond to trigger the UI update.

## Attributes

| Property      | Description                                       | Type                                  | Read-only or not | Default value     |
| ------------- | ------------------------------------------------- | ------------------------------------- | ---------------- | ----------------- |
| initialized   | Whether the form is initialized                   | Boolean                               | No               | `false`           |
| validating    | Is the form being validated                       | Boolean                               | No               | `false`           |
| submitting    | Is the form being submitted                       | Boolean                               | No               | `false`           |
| modified      | Whether the form value has been manually modified | Boolean                               | No               | `false`           |
| pattern       | Form interaction mode                             | [FormPatternTypes](#formpatterntypes) | No               | `"editable"`      |
| display       | Form display form                                 | [FormDisplayTypes](#formdisplaytypes) | No               | `"visible"`       |
| mounted       | Is the form mounted                               | Boolean                               | No               | `false`           |
| unmounted     | Is the form unmounted                             | Boolean                               | No               | `false`           |
| values        | form values                                       | Object                                | No               | `{}`              |
| initialValues | Form default values                               | Object                                | No               | `{}`              |
| valid         | Is the form valid                                 | Boolean                               | Yes              | `true`            |
| invalid       | Is the form illegal                               | Boolean                               | Yes              | `false`           |
| errors        | Form validation error message                     | [IFormFeedback](#iformfeedback)[]     | Yes              | `[]`              |
| warnings      | Form verification warning message                 | [IFormFeedback](#iformfeedback)[]     | Yes              | `[]`              |
| successes     | Form verification success message                 | [IFormFeedback](#iformfeedback)[]     | Yes              | `[]`              |
| hidden        | Whether the form is hidden                        | Boolean                               | No               | `false`           |
| visible       | Whether the form is displayed                     | Boolean                               | No               | `true`            |
| editable      | Is the form editable                              | Boolean                               | No               | `true`            |
| readOnly      | Is the form read-only                             | Boolean                               | No               | `false`           |
| disabled      | Whether the form is disabled                      | Boolean                               | No               | `false`           |
| readPretty    | Is the form in a read state                       | Boolean                               | No               | `false`           |
| id            | Form ID                                           | String                                | No               | `{RANDOM_STRING}` |
| displayName   | Model label                                       | String                                | No               | `"Form"`          |

## Method

### createField

#### Description

Create a factory function for a Field instance. If the path is the same and called multiple times, the instance object will be reused

#### Signature

```ts
interface createField {
  (props: IFieldFactoryProps): Field
}
```

For function entry, please refer to [IFieldFactoryProps](#ifieldfactoryprops)

### createArrayField

#### Description

A factory function for creating an ArrayField instance. If the path is the same and called multiple times, the instance object will be reused

#### Signature

```ts
interface createArrayField {
  (props: IFieldFactoryProps): ArrayField
}
```

For function entry, please refer to [IFieldFactoryProps](#ifieldfactoryprops)

### createObjectField

#### Description

A factory function to create an ObjectField instance. If the path is the same and called multiple times, it will reuse the instance object

#### Signature

```ts
interface createObjectField {
  (props: IFieldFactoryProps): ArrayField
}
```

For function entry, please refer to [IFieldFactoryProps](#ifieldfactoryprops)

### createVoidField

#### Description

A factory function to create a VoidField instance. If the path is the same and called multiple times, the instance object will be reused

#### Signature

```ts
interface createVoidField {
  (props: IVoidFieldFactoryProps): ArrayField
}
```

For function entry, please refer to [IVoidFieldFactoryProps](#ivoidfieldfactoryprops)

### setValues

#### Description

Set the form value, you can set the merge strategy [IFormMergeStrategy](#iformmergestrategy)

#### Signature

```ts
interface setValues {
  (values: object, strategy: IFormMergeStrategy = 'merge'): void
}
```

### setInitialValues

#### Description

Set the default value of the form, you can set the merge strategy

#### Signature

```ts
interface setInitialValues {
  (initialValues: object, strategy: IFormMergeStrategy = 'merge'): void
}
```

### setValuesIn

#### Description

Precisely set form values

#### Signature

```ts
interface setValuesIn {
  (path: FormPathPattern, value: any): void
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### setInitialValuesIn

#### Description

Precisely set the form default value

#### Signature

```ts
interface setInitialValuesIn {
  (path: FormPathPattern, initialValue: any): void
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### existValuesIn

#### Description

Determine whether the value exists according to the specified path

#### Signature

```ts
interface existValuesIn {
  (path: FormPathPattern): boolean
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### existInitialValuesIn

#### Description

Determine whether the default value exists according to the specified path

#### Signature

```ts
interface existInitialValuesIn {
  (path: FormPathPattern): boolean
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### getValuesIn

#### Description

Get the form value according to the specified path

#### Signature

```ts
interface getValuesIn {
  (path: FormPathPattern): any
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### getInitialValuesIn

#### Description

Get the default value of the form according to the specified path

#### Signature

```ts
interface getInitialValuesIn {
  (path: FormPathPattern): any
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### deleteValuesIn

#### Description

Delete the form value according to the specified path

#### Signature

```ts
interface deleteValuesIn {
  (path: FormPathPattern): void
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### deleteInitialValuesIn

#### Description

Delete the default value of the form according to the specified path

#### Signature

```ts
interface deleteInitialValuesIn {
  (path: FormPathPattern): void
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### setSubmitting

#### Description

Set whether the form is being submitted

#### Signature

```ts
interface setSubmitting {
  (submitting: boolean): void
}
```

### setValidating

#### Description

Set whether the form is verifying status

#### Signature

```ts
interface setValidating {
  (validating: boolean): void
}
```

### setDisplay

#### Description

Set form display status

#### Signature

```ts
interface setDisplay {
  (display: FormDisplayTypes): void
}
```

For function entry, please refer to [FormDisplayTypes](#formdisplaytypes)

### setPattern

#### Description

Set the form interaction mode

#### Signature

```ts
interface setPattern {
  (pattern: FormPatternTypes): void
}
```

For function entry, please refer to [FormPatternTypes](#formpatterntypes)

### addEffects

#### Description

Add side effects

#### Signature

```ts
interface addEffects {
  (id: string, effects: (form: Form) => void): void
}
```

### removeEffects

#### Description

Remove side effects, the id is consistent with the id of addEffects

#### Signature

```ts
interface removeEffects {
  (id: string): void
}
```

### setEffects

#### Description

Overwrite update side effects

#### Signature

```ts
interface setEffects {
  (effects: (form: Form) => void): void
}
```

### clearErrors

#### Description

Clear error message

#### Signature

```ts
interface clearErrors {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### clearWarnings

#### Description

Clear warning message

#### Signature

```ts
interface clearWarnings {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### clearSuccesses

#### Description

Clear success message

#### Signature

```ts
interface clearSuccesses {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

### query

#### Description

Query field node

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

Query message feedback

#### Signature

```ts
interface queryFeedbacks {
  (search: ISearchFeedback): IFormFeedback[]
}
```

ISearchFeedback Reference [ISearchFeedback](/api/models/field#isearchfeedback)

IFormFeedback Reference [IFormFeedback](#iformfeedback)

### notify

#### Description

Broadcast message

#### Signature

```ts
interface notify<T> {
  (type?: string, payload: T): void
}
```

### subscribe

#### Description

Subscribe to news

#### Signature

```ts
interface subscibe<T> {
  (callback: (payload: T) => void): number
}
```

### unsubscribe

#### Description

unsubscribe

#### Signature

```ts
interface unsubscribe {
  (id: number): void
}
```

### onInit

#### Description

Trigger form initialization, no need to manually call by default

#### Signature

```ts
interface onInit {
  (): void
}
```

### onMount

#### Description

Trigger mount

#### Signature

```ts
interface onMount {
  (): void
}
```

### onUnmount

#### Description

Trigger offload

#### Signature

```ts
interface onUnmount {
  (): void
}
```

### setState

#### Description

Set form status

#### Signature

```ts
interface setState {
  (callback: (state: IFormState) => void): void
  (state: IFormState): void
}
```

IFormState Reference [IFormState](#iformstate)

### getState

#### Description

Get form status

#### Signature

```ts
interface getState<T> {
  (): IFormState
  (callback: (state: IFormState) => T): T
}
```

IFormState Reference [IFormState](#iformstate)

### setFormState

Consistent with setState API

### getFormState

Consistent with getState API

### setFieldState

#### Description

Set field status

#### Signature

```ts
interface setFieldState {
  (pattern: FormPathPattern, setter: (state: IGeneralFieldState) => void): void
  (pattern: FormPathPattern, setter: IGeneralFieldState): void
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

IGeneralFieldState Reference [IGeneralFieldState](/api/models/field/#igeneralfieldstate)

### getFieldState

#### Description

Get field status

#### Signature

```ts
interface getFieldState<T> {
  (pattern: FormPathPattern): IGeneralFieldState
  (pattern: FormPathPattern, callback: (state: IGeneralFieldState) => T): T
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

IGeneralFieldState Reference [IGeneralFieldState](/api/models/field/#igeneralfieldstate)

### getFormGraph

#### Description

Get form field set

#### Signature

```ts
interface getFormGraph {
  (): {
    [key: string]: GeneralFieldState | FormState
  }
}
```

### setFormGraph

#### Description

Set the form field set

#### Signature

```ts
interface setFormGraph {
  (graph: { [key: string]: GeneralFieldState | FormState }): void
}
```

### clearFormGraph

#### Description

Clear the field set

#### Signature

```ts
interface clearFormGraph {
  (pattern: FormPathPattern): void
}
```

### validate

#### Description

The form verification trigger can be verified according to the specified path. If the verification is successful, there will be no return, and the verification failure will be returned in the promise reject [IFormFeedback](#iformfeedback)[]

#### Signature

```ts
interface validate {
  (pattern: FormPathPattern): Promise<void>
}
```

### submit

#### Description

In the form submission method, if the Promise is returned in the onSubmit callback function, the form will set the submitting status to true at the beginning of the submission, and then set it to false when the Promise resolves. The view layer can consume the submitting status to prevent repeated submissions.

#### Signature

```ts
interface submit<T> {
  (): Promise<Form['values']>
  (onSubmit?: (values: Form['values']) => Promise<T> | void): Promise<T>
}
```

### reset

#### Description

Form reset method, you can specify the specific field to be reset, or you can specify automatic verification when reset

#### Description

```ts
interface reset {
  (pattern: FormPathPattern, options?: IFieldResetOptions): Promise<void>
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

IFieldResetOptions Reference [IFieldResetOptions](/api/models/field/#ifieldresetoptions)

## Types of

<Alert>
Note: If you want to manually consume the type, just export it directly from the package module
</Alert>

### FormPatternTypes

```ts
type FormPatternTypes = 'editable' | 'disabled' | 'readOnly' | 'readPretty'
```

### FormDisplayTypes

```ts
type FormDisplayTypes = 'none' | 'hidden' | 'visible'
```

### IFormFeedback

```ts
interface IFormFeedback {
  path?: string //Check field data path
  address?: string //The absolute path of the verification field
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

### IFormState

```ts
interface IFormState {
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  hidden?: boolean
  visible?: boolean
  initialized?: boolean
  validating?: boolean
  submitting?: boolean
  modified?: boolean
  pattern?: FormPatternTypes
  display?: FormDisplayTypes
  values?: any
  initialValues?: any
  mounted?: boolean
  unmounted?: boolean
  readonly valid?: boolean
  readonly invalid?: boolean
  readonly errors?: IFormFeedback[]
  readonly warnings?: IFormFeedback[]
  readonly successes?: IFormFeedback[]
}
```

### IFormMergeStrategy

```ts
type IFormMergeStrategy = 'overwrite' | 'merge' | 'deepMerge' | 'shallowMerge'
```

### IFieldFactoryProps

```ts
interface IFieldFactoryProps {
  name: FormPathPattern //Field name, the path name of the current node
  basePath?: FormPathPattern //base path
  title?: string | JSXElement //Field title
  description?: string | JSXElement //Field description
  value?: any //Field value
  initialValue?: any //Field default value
  required?: boolean //Is the field required
  display?: 'none' | 'hidden' | 'visible' //Field display form
  pattern?: 'editable' | 'disabled' | 'readOnly' | 'readPretty' //Field interaction mode
  hidden?: boolean //whether the field is hidden
  visible?: boolean //Whether the field is displayed
  editable?: boolean //Is the field editable
  disabled?: boolean //Whether the field is disabled
  readOnly?: boolean //Is the field read-only
  readPretty?: boolean //Whether the field is in the read state
  dataSource?: any[] //Field data source
  validateFirst?: boolean //Does the field verification only verify the first illegal rule?
  validator?: FieldValidator //Field validator
  decorator?: any[] //Field decorator, the first element represents the component reference, the second element represents the component attribute
  component?: any[] //Field component, the first element represents the component reference, the second element represents the component attribute
  reactions?: FieldReaction[] | FieldReaction //Field responder
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

FieldValidator Reference [FieldValidator](/api/models/field#fieldvalidator)

FieldReaction Reference [FieldReaction](/api/models/field#fieldreaction)

### IVoidFieldFactoryProps

```ts
interface IFieldFactoryProps {
  name: FormPathPattern //Field name, the path name of the current node
  basePath?: FormPathPattern //base path
  title?: string | JSXElement //Field title
  description?: string | JSXElement //Field description
  required?: boolean //Is the field required
  display?: 'none' | 'hidden' | 'visible' //Field display form
  pattern?: 'editable' | 'disabled' | 'readOnly' | 'readPretty' //Field interaction mode
  hidden?: boolean //whether the field is hidden
  visible?: boolean //Whether the field is displayed
  editable?: boolean //Is the field editable
  disabled?: boolean //Whether the field is disabled
  readOnly?: boolean //Is the field read-only
  readPretty?: boolean //Whether the field is in the read state
  decorator?: any[] //Field decorator, the first element represents the component reference, the second element represents the component attribute
  component?: any[] //Field component, the first element represents the component reference, the second element represents the component attribute
  reactions?: FieldReaction[] | FieldReaction //Field responder
}
```

FormPathPattern API Reference [FormPath](/api/entry/form-path#formpathpattern)

FieldReaction Reference [FieldReaction](/api/models/field#fieldreaction)

> Formily Typescript type convention
>
> - Simple non-object data types or Union data types use type to define the type, and cannot start with an uppercase `I` character
> - Simple object types use interface to define the type uniformly, and start with an uppercase `I` character. If there are combinations of different interfaces (Intersection or Extends), use type to define the type, and also start with an uppercase `I` character
