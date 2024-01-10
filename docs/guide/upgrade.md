# V2 Upgrade Guide

It is important to mention here that Formily2 is very different from Formily1.x, and there are a lot of Break Changes.

Therefore, for old users, they basically need to learn again, and V1 and V2 cannot be upgraded smoothly.

But the original intention of the Formily2 project is to reduce everyone's learning costs, because the old users themselves have a certain understanding of Formily's core ideas. In order to help old users learn Formily2 more quickly, this article will list the core differences between V1 and V2. , and will not list the new capabilities.

## Kernel Difference

> This mainly refers to the difference between @formily/core

Because Formily1.x users mainly use setFieldState/setFormState and getFieldState/getFormState when using the core APIs, these APIs are retained in V2, but the internal model properties are semantically different. The differences are as follows:

**modified**

- V1: Represent whether the field has been changed, in fact, it is of no use, because the initialization of the field means that it has been changed.
- V2: Indicates whether the field is manually modified, that is, it will be set to true when the component triggers the onChange event.

**inputed**

- V1: Represent Whether the field has been manually modified
- V2: Remove, use modified uniformly

**pristine**

- V1:Represent whether the field value is equal to initialValue
- V2: Remove, user manual judgment, this attribute will cause a lot of dirty checks

**display**

- V1: Represent whether the field is displayed, if it is false, the field value will not be removed
- V2: Represent the field display mode, the value is `"none" | "visible" | "hidden"`

**touched**

- V1: Redundant field
- V2: Remove

**validating**

- V1: Whether the representative field is being verified
- V2: Remove, use validateStatus uniformly

**effectErrors/effectWarnings**

- V1: Errors and warnings that represent the manual operation of the user
- V2: Remove, use feedbacks uniformly

**ruleErrors/ruleWarnings**

- V1: Errors and warnings representing the verification operation of the validator
- V2: Remove, use feedbacks uniformly

**values**

- V1: Represent all the parameters returned by the onChange event
- V2: Remove, use inputValues uniformly

**rules**

- V1: Represent verification rules
- V2: Remove, use validator uniformly, because rules literally means rules, but the meaning of rules is very big, not limited to verification rules

**props**

- V1: Represent the extended attributes of the component, and the positioning is very unclear. In the pure JSX scenario, it represents the collection of component attributes and FormItem attributes. In the Schema scenario, it represents the attributes of the Schema field.
- V2: Remove, use decorator and component uniformly

**VirtualField**

- V1: Represents a virtual field
- V2: Renamed and use [VoidField](https://core.formilyjs.org/api/models/void-field) uniformly

## Bridge layer differences

> This mainly refers to the difference between @formily/react and @formily/react-schema-renderer.

**createFormActions/createAsyncFormActions**

- V1 Create a Form operator, you can call the setFieldState/setFormState method.
- V2 is removed, and the operation status of the Form instance created by [createForm](https://core.formilyjs.org/api/entry/create-form) in @formily/core is used uniformly.

**Form**

- V1 will create a Form instance inside, which can control the transfer of values/initialValues attributes, etc.
- V2 removed, unified use of [FormProvider](https://react.formilyjs.org/api/components/form-provider)

**SchemaForm**

- V1 will parse the json-schema protocol internally, create a Form instance, support controlled mode, and render it.
- V2 is removed, the SchemaField component created by [createSchemaField](https://react.formilyjs.org/api/components/schema-field) is used uniformly, and the controlled mode is not supported.

**Field**

- V1 supports controlled mode, which requires the use of render props for component state mapping.
- V2 does not support controlled mode, you can quickly implement state mapping by passing in the decorator/component property.

**VirtualField**

- V1 supports controlled mode, which requires the use of render props for component state mapping.
- V2 does not support controlled mode, renamed [VoidField](https://react.formilyjs.org/api/components/void-field), and passed in the decorator/component property to quickly implement state mapping.

**FieldList**

- V1 Represent auto-incremented field control component
- V2 Renamed to [ArrayField](https://react.formilyjs.org/api/components/array-field)

**FormSpy**

- V1 Monitor all life cycle triggers and re-render
- V2 Remove and use [FormConsumer](https://react.formilyjs.org/api/components/form-consumer)

**SchemaMarkupField**

- V1 Stands for Schema description label component
- V2 Remove, unified use the description label component created by the [createSchemaField](https://react.formilyjs.org/api/components/schema-field)

**useFormQuery**

- V1 Fast Hook for realizing form query, supporting middleware mechanism
- V2 Temporarily remove

**useForm**

- V1 Represents the creation of a Form instance
- V2 Represents the Form instance in the consumption context, if you want to create it, please use [createForm](https://react.formilyjs.org/api/entry/create-form)

**useField**

- V1 Represents the creation of a Field instance
- V2 Represents the Field instance in the consumption context, if you want to create it, please call [form.createField](https://core.formilyjs.org/api/models/form#createfield)

**useVirtualField**

- V1 Represents the creation of a VirtualField instance
- V2 Remove, if you want to create, please call [form.createVoidField](https://core.formilyjs.org/api/models/form#createvoidfield)

**useFormState**

- V1 Form state in consumption context
- V2 Remove, use [useForm](https://react.formilyjs.org/api/hooks/use-form) uniformly

**useFieldState**

- V1 consume Field status in context
- V2 Remove, use [useField](https://react.formilyjs.org/api/hooks/use-field)

**useFormSpy**

- V1 Create a lifecycle listener and trigger a re-render
- V2 Remove

**useSchemaProps**

- V1Cconsume rops of SchemaField in context
- V2 Remove, use [useFieldSchema](https://react.formilyjs.org/api/hooks/use-field-schema) uniformly

**connect**

- V1 Standard HOC
- V2 The higher-order function is changed to 1st order, and the properties have changed dramatically. See the [connect document](https://react.formilyjs.org/api/shared/connect) for details

**registerFormField/registerVirtaulBox/registerFormComponent/registerFormItemComponent**

- V1 Globally registered components
- V2 Remove, global registration is no longer supported

**FormEffectHooks**

- V1 RxJS lifecycle hook
- V2 Remove, export from @formily/core uniformly, and will not return RxJS Observable object

**effects**

- V1 Support callback function`$` selector
- V2 Remove`$`selector

## Protocol layer differences

> This mainly refers to the difference in the JSON Schema protocol

**editable**

- V1 is directly in the Schema description, indicating whether the field can be edited
- V2 Renamed x-editable

**visible**

- V1 Indicates whether the field is displayed
- V2 Renamed x-visible

**display**

- V1 Represent whether the field is displayed or not, if it is false, it represents the hidden behavior without deleting the value
- V2 Renamed x-display, which represents the field display mode, and the value is`"none" | "visible" | "hidden"`

**triggerType**

- V1 Represent the field verification timing
- V2 Remove, please use`x-validator:[{triggerType:"onBlur",validator:()=>...}]`

**x-props**

- V1 Represents the FormItem property
- V2 Remove, please use x-decorator-props

**x-rules**

- V1 Represent field verification rules
- V2 Renamed x-validator

**x-linkages**

- V1 Represent field linkage
- V2 Remove, use x-reactions uniformly

**x-mega-props**

- V1 Represent the sub-component properties of the MegaLayout component
- V2 Remove

## Component library differences

In Formily 1.x, we mainly use @formily/antd and @formily/antd-components, or @formily/next and @formily/next-components.

In V2, we have the following changes:

- @formily/antd and @formily/antd-components were merged into @formily/antd, and the directory structure was changed to that of a pure component library.

- The internal API of @formily/react @formily/core will no longer be exported.
- Almost all components have been rewritten and cannot be smoothly upgraded.
- Remove styled-components.
