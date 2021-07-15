const GlobalHelper = `
/** 
 * You can use the built-in context variables
 * 
 * 1. \`$self\` is the current Field Model 
 * https://core.formilyjs.org/api/models/field
 * 
 * 2. \`$form\` is the current Form Model 
 * https://core.formilyjs.org/api/models/form
 * 
 * 3. \`$deps\` is the dependencies value
 **/
`

const BooleanHelper = `
${GlobalHelper}
/** 
 * Example 1
 * Static Boolean
 **/

false

/** 
 * Example 2
 * Equal Calculation
 **/

$deps.VariableName === 'TARGET_VALUE'

/** 
 * Example 3
 * Not Equal Calculation
 **/

$deps.VariableName !== 'TARGET_VALUE'

/** 
 * Example 4
 * And Logic Calculation
 **/

$deps.VariableName1 && $deps.VariableName2

/** 
 * Example 5
 * Grater Logic Calculation
 **/

$deps.VariableName > 100

/** 
 * Example 6
 * Not Logic Calculation
 **/

!$deps.VariableName

`

const DisplayHelper = `
${GlobalHelper}
/** 
 * Example 1
 * Static Mode
 **/

'none'

/** 
 * Example 2
 * Equal Condition Associated
 **/

$deps.VariableName === 'TARGET_VALUE' ? 'visible' : 'none'

/** 
 * Example 3
 * Not Equal Condition Associated
 **/

$deps.VariableName !== 'TARGET_VALUE' ? 'visible' : 'hidden'

/** 
 * Example 4
 * And Logic Condition Associated
 **/

$deps.VariableName1 && $deps.VariableName2 ? 'visible' : 'none'

/** 
 * Example 5
 * Grater Logic Condition Associated
 **/

$deps.VariableName > 100 ? 'visible' : 'hidden'

/** 
 * Example 6
 * Not Logic Condition Associated
 **/

!$deps.VariableName ? 'visible' : 'none'
`

const PatternHelper = `
${GlobalHelper}
/** 
 * Example 1
 * Static Mode
 **/

'readPretty'

/** 
 * Example 2
 * Equal Condition Associated
 **/

$deps.VariableName === 'TARGET_VALUE' ? 'editable' : 'disabled'

/** 
 * Example 3
 * Not Equal Condition Associated
 **/

$deps.VariableName !== 'TARGET_VALUE' ? 'editable' : 'readOnly'

/** 
 * Example 4
 * And Logic Condition Associated
 **/

$deps.VariableName1 && $deps.VariableName2 ? 'editable' : 'readPretty'

/** 
 * Example 5
 * Grater Logic Condition Associated
 **/

$deps.VariableName > 100 ? 'editable' : 'readOnly'

/** 
 * Example 6
 * Not Logic Condition Associated
 **/

!$deps.VariableName ? 'editable' : 'disabled'
`

const StringHelper = `
${GlobalHelper}
/** 
 * Example 1
 * Static String
 **/

'Normal String Text'

/** 
 * Example 2
 * Associated String
 **/

$deps.VariableName === 'TARGET_VALUE' ? 'Associated String Text' : ''
`

const AnyHelper = `
${GlobalHelper}
/** 
 * Example 1
 * String Type
 **/

'String'

/** 
 * Example 2
 * String Array
 **/

['StringArray']

/** 
 * Example 3
 * Object Array
 **/

[{ key: 'ObjectArray' }]

/** 
 * Example 4
 * Boolean
 **/

true

/** 
 * Example 5
 * RegExp
 **/

/\d+/

/** 
 * Example 1
 * Associated String Value
 **/

$deps.VariableName + 'Compose String'

/** 
 * Example 2
 * Associated Array Value
 **/

[ $deps.VariableName ]

/** 
 * Example 3
 * Associated Object Value
 **/

{
  key : $deps.VariableName
}

/** 
 * Example 4
 * Associated Boolean Value
 **/

!$deps.VariableName
`

const DataSourceHelper = `
${GlobalHelper}
/** 
 * Example 1
 * Static DataSource
 **/

[
  { label : "item1", value: "1" },
  { label : "item2", value: "2" }
]

/** 
 * Example 2
 * Associated DataSource
 **/

[
  { label : "item1", value: "1" },
  { label : "item2", value: "2" },
  ...$deps.VariableName
]
`

const ComponentPropsHelp = `
${GlobalHelper}
/** 
 * Example 1
 * Static Props
 **/

{
  placeholder: "This is placeholder"
}

/** 
 * Example 2
 * Associated Props
 **/

{
  placeholder: $deps.VariableName
}
`

const DecoratorPropsHelp = `
${GlobalHelper}
/** 
 * Example 1
 * Static Props
 **/

{
  labelCol:6
}

/** 
 * Example 2
 * Associated Props
 **/

{
  labelCol: $deps.VariableName
}
`

export const FieldProperties = [
  {
    key: 'visible',
    type: 'boolean',
    helpCode: BooleanHelper,
  },
  { key: 'hidden', type: 'boolean', helpCode: BooleanHelper },
  {
    key: 'display',
    type: '"visible" | "hidden" | "none"',
    helpCode: DisplayHelper,
  },
  {
    key: 'pattern',
    type: '"editable" | "disabled" | "readOnly" | "readPretty"',
    helpCode: PatternHelper,
  },
  { key: 'title', type: 'string', helpCode: StringHelper },
  { key: 'description', type: 'string', helpCode: StringHelper },
  { key: 'value', type: 'any', helpCode: AnyHelper },
  { key: 'initialValue', type: 'any', helpCode: AnyHelper },
  { key: 'required', type: 'boolean', helpCode: BooleanHelper },
  {
    key: 'dataSource',
    type: 'Array<{label?:string,value?:any}>',
    helpCode: DataSourceHelper,
  },
  {
    key: 'component[1]',
    token: 'componentProps',
    type: 'object',
    helpCode: ComponentPropsHelp,
  },
  {
    key: 'decorator[1]',
    token: 'decoratorProps',
    type: 'object',
    helpCode: DecoratorPropsHelp,
  },
]
