# Field model

Formily's field model core contains two types of field models:

- Data type field
- Dummy data type field

Data type field (Field), the core is responsible for maintaining the form data (the value when the form is submitted).

VoidField, you can understand that it is a Field that has castrated data maintenance capabilities, so it is more of a UI form that maintains a batch of fields as a container.

Let's analyze these two types of fields in detail.

## Data field

There are 3 data type fields in the field model:

- Field
- ArrayField
- ObjectField

ArrayField and ObjectField are both inherited from Field. The positioning of Field is to maintain non-incremental data fields. Compared with ArrayField/Object, it does not mean that Field cannot store data of array type or object type. Field can store data of any data type. However, if the user expects to realize the interaction of adding, deleting, and moving arrays, they need to use ArrayField, and for the interaction of adding and deleting object properties, they need to use ObjectField. If there is no such requirement, all data types can be unified with Field.

Then let's look at the specific Field rules:

- Path rules
- Explicit and implicit rules
- Data read and write rules
- Data source rules
- Field component rules
- Field decorator rules
- Validation rules

### Path Rules

Because the form structure of our actual business itself is a tree structure, in Formily, each field will have an absolute path in the form model. This absolute path roughly describes the position of the field in the form data (why use roughly, later I will talk about it), any field can be found through the absolute path, and at the same time the parent-child relationship between the fields can be expressed. Therefore, in the field model, we define the address attribute to express the absolute path of the field, which is mainly described by dot syntax, such as abc The path of represents that the father of field c is field b, and the father of field b is a.

Of course, things are not that simple, because we also have a VoidField, which is a dummy data field, and it also has its own absolute path, because it can be the father of the data field. If we only have an absolute path, we cannot make a data field correct. Write field data to the form data. Reading data will also read the wrong position.

Therefore, we actually need a data path as a dedicated data field for writing data and reading data. Here we use path to describe the data path of the field. You can look at this picture for general rules:

![](//img.alicdn.com/imgextra/i1/O1CN01cdzULJ1et4PBak8si_!!6000000003928-2-tps-3506-2042.png)

In summary, Address is always the absolute path representing the node, and Path is the node path that skips the VoidField, but if it is the Path of the VoidField, it will retain its own path position.

Therefore, whether it is a Field or a VoidField, it will have its Address and Path, so when we use the query method to query the field, we can either use the Address rule to query, or use the Path rule to query, such as `query("bc")` The c field can be queried, and the c field can also be queried with `query("abc")`.

### Explicit and Implicit Rules

The display and hiding of the fields are mainly expressed by the display attribute:

- If display is none, it means that the field UI is hidden and the field data is not retained
- display is hidden, which means that the field UI is hidden and the field data is preserved
- display is visible, which means the field UI is displayed, and the field data is restored at the same time

On top of the display property, we also provide two convenient properties

1. visible, if true, display is equal to visible, if false, display is equal to none
2. hidden, if true, display is equal to hidden, if false, display is equal to visible

The above is about the writing rules of explicit and implicit attributes. The reading rules will be more complicated. Here is a default inheritance logic:

If the parent node actively sets the display property, and the child node does not actively set the display property, then the child node will inherit the display of the parent node

So what is the active setting of display? mainly includes:

- Configure the initial attributes display/visible/hidden for the field
- If there is no configuration during initialization, but display/visible/hidden is set to the field later

So what if you want to change from no inheritance to inheritance? Just set display to null.

### Data read and write rules

Because Field is a data-type field, it is responsible for maintaining the data of a certain node of the form data. The reading here is actually the form data read directly, which is addressed through the path attribute, which also guarantees the form data and field data. Absolutely idempotent, just read value/initialValue directly.

The data writing rules are consistent with the reading rules. Field does not independently maintain a copy of data. It directly operates on the data of the specific form, which is addressed through the path attribute. The main writing methods are:

- Modify the value/initialValue attribute directly
- Calling onInput will write data, and at the same time, set the inputValue of the field as input parameter data, inputValues as multi-parameter data, and then set the modified attribute to true, which means that the field has been manually modified, and finally trigger the verification rule that triggerType is onInput
- Call the setValue method

### Data source rules

Considering that the value source of the field is not only input through the Input input box, but also selected from a data source, such as a drop-down box, the field model adds a data source attribute dataSource, which is dedicated to reading data source. Only a layer of mapping needs to be done on the component consumer side. The method of writing to the data source can directly modify the dataSource property, or call the setDataSource method

### Component Rules

Field model, if there is no proxy UI component information, then more refined linkage control cannot be achieved. For example, if the value of A field changes to control the placeholder of B field, then the field attributes must be proxyed, so formily provides The component property is used to proxy UI component information. The component is an array `[Component,ComponentProps]`. The first element represents which component it is, and the second represents the properties of the component. Why use an array? This is convenient for type prompting, and the writing method is relatively simple.

The way to read component information is to read the component property directly.

The main ways to write component information are:

- Modify the component property directly and pass in the array
- Call the setComponent method, the first parameter is the component, the second is the component property
- Call the setComponentProps method to directly set the component properties

### Decorator rules

Similar to the field component rules, the field decorator is mainly used to maintain the package container of the field, such as FormItem, which is more partial to the control of the UI layout. Here we use the decorator attribute to describe the field decorator.

The way to read the decorator information is to directly read the decorator attribute.

The main ways to write decorator information are:

- Modify the decorator property directly and pass in an array
- Call the setDecorator method, the first parameter is the component, and the second is the component property
- Call the setDecoratorProps method to directly set the component properties

### Validation rules

The verification rules mainly include:

- Verifier
- Timing of calibration
- Verification strategy
- Verification result

#### Validator

The validator in the field model is mainly described by the validator attribute. The validator can be passed to the field when the field is initialized, and the validator can be modified again after initialization.

A validator mainly has the following forms:

- Pure string format verification, such as `"phone" | validator = "url" | validator= "email"`. This format verification is a short form of regular rules. Formily provides some standard regular rules. Of course Users can also manually create rules through registerValidateFormats to facilitate reuse
- Custom function verification, there are 3 return value modes:
  - `(value)=>"message"`, a string returned means there is an error, and no string means no error
  - `(value)=>({type:"error",message:"message"})`, return object form, you can specify type as error or warning or success
  - `{validator:()=>false,message:"message"}`, returns a boolean form, the error message will reuse the message field of the object structure
- Object structure verification is a more complete expression, such as:
  - `{format:"url"}` This can specify the regular format
  - `{required:true}` This can specify required fields
  - There are more rule attributes can refer to the API documentation, and we can also register similar validation rules through registerValidateRules
- Object array structure verification is a combination of the previous three types. In fact, the first three types will all be converted into object array structures, such as:
  - `["url",{required:true},(value)=>"message"]` is actually equivalent to `[{format:"url"},{required:true},{validator:(value)=> "message"}]`

#### Check timing

Sometimes, we want certain verification rules to be triggered only when focusing or out of focus. We can add a triggerType to each verification rule object, such as `{validator:(value)=>"message",triggerType: "onBlur"}` In this way, you can precisely control a verification rule to perform verification only in a certain event. The triggerType here mainly includes `"onInput" | "onBlur" | "onFocus"`, if you call `form. validate` is a rule that verifies all triggerTypes at once. If you manually call `field.validate`, you can specify the triggerType in the input parameters, and all triggerTypes will be verified if you don’t pass them.

#### Verification Strategy

Sometimes, we hope that the verification strategy of a certain field is that when all the verification rules are executed, if a verification rule fails, the result will be returned immediately. We only need to pass the parameter validateFirst to true when the field is initialized. That is, the default is false, that is, the verification will continue if the verification fails, and the verification result obtained is an array.

#### Read the verification result

The verification results are mainly stored in the feedbacks property in the field model. Feedbacks is an array of Feedback objects. The structure of each Feedback is:

```ts
interface Feedback {
  path: string //Field data path
  address: string //field absolute path
  type: 'error' | 'success' | 'warning' //Verification result type
  code: //Check result code
  | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  messages: string[] //Check the message
}
```

There are four main ways to read:

- Read feedbacks properties directly
- Reading the errors attribute is equivalent to filtering out all verification results with type error from feedbacks
- Reading the warnings attribute is equivalent to filtering out all the verification results whose type is warning from feedbacks
- Reading the successes attribute is equivalent to filtering out all verification results with type success from feedbacks

#### Write verification result

There are 3 ways to write:

- Call the validate method to trigger the field validator to perform the validation action, and the code of the validation result is uniformly Validate\*`
  - Calling onInput will trigger validate
  - Calling onFocus will trigger validate
  - Calling onBlur will trigger validate
  - Call reset and specify validate as true to trigger validate
- Modify the feedbacks attribute directly
- Modify the errors property directly, it will be converted into an array of feedbacks objects, and the code of Feedback will be forcibly overwritten as EffectError
- Modify the warnings attribute directly, it will be converted into an array of feedbacks objects, and the code of Feedback will be forcibly overwritten as EffectWarning
- Modify the successes property directly, it will be converted into an array of feedbacks objects, and the code of Feedback will be forcibly overwritten as EffectSuccess

Such writing logic is mainly to prevent users from modifying the verification results from polluting the verification results of their own verifiers, strictly separating them, and easy to restore the scene.

#### Verification result query

The query of the verification result is mainly queried through queryFeedbacks. The query has the same participating Feedback objects, which can be filtered by type or code, or by path.

## ArrayField

Compared with Field, ArrayField only extends array-related methods on the basis of inheriting Field, such as push/pop/insert/move. Why should these methods be provided? Its ability is not only to process the field data, it It also provides internal state transposition processing for the sub-nodes of ArrayField mainly to ensure that the order of the fields is consistent with the order of the data. Can cite an example:

![](//img.alicdn.com/imgextra/i3/O1CN01mpGugu1QFlnfQ4qfo_!!6000000001947-2-tps-3506-1794.png)

This is a move call process, the value of the array element will move, and the state of the corresponding field will also move.

## ObjectField

Because the object type is disordered, there is no state transposition, so ObjectField provides addProperty/removeProperty/existProperty three APIs for users to use.

## VoidField

Compared with Field, VoidField mainly castrates data read and write rules, data source rules, and verification rules. When users use it, they mainly use explicit and implicit rules, components, and decorator rules.

<Alert>

The series of field rules mentioned above did not mention the detailed API usage details. It is more to help users sort out formily from the perspective of ideas. If you are not familiar with the API, it is best to read the API documentation first.

</Alert>
