# Form model

Earlier I talked about the overall architecture of the Formily kernel, and also talked about MVVM. You should also be able to roughly understand what Formily's form model is. Let's take a deeper look at the specific domain logic of the form model, which is mainly biased. Concluding content, if you don't understand it the first time, you can go directly to the API documentation, and come back after reading it, you can deepen your understanding of formily.

## Combing

The entire form model is very large and complicated. In fact, the core of the decomposition is the following sub-models:

- Field management model
- Field model
- Data model
- Linkage model
- Path system

Let's talk about how the form model is managed in detail below.

## Field Management Model

The field management model mainly includes:

- Field addition
- Field query
- Import field set
- Export field set
- Clear the field set

#### Field addition

The field is created mainly through the createField/createArrayField/createObjectField/createVoidField method. If the field already exists, it will not be created repeatedly

#### Field query

The query method is mainly used to query the field. The query method can pass in the path of the field or regular expression to match the field.

Because the detailed rules of the field path are still more complicated, they will be explained in detail in the following [Path System](/api/entry/form-path) article.

Then calling the query method will return a Query object. The Query object can have a forEach/map/reduce method that traverses all fields in batches, or a take method that takes only the first field that is queried, as well as direct reading of fields. The get method of properties, and the getIn method that can read field properties in depth, the difference between the two methods is that the former can have smart prompts, and the latter has no prompts, so it is recommended that users use the get method.

#### Import field set

The field set is imported mainly through setFormGraph. The input parameter format is a flat object format, the key is the absolute path of the field, and the value is the state of the field. Use this API to import the Immutable field state into the form in some scenarios that require time travel. In the model.

#### Export field set

The field set is mainly exported through getFormGraph. The export format is a flat object format, the key is the absolute path of the field, and the value is the state of the field, which is consistent with the imported field set input parameters. Because the returned data is an Immutable data, it is OK Completely persistent storage, convenient for time travel.

#### Clear the field set

The field set is cleared mainly through clearFormGraph.

## Field Model

The field model mainly includes:

- Field model, which is mainly responsible for managing the state of non-incremental fields, such as Input/Select/NumberPicker/DatePicker components
- The ArrayField model is mainly responsible for managing the state of the auto-increment list field, and can add, delete, and move list items.
- ObjectField model, which is mainly responsible for managing the state of auto-incremented object fields, and can add or delete the key of the object.
- The VoidField model is mainly responsible for managing the state of the virtual field. The virtual field is a node that does not pollute the form data, but it can control the display and hiding of its child nodes, and the interactive mode.

Because the field model is very complicated, it will be explained in detail in the following [Field Model](/guide/field) article.

## Data Model

For the form data model, the previous version of Formily will more or less have some boundary problems. After reorganizing a version in 2.x, it really broke through the previous legacy problems.

The data model mainly includes:

- Form values (values) management
- Form default value (initialValues) management
- Field value (value) management
- Field default value (initialValue) management
- Value and default value selection merge strategy

Form value management is actually the values attribute of an object structure, but it is an @formily/reactive observable attribute. At the same time, with the help of @formily/reactive's deep observer capability, it monitors any attribute changes, and if it changes, it will trigger The life cycle hook of onFormValuesChange.

In the same way, the default value management is actually the initialValues property of an object structure. It will also deeply monitor property changes and trigger the onFormInitialValues life cycle hook.

Field value management is reflected in the value attribute of each data type field. Formily will maintain a data path attribute called path for each field, and then read and write values are all read and write the values of the top-level form. This ensures that the value of the field and the value of the form are absolutely idempotent, and the default value of the field is the same.

To sum up, the management of **values is all managed on the top-level form, and the value of the field and the value of the form are absolutely idempotent through path. **

<Alert>

The difference between the value and the default value is actually whether the field will be reset to the default value state when the form is reset

</Alert>

#### Value and default value selection merge strategy

Usually, in the process of business development, there is always a need for data echo. This data is generally used as an asynchronous default value. If it is used as a detail page, it is okay, but as an editing page, there will be some problems. :

**There is a conflict**

For example, the form value is `{xx:123}`, and the default form value is `{xx:321}`. The strategy here is:

- If `xx` does not have a corresponding field model, it means it is just redundant data and cannot be modified by the user
  - If the form value is assigned first, and the default value is assigned later, then the default value directly overrides the form value. This scenario is suitable for asynchronous data echo scenarios. Different business states have different default data echoes, and the data is finally submitted.` {xx:321}`
  - If the default value is assigned first, and the form value is assigned later, the form value directly overrides the default value. This scenario is suitable for synchronizing the default value and finally submitting the data `{xx:123}`
- If `xx` has a field model
  - If the form value is assigned first, the default value is assigned later
    - If the current field has been modified by the user (modified is true), then the default value cannot overwrite the form value, and finally submit the data `{xx:123}`
    - If the current field has not been modified by the user (modified is false), then the default value will directly override the field value. This scenario is suitable for asynchronous data echo scenarios. Different business states have different default data echoes, and the data is finally submitted `{xx:321}`
  - If the default value is assigned first, and the form value is assigned later, the form value directly overrides the default value. This scenario is suitable for synchronizing the default value and finally submitting the data `{xx:123}`

**No conflicts**

For example, the form value is `{xx:123}`, and the default form value is `{yy:321}`. The strategy here is to merge directly.

To sum up, the selection and merging strategy of the value and the default value, the core is to see whether the field has been modified by the user, everything is subject to the user, if it has not been modified by the user, the order of assignment shall prevail.\*\*

<Alert>

The default value mentioned here can be assigned repeatedly, and it is also the question of whether to discard the value in the process of repeated assignment.

</Alert>

## Validation model

The core of the form verification model is to verify the validity of the data, and then manage the verification results, so the verification model mainly includes:

- Validation rule management
- Calibration result management

Because the verification model belongs to the field model, it will be explained in detail in the following [Field Model](/guide/field#Verification Rules)

## Linkage model

The core of the linkage model in formily1.x is the active linkage model, which is roughly expressed in one sentence:

```ts
setFieldState(Subscribe(FormLifeCycle, Selector(Path)), TargetState)
```

The explanation is that any linkage is based on a certain life cycle hook of the form to trigger the state of the field under the specified path. Such a model can solve many problems, but it also has an obvious problem, which is the many-to-one linkage. In the scenario where you need to monitor changes in multiple fields at the same time to control the state of a field, the implementation cost is still relatively high for users, especially to achieve some calculator linkage requirements, and the amount of code increases sharply. Of course, for one-to-many scenarios, this model is the most efficient.

Therefore, in formily 2.x, a passive linkage model is added to the active linkage model, which is also an expression:

```ts
subscribe(Dependencies, Reactions)
```

Simplified a lot, the core is to respond to dependent data changes. The dependent data can be form model attributes or attributes of any field model. The response action can be to change the attributes of any field model or do other asynchronous actions. . Such a model is also a complete linkage model, but in a one-to-many scenario, the implementation cost will be higher than the active model.

Therefore, the two linkage models require users to choose according to their own needs.

## Path system

The path system is very important. The path system is used everywhere in almost the entire form model. It mainly provides the following capabilities for the form model:

- It can be used to find any field from the field set, and it also supports batch search according to the rules
- It can be used to express the model of the relationship between the fields. With the help of the path system, we can find the father of a certain field, can find the father, and can also realize the data inheritance ability of the tree level. Similarly, we can also find the data of a certain field. Adjacent node
- It can be used to read and write field data, read and write data with deconstruction

The entire path system is actually implemented based on the path DSL of @formily/path. If you want to know more about the path system, you can take a look at [FormPath API](/api/entry/form-path) in detail
