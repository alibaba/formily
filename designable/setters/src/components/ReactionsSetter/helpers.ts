export const GlobalHelper = `
/** 
 * You can use the built-in context variables
 * 
 * 1. \`$self\` is the current Field Model 
 * 
 * 2. \`$form\` is the current Form Model 
 * 
 * 3. \`$deps\` is the dependencies value
 * 
 * 4. \`$observable\` function is used to create an persistent observable state object
 *
 * 5. \`$memo\` function is is used to create a persistent data
 * 
 * 6. \`$effect\` function is used to handle side-effect logic
 * 
 * 7. \`$props\` function is used to set component props to current field
 * 
 * Document Links
 * 
 * https://react.formilyjs.org/api/shared/schema#%E5%86%85%E7%BD%AE%E8%A1%A8%E8%BE%BE%E5%BC%8F%E4%BD%9C%E7%94%A8%E5%9F%9F
 **/
`

export const BooleanHelper = `
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

${GlobalHelper}
`

export const DisplayHelper = `
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

${GlobalHelper}
`

export const PatternHelper = `
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

${GlobalHelper}
`

export const StringHelper = `
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

${GlobalHelper}
`

export const AnyHelper = `
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

${GlobalHelper}
`

export const DataSourceHelper = `
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

${GlobalHelper}
`

export const ComponentPropsHelper = `
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

${GlobalHelper}
`

export const DecoratorPropsHelper = `
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

${GlobalHelper}
`

export const FulfillRunHelper = `
/** 
 * Example 1
 * Async Select
 **/

$effect(()=>{
  $self.loading = true
  fetch('//some.domain/getSomething')
    .then(response=>response.json())
    .then(({ data })=>{
      $self.loading = false
      $self.dataSource = data
    },()=>{
      $self.loading = false
    })
},[])
  

/** 
 * Example 2
 * Async Search Select
 **/

const state = $observable({
  keyword:''
})

$props({
  onSearch(keyword){
    state.keyword = keyword
  }
})

$effect(()=>{
  $self.loading = true
  fetch(\`//some.domain/getSomething?q=\${state.keyword}\`)
    .then(response=>response.json())
    .then(({ data })=>{
      $self.loading = false
      $self.dataSource = data
    },()=>{
      $self.loading = false
    })
},[ state.keyword ])

/** 
 * Example 3
 * Async Associated Select
 **/

const state = $observable({
  keyword:''
})

$props({
  onSearch(keyword){
    state.keyword = keyword
  }
})

$effect(()=>{
  $self.loading = true
  fetch(\`//some.domain/getSomething?q=\${state.keyword}&other=\${$deps.VariableName}\`)
    .then(response=>response.json())
    .then(({ data })=>{
      $self.loading = false
      $self.dataSource = data
    },()=>{
      $self.loading = false
    })
},[ state.keyword, $deps.VariableName ])

${GlobalHelper}
`
