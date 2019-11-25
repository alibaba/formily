# @uform/next

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
- [表单 List](#Array-Components)
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
  - [`INextSchemaFormProps`](#INextSchemaFormProps)
  

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
      }
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

  /** 保存 Form 自动生成的 field 对象 */
  saveField?: () => void

  /** 控制第一级 Item 的 labelCol */
  labelCol?: {}

  /**
   * 控制第一级 Item 的 wrapperCol
   */
  wrapperCol?: {}

  /** form内有 `htmlType="submit"` 的元素的或actions.submit的时候会触发，返回值支持Promise. */
  onSubmit?: () => Promise<IFormSubmitResult>

  /** 子元素 */
  children?: any

  /** 扩展class */
  className?: string

  /** 自定义内联样式 */
  style?: React.CSSProperties

  /** 表单数值 */
  value?: {}

  /** 表单变化回调 */
  onChange?: (values: {}) => void

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

**用法**

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
import '@alifd/next/dist/next.css'
const App = () => {
  return (
    <React.Fragment>
      <h5>常规布局</h5>
      <SchemaForm>
        <FormLayout labelCol={8} wrapperCol={6}>
          <Field name="aaa" type="string" title="字段1" />
          <Field name="bbb" type="number" title="字段2" />
          <Field name="ccc" type="date" title="字段3" />
        </FormLayout>
        <FormButtonGroup offset={8}>
          <Submit>提交</Submit>​ <Reset>重置</Reset>​
        </FormButtonGroup>
      </SchemaForm>
      <h5>inline布局</h5>
      <SchemaForm inline>
        <Field name="aaa" type="string" title="字段1" />
        <Field name="bbb" type="number" title="字段2" />
        <Field name="ccc" type="date" title="字段3" />​
        <FormButtonGroup>
          <Submit>提交</Submit>​ <Reset>重置</Reset>​
        </FormButtonGroup>
      </SchemaForm>
    </React.Fragment>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
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

**用法**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormTextBox,
  FormCard,
  FormLayout,
  FormSlot
} from '@uform/next'
import { Button } from '@alifd/next'
import Printer from '@uform/printer'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm>
      <FormSlot>x-props</FormSlot>
      <Field
        type="string"
        default={10}
        required
        name="a"
        x-props={{ style: { width: 80 } }}
        description="desc1"
      />

      <FormSlot>readOnly = true</FormSlot>
      <Field type="string" readOnly name="b" />

      <FormSlot>editable = false</FormSlot>
      <Field type="string" editable={false} name="c" />

      <FormSlot>visible = false</FormSlot>
      <Field type="string" visible={false} name="c" />

      <FormSlot>title</FormSlot>
      <Field type="string" title="title" name="d" />
    </SchemaForm>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
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
  type?: 'primary' | 'secondary' | 'normal'
  // 按钮的尺寸
  size?: 'small' | 'medium' | 'large'
  // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小
  iconSize?: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl'
  // 当 component = 'button' 时，设置 button 标签的 type 值
  htmlType?: 'submit' | 'reset' | 'button'
  // 设置标签类型
  component?: 'button' | 'a'
  // 设置按钮的载入状态
  loading?: boolean
  // 是否为幽灵按钮
  ghost?: true | false | 'light' | 'dark'
  // 是否为文本按钮
  text?: boolean
  // 是否为警告按钮
  warning?: boolean
  // 是否禁用
  disabled?: boolean
  // 点击按钮的回调
  onClick?: (e: {}) => void
  // 在Button组件使用component属性值为a时有效，代表链接页面的URL
  href?: string
  // 在Button组件使用component属性值为a时有效，代表何处打开链接文档
  target?: string
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
  type?: 'primary' | 'secondary' | 'normal'
  // 按钮的尺寸
  size?: 'small' | 'medium' | 'large'
  // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小
  iconSize?: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl'
  // 当 component = 'button' 时，设置 button 标签的 type 值
  htmlType?: 'submit' | 'reset' | 'button'
  // 设置标签类型
  component?: 'button' | 'a'
  // 设置按钮的载入状态
  loading?: boolean
  // 是否为幽灵按钮
  ghost?: true | false | 'light' | 'dark'
  // 是否为文本按钮
  text?: boolean
  // 是否为警告按钮
  warning?: boolean
  // 是否禁用
  disabled?: boolean
  // 点击按钮的回调
  onClick?: (e: {}) => void
  // 在Button组件使用component属性值为a时有效，代表链接页面的URL
  href?: string
  // 在Button组件使用component属性值为a时有效，代表何处打开链接文档
  target?: string
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

#### `<FormBlock/>`

> FormBlock 组件 Props, 完全继承自 [CardProps](#CardProps)

**用法**

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

#### `<FormCard/>`

> FormCard 组件 Props, 完全继承自 [CardProps](#CardProps)

**用法**

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

#### `<FormStep/>`

> FormStep 组件 Props

```typescript
interface IFormStep {
  dataSource: StepItemProps[]
  /** next step props**/
  // 当前步骤
  current?: number
  // 展示方向
  direction?: 'hoz' | 'ver'
  // 横向布局时的内容排列
  labelPlacement?: 'hoz' | 'ver'
  // 类型
  shape?: 'circle' | 'arrow' | 'dot'
  // 是否只读模式
  readOnly?: boolean
  // 是否开启动效
  animation?: boolean
  // 自定义样式名
  className?: string
  // StepItem 的自定义渲染
  itemRender?: (index: number, status: string) => React.ReactNode
}
```

**用法**

#### `<FormLayout/>`

> FormLayout 组件 Props

```typescript
interface IFormItemTopProps {
  inline?: boolean
  className?: string
  style?: React.CSSProperties
  labelCol?: number | { span: number; offset?: number }
  wrapperCol?: number | { span: number; offset?: number }
}
```

**用法**

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
        <Field name="aaa" type="string" title="字段1" />
        <Field name="bbb" type="number" title="字段2" />
        <Field name="ccc" type="date" title="字段3" />
      </FormLayout>
      <FormButtonGroup offset={8}>
        <Submit>提交</Submit>​ <Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormItemGrid/>`

> FormItemGrid 组件 Props

```typescript
interface IFormItemGridProps {
  cols?: Array<number | { span: number; offset: number }>
  gutter?: number
  /** next Form.Item props**/
  // 样式前缀
  prefix?: string

  // label 标签的文本
  label?: React.ReactNode

  // label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效
  labelCol?: {}

  // 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
  wrapperCol?: {}

  // 自定义提示信息，如不设置，则会根据校验规则自动生成.
  help?: React.ReactNode

  // 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 位于错误信息后面
  extra?: React.ReactNode

  // 校验状态，如不设置，则会根据校验规则自动生成
  validateState?: 'error' | 'success' | 'loading'

  // 配合 validateState 属性使用，是否展示 success/loading 的校验状态图标, 目前只有Input支持
  hasFeedback?: boolean

  // 自定义内联样式
  style?: React.CSSProperties

  // node 或者 function(values)
  children?: React.ReactNode | (() => void)

  // 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。
  size?: 'large' | 'small' | 'medium'

  // 标签的位置
  labelAlign?: 'top' | 'left' | 'inset'

  // 标签的左右对齐方式
  labelTextAlign?: 'left' | 'right'

  // 扩展class
  className?: string

  // [表单校验] 不能为空
  required?: boolean

  // required 的星号是否显示
  asterisk?: boolean

  // required 自定义错误信息
  requiredMessage?: string

  // required 自定义触发方式
  requiredTrigger?: string | Array<any>

  // [表单校验] 最小值
  min?: number

  // [表单校验] 最大值
  max?: number

  // min/max 自定义错误信息
  minmaxMessage?: string

  // min/max 自定义触发方式
  minmaxTrigger?: string | Array<any>

  // [表单校验] 字符串最小长度 / 数组最小个数
  minLength?: number

  // [表单校验] 字符串最大长度 / 数组最大个数
  maxLength?: number

  // minLength/maxLength 自定义错误信息
  minmaxLengthMessage?: string

  // minLength/maxLength 自定义触发方式
  minmaxLengthTrigger?: string | Array<any>

  // [表单校验] 字符串精确长度 / 数组精确个数
  length?: number

  // length 自定义错误信息
  lengthMessage?: string

  // length 自定义触发方式
  lengthTrigger?: string | Array<any>

  // 正则校验
  pattern?: any

  // pattern 自定义错误信息
  patternMessage?: string

  // pattern 自定义触发方式
  patternTrigger?: string | Array<any>

  // [表单校验] 四种常用的 pattern
  format?: 'number' | 'email' | 'url' | 'tel'

  // format 自定义错误信息
  formatMessage?: string

  // format 自定义触发方式
  formatTrigger?: string | Array<any>

  // [表单校验] 自定义校验函数
  validator?: () => void

  // validator 自定义触发方式
  validatorTrigger?: string | Array<any>

  // 是否修改数据时自动触发校验
  autoValidate?: boolean
}
```

**用法**

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
        ​<Submit>提交</Submit>​<Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormTextBox/>`

> FormTextBox 组件 Props

```typescript
interface IFormTextBox {
  text?: string
  gutter?: number
  title?: React.ReactText
  description?: React.ReactText
}
```

**用法**

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

> FormButtonGroup 组件 Props

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

**用法**

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
          ​<Submit>提交</Submit>​<Reset>重置</Reset>​
        </FormButtonGroup>
        <div>sticky</div>
        <FormButtonGroup offset={8} sticky>
          ​<Submit>提交</Submit>​
          <Button
            type="primary"
            onClick={() => setState({ editable: !state.editable })}
          >
            {state.editable ? '详情' : '编辑'}
          </Button>
          <Reset>重置</Reset>​
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<TextButton/>`

> TextButton 组件 Props, 完全继承自 [ButtonProps](#ButtonProps)

**用法**

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

> CircleButton 组件 Props, 完全继承自 [ButtonProps](#ButtonProps)

**用法**

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
          placeholder: 'textarea'
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### password

Fusion-Next `<Input htmlType="password"/>`

```typescript
interface IPasswordProps {
  checkStrength: boolean
  /** next input props **/
  // 当前值
  value?: string | number

  // 初始化值
  defaultValue?: string | number

  // 发生改变的时候触发的回调
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void

  // 键盘按下的时候触发的回调
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, opts: {}) => void

  // 禁用状态
  disabled?: boolean

  // 最大长度
  maxLength?: number

  // 是否展现最大长度样式
  hasLimitHint?: boolean

  // 当设置了maxLength时，是否截断超出字符串
  cutString?: boolean

  // 只读
  readOnly?: boolean

  // onChange返回会自动去除头尾空字符
  trim?: boolean

  // 输入提示
  placeholder?: string

  // 获取焦点时候触发的回调
  onFocus?: () => void

  // 失去焦点时候触发的回调
  onBlur?: () => void

  // 自定义字符串计算长度方式
  getValueLength?: (value: string) => number

  // 自定义class
  className?: string

  // 自定义内联样式
  style?: React.CSSProperties

  // 原生type
  htmlType?: string

  // name
  name?: string

  // 状态
  state?: 'error' | 'loading' | 'success'

  // label
  label?: React.ReactNode

  // 是否出现clear按钮
  hasClear?: boolean

  // 是否有边框
  hasBorder?: boolean

  // 尺寸
  size?: 'small' | 'medium' | 'large'

  // 按下回车的回调
  onPressEnter?: () => void

  // 水印 (Icon的type类型，和hasClear占用一个地方)
  hint?: string

  // 文字前附加内容
  innerBefore?: React.ReactNode

  // 文字后附加内容
  innerAfter?: React.ReactNode

  // 输入框前附加内容
  addonBefore?: React.ReactNode

  // 输入框后附加内容
  addonAfter?: React.ReactNode

  // 输入框前附加文字
  addonTextBefore?: React.ReactNode

  // 输入框后附加文字
  addonTextAfter?: React.ReactNode

  // (原生input支持)
  autoComplete?: string

  // 自动聚焦(原生input支持)
  autoFocus?: boolean
}
```

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
          placeholder: 'password'
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
      <Field type="number" required title="Number" name="number" />
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
          { label: 'Four', value: '4' }
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
          { label: 'Four', value: '4' }
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

> 整体完全继承@uform/react, 下面只列举@uform/next 的特有 API

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

> 自定义 hook

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

### Interfaces

> 整体完全继承@uform/react, 下面只列举@uform/next 的特有的 Interfaces

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
  type?: 'primary' | 'secondary' | 'normal'
  // 按钮的尺寸
  size?: 'small' | 'medium' | 'large'
  // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小
  iconSize?: 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl' | 'xxxl'
  // 当 component = 'button' 时，设置 button 标签的 type 值
  htmlType?: 'submit' | 'reset' | 'button'
  // 设置标签类型
  component?: 'button' | 'a'
  // 设置按钮的载入状态
  loading?: boolean
  // 是否为幽灵按钮
  ghost?: true | false | 'light' | 'dark'
  // 是否为文本按钮
  text?: boolean
  // 是否为警告按钮
  warning?: boolean
  // 是否禁用
  disabled?: boolean
  // 点击按钮的回调
  onClick?: (e: {}) => void
  // 在Button组件使用component属性值为a时有效，代表链接页面的URL
  href?: string
  // 在Button组件使用component属性值为a时有效，代表何处打开链接文档
  target?: string
}
```

#### CardProps

```typescript
interface CardProps extends HTMLAttributesWeak, CommonProps {
  // 卡片的上的图片 / 视频
  media?: React.ReactNode

  // 卡片的标题
  title?: React.ReactNode

  // 卡片的副标题
  subTitle?: React.ReactNode

  // 卡片操作组，位置在卡片底部
  actions?: React.ReactNode

  // 是否显示标题的项目符号
  showTitleBullet?: boolean

  // 是否展示头部的分隔线
  showHeadDivider?: boolean

  // 内容区域的固定高度
  contentHeight?: string | number

  // 标题区域的用户自定义内容
  extra?: React.ReactNode

  // 是否开启自由模式，开启后card 将使用子组件配合使用, 设置此项后 title, subtitle, 等等属性都将失效
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
  /**只读属性**/

  //状态名称，FieldState
  displayName?: string
  //数据路径
  name: string
  //节点路径
  path: string
  //是否已经初始化
  initialized: boolean
  //是否处于原始态，只有value===intialValues时的时候该状态为true
  pristine: boolean
  //是否处于合法态，只要errors长度大于0的时候valid为false
  valid: boolean
  //是否处于非法态，只要errors长度大于0的时候valid为true
  invalid: boolean
  //是否处于校验态
  validating: boolean
  //是否被修改，如果值发生变化，该属性为true，同时在整个字段的生命周期内都会为true
  modified: boolean
  //是否被触碰
  touched: boolean
  //是否被激活，字段触发onFocus事件的时候，它会被触发为true，触发onBlur时，为false
  active: boolean
  //是否访问过，字段触发onBlur事件的时候，它会被触发为true
  visited: boolean

  /**可写属性**/

  //是否可见，注意：该状态如果为false，那么字段的值不会被提交，同时UI不会显示
  visible: boolean
  //是否展示，注意：该状态如果为false，那么字段的值会提交，UI不会展示，类似于表单隐藏域
  display: boolean
  //是否可编辑
  editable: boolean
  //是否处于loading状态，注意：如果字段处于异步校验时，loading为true
  loading: boolean
  //字段多参值，比如字段onChange触发时，给事件回调传了多参数据，那么这里会存储所有参数的值
  values: any[]
  //字段错误消息
  errors: string[]
  //字段告警消息
  warnings: string[]
  //字段值，与values[0]是恒定相等
  value: any
  //初始值
  initialValue: any
  //校验规则，具体类型描述参考后面文档
  rules: ValidatePatternRules[]
  //是否必填
  required: boolean
  //是否挂载
  mounted: boolean
  //是否卸载
  unmounted: boolean
  //字段扩展属性
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

#### INextSchemaFormProps

```typescript
type INextSchemaFormProps = {
  schema?: ISchema
  fields?: ISchemaFormRegistry['fields']
  virtualFields?: ISchemaFormRegistry['virtualFields']
  formComponent?: ISchemaFormRegistry['formComponent']
  formItemComponent?: ISchemaFormRegistry['formItemComponent']
  /** next Form props **/
  // 样式前缀
  prefix?: string

  // 内联表单
  inline?: boolean

  // 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。
  size?: 'large' | 'medium' | 'small'

  // 标签的位置
  labelAlign?: 'top' | 'left' | 'inset'

  // 标签的左右对齐方式
  labelTextAlign?: 'left' | 'right'

  // 经 `new Field(this)` 初始化后，直接传给 Form 即可 用到表单校验则不可忽略此项
  field?: any

  // 保存 Form 自动生成的 field 对象
  saveField?: () => void

  // 控制第一级 Item 的 labelCol
  labelCol?: {}

  // 控制第一级 Item 的 wrapperCol
  wrapperCol?: {}

  // form内有 `htmlType="submit"` 的元素的时候会触发
  onSubmit?: () => void

  // 子元素
  children?: any

  // 扩展class
  className?: string

  // 自定义内联样式
  style?: React.CSSProperties

  // 表单数值
  value?: {}

  // 表单变化回调
  onChange?: (values: {}, item: {}) => void

  // 设置标签类型
  component?: string | (() => void)

  /** IFormItemTopProps **/
  inline?: boolean
  className?: string
  style?: React.CSSProperties
  labelCol?: number | { span: number; offset?: number }
  wrapperCol?: number | { span: number; offset?: number }
  /** PreviewTextConfigProps **/
  previewPlaceholder?: string | ((props: IPreviewTextProps) => string)
}
```
