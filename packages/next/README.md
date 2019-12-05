# @uform/next

### Install

```bash
npm install --save @uform/next
```

### Table Of Contents

<!-- toc -->

- [Quick-Start](#Quick-Start)
- [Components](#components)
  - [`<SchemaForm/>`](#SchemaForm)
  - [`<SchemaMarkupField/>`](#SchemaMarkupField)
  - [`<Submit/>`](#Submit)
  - [`<Reset/>`](#Reset)
  - [`<Field/>(deprecated，please use <SchemaMarkupField/>)`](#<Field/>)
- [Form List](#Array-Components)
  - [`array`](#array)
  - [`cards`](#cards)
  - [`table`](#table)
- [Layout Components](#Layout-Components)
  - [`<FormCard/>`](#FormCard)
  - [`<FormBlock/>`](#FormBlock)  
  - [`<FormStep/>`](#FormStep)
  - [`<FormLayout/>`](#FormLayout)
  - [`<FormItemGrid/>`](#FormItemGrid)
  - [`<FormTextBox/>`](#FormTextBox)
  - [`<FormButtonGroup/>`](#FormButtonGroup)
  - [`<TextButton/>`](#TextButton)
  - [`<CircleButton/>`](#CircleButton)
- [Type of SchemaMarkupField](#Type-of-SchemaMarkupField)
  - [`string`](#string)
  - [`textarea`](#textarea)
  - [`password`](#password)
  - [`number`](#number)
  - [`boolean`](#boolean)
  - [`date`](#date)
  - [`time`](#time)
  - [`range`](#range)
  - [`upload`](#upload)
  - [`checkbox`](#checkbox)
  - [`radio`](#radio)
  - [`rating`](#rating)
  - [`transfer`](#transfer)
- [API](#API)
  - [`createFormActions`](#createFormActions)
  - [`createAsyncFormActions`](#createAsyncFormActions)
  - [`FormEffectHooks`](#FormEffectHooks)
  - [`createEffectHook`](#createEffectHook)
  - [`connect`](#connect)
  - [`registerFormField`](#registerFormField)  
- [Interfaces](#Interfaces)
  - [`ButtonProps`](#ButtonProps)
  - [`CardProps`](#CardProps)
  - [`ICompatItemProps`](#ICompatItemProps)
  - [`IFieldState`](#IFieldState)
  - [`ISchemaFieldComponentProps`](#ISchemaFieldComponentProps)
  - [`ISchemaVirtualFieldComponentProps`](#ISchemaVirtualFieldComponentProps)
  - [`ISchemaFieldWrapper`](#ISchemaFieldWrapper)
  - [`ISchemaFieldComponent`](#ISchemaFieldComponent)
  - [`ISchemaVirtualFieldComponent`](#ISchemaVirtualFieldComponent)
  - [`ISchemaFormRegistry`](#ISchemaFormRegistry)
  - [`INextSchemaFieldProps`](#INextSchemaFieldProps)
  - [`IPreviewTextProps`](#IPreviewTextProps)
  - [`IMutators`](#IMutators)
  - [`IFieldProps`](#IFieldProps)
  - [`IConnectOptions`](#IConnectOptions)
  

### Quick-Start

---

Example：develop with JSX

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import { Button } from '@alifd/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()

const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="radio"
        enum={['1', '2', '3', '4']}
        title="Radio"
        name="radio"
      />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
        required
        title="Select"
        name="select"
      />
      <Field
        type="checkbox"
        enum={['1', '2', '3', '4']}
        required
        title="Checkbox"
        name="checkbox"
      />
      <Field
        type="string"
        title="TextArea"
        name="textarea"
        x-component="textarea"
      />
      <Field type="number" title="number" name="number" />
      <Field type="boolean" title="boolean" name="boolean" />
      <Field type="date" title="date" name="date" />
      <Field
        type="daterange"
        title="daterange"
        default={['2018-12-19', '2018-12-19']}
        name="daterange"
      />
      <Field type="year" title="year" name="year" />
      <Field type="time" title="time" name="time" />
      <Field
        type="upload"
        title="upload(card)"
        name="upload"
        x-props={{ listType: 'card' }}
      />
      <Field
        type="upload"
        title="upload(dragge)"
        name="upload2"
        x-props={{ listType: 'dragger' }}
      />
      <Field
        type="upload"
        title="upload(text)"
        name="upload3"
        x-props={{ listType: 'text' }}
      />
      <Field
        type="range"
        title="range"
        name="range"
        x-props={{ min: 0, max: 1024, marks: [0, 1024] }}
      />
      <Field
        type="transfer"
        enum={[{ value: 1, label: 'opt1' }, { value: 2, label: 'opt2' }]}
        title="transfer"
        name="transfer"
      />
      <Field type="rating" title="rating" name="rating" />
      <FormButtonGroup offset={7} sticky>
        <Submit />
        <Reset />
        <Button
          onClick={() => {
            actions.setFieldState('upload', state => {
              state.value = [
                {
                  downloadURL:
                    '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png',
                  imgURL:
                    '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png',
                  name: 'doc.svg'
                }
              ]
            })
          }}
        >
          Upload
        </Button>
        <Button
          onClick={() => {
            actions.setFormState(state => {
              state.values = {
                radio: '4',
                checkbox: ['2', '3']
              }
            })
          }}
        >
          Set Value
        </Button>
      </FormButtonGroup>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

Example：develop with JSON Schema

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import { Button } from '@alifd/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()

const App = () => {
  const schema = {
    type: 'object',
    properties: {
      radio: {
        type: 'radio',
        enum: ['1', '2', '3', '4'],
        title: 'Radio'
      },
      select: {
        type: 'string',
        enum: ['1', '2', '3', '4'],
        title: 'Select',
        required: true
      },
      checkbox: {
        type: 'checkbox',
        enum: ['1', '2', '3', '4'],
        title: 'Checkbox',
        required: true
      },
      textarea: {
        type: 'string',
        'x-component': 'textarea',
        title: 'TextArea'
      },
      number: {
        type: 'number',
        title: 'number'
      },
      boolean: {
        type: 'boolean',
        title: 'boolean'
      },
      date: {
        type: 'date',
        title: 'date'
      },
      daterange: {
        type: 'daterange',
        default: ['2018-12-19', '2018-12-19'],
        title: 'daterange'
      },
      year: {
        type: 'year',
        title: 'year'
      },
      time: {
        type: 'time',
        title: 'time'
      },
      upload: {
        type: 'upload',
        'x-props': {
          listType: 'card'
        },
        title: 'upload(card)'
      },
      upload2: {
        type: 'upload',
        'x-props': {
          listType: 'dragger'
        },
        title: 'uplaod(dragger)'
      },
      upload3: {
        type: 'upload',
        'x-props': {
          listType: 'text'
        },
        title: 'upload(text)'
      },
      range: {
        type: 'range',
        'x-props': {
          min: 0,
          max: 1024,
          marks: [0, 1024]
        },
        title: 'range'
      },
      transfer: {
        type: 'transfer',
        enum: [
          {
            value: 1,
            label: 'opt1'
          },
          {
            value: 2,
            label: 'opt2'
          }
        ],
        title: 'transfer'
      },
      rating: {
        type: 'rating',
        title: 'rating'
      },
      layout_btb_group: {
        type: 'object',
        'x-component': 'button-group',
        'x-component-props': {
          offset:7,
          sticky: true,
        },
        properties: {
          submit_btn: {
            type: 'object',
            'x-component': 'submit',
            'x-component-props': {
              children: 'Submit',
            },
          },
          reset_btn: {
            type: 'object',
            'x-component': 'reset',
            'x-component-props': {
              children: 'Reset',
            },
          },
        }
      },
    }
  }
  return <SchemaForm actions={actions} schema={schema} />
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Components

---

#### `<SchemaForm/>`

Base on `<SchemaMarkupForm/>` of @uform/react-schema-renderer. Recommended for production environments.

```typescript
interface INextSchemaFormProps {
    // render by schema
    schema?: ISchema;
    fields?: ISchemaFormRegistry['fields'];
    virtualFields?: ISchemaFormRegistry['virtualFields'];
    // pre-registered Form Component
    formComponent?: ISchemaFormRegistry['formComponent'];
    // pre-registered FormItem Component
    formItemComponent?: ISchemaFormRegistry['formItemComponent'];
    // label column settiing
    labelCol?: number | { span: number; offset?: number }
    // FormItem column settiing
    wrapperCol?: number | { span: number; offset?: number }
    // custom placeholder when preivew
    previewPlaceholder?: string | ((props: IPreviewTextProps) => string);
    // prefix
    prefix?: string;
    // is it inline
    inline?: boolean;
    // The size of a single Item is customized, and takes precedence over the size of the Form, and when a component is used with an Item, the component itself does not set the size property.
    size?: 'large' | 'medium' | 'small';
    // position of label
    labelAlign?: 'top' | 'left' | 'inset';
    // aligment of label
    labelTextAlign?: 'left' | 'right';
    // labelCol of FormItem
    labelCol?: {};
    // wrapperCol of FormItem
    wrapperCol?: {};
    children?: any;
    className?: string;
    style?: React.CSSProperties;
    // type of component
    component?: string | (() => void);
    // form state value
    value?: Value;
    // form state defaultValue
    defaultValue?: DefaultValue;
    // form state initialValues
    initialValues?: DefaultValue;
    // FormActions instance 
    actions?: FormActions;
    // IFormEffect instance
    effects?: IFormEffect<FormEffectPayload, FormActions>;
    // form instance
    form?: IForm;
    // Form change event callback
    onChange?: (values: Value) => void;
    // triggered by `htmlType="submit"` or actions.submit时
    onSubmit?: (values: Value) => void | Promise<Value>;
    // triggered by <Reset/> or actions.reset
    onReset?: () => void;
    // Form verification failure event callback
    onValidateFailed?: (valideted: IFormValidateResult) => void;
    children?: React.ReactElement | ((form: IForm) => React.ReactElement);
    // Whether to use the dirty check, the default will go immer accurate update
    useDirty?: boolean;
    // Is it editable, overall control in the Form dimension
    editable?: boolean | ((name: string) => boolean);
    // Whether to go pessimistic check, stop the subsequent check when the first check fails
    validateFirst?: boolean;    
}
```

**Usage**

Example1: Sync value of a and a-mirror

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  registerFormField,
  Field,  
  connect,
  createFormActions
} from '@uform/next'

const actions = createFormActions()

registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)

ReactDOM.render(
    <SchemaForm actions={actions} effects={($)=>{
       $('onFieldChange','a').subscribe((fieldState)=>{
         actions.setFieldState('a-mirror',state=>{
           state.value = fieldState.value
         })
       })
    }}>
       <Field type="string" name="a" title="a"/>
       <Field type="string" name="a-mirror" title="a-mirror"/>
    </SchemaForm>,
    document.getElementById('root')
)
```


Example：Layout

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,  
  createFormActions,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset,
} from '@uform/next'

const actions = createFormActions()

ReactDOM.render(
    <div>
    <h5>Basic Layout</h5>
    <SchemaForm>
      <FormLayout labelCol={8} wrapperCol={6}>
        <Field name="aaa" type="string" title="field1" />
        <Field name="bbb" type="number" title="field2" />
        <Field name="ccc" type="date" title="field3" />
      </FormLayout>
      <FormButtonGroup offset={8}>
        <Submit>Submit</Submit>​ <Reset>Reset</Reset>​
      </FormButtonGroup>
    </SchemaForm>
    <h5>Inline Layout</h5>
    <SchemaForm inline>
      <Field name="aaa" type="string" title="field1" />
      <Field name="bbb" type="number" title="field2" />
      <Field name="ccc" type="date" title="field3" />​
      <FormButtonGroup>
        <Submit>Submit</Submit>​ <Reset>Reset</Reset>​
      </FormButtonGroup>
    </SchemaForm>
    <h5>editable = false</h5>
    <SchemaForm inline editable={false}>
      <Field name="aaa" type="string" title="field1" />
      <Field name="bbb" type="number" title="field2" />
      <Field name="ccc" type="date" title="field3" />​
      <FormButtonGroup>
        <Submit>Submit</Submit>​ <Reset>Reset</Reset>​
      </FormButtonGroup>
    </SchemaForm>
    </div>,
    document.getElementById('root')
)
```

#### `<SchemaMarkupField/>`

> Core components of @uform/next, used to describe form fields

```typescript
interface IMarkupSchemaFieldProps {
  name?: string
  /** base json schema spec**/
  title?: SchemaMessage
  description?: SchemaMessage
  default?: any
  readOnly?: boolean
  writeOnly?: boolean
  type?: 'string' | 'object' | 'array' | 'number' | string
  enum?: Array<string | number | { label: SchemaMessage; value: any }>
  const?: any
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  maxLength?: number
  minLength?: number
  pattern?: string | RegExp
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  required?: string[] | boolean
  format?: string
  /** nested json schema spec **/
  properties?: {
    [key: string]: ISchema
  }
  items?: ISchema | ISchema[]
  additionalItems?: ISchema
  patternProperties?: {
    [key: string]: ISchema
  }
  additionalProperties?: ISchema
  /** extend json schema specs */
  editable?: boolean
  visible?: boolean
  display?: boolean
  ['x-props']?: { [name: string]: any }
  ['x-index']?: number
  ['x-rules']?: ValidatePatternRules
  ['x-component']?: string
  ['x-component-props']?: { [name: string]: any }
  ['x-render']?: <T = ISchemaFieldComponentProps>(
    props: T & {
      renderComponent: () => React.ReactElement
    }
  ) => React.ReactElement
  ['x-effect']?: (
    dispatch: (type: string, payload: any) => void,
    option?: object
  ) => { [key: string]: any }
}
```

##### Usage


```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  FormSlot,
  Field,  
  createFormActions,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset,
} from '@uform/next'

const actions = createFormActions()

ReactDOM.render(
    <SchemaForm>
      <FormSlot><div>required</div></FormSlot>
      <Field name="a" required type="string" title="field1" />
      
      <FormSlot><div>description</div></FormSlot>
      <Field name="b" description="description" type="string" title="field1" />
      
      <FormSlot><div>default value</div></FormSlot>
      <Field name="c" default={10} type="string" title="field1" />

      <FormSlot><div>readOnly</div></FormSlot>
      <Field name="d" readOnly default={10} type="string" title="field1" />

      <FormSlot><div>visible = false</div></FormSlot>
      <Field name="e" visible={false} default={10} type="string" title="field1" />

      <FormSlot><div>display = false</div></FormSlot>
      <Field name="f" visible={false} default={10} type="string" title="field1" />

      <FormSlot><div>editable = false</div></FormSlot>
      <Field name="g" editable={false} default={10} type="string" title="field1" />
    </SchemaForm>,
    document.getElementById('root')
)
```


#### `<Submit/>`

> Props of `<Submit/>`

```typescript
interface ISubmitProps {
  /** reset pops **/
  onSubmit?: ISchemaFormProps['onSubmit']
  showLoading?: boolean
  /** nextBtnProps **/
  // type of btn
  type?: 'primary' | 'secondary' | 'normal'
  // size of btn
  size?: 'small' | 'medium' | 'large'
  // size of Icon 
  iconSize?: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl'
  // type of button  when component = 'button'
  htmlType?: 'submit' | 'reset' | 'button'
  // typeof btn
  component?: 'button' | 'a'
  // Set the loading state of the button
  loading?: boolean
  // Whether it is a ghost button
  ghost?: true | false | 'light' | 'dark'
  // Whether it is a text button
  text?: boolean
  // Whether it is a warning button
  warning?: boolean
  // Whether it is disabled
  disabled?: boolean
  // Callback for button click
  onClick?: (e: {}) => void
  // Valid when Button component is set to 'a', which represents the URL of the linked page
  href?: string
  // Valid when Button component is set to 'a', which represents the way of open the linked document
  target?: string
}
```

#### `<Reset/>`

> Props of `<Reset/>`

```typescript
interface IResetProps {
  /** reset pops **/
  forceClear?: boolean
  validate?: boolean
  /** nextBtnProps **/
  // type of btn
  type?: 'primary' | 'secondary' | 'normal'
  // size of btn
  size?: 'small' | 'medium' | 'large'
  // size of Icon 
  iconSize?: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl'
  // type of button when component = 'button'
  htmlType?: 'submit' | 'reset' | 'button'
  // typeof btn
  component?: 'button' | 'a'
  // Set the loading state of the button
  loading?: boolean
  // Whether it is a ghost button
  ghost?: true | false | 'light' | 'dark'
  // Whether it is a text button
  text?: boolean
  // Whether it is a warning button
  warning?: boolean
  // Whether it is disabled
  disabled?: boolean
  // Callback for button click
  onClick?: (e: {}) => void
  // Valid when Button component is set to 'a', which represents the URL of the linked page
  href?: string
  // Valid when Button component is set to 'a', which represents the way of open the linked document
  target?: string
}
```

#### `<Field/>`

> deprecated，please use [SchemaMarkupField](#SchemaMarkupField)

### Array Components

#### array

```jsx
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  FormItemGrid,
  FormButtonGroup,
  Submit,
  Reset,
  FormBlock,
  FormLayout
} from '@uform/next'
import '@alifd/next/dist/next.css'
import Printer from '@uform/printer'

const App = () => {
  const [value, setValues] = useState({})
  useEffect(() => {
    setTimeout(() => {
      setValues({
        array: [{ array2: [{ aa: '123', bb: '321' }] }]
      })
    }, 1000)
  }, [])
  return (
    <Printer>
      <SchemaForm initialValues={value} onSubmit={v => console.log(v)}>
        <Field
          title="Array"
          name="array"
          maxItems={3}
          type="array"
          x-props={{
            renderAddition: 'Add Text',
            renderRemove: 'Remove Text'
          }}
        >
          <Field type="object">
            <FormBlock title="Object Field">
              <FormLayout labelCol={9} wrapperCol={6}>
                <Field name="aa" type="string" title="field1" />
                <Field name="bb" type="string" title="field2" />
                <FormItemGrid title="field3" gutter={10}>
                  <Field name="cc" type="string" />
                  <Field name="dd" type="string" />
                </FormItemGrid>
              </FormLayout>
            </FormBlock>
            <FormBlock title="Nested Array Field">
              <Field name="array2" maxItems={3} type="array">
                <Field type="object">
                  <FormLayout labelCol={9} wrapperCol={6}>
                    <Field name="aa" type="string" title="field1" />
                    <Field name="bb" type="string" title="field2" />
                    <FormItemGrid title="field3" gutter={10}>
                      <Field name="cc" type="string" />
                      <Field name="dd" type="string" />
                    </FormItemGrid>
                  </FormLayout>
                </Field>
              </Field>
            </FormBlock>
          </Field>
        </Field>
        <FormButtonGroup>
          <Submit>Submit</Submit>
          <Reset>Reset</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### cards

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  FormItemGrid,
  FormButtonGroup,
  Submit,
  Reset,
  FormBlock,
  FormLayout
} from '@uform/next'
import '@alifd/next/dist/next.css'
import Printer from '@uform/printer'

const App = () => (
  <Printer>
    <SchemaForm>
      <Field
        name="array"
        maxItems={3}
        type="array"
        x-component="cards"
        x-props={{
          title: 'Title of cards',
          renderAddition: 'Add Text',
          renderRemove: 'Remove Text'
        }}
      >
        <Field type="object">
          <FormLayout labelCol={6} wrapperCol={8}>
            <Field
              name="aa"
              type="string"
              description="hello world"
              title="field1"
            />
            <Field name="bb" type="string" title="field2" />
            <Field name="cc" type="string" title="field3" />
            <Field name="dd" type="string" title="field4" />
            <Field name="dd" type="string" title="field5" />
            <Field name="ee" type="string" title="field6" />
            <Field name="ff" type="string" title="field7" />
            <Field name="gg" type="daterange" title="field8" />
          </FormLayout>
          <Field
            name="array"
            maxItems={3}
            type="array"
            x-component="cards"
            x-props={{ title: 'Title of cards' }}
          >
            <Field type="object">
              <FormLayout labelCol={6} wrapperCol={8}>
                <Field
                  name="aa"
                  type="string"
                  description="hello world"
                  title="field1"
                />
                <Field name="bb" type="string" title="field2" />
                <Field name="cc" type="string" title="field3" />
                <Field name="dd" type="string" title="field4" />
                <Field name="dd" type="string" title="field5" />
                <Field name="ee" type="string" title="field6" />
                <Field name="ff" type="string" title="field7" />
                <Field name="gg" type="daterange" title="field8" />
              </FormLayout>
            </Field>
          </Field>
        </Field>
      </Field>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### table

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  FormItemGrid,
  FormButtonGroup,
  Submit,
  Reset,
  FormBlock,
  FormLayout
} from '@uform/next'
import '@alifd/next/dist/next.css'
import Printer from '@uform/printer'

const App = () => (
  <Printer>
    <SchemaForm>
      <FormLayout>
        <Field
          title="Array"
          name="array"
          maxItems={3}
          type="array"
          x-component="table"
          x-props={{
            renderExtraOperations() {
              return <div>Hello worldasdasdasdasd</div>
            },
            operationsWidth: 300
          }}
        >
          <Field type="object">
            <Field
              name="aa"
              type="string"
              description="hello world"
              title="field1"
            />
            <Field name="bb" type="string" title="field2" />
            <Field name="cc" type="string" title="field3" />
            <Field name="dd" type="string" title="field4" x-index={1} />
            <Field name="ee" type="string" title="field5" />
            <Field name="ff" type="string" title="field6" />
            <Field name="gg" type="string" title="field7" />
            <Field name="hh" type="daterange" title="field8" />
          </Field>
        </Field>
      </FormLayout>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### Layout Components


#### `<FormCard/>`

> Props of `<FormCard/>`, fully inherited from [CardProps](#CardProps)。
> The only difference between FormCard [FormBlock](#FormBlock) is a border on the style

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { FormCard, SchemaMarkupField as Field } from '@uform/next'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm>
    <FormCard title="block">
      <Field type="string" name="username" title="username" />
    </FormCard>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormBlock/>`

> Props of `<FormBlock/>` , fully inherited from [CardProps](#CardProps)

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { FormBlock, SchemaMarkupField as Field } from '@uform/next'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm>
    <FormBlock title="block">
      <Field type="string" name="username" title="username" />
    </FormBlock>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormStep/>`

> Props of `<FormStep/>`

```typescript
interface IFormStep {
  dataSource: StepItemProps[]
  /** next step props**/
  // current
  current?: number
  // direction of step
  direction?: 'hoz' | 'ver'
  // Content arrangement in horizontal layout
  labelPlacement?: 'hoz' | 'ver'
  // shape of step
  shape?: 'circle' | 'arrow' | 'dot'
  readOnly?: boolean
  // Whether to activate animation
  animation?: boolean
  className?: string
  // Custom StepItem render
  itemRender?: (index: number, status: string) => React.ReactNode
}
```

**Usage**

```jsx
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  FormEffectHooks,
  createFormActions,
  FormGridRow,
  FormItemGrid,
  FormGridCol,
  FormPath,
  FormLayout,
  FormBlock,
  FormCard,
  FormTextBox,
  FormStep
} from '@uform/next'
import { Button } from '@alifd/next'
import '@alifd/next/dist/next.css'

const { onFormInit$ } = FormEffectHooks

const actions = createFormActions()

let cache = {}

export default () => (
  <SchemaForm
    onSubmit={values => {
      console.log('submit')
      console.log(values)
    }}
    actions={actions}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 6 }}
    validateFirst
    effects={({ setFieldState, getFormGraph }) => {
      onFormInit$().subscribe(() => {
        setFieldState('col1', state => {
          state.visible = false
        })
      })
    }}
  >
    <FormStep
      style={{ marginBottom: 20 }}
      dataSource={[
        { title: 'Step1', name: 'step-1' },
        { title: 'Step2', name: 'step-2' },
        { title: 'Step3', name: 'step-3' }
      ]}
    />
    <FormCard name="step-1" title="Step1">
      <Field name="a1" required title="A1" type="string" />
    </FormCard>
    <FormCard name="step-2" title="Step2">
      <Field name="a2" required title="A2" type="string" />
    </FormCard>
    <FormCard name="step-3" title="Step3">
      <Field name="a3" required title="A3" type="string" />
    </FormCard>
    <FormButtonGroup>
      <Submit>Submit</Submit>
      <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_PREVIOUS)}>
        Prev
      </Button>
      <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_NEXT)}>
        Next
      </Button>
      <Button
        onClick={() => {
          cache = actions.getFormGraph()
        }}
      >
        Save State
      </Button>
      <Button
        onClick={() => {
          actions.setFormGraph(cache)
        }}
      >
        Rollback State
      </Button>
    </FormButtonGroup>
  </SchemaForm>
)
```

#### `<FormLayout/>`

> Props of `<FormLayout/>`

```typescript
interface IFormItemTopProps {
  inline?: boolean
  className?: string
  style?: React.CSSProperties
  labelCol?: number | { span: number; offset?: number }
  wrapperCol?: number | { span: number; offset?: number }
}
```

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@uform/next'
import { Button } from '@alifd/next'
import Printer from '@uform/printer'
import '@alifd/next/dist/next.css'
const App = () => (
  <Printer>
    <SchemaForm>
      <FormLayout labelCol={8} wrapperCol={6}>
        <Field name="aaa" type="string" title="field1" />
        <Field name="bbb" type="number" title="field2" />
        <Field name="ccc" type="date" title="field3" />
      </FormLayout>
      <FormButtonGroup offset={8}>
        <Submit>Submit</Submit>​ <Reset>Reset</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormItemGrid/>`

> Props of `<FormItemGrid/>`

```typescript
interface IFormItemGridProps {
  cols?: Array<number | { span: number; offset: number }>
  gutter?: number
  /** next Form.Item props**/
  // prefix od FormItem
  prefix?: string

  // label od FormItem
  label?: React.ReactNode

  // label layout setting, eg, {span: 8, offset: 16}
  labelCol?: {}
  wrapperCol?: {}

  // Custom prompt information, if not set, it will be automatically generated according to the verification rules.
  help?: React.ReactNode

  // Additional prompt information, similar to help, can be used when error messages and prompt copy are required at the same time. Behind the error message.
  extra?: React.ReactNode

  // Check status, if not set, it will be generated automatically according to check rules
  validateState?: 'error' | 'success' | 'loading'

  // Used in conjunction with the validateState property, whether to display the success / loading validation status icon. Currently only Input supports
  hasFeedback?: boolean

  // Custom inline style

  style?: React.CSSProperties

  // node or function(values)
  children?: React.ReactNode | (() => void)

  // The size of a single Item is customized, and takes precedence over the size of the Form, and when a component is used with an Item, the component itself does not set the size property.
  size?: 'large' | 'small' | 'medium'

  // Position of the label
  labelAlign?: 'top' | 'left' | 'inset'

  // alignment of labels
  labelTextAlign?: 'left' | 'right'

  className?: string

  // [validation] required
  required?: boolean

  // whether required asterisks are displayed
  asterisk?: boolean

  // required custom error message
  requiredMessage?: string

  // required Custom trigger method
  requiredTrigger?: string | Array<any>

  // [validation] min
  min?: number

  // [validation] max
  max?: number

  // min/max error message
  minmaxMessage?: string

  // min/max custom trigger method
  minmaxTrigger?: string | Array<any>

  // [validation] min length of string / min length of array
  minLength?: number

  // [validation] max length of string / max length of array
  maxLength?: number

  // minLength/maxLength custom error message
  minmaxLengthMessage?: string

  // minLength/maxLength custom trigger method
  minmaxLengthTrigger?: string | Array<any>

  // [validation] length of string / length of array
  length?: number

  // length custom error message
  lengthMessage?: string

  // length custom trigger method
  lengthTrigger?: string | Array<any>

  // Regular pattern
  pattern?: any

  // pattern custom error message
  patternMessage?: string

  // pattern custom trigger method
  patternTrigger?: string | Array<any>

  // [validation] regular pattern
  format?: 'number' | 'email' | 'url' | 'tel'

  // format custom error message
  formatMessage?: string

  // format custom trigger method
  formatTrigger?: string | Array<any>

  // [validation] custom validator
  validator?: () => void

  // validator custom trigger method
  validatorTrigger?: string | Array<any>

  // Whether to automatically trigger validate when data is modified
  autoValidate?: boolean
}
```

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@uform/next'
import { Button } from '@alifd/next'
import Printer from '@uform/printer'
import '@alifd/next/dist/next.css'

const App = () => (
  <Printer>
    <SchemaForm onSubmit={v => console.log(v)}>
      <FormItemGrid gutter={20}>
        <Field type="string" name="a1" title="field1" />
        <Field type="string" name="a2" title="field2" />
        <Field type="string" name="a3" title="field3" />
        <Field type="string" name="a4" title="field4" />
      </FormItemGrid>
      <FormItemGrid gutter={20} cols={[6, 6]}>
        <Field type="string" name="a5" title="field5" />
        <Field type="string" name="a6" title="field6" />
      </FormItemGrid>
      <FormButtonGroup style={{ minWidth: 150 }}>
        ​<Submit>Submit</Submit>​<Reset>Reset</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormTextBox/>`

> Props of `<FormTextBox/>`

```typescript
interface IFormTextBox {
  text?: string
  gutter?: number
  title?: React.ReactText
  description?: React.ReactText
}
```

**Usage**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormTextBox,
  FormCard,
  FormLayout
} from '@uform/next'
import { Button } from '@alifd/next'
import Printer from '@uform/printer'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm labelCol={8} wrapperCol={6} onSubmit={v => console.log(v)}>
        <FormCard title="FormTextBox">
          <FormLayout labelCol={8} wrapperCol={16}>
            <FormTextBox
              title="text label"
              text="prefix%suffix prefix2%suffix2 prefix3%suffix3"
              gutter={8}
            >
              <Field
                type="string"
                default={10}
                required
                name="aa1"
                x-props={{ style: { width: 80 } }}
                description="desc1"
              />
              <Field
                type="number"
                default={20}
                required
                name="aa2"
                description="desc2"
              />
              <Field
                type="number"
                default={30}
                required
                name="aa3"
                description="desc3"
              />
            </FormTextBox>
          </FormLayout>
        </FormCard>
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormButtonGroup/>`

> Props of `<FormButtonGroup/>`

```typescript
interface IFormButtonGroupProps {
  sticky?: boolean
  style?: React.CSSProperties
  itemStyle?: React.CSSProperties
  className?: string
  align?: 'left' | 'right' | 'start' | 'end' | 'top' | 'bottom' | 'center'
  triggerDistance?: number
  zIndex?: number
  span?: ColSpanType
  offset?: ColSpanType
}
```

**Usage**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@uform/next'
import { Button } from '@alifd/next'
import Printer from '@uform/printer'
import '@alifd/next/dist/next.css'

const App = () => {
  const [state, setState] = useState({ editable: true })
  return (
    <Printer>
      <SchemaForm onSubmit={v => console.log(v)}>
        <div>normal</div>
        <FormButtonGroup style={{ minWidth: 150 }}>
          ​<Submit>Submit</Submit>​<Reset>Reset</Reset>​
        </FormButtonGroup>
        <div>sticky</div>
        <FormButtonGroup offset={8} sticky>
          ​<Submit>Submit</Submit>​
          <Button
            type="primary"
            onClick={() => setState({ editable: !state.editable })}
          >
            {state.editable ? 'Preview' : 'Edit'}
          </Button>
          <Reset>Reset</Reset>​
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<TextButton/>`

> Props of `<TextButton/>`, fully inherited from [ButtonProps](#ButtonProps)

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { TextButton } from '@uform/next'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm>
    <TextButton>content</TextButton>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<CircleButton/>`

> Props of `<CircleButton/>`, fully inherited from [ButtonProps](#ButtonProps)

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { CircleButton } from '@uform/next'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm>
    <CircleButton>ok</CircleButton>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```


### Type of SchemaMarkupField

#### string

* Schema Type : `string`
* Schema UI Component: Fusion-Next `<Input/>`, `<Input.Textarea/>`, `<Select/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="string"
        required
        title="Text"
        name="text"
        x-component-props={{
          placeholder: 'input'
        }}
      />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
        required
        title="Simple Select"
        name="simpleSelect"
        x-component-props={{
          placeholder: 'select'
        }}
      />
      <Field
        type="string"
        enum={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
        required
        title="Object Select"
        name="objSelect"
        x-component-props={{
          placeholder: 'select'
        }}
      />
      <Field
        type="string"
        title="TextArea"
        name="textarea"
        x-component="textarea"
        x-component-props={{
          placeholder: 'textarea'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### textarea

* Schema Type : `string`
* Schema UI Component: Fusion-Next `<Input.Textarea/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="string"
        title="TextArea"
        name="textarea"
        x-component="textarea"
        x-component-props={{
          placeholder: 'textarea'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### password

* Schema Type : `password`
* Schema UI Component: Fusion-Next `<Input htmlType="password"/>`

```typescript
interface IPasswordProps {
  checkStrength: boolean
  /** next input props **/
  // value
  value?: string | number

  // default value
  defaultValue?: string | number

  // callback triggered when value change
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void

  // callback triggered when keyboard is press
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, opts: {}) => void

  // Disabled
  disabled?: boolean

  // Max length
  maxLength?: number

  // Whether to show the maximum length style
  hasLimitHint?: boolean

  // When maxLength is set, whether to truncate beyond the string
  cutString?: boolean

  // readOnly
  readOnly?: boolean

  // Automatically remove the leading and trailing blank characters when trigger onChange
  trim?: boolean

  // placeholder
  placeholder?: string

  // callback triggered when focus
  onFocus?: () => void

  // callback triggered when blur
  onBlur?: () => void

  // Custom string length calculation
  getValueLength?: (value: string) => number

  className?: string
  style?: React.CSSProperties
  htmlType?: string

  // name of field
  name?: string

  // state of field
  state?: 'error' | 'loading' | 'success'

  // label
  label?: React.ReactNode

  // whether to show clear
  hasClear?: boolean

  // whether to show border
  hasBorder?: boolean

  // size of field
  size?: 'small' | 'medium' | 'large'

  // callback triggered when enter is press
  onPressEnter?: () => void

  // Watermark (Icon type, shared with hasClear)
  hint?: string

  // Append content before text
  innerBefore?: React.ReactNode

  // Append content after text
  innerAfter?: React.ReactNode

  // Append content before input
  addonBefore?: React.ReactNode

  // Append content after input
  addonAfter?: React.ReactNode

  // Append text before input
  addonTextBefore?: React.ReactNode

  // Append text after input
  addonTextAfter?: React.ReactNode

  // (Native supported by input)
  autoComplete?: string

  // (Native supported by input)
  autoFocus?: boolean
}
```

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="string"
        title="Password"
        name="password"
        x-component="password"
        x-component-props={{
          placeholder: 'password'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### number

* Schema Type : `number`
* Schema UI Component: Fusion-Next `<NumberPicker/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field type="number" required title="Number" name="number" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### boolean

* Schema Type : `boolean`
* Schema UI Component: Fusion-Next `<Switch/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="boolean"
        required
        title="Boolean"
        name="boolean"
        x-component-props={{
          checkedChildren: 'on',
          unCheckedChildren: 'off'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### date

* Schema Type : `date`
* Schema UI Component: Fusion-Next `<DatePicker/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="date"
        required
        title="DatePicker"
        name="datePicker"
        x-component-props={{
          format: 'YYYY-MM-DD HH:mm:ss'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### time

* Schema Type : `time`
* Schema UI Component: Fusion-Next `<TimePicker/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="time"
        required
        title="TimePicker"
        name="timePicker"
        x-component-props={{
          format: 'YYYY-MM-DD HH:mm:ss'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### range

* Schema Type : `range`
* Schema UI Component: Fusion-Next `<Range/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="range"
        required
        title="Range"
        name="range"
        x-component-props={{
          min: 0,
          max: 1024,
          marks: [0, 1024]
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### upload

* Schema Type : `upload`
* Schema UI Component: Fusion-Next `<Upload/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="upload"
        required
        title="Card Upload"
        name="upload2"
        x-component-props={{
          listType: 'card'
        }}
      />
      <Field
        type="upload"
        required
        title="Dragger Upload"
        name="upload1"
        x-component-props={{
          listType: 'dragger'
        }}
      />
      <Field
        type="upload"
        required
        title="Text Upload"
        name="upload3"
        x-component-props={{
          listType: 'text'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### checkbox

* Schema Type : `checkbox`
* Schema UI Component: Fusion-Next `<Checkbox/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="checkbox"
        required
        title="Simple Checkbox"
        name="checkbox"
        enum={['1', '2', '3', '4']}
      />
      <Field
        type="checkbox"
        required
        title="Object Checkbox"
        name="checkbox2"
        enum={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### radio

* Schema Type : `radio`
* Schema UI Component: Fusion-Next `<Radio/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="radio"
        required
        title="Simple Radio"
        name="radio"
        enum={['1', '2', '3', '4']}
      />
      <Field
        type="radio"
        required
        title="Object Radio"
        name="radio2"
        enum={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### rating

* Schema Type : `rating`
* Schema UI Component: Fusion-Next `<Rating/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="rating"
        title="Rating"
        name="rating"
        x-component-props={{
          allowHalf: true
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### transfer

* Schema Type : `transfer`
* Schema UI Component: Fusion-Next `<Transfer/>`

**Usage**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormBlock,
  FormLayout,
  FormButtonGroup,
  Submit,
  Reset
} from '@uform/next'
import '@alifd/next/dist/next.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="transfer"
        title="Transfer"
        name="transfer"
        enum={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' }
        ]}
        x-component-props={{
          showSearch: true
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### API

> Fully inherited from @uform/react, The specific API of @uform/next is listed below.

---

#### `createFormActions`

> Return [IFormActions](#IFormActions)

**Signature**

```typescript
createFormActions(): IFormActions
```

**Usage**

```typescript
import { createFormActions } from '@uform/next'

const actions = createFormActions()
console.log(actions.getFieldValue('username'))
```

#### `createAsyncFormActions`

> Return [IFormAsyncActions](#IFormAsyncActions)

**Signature**

```typescript
createAsyncFormActions(): IFormAsyncActions
```

**Usage**

```typescript
import { createAsyncFormActions } from '@uform/next'

const actions = createAsyncFormActions()
actions.getFieldValue('username').then(val => console.log(val))
```

#### `FormEffectHooks`

> Return all @uform/core lifeCycles hook which can be subscribe

**Usage**

```tsx
import { FormEffectHooks, Form } from '@uform/react'
const {
  /**
   * Form LifeCycle
   **/
  // Form pre-initialization trigger
  onFormWillInit$,
  // Form initialization trigger
  onFormInit$,
  // Triggered when the form changes
  onFormChange$,
  // Triggered when the form event is triggered, used to monitor only manual operations
  onFormInputChange$,
  // Trigger when the form initial value changes
  onFormInitialValueChange$,
  // Triggered when the form is reset
  onFormReset$,
  // Triggered when the form is submitted
  onFormSubmit$,
  // Triggered when the form submission starts
  onFormSubmitStart$,
  // Triggered when the form submission ends
  onFormSubmitEnd$,
  // Triggered when the form is mounted
  onFormMount$,
  // Triggered when the form is unloaded
  onFormUnmount$,
  // Triggered when form validation begins
  onFormValidateStart$,
  // Triggered when the form validation ends
  onFormValidateEnd$,
  // Trigger when the form initial value changes
  onFormValuesChange$,
  /**
   * FormGraph LifeCycle
   **/
  // Triggered when the form observer tree changes
  onFormGraphChange$,
  /**
   * Field LifeCycle
   **/
  // Triggered when pre-initialized
  onFieldWillInit$,
  // Triggered when the field is initialized
  onFieldInit$,
  // Triggered when the field changes
  onFieldChange$,
  // Triggered when the field is mounted
  onFieldMount$,
  // Trigger when the field is unloaded
  onFieldUnmount$,
  // Triggered when the field event is triggered, used to monitor only manual operations
  onFieldInputChange$,
  // Triggered when the field value changes
  onFieldValueChange$,
  // Trigger when the initial value of the field changes
  onFieldInitialValueChange$
} = FormEffectHooks

const App = () => {
  return (
    <Form
      effects={() => {
        onFormInit$().subscribe(() => {
          console.log('initialized')
        })
      }}
    >
      ...
    </Form>
  )
}
```

#### createEffectHook

> Custom your own hook by this api

**Usage**

```jsx
import SchemaForm, { createEffectHook, createFormActions } from '@uform/next'

const actions = createFormActions()
const diyHook1$ = createEffectHook('diy1')
const diyHook2$ = createEffectHook('diy2')

const App = () => {
  return (
    <SchemaForm
      actions={actions}
      effects={() => {
        diyHook1$().subscribe(payload => {
          console.log('diy1 hook triggered', payload)
        })

        diyHook2$().subscribe(payload => {
          console.log('diy2 hook triggered', payload)
        })
      }}
    >
      <button
        onClick={() => {
          actions.notify('diy1', { index: 1 })
        }}
      >
        notify diy1
      </button>
      <button
        onClick={() => {
          actions.notify('diy2', { index: 2 })
        }}
      >
        notify diy2
      </button>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### connect

> Wrap field components with value / defaultValue / onChange of field, which make it esaily make custom field

```typescript
type Connect = <T extends React.ComponentType<IFieldProps>>(options?: IConnectOptions<T>) => 
(Target: T) => React.PureComponent<IFieldProps>
```
**Usage**

```typescript
import {registerFormField,connect} from '@uform/next'

registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)
```

#### registerFormField

```typescript
type registerFormField(
   name        : string,                             // name of field
   component   : React.ComponentType<IFieldProps>,   // component of field
   noMiddleware: boolean                             // whether use middleware
)
```

**Usage**

```jsx

import SchemaForm, { SchemaMarkupField as Field, registerFormField, connect, createFormActions } from '@uform/next'

registerFormField(
  'custom-string',
  connect()(props => <input {...props} value={props.value || ''} />)
)
const actions = createFormActions()

const App = () => {
  return (
    <SchemaForm actions={actions} >
      <Field type="custom-string" name="custom-string" title="Custom Field" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Interfaces

> The Interfaces is fully inherited from @uform/react. The specific Interfaces of @uform/next is listed below.
---

#### IForm

> Form instance object API created by using createForm



```typescript
interface IForm {
  /*
   * Form submission, if the callback parameter returns Promise,
   * Then the entire submission process will hold and load is true.
   * Wait for Promise resolve to trigger the form onFormSubmitEnd event while loading is false
   */
   submit(
      onSubmit?: (values: IFormState['values']) => any | Promise<any>
    ): Promise<{
       Validated: IFormValidateResult
       Payload: any //onSubmit callback function return value
   }>
   
   /*
    * Clear the error message, you can pass the FormPathPattern to batch or precise control of the field to be cleared.
    * For example, clearErrors("*(aa,bb,cc)")
    */
   clearErrors: (pattern?: FormPathPattern) => void
   
   /*
    * Get status changes, mainly used to determine which states in the current life cycle have changed in the form lifecycle hook.
    * For example, hasChanged(state,'value.aa')
    */
   hasChanged(target: IFormState | IFieldState | IVirtualFieldState, path: FormPathPattern): boolean
   
   /*
    * Reset form
    */
   reset(options?: {
     // Forced to empty
     forceClear?: boolean
     // Forced check
     validate?: boolean
     // Reset range for batch or precise control of the field to be reset
     selector?: FormPathPattern
   }): Promise<void | IFormValidateResult>
   
   /*
    * Validation form
    */
   validate(path?: FormPathPattern, options?: {
     // Is it pessimistic check, if the current field encounters the first verification error, stop the subsequent verification process
     first?:boolean
   }): Promise<IFormValidateResult>
   
   /*
    * Set the form status
    */
   setFormState(
     // Operation callback
     callback?: (state: IFormState) => any,
     // No trigger the event
     silent?: boolean
   ): void
   
   /*
    * Get form status
    */
   getFormState(
     //transformer
     callback?: (state: IFormState) => any
   ): any
   
   /*
    * Set the field status
    */
   setFieldState(
     // Field path
     path: FormPathPattern,
     // Operation callback
     callback?: (state: IFieldState) => void,
     // No trigger the event
     silent?: boolean
   ): void
   
   /*
    * Get the field status
    */
   getFieldState(
     // Field path
     path: FormPathPattern,
     // Transformer
     callback?: (state: IFieldState) => any
   ): any
   
   /*
    * Registration field
    */
   registerField(props: {
    // Node path
    path?: FormPathPattern
    // Data path
    name?: string
    // Field value
    value?: any
    // Field multi-value
    values?: any[]
    // Field initial value
    initialValue?: any
    // Field extension properties
    props?: any
    // Field check rule
    rules?: ValidatePatternRules[]
    // Field is required
    required?: boolean
    // Is the field editable?
    editable?: boolean
    // Whether the field is dirty check
    useDirty?: boolean
    // Field state calculation container, mainly used to extend the core linkage rules
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IField
  
  /*
   * Register virtual fields
   */
  registerVirtualField(props: {
    // Node path
    path?: FormPathPattern
    // Data path
    name?: string
    // Field extension properties
    props?: any
    // Whether the field is dirty check
    useDirty?: boolean
    // Field state calculation container, mainly used to extend the core linkage rules
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IVirtualField
  
  /*
   * Create a field data operator, which will explain the returned API in detail later.
   */
  createMutators(field: IField): IMutators
  
  /*
   * Get the form observer tree
   */
  getFormGraph(): IFormGraph
  
  /*
   * Set the form observer tree
   */
  setFormGraph(graph: IFormGraph): void
  
  /*
   * Listen to the form life cycle
   */
  subscribe(callback?: ({
    type,
    payload
  }: {
    type: string
    payload: any
  }) => void): number
  
  /*
   * Cancel the listening form life cycle
   */
  unsubscribe(id: number): void
  
  /*
   * Trigger form custom life cycle
   */
  notify: <T>(type: string, payload?: T) => void
  
  /*
   * Set the field value
   */
  setFieldValue(path?: FormPathPattern, value?: any): void
  
  /*
   * Get the field value
   */
  getFieldValue(path?: FormPathPattern): any
  
  /*
   * Set the initial value of the field
   */
  setFieldInitialValue(path?: FormPathPattern, value?: any): void
  
  /*
   * Get the initial value of the field
   */
  getFieldInitialValue(path?: FormPathPattern): any
}
```

#### ButtonProps

```typescript
interface ButtonProps {
  /** reset pops **/
  onSubmit?: ISchemaFormProps['onSubmit']
  showLoading?: boolean
  /** nextBtnProps **/
  // type of btn
  type?: 'primary' | 'secondary' | 'normal'
  // size of btn
  size?: 'small' | 'medium' | 'large'
  // size of Icon 
  iconSize?: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl'
  // type of button when component = 'button'
  htmlType?: 'submit' | 'reset' | 'button'
  // typeof btn
  component?: 'button' | 'a'
  // Set the loading state of the button
  loading?: boolean
  // Whether it is a ghost button
  ghost?: true | false | 'light' | 'dark'
  // Whether it is a text button
  text?: boolean
  // Whether it is a warning button
  warning?: boolean
  // Whether it is disabled
  disabled?: boolean
  // Callback for button click
  onClick?: (e: {}) => void
  // Valid when Button component is set to 'a', which represents the URL of the linked page
  href?: string
  // Valid when Button component is set to 'a', which represents the way of open the linked document
  target?: string
}
```

#### CardProps

```typescript
interface CardProps extends HTMLAttributesWeak, CommonProps {
  // media in card
  media?: React.ReactNode

  // title of the card
  title?: React.ReactNode

  // subTitle of the card
  subTitle?: React.ReactNode

  // action button of the card
  actions?: React.ReactNode

  // whether to show bullet of title
  showTitleBullet?: boolean

  // whether to show divider of head
  showHeadDivider?: boolean
  contentHeight?: string | number

  // extra content of card
  extra?: React.ReactNode

  // whether to set free mode, title, subtitle will be invalid when this options turns on
  free?: boolean
}
```

#### ICompatItemProps

```typescript
interface ICompatItemProps
  extends Exclude<ItemProps, 'labelCol' | 'wrapperCol'>,
    Partial<ISchemaFieldComponentProps> {
  labelCol?: number | { span: number; offset?: number }
  wrapperCol?: number | { span: number; offset?: number }
}
```


#### IFieldState

```typescript
interface IFieldState<FieldProps = any> {
  /**Read-only attribute**/
  // State name, FieldState
  displayName?: string // Data path
  name: string // Node path
  path: string // Has been initialized
  initialized: boolean // Is it in the original state, the state is true only when value===intialValues
  pristine: boolean // Is it in a legal state, as long as the error length is greater than 0, the valid is false
  valid: boolean // Is it illegal, as long as the error length is greater than 0, the valid is true
  invalid: boolean // Is it in check state?
  validating: boolean // Is it modified, if the value changes, the property is true, and will be true throughout the life of the field
  modified: boolean // Is it touched?
  touched: boolean // Is it activated, when the field triggers the onFocus event, it will be triggered to true, when onBlur is triggered, it is false
  active: boolean // Have you ever visited, when the field triggers the onBlur event, it will be triggered to true
  visited: boolean /** writable property**/ // Is it visible, note: if the state is false, then the value of the field will not be submitted, and the UI will not display
  visible: boolean // Whether to show, note: if the state is false, then the value of the field will be submitted, the UI will not display, similar to the form hidden field
  display: boolean // Is it editable?
  editable: boolean // Is it in the loading state, note: if the field is in asynchronous verification, loading is true
  loading: boolean // Field multi-parameter value, such as when the field onChange trigger, the event callback passed multi-parameter data, then the value of all parameters will be stored here
  values: any[] // Field error message
  errors: string[] // Field alert message
  warnings: string[] // Field value, is equal to values[0]
  value: any // Initial value
  initialValue: any // Check the rules, the specific type description refers to the following documents
  rules: ValidatePatternRules[] // Is it required?
  required: boolean // Whether to mount
  mounted: boolean // Whether to uninstall
  unmounted: boolean // field extension properties
  props: FieldProps
}
```


#### ISchemaFieldComponentProps

```typescript
interface ISchemaFieldComponentProps extends IFieldState {
  schema: Schema
  mutators: IMutators
  form: IForm
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}
```

#### ISchemaVirtualFieldComponentProps

```typescript
interface ISchemaVirtualFieldComponentProps extends IVirtualFieldState {
  schema: Schema
  form: IForm
  children: React.ReactElement[]
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}
```

#### ISchemaFieldWrapper

```typescript
interface ISchemaFieldWrapper<Props = any> {
  (Traget: ISchemaFieldComponent):
    | React.FC<Props>
    | React.ClassicComponent<Props>
}
```

#### ISchemaFieldComponent

```typescript
declare type ISchemaFieldComponent = ComponentWithStyleComponent<
  ISchemaFieldComponentProps
> & {
  __WRAPPERS__?: ISchemaFieldWrapper[]
}
```

#### ISchemaVirtualFieldComponent

```typescript
declare type ISchemaVirtualFieldComponent = ComponentWithStyleComponent<
  ISchemaVirtualFieldComponentProps
> & {
  __WRAPPERS__?: ISchemaFieldWrapper[]
}
```

#### ISchemaFormRegistry

```typescript
interface ISchemaFormRegistry {
  fields: {
    [key: string]: ISchemaFieldComponent
  }
  virtualFields: {
    [key: string]: ISchemaVirtualFieldComponent
  }
  wrappers?: ISchemaFieldWrapper[]
  formItemComponent: React.JSXElementConstructor<any>
  formComponent: string | React.JSXElementConstructor<any>
}
```

#### INextSchemaFieldProps

```typescript
interface INextSchemaFieldProps {
    name?: string;
    /** ISchema **/
    title?: SchemaMessage;
    description?: SchemaMessage;
    default?: any;
    readOnly?: boolean;
    writeOnly?: boolean;
    type?: 'string' | 'object' | 'array' | 'number' | string;
    enum?: Array<string | number | {
        label: SchemaMessage;
        value: any;
    }>;
    const?: any;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: string | RegExp;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[] | boolean;
    format?: string;
    properties?: {
        [key: string]: ISchema;
    };
    items?: ISchema | ISchema[];
    additionalItems?: ISchema;
    patternProperties?: {
        [key: string]: ISchema;
    };
    additionalProperties?: ISchema;
    editable?: boolean;
    visible?: boolean;
    display?: boolean;
    ['x-props']?: {
        [name: string]: any;
    };
    ['x-index']?: number;
    ['x-rules']?: ValidatePatternRules;
    ['x-component']?: string;
    ['x-component-props']?: {
        [name: string]: any;
    };
    ['x-render']?: <T = ISchemaFieldComponentProps>(props: T & {
        renderComponent: () => React.ReactElement;
    }) => React.ReactElement;
    ['x-effect']?: (dispatch: (type: string, payload: any) => void, option?: object) => {
        [key: string]: any;
    };

```

#### IPreviewTextProps

```typescript
interface IPreviewTextProps {
  className?: React.ReactText
  dataSource?: any[]
  value?: any
  addonBefore?: React.ReactNode
  innerBefore?: React.ReactNode
  addonTextBefore?: React.ReactNode
  addonTextAfter?: React.ReactNode
  innerAfter?: React.ReactNode
  addonAfter?: React.ReactNode
}

```


#### IMutators

> The instance API created by crewikiutators is mainly used to operate field data.

```typescript
interface IMutators {
  // Changing the field value and multi parameter condition will store all parameters in values
  change(...values: any[]): any
  // Get focus, trigger active state change
  focus(): void
  // Lose focus, trigger active / visited status change
  blur(): void
  // Trigger current field verifier
  validate(): Promise<IFormValidateResult>
  // Whether the value of the current field exists in the values property of form
  exist(index?: number | string): Boolean

  /**Array operation method**/

  // Append data
  push(value?: any): any[]
  // Pop up tail data
  pop(): any[]
  // Insert data
  insert(index: number, value: any): any[]
  // Delete data
  remove(index: number | string): any
  // Head insertion
  unshift(value: any): any[]
  // Head ejection
  shift(): any[]
  // Move element
  move($from: number, $to: number): any[]
  // Move down
  moveDown(index: number): any[]
  // Move up
  moveUp(index: number): any[]
}
```

#### IFieldProps

```typescript
interface IFieldProps<V = any> {
   name                : string // Node path
   path                : Array<string> // Data path
   value               : V // value
   errors              : Array<string> // Field error message
   editable            : boolean | ((name:string) => boolean) // Is it editable?
   locale              : Locale // i18n locale
   loading             : boolean // Is it in the loading state, note: if the field is in asynchronous verification, loading is true
   schemaPath          : Array<string> // schema path
   getSchema           : (path: string) => ISchema // get schema by path
   renderField         : (childKey: string, reactKey: string | number) => JSX.Element | string | null
   renderComponent     : React.FunctionComponent<Partial<IFieldProps> | undefined>,
   getOrderProperties  : () => Array<{schema: ISchema, key: number, path: string, name: string }>,
   mutators            : IMutators,
   schema              : ISchema
}

```

#### IConnectOptions

```typescript

interface IConnectOptions<T> {
  // name of value property
  valueName?: string
  // name of event property
  eventName?: string
  // default props
  defaultProps?: Partial<IConnectProps>
  // In some case, the value of our event function is not the first parameter of the event callback, and further customization is required.
  getValueFromEvent?: (props:  IFieldProps['x-props'], event: Event, ...args: any[]) => any 
  // props transformer
  getProps?: (connectProps: IConnectProps, fieldProps: IFieldProps) => IConnectProps 
  // component transformer
  getComponent?: ( 
    target: T, 
    connectProps: IConnectProps,
    fieldProps: IFieldProps
  ) => T
}

```