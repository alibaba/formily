# @uform/next

> UForm Fusion Next 组件插件包
> @uform/next 中主要包含了以下部分：
>
> - Form 表单容器
> - Field 表单字段

### 安装

```bash
npm install --save @uform/next
```

### 目录

<!-- toc -->

- [使用方式](#使用方式)
  - [`快速开始`](#快速开始)
- [Components](#components)
  - [`<SchemaForm/>`](#SchemaForm)
  - [`<SchemaMarkupField/>`](#SchemaMarkupField)
  - [`<Submit/>`](#Submit)
  - [`<Reset/>`](#Reset)
  - [`<Field/>(即将废弃，请使用<SchemaMarkupField/>)`](<#Field(即将废弃，请使用SchemaMarkupField)>)
- [表单List](#Array-Components)
  - [`array`](#array)
  - [`cards`](#cards)
  - [`table`](#table)
- [布局组件](#Layout-Components)
  - [`<FormBlock/>`](#FormBlock)
  - [`<FormCard/>`](#FormCard)
  - [`<FormStep/>`](#FormStep)
  - [`<FormLayout/>`](#FormLayout)
  - [`<FormItemGrid/>`](#FormItemGrid)
  - [`<FormTextBox/>`](#FormTextBox)
  - [`<FormButtonGroup/>`](#FormButtonGroup)
  - [`<TextButton/>`](#TextButton)
  - [`<CircleButton/>`](#CircleButton)
- [字段类型](#Type-of-SchemaMarkupField)
  - [string](#string)
  - [textarea](#textarea)
  - [password](#password)
  - [number](#number)
  - [boolean](#boolean)
  - [date](#date)
  - [time](#time)
  - [range](#range)
  - [upload](#upload)
  - [checkbox](#checkbox)
  - [radio](#radio)
  - [rating](#rating)
  - [transfer](#transfer)  
- [API](#API)
  - [`createFormActions`](#createFormActions)
  - [`createAsyncFormActions`](#createAsyncFormActions)
  - [`FormEffectHooks`](#FormEffectHooks)
  - [`createEffectHook`](#createEffectHook)
- [Interfaces](#Interfaces)
  - [`ButtonProps`](#ButtonProps)
  - [`INextSchemaFormProps`](#INextSchemaFormProps)
  - [`ISchemaFormRegistry`](#ISchemaFormRegistry)
  - [`INextSchemaFieldProps`](#INextSchemaFieldProps)

### 使用方式

---

#### 快速开始

例子：使用 JSX 开发

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
      <Field type="number" title="数字选择" name="number" />
      <Field type="boolean" title="开关选择" name="boolean" />
      <Field type="date" title="日期选择" name="date" />
      <Field
        type="daterange"
        title="日期范围"
        default={['2018-12-19', '2018-12-19']}
        name="daterange"
      />
      <Field type="year" title="年份" name="year" />
      <Field type="time" title="时间" name="time" />
      <Field
        type="upload"
        title="卡片上传文件"
        name="upload"
        x-props={{ listType: 'card' }}
      />
      <Field
        type="upload"
        title="拖拽上传文件"
        name="upload2"
        x-props={{ listType: 'dragger' }}
      />
      <Field
        type="upload"
        title="普通上传文件"
        name="upload3"
        x-props={{ listType: 'text' }}
      />
      <Field
        type="range"
        title="范围选择"
        name="range"
        x-props={{ min: 0, max: 1024, marks: [0, 1024] }}
      />
      <Field
        type="transfer"
        enum={[{ value: 1, label: '选项1' }, { value: 2, label: '选项2' }]}
        title="穿梭框"
        name="transfer"
      />
      <Field type="rating" title="等级" name="rating" />
      <FormButtonGroup offset={7} sticky>
        {/* <Submit /> */}
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
          上传文件
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
          改变radio的值
        </Button>
      </FormButtonGroup>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

例子：使用 schema 来开发

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
        title: '数字选择'
      },
      boolean: {
        type: 'boolean',
        title: '开关选择'
      },
      date: {
        type: 'date',
        title: '日期选择'
      },
      daterange: {
        type: 'daterange',
        default: ['2018-12-19', '2018-12-19'],
        title: '日期范围'
      },
      year: {
        type: 'year',
        title: '年份'
      },
      time: {
        type: 'time',
        title: '时间'
      },
      upload: {
        type: 'upload',
        'x-props': {
          listType: 'card'
        },
        title: '卡片上传文件'
      },
      upload2: {
        type: 'upload',
        'x-props': {
          listType: 'dragger'
        },
        title: '拖拽上传文件'
      },
      upload3: {
        type: 'upload',
        'x-props': {
          listType: 'text'
        },
        title: '普通上传文件'
      },
      range: {
        type: 'range',
        'x-props': {
          min: 0,
          max: 1024,
          marks: [0, 1024]
        },
        title: '范围选择'
      },
      transfer: {
        type: 'transfer',
        enum: [
          {
            value: 1,
            label: '选项1'
          },
          {
            value: 2,
            label: '选项2'
          }
        ],
        title: '穿梭框'
      },
      rating: {
        type: 'rating',
        title: '等级'
      },
      // layout_btb_g: {
      //   type: 'object',
      //   'x-component': 'button-group',
      //   'x-component-props': {
      //     offset:7,
      //     sticky: true,          
      //   },
      //   properties: {
      //     submit_btn: {
      //       type: 'object',
      //       'x-component': 'submit',
      //       'x-component-props': {
      //         children: '提交',
      //       },
      //     },
      //     reset_btn: {
      //       type: 'object',
      //       'x-component': 'reset',
      //       'x-component-props': {
      //         children: '重置',
      //       },
      //     },
      //   }
      // },
    }
  }
  return <SchemaForm actions={actions} schema={schema} />
}

ReactDOM.render(<App />, document.getElementById('root'))
```


### Components

---

#### `<SchemaForm/>`

> SchemaForm 组件 Props

```typescript
interface INextSchemaFormProps {
  schema?: ISchema
  fields?: ISchemaFormRegistry['fields']
  virtualFields?: ISchemaFormRegistry['virtualFields']
  formComponent?: ISchemaFormRegistry['formComponent']
  formItemComponent?: ISchemaFormRegistry['formItemComponent']
  /** 样式前缀 */
  prefix?: string

  /** 内联表单 */
  inline?: boolean

  /** 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。 */
  size?: 'large' | 'medium' | 'small'

  /** 标签的位置*/
  labelAlign?: 'top' | 'left' | 'inset'

  /** * 标签的左右对齐方式 */
  labelTextAlign?: 'left' | 'right'

  /** * 经 `new Field(this)` 初始化后，直接传给 Form 即可 用到表单校验则不可忽略此项 */
  field?: any

  /** 保存 Form 自动生成的 field 对象 */
  saveField?: () => void

  /** 控制第一级 Item 的 labelCol */
  labelCol?: {}

  /**
   * 控制第一级 Item 的 wrapperCol
   */
  wrapperCol?: {}

  /** form内有 `htmlType="submit"` 的元素的时候会触发 */
  onSubmit?: () => void

  /** 子元素 */
  children?: any

  /** 扩展class */
  className?: string

  /** 自定义内联样式 */
  style?: React.CSSProperties

  /** 表单数值 */
  value?: {}

  /** 表单变化回调 */
  onChange?: (values: {}, item: {}) => void

  /** 设置标签类型 */
  component?: string | (() => void)
  inline?: boolean
  className?: string
  style?: React.CSSProperties
  labelCol?: number | { span: number; offset?: number }
  wrapperCol?: number | { span: number; offset?: number }
  previewPlaceholder?: string | ((props: IPreviewTextProps) => string)
}
```
#### `<SchemaMarkupField/>`

> SchemaMarkupField 组件 Props

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

#### `<Submit/>`

> Submit 组件 Props

```typescript
interface ISubmitProps {
  /** reset pops **/
    onSubmit?: ISchemaFormProps['onSubmit']
    showLoading?: boolean
    /** nextBtnProps **/
    // 按钮的类型
    type?: 'primary' | 'secondary' | 'normal';
    // 按钮的尺寸
    size?: 'small' | 'medium' | 'large';
    // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小
    iconSize?:
        | 'xxs'
        | 'xs'
        | 'small'
        | 'medium'
        | 'large'
        | 'xl'
        | 'xxl'
        | 'xxxl';
    // 当 component = 'button' 时，设置 button 标签的 type 值
    htmlType?: 'submit' | 'reset' | 'button';
    // 设置标签类型
    component?: 'button' | 'a';
    // 设置按钮的载入状态
    loading?: boolean;
    // 是否为幽灵按钮
    ghost?: true | false | 'light' | 'dark';
    // 是否为文本按钮
    text?: boolean;
    // 是否为警告按钮
    warning?: boolean;
    // 是否禁用
    disabled?: boolean;
    // 点击按钮的回调
    onClick?: (e: {}) => void;
    // 在Button组件使用component属性值为a时有效，代表链接页面的URL
    href?: string;
    // 在Button组件使用component属性值为a时有效，代表何处打开链接文档
    target?: string;
}

```

#### `<Reset/>`

> Reset 组件 Props

```typescript
interface IResetProps {
    /** reset pops **/
    forceClear?: boolean
    validate?: boolean
    /** nextBtnProps **/
    // 按钮的类型
    type?: 'primary' | 'secondary' | 'normal';
    // 按钮的尺寸
    size?: 'small' | 'medium' | 'large';
    // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小
    iconSize?:
        | 'xxs'
        | 'xs'
        | 'small'
        | 'medium'
        | 'large'
        | 'xl'
        | 'xxl'
        | 'xxxl';
    // 当 component = 'button' 时，设置 button 标签的 type 值
    htmlType?: 'submit' | 'reset' | 'button';
    // 设置标签类型
    component?: 'button' | 'a';
    // 设置按钮的载入状态
    loading?: boolean;
    // 是否为幽灵按钮
    ghost?: true | false | 'light' | 'dark';
    // 是否为文本按钮
    text?: boolean;
    // 是否为警告按钮
    warning?: boolean;
    // 是否禁用
    disabled?: boolean;
    // 点击按钮的回调
    onClick?: (e: {}) => void;
    // 在Button组件使用component属性值为a时有效，代表链接页面的URL
    href?: string;
    // 在Button组件使用component属性值为a时有效，代表何处打开链接文档
    target?: string;
}
```

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
          title="数组"
          name="array"
          maxItems={3}
          type="array"
          x-props={{
            renderAddition: '这是定制的添加文案',
            renderRemove: '这是定制的删除文案'
          }}
        >
          <Field type="object">
            <FormBlock title="基础信息">
              <FormLayout labelCol={9} wrapperCol={6}>
                <Field name="aa" type="string" title="字段1" />
                <Field name="bb" type="string" title="字段2" />
                <FormItemGrid title="字段3" gutter={10}>
                  <Field name="cc" type="string" />
                  <Field name="dd" type="string" />
                </FormItemGrid>
              </FormLayout>
            </FormBlock>
            <FormBlock title="嵌套数组">
              <Field name="array2" maxItems={3} type="array">
                <Field type="object">
                  <FormLayout labelCol={9} wrapperCol={6}>
                    <Field name="aa" type="string" title="字段1" />
                    <Field name="bb" type="string" title="字段2" />
                    <FormItemGrid title="字段3" gutter={10}>
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
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### cards


**用法**

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
          title: '这是卡片标题',
          renderAddition: '这是定制的添加文案',
          renderRemove: '这是定制的删除文案'
        }}
      >
        <Field type="object">
          <FormLayout labelCol={6} wrapperCol={8}>
            <Field
              name="aa"
              type="string"
              description="hello world"
              title="字段1"
            />
            <Field name="bb" type="string" title="字段2" />
            <Field name="cc" type="string" title="字段3" />
            <Field name="dd" type="string" title="字段4" />
            <Field name="dd" type="string" title="字段5" />
            <Field name="ee" type="string" title="字段6" />
            <Field name="ff" type="string" title="字段7" />
            <Field name="gg" type="daterange" title="字段8" />
          </FormLayout>
          <Field
            name="array"
            maxItems={3}
            type="array"
            x-component="cards"
            x-props={{ title: '这是卡片标题' }}
          >
            <Field type="object">
              <FormLayout labelCol={6} wrapperCol={8}>
                <Field
                  name="aa"
                  type="string"
                  description="hello world"
                  title="字段1"
                />
                <Field name="bb" type="string" title="字段2" />
                <Field name="cc" type="string" title="字段3" />
                <Field name="dd" type="string" title="字段4" />
                <Field name="dd" type="string" title="字段5" />
                <Field name="ee" type="string" title="字段6" />
                <Field name="ff" type="string" title="字段7" />
                <Field name="gg" type="daterange" title="字段8" />
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
          title="数组"
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
              title="字段1"
            />
            <Field name="bb" type="string" title="字段2" />
            <Field name="cc" type="string" title="字段3" />
            <Field name="dd" type="string" title="字段4" x-index={1} />
            <Field name="ee" type="string" title="字段5" />
            <Field name="ff" type="string" title="字段6" />
            <Field name="gg" type="string" title="字段7" />
            <Field name="hh" type="daterange" title="字段8" />
          </Field>
        </Field>
      </FormLayout>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))

```


### Layout Components 


#### `<TextButton/>`

> TextButton 组件 Props, 完全继承自 [ButtonProps](#ButtonProps)

#### `<CircleButton/>`

> CircleButton 组件 Props, 完全继承自 [ButtonProps](#ButtonProps)


#### `<Field/>(即将废弃，请使用SchemaMarkupField)`

> 即将废弃，请使用[SchemaMarkupField](#SchemaMarkupField)


### Type of SchemaMarkupField

#### string

Fusion-Next `<Input/>`, `<Input.Textarea/>`, `<Select/>`

**用法**

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
          placeholder: "input"
        }}
      />
      <Field
        type="string"
        enum={['1', '2', '3', '4']}
        required
        title="Simple Select"
        name="simpleSelect"
        x-component-props={{
          placeholder: "select"
        }}
      />
      <Field
        type="string"
        enum={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
          { label: 'Four', value: '4' },
        ]}
        required
        title="Object Select"
        name="objSelect"
        x-component-props={{
          placeholder: "select"
        }}
      />
      <Field
        type="string"
        title="TextArea"
        name="textarea"
        x-component="textarea"
        x-component-props={{
          placeholder: "textarea"
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


#### textarea

Fusion-Next `<Input.Textarea/>`

**用法**

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
          placeholder: "textarea"
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### password


Fusion-Next `<Input htmlType="password"/>`

**用法**

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
          placeholder: "password"
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


#### number

Fusion-Next `<NumberPicker/>`

**用法**

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
        type="number"
        required
        title="Number"
        name="number"
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### boolean

Fusion-Next `<Switch />`

**用法**

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
          checkedChildren: "on",
          unCheckedChildren: "off" 
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### date

Fusion-Next `<DatePicker />`

**用法**

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

Fusion-Next `<TimePicker />`

**用法**

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

Fusion-Next `<Range />`

**用法**

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


Fusion-Next `<Upload />`

**用法**

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

Fusion-Next `<Checkbox />`

**用法**

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
          { label: 'Four', value: '4' },
        ]}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### radio

Fusion-Next `<Radio />`

**用法**

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
          { label: 'Four', value: '4' },
        ]}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### rating


Fusion-Next `<Rating/>`

**用法**

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


Fusion-Next `<Transfer/>`

**用法**

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
          { label: 'Four', value: '4' },
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

> 整体完全继承@uform/react, 下面只列举@uform/next的特有API

---

#### `createFormActions`

> 创建一个 [IFormActions](#IFormActions) 实例

**签名**

```typescript
createFormActions(): IFormActions
```

**用法**

```typescript
import { createFormActions } from '@uform/next'

const actions = createFormActions()
console.log(actions.getFieldValue('username'))
```

#### `createAsyncFormActions`

> 创建一个 [IFormAsyncActions](#IFormAsyncActions) 实例，成员方法 同[IFormActions](#IFormActions),
> 但是调用 API 返回的结果是异步的(promise)。

**签名**

```typescript
createAsyncFormActions(): IFormAsyncActions
```

**用法**

```typescript
import { createAsyncFormActions } from '@uform/next'

const actions = createAsyncFormActions()
actions.getFieldValue('username').then(val => console.log(val))
```

#### `FormEffectHooks`

> 返回包含所有 UForm 生命周期的钩子函数，可以被监听消费

**用法**

```typescript
import SchemaForm, { FormEffectHooks } from '@uform/next'
const {
  /**
   * Form LifeCycle
   **/
  onFormWillInit$, // 表单预初始化触发
  onFormInit$, // 表单初始化触发
  onFormChange$, // 表单变化时触发
  onFormInputChange$, // 表单事件触发时触发，用于只监控人工操作
  onFormInitialValueChange$, // 表单初始值变化时触发
  onFormReset$, // 表单重置时触发
  onFormSubmit$, // 表单提交时触发
  onFormSubmitStart$, // 表单提交开始时触发
  onFormSubmitEnd$, // 表单提交结束时触发
  onFormMount$, // 表单挂载时触发
  onFormUnmount$, // 表单卸载时触发
  onFormValidateStart$, // 表单校验开始时触发
  onFormValidateEnd$, //表单校验结束时触发
  onFormValuesChange$, // 表单值变化时触发
  /**
   * FormGraph LifeCycle
   **/
  onFormGraphChange$, // 表单观察者树变化时触发
  /**
   * Field LifeCycle
   **/
  onFieldWillInit$, // 字段预初始化时触发
  onFieldInit$, // 字段初始化时触发
  onFieldChange$, // 字段变化时触发
  onFieldMount$, // 字段挂载时触发
  onFieldUnmount$, // 字段卸载时触发
  onFieldInputChange$, // 字段事件触发时触发，用于只监控人工操作
  onFieldValueChange$, // 字段值变化时触发
  onFieldInitialValueChange$ // 字段初始值变化时触发
} = FormEffectHooks

const App = () => {
  return (
    <SchemaForm
      effects={() => {
        onFormInit$().subscribe(() => {
          console.log('初始化')
        })
      }}
    >
      ...
    </SchemaForm>
  )
}
```


#### createEffectHook

> 自定义hook

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
        diyHook1$().subscribe((payload) => {
          console.log('diy1 hook triggered', payload)
        })

        diyHook2$().subscribe((payload) => {
          console.log('diy2 hook triggered', payload)
        })
      }}
    >
      <button onClick={() => {
        actions.notify('diy1', { index: 1 })
      }}>notify diy1</button>
      <button onClick={() => {
        actions.notify('diy2', { index: 2 })
      }}>notify diy2</button>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Interfaces

> 整体完全继承@uform/react, 下面只列举@uform/next的特有的Interfaces

---

#### IForm

> 通过 createForm 创建出来的 Form 实例对象 API

```typescript
interface IForm {
  /*
   * 表单提交，如果回调参数返回Promise，
   * 那么整个提交流程会hold住，同时loading为true，
   * 等待Promise resolve才触发表单onFormSubmitEnd事件，同时loading为false
   */
  submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<{
    validated: IFormValidateResult
    payload: any //onSubmit回调函数返回值
  }>

  /*
   * 清空错误消息，可以通过传FormPathPattern来批量或精确控制要清空的字段，
   * 比如clearErrors("*(aa,bb,cc)")
   */
  clearErrors: (pattern?: FormPathPattern) => void

  /*
   * 获取状态变化情况，主要用于在表单生命周期钩子内判断当前生命周期中有哪些状态发生了变化，
   * 比如hasChanged(state,'value.aa')
   */
  hasChanged(
    target: IFormState | IFieldState | IVirtualFieldState,
    path: FormPathPattern
  ): boolean

  /*
   * 重置表单
   */
  reset(options?: {
    //强制清空
    forceClear?: boolean
    //强制校验
    validate?: boolean
    //重置范围，用于批量或者精确控制要重置的字段
    selector?: FormPathPattern
  }): Promise<void | IFormValidateResult>

  /*
   * 校验表单
   */
  validate(
    path?: FormPathPattern,
    options?: {
      //是否悲观校验，如果当前字段遇到第一个校验错误则停止后续校验流程
      first?: boolean
    }
  ): Promise<IFormValidateResult>

  /*
   * 设置表单状态
   */
  setFormState(
    //操作回调
    callback?: (state: IFormState) => any,
    //是否不触发事件
    silent?: boolean
  ): void

  /*
   * 获取表单状态
   */
  getFormState(
    //transformer
    callback?: (state: IFormState) => any
  ): any

  /*
   * 设置字段状态
   */
  setFieldState(
    //字段路径
    path: FormPathPattern,
    //操作回调
    callback?: (state: IFieldState) => void,
    //是否不触发事件
    silent?: boolean
  ): void

  /*
   * 获取字段状态
   */
  getFieldState(
    //字段路径
    path: FormPathPattern,
    //transformer
    callback?: (state: IFieldState) => any
  ): any

  /*
   * 注册字段
   */
  registerField(props: {
    //节点路径
    path?: FormPathPattern
    //数据路径
    name?: string
    //字段值
    value?: any
    //字段多参值
    values?: any[]
    //字段初始值
    initialValue?: any
    //字段扩展属性
    props?: any
    //字段校验规则
    rules?: ValidatePatternRules[]
    //字段是否必填
    required?: boolean
    //字段是否可编辑
    editable?: boolean
    //字段是否走脏检查
    useDirty?: boolean
    //字段状态计算容器，主要用于扩展核心联动规则
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IField

  /*
   * 注册虚拟字段
   */
  registerVirtualField(props: {
    //节点路径
    path?: FormPathPattern
    //数据路径
    name?: string
    //字段扩展属性
    props?: any
    //字段是否走脏检查
    useDirty?: boolean
    //字段状态计算容器，主要用于扩展核心联动规则
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IVirtualField

  /*
   * 创建字段数据操作器，后面会详细解释返回的API
   */
  createMutators(field: IField): IMutators

  /*
   * 获取表单观察者树
   */
  getFormGraph(): IFormGraph

  /*
   * 设置表单观察者树
   */
  setFormGraph(graph: IFormGraph): void

  /*
   * 监听表单生命周期
   */
  subscribe(
    callback?: ({ type, payload }: { type: string; payload: any }) => void
  ): number

  /*
   * 取消监听表单生命周期
   */
  unsubscribe(id: number): void

  /*
   * 触发表单自定义生命周期
   */
  notify: <T>(type: string, payload?: T) => void

  /*
   * 设置字段值
   */
  setFieldValue(path?: FormPathPattern, value?: any): void

  /*
   * 获取字段值
   */
  getFieldValue(path?: FormPathPattern): any

  /*
   * 设置字段初始值
   */
  setFieldInitialValue(path?: FormPathPattern, value?: any): void

  /*
   * 获取字段初始值
   */
  getFieldInitialValue(path?: FormPathPattern): any
}
```


### Interfaces

> 整体完全继承@uform/react, 下面只列举@uform/next 的特有的 Interfaces

---

#### ButtonProps

```typescript
interface ISubmitProps {
  /** reset pops **/
    onSubmit?: ISchemaFormProps['onSubmit']
    showLoading?: boolean
    /** nextBtnProps **/
    // 按钮的类型
    type?: 'primary' | 'secondary' | 'normal';
    // 按钮的尺寸
    size?: 'small' | 'medium' | 'large';
    // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小
    iconSize?:
        | 'xxs'
        | 'xs'
        | 'small'
        | 'medium'
        | 'large'
        | 'xl'
        | 'xxl'
        | 'xxxl';
    // 当 component = 'button' 时，设置 button 标签的 type 值
    htmlType?: 'submit' | 'reset' | 'button';
    // 设置标签类型
    component?: 'button' | 'a';
    // 设置按钮的载入状态
    loading?: boolean;
    // 是否为幽灵按钮
    ghost?: true | false | 'light' | 'dark';
    // 是否为文本按钮
    text?: boolean;
    // 是否为警告按钮
    warning?: boolean;
    // 是否禁用
    disabled?: boolean;
    // 点击按钮的回调
    onClick?: (e: {}) => void;
    // 在Button组件使用component属性值为a时有效，代表链接页面的URL
    href?: string;
    // 在Button组件使用component属性值为a时有效，代表何处打开链接文档
    target?: string;
}
```


