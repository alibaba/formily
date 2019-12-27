# @uform/antd

### 安装

```bash
npm install --save @uform/antd
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
  - [`<FormSpy/>`](#FormSpy)
  - [`<Field/>(即将废弃，请使用<SchemaMarkupField/>)`](#<Field/>)
- [表单List](#Array-Components)
  - [`array`](#array)
  - [`cards`](#cards)
  - [`table`](#table)
- [布局组件](#Layout-Components)
  - [`<FormCard/>`](#FormCard)
  - [`<FormBlock/>`](#FormBlock)
  - [`<FormStep/>`](#FormStep)
  - [`<FormLayout/>`](#FormLayout)
  - [`<FormItemGrid/>`](#FormItemGrid)
  - [`<FormTextBox/>`](#FormTextBox)
  - [`<FormButtonGroup/>`](#FormButtonGroup)
  - [`<TextButton/>`](#TextButton)
  - [`<CircleButton/>`](#CircleButton)
- [字段类型](#Type-of-SchemaMarkupField)
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
- [Hook](#Hook)
  - [`useFormEffects`](#useFormEffects)
  - [`useFormState`](#useFormState)
  - [`useFieldState`](#useFieldState)
  - [`useForm`](#useForm)
  - [`useField`](#useField)
  - [`useVirtualField`](#useVirtualField)
  - [`useFormSpy`](#useFormSpy)
- [API](#API)
  - [`createFormActions`](#createFormActions)
  - [`createAsyncFormActions`](#createAsyncFormActions)
  - [`FormEffectHooks`](#FormEffectHooks)
  - [`createEffectHook`](#createEffectHook)
  - [`connect`](#connect)
  - [`registerFormField`](#registerFormField)
- [Interfaces](#Interfaces)
  - [`ISchema`](#ischema)
  - [`IFormActions`](#IFormActions)
  - [`IFormAsyncActions`](#IFormAsyncActions)
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
  - [`InternalFormats`](#InternalFormats)
  - [`CustomValidator`](#CustomValidator)
  - [`ValidateDescription`](#ValidateDescription)
  - [`ValidateArrayRules`](#ValidateArrayRules)
  - [`ValidatePatternRules`](#ValidatePatternRules)
  - [`INextSchemaFieldProps`](#INextSchemaFieldProps)
  - [`IPreviewTextProps`](#IPreviewTextProps)
  - [`IMutators`](#IMutators)
  - [`IFieldProps`](#IFieldProps)
  - [`IConnectOptions`](#IConnectOptions)
  - [`ISpyHook`](#ISpyHook)

### 使用方式

#### 安装

```bash
$ yarn add antd @uform/antd

# or

$ npm install --save antd @uform/antd
```

### 按需加载

#### 在 umijs 中使用
在开始之前，你可能需要安装 [umijs](https://umijs.org/zh/guide/getting-started.html), 并开启 [antd 配置](https://umijs.org/zh/plugin/umi-plugin-react.html#antd)。

然后在 umijs 的 `.umirc.js` 或 `config/config.js` （二选一）中增加 `extraBabelIncludes` 配置项

> 在使用 uform 组件的时候，请使用 ES Modules import 导入模块

```js
extraBabelIncludes: [
  /node_modules[\\/][\\@]uform[\\/]antd[\\/]esm/
],
```

---

#### 在 create-react-app 中使用

在开始之前，请先按照 antd 的[教程](https://ant-design.gitee.io/docs/react/use-with-create-react-app-cn)，完成对 `babel-plugin-import` 的配置, 然后只需要在 `config-overrides.js` 中加入 `babelInclude`

> 在使用 uform 组件的时候，请使用 ES Modules import 导入模块

```js
// config-overrides.js

const { override, fixBabelImports, babelInclude } = require('customize-cra');
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  babelInclude([
    path.resolve('src'),
    /node_modules[\\/][\\@]uform[\\/]antd[\\/]esm/,
  ]),
)
```

#### 更多脚手架
`@uform/antd` 底层依赖 `antd`，在对 `@uform/antd` 进行按需加载实际也是对 `antd` 进行按需加载，从上面的例子可以看出，脚手架只需要配置好了 `babel-plugin-import`，然后再把 `@uform/antd/esm` 加入 `babel` 的 `include` 中即可完成功能配置

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
} from '@uform/antd'
import { Button } from 'antd'
import 'antd/dist/antd.css'

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
        enum={[{ key: 1, title: '选项1' }, { key: 2, title: '选项2' }]}
        x-props={{
          render: (item) => item.title
        }}
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
} from '@uform/antd'
import { Button } from 'antd'
import 'antd/dist/antd.css'

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
            key: 1,
            title: '选项1'
          },
          {
            key: 2,
            title: '选项2'
          }
        ],
        'x-props': {
          render: (item) => item.title
        },
        title: '穿梭框'
      },
      rating: {
        type: 'rating',
        title: '等级'
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
              children: '提交',
            },
          },
          reset_btn: {
            type: 'object',
            'x-component': 'reset',
            'x-component-props': {
              children: '重置',
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

基于@uform/react 的核心组件SchemaForm进一步扩展出来的SchemaForm组件，推荐生产环境下使用

```typescript
interface IAntdSchemaFormProps {
  // 通过schema渲染
    schema?: ISchema;
    fields?: ISchemaFormRegistry['fields'];
    virtualFields?: ISchemaFormRegistry['virtualFields'];
    // 全局注册Form渲染组件
    formComponent?: ISchemaFormRegistry['formComponent'];
    // 全局注册FormItem渲染组件
    formItemComponent?: ISchemaFormRegistry['formItemComponent'];
    // 布局设置
    layout?: FormLayout;
    prefixCls?: string;
    // 隐藏required的星标
    hideRequiredMark?: boolean;
    colon?: boolean;
    // 标签的位置
    labelAlign?: FormLabelAlign;
    // 内联表单
    inline?: boolean
    // 扩展class
    className?: string
    style?: React.CSSProperties
    // label 布局控制
    labelCol?: number | { span: number; offset?: number }
    // FormItem 布局控制
    wrapperCol?: number | { span: number; offset?: number }
    // 自定义 placeholder
    previewPlaceholder?: string | ((props: IPreviewTextProps) => string);
    // 全局value
    value?: Value;
    // 全局defaultValue
    defaultValue?: DefaultValue;
    // 全局initialValues
    initialValues?: DefaultValue;
    // FormActions实例
    actions?: FormActions;
    // IFormEffect实例
    effects?: IFormEffect<FormEffectPayload, FormActions>;
    // 表单实例
    form?: IForm;
    // 表单变化回调
    onChange?: (values: Value) => void;
    // form内有 `htmlType="submit"` 或 actions.submit时 触发
    onSubmit?: (values: Value) => void | Promise<Value>;
    // form内有 <Reset/> 或 actions.reset时 触发
    onReset?: () => void;
    // 校验失败时触发
    onValidateFailed?: (valideted: IFormValidateResult) => void;
    children?: React.ReactElement | ((form: IForm) => React.ReactElement);
    //是否使用脏检查，默认会走immer精确更新
    useDirty?: boolean;
    // 是否可编辑
    editable?: boolean | ((name: string) => boolean);
    // 是否走悲观校验，遇到第一个校验失败就停止后续校验
    validateFirst?: boolean;
}
```

**用法**

例子1: 将a-mirror的值设置为a的值。

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  connect,
  createFormActions
} from '@uform/antd'
import 'antd/dist/antd.css'

const actions = createFormActions()

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


例子2： 布局

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
} from '@uform/antd'

const actions = createFormActions()

ReactDOM.render(
    <div>
    <h5>常规布局</h5>
    <SchemaForm>
      <FormLayout labelCol={8} wrapperCol={6}>
        <Field name="aaa" type="string" title="field1" />
        <Field name="bbb" type="number" title="field2" />
        <Field name="ccc" type="date" title="field3" />
      </FormLayout>
      <FormButtonGroup offset={8}>
        <Submit>提交</Submit>​ <Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
    <h5>Inline Layout</h5>
    <SchemaForm inline>
      <Field name="aaa" type="string" title="field1" />
      <Field name="bbb" type="number" title="field2" />
      <Field name="ccc" type="date" title="field3" />​
      <FormButtonGroup>
        <Submit>提交</Submit>​ <Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
    <h5>editable = false</h5>
    <SchemaForm inline editable={false}>
      <Field name="aaa" type="string" title="field1" />
      <Field name="bbb" type="number" title="field2" />
      <Field name="ccc" type="date" title="field3" />​
      <FormButtonGroup>
        <Submit>提交</Submit>​ <Reset>重置</Reset>​
      </FormButtonGroup>
    </SchemaForm>
    </div>,
    document.getElementById('root')
)
```

#### `<SchemaMarkupField/>`

> @uform/antd 的核心组件，用于描述表单字段

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

##### 用法


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
} from '@uform/antd'

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

#### `<FormSpy/>`

> FormSpy 组件属性定义

```typescript
interface IFormSpyProps {
  // 选择器, 如：[ LifeCycleTypes.ON_FORM_SUBMIT_START, LifeCycleTypes.ON_FORM_SUBMIT_END ]
  selector?: string[] | string
  // reducer函数，状态叠加处理，action为当前命中的生命周期的数据
  reducer?: (
    state: any,
    action: { type: string; payload: any },
    form: IForm
  ) => any
  children?: React.ReactElement | ((api: IFormSpyAPI) => React.ReactElement)
}
```

**用法**

例子 1： 实现一个统计表单 values 改变的计数器

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormSpy, LifeCycleTypes } from '@uform/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return <React.Fragment>
        { props.label && <label>{props.label}</label> }
        { loading ? ' loading... ' : <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        /> }
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
      <FormSpy
        selector={LifeCycleTypes.ON_FORM_VALUES_CHANGE}
        reducer={(state, action, form) => ({
          count: state.count ? state.count + 1 : 1
        })}
      >
        {({ state, type, form }) => {
          return <div>count: {state.count || 0}</div>
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

```

例子 2：实现常用 combo 组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormSpy } from '@uform/react'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return <React.Fragment>
        { props.label && <label>{props.label}</label> }
        { loading ? ' loading... ' : <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        /> }
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    }}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue('username')}
              <br />
              age: {form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<Field/>`

> 即将废弃，请使用 [SchemaMarkupField](#SchemaMarkupField)

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
} from '@uform/antd'
import 'antd/dist/antd.css'
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
} from '@uform/antd'
import 'antd/dist/antd.css'
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
} from '@uform/antd'
import 'antd/dist/antd.css'
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


#### `<FormCard/>`

> FormCard 组件 Props, 完全继承自 [CardProps](#CardProps)。
> FormCard与[FormBlock](#FormBlock) 唯一区别是样式上是否有框

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { FormCard, SchemaMarkupField as Field } from '@uform/antd'
import 'antd/dist/antd.css'

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

> FormBlock 组件 Props, 完全继承自 [CardProps](#CardProps)

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, { FormBlock, SchemaMarkupField as Field } from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const { onFormInit$ } = FormEffectHooks

const actions = createFormActions()

let cache = {}

export default () => (
  <SchemaForm
    onSubmit={values => {
      console.log('提交')
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
      <Submit>提交</Submit>
      <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_PREVIOUS)}>
        上一步
      </Button>
      <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_NEXT)}>
        下一步
      </Button>
      <Button
        onClick={() => {
          cache = actions.getFormGraph()
        }}
      >
        存储当前状态
      </Button>
      <Button
        onClick={() => {
          actions.setFormGraph(cache)
        }}
      >
        回滚状态
      </Button>
    </FormButtonGroup>
  </SchemaForm>
)
```

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
} from '@uform/antd'
import { Button } from 'antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'
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
} from '@uform/antd'
import { Button } from 'antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import { Button } from 'antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import { Button } from 'antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'

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
import SchemaForm, { TextButton } from '@uform/antd'
import 'antd/dist/antd.css'

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
import SchemaForm, { CircleButton } from '@uform/antd'
import 'antd/dist/antd.css'

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

* Schema Type : `string`
* Schema UI Component: Fusion-Next `<Input/>`, `<Input.Textarea/>`, `<Select/>`

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

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
} from '@uform/antd'
import 'antd/dist/antd.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field
        type="transfer"
        title="Transfer"
        name="transfer"
        enum={[
          { title: 'One', key: '1' },
          { title: 'Two', key: '2' },
          { title: 'Three', key: '3' },
          { title: 'Four', key: '4' }
        ]}
        x-props={{
          render: (item) => item.title
        }}
        x-component-props={{
          showSearch: true
        }}
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Hook

#### `useFormEffects`

> 使用 useFormEffects 可以实现局部effect的表单组件，效果同：[简单联动](#简单联动)
> 注意：监听的生命周期是从 `ON_FORM_MOUNT` 开始

**签名**

```typescript
(effects: IFormEffect): void
```

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  SchemaMarkupField as Field,
  VirtualField,
  createFormActions,
  useFormEffects,
  LifeCycleTypes,
  createVirtualBox
} from '@uform/antd'

const actions = createFormActions()

const FragmentContainer = createVirtualBox('ffb', (props) => {
  useFormEffects(($, { setFieldState }) => {
    $(LifeCycleTypes.ON_FORM_MOUNT).subscribe(() => {
      setFieldState('a~', state => state.visible = false)
    })

    $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'trigger').subscribe((triggerState) => {
      setFieldState('a~', state => {
        state.visible = triggerState.value
      })
    })

    $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'a').subscribe((fieldState) => {
      setFieldState('a-copy', state => {
        state.value = fieldState.value
      })
    })
  })

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
});

const FormFragment = () => {
  return <FragmentContainer>
    <Field
      type="radio"
      name="trigger"
      title="trigger"
      enum={[{ label: 'show', value: true }, { label: 'hide', value: false } ]}
    />
    <Field type="string" name="a" title="a" />
    <Field type="string" name="a-copy" title="a-copy" />   
  </FragmentContainer>   
}

const App = () => {
  return (
    <SchemaForm actions={actions}>
      <FormFragment />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `useFormState`

> 使用 useFormState 为自定义组件提供FormState扩展和管理能力

**签名**

```typescript
(defaultState: T): [state: IFormState, setFormState: (state?: IFormState) => void]
```

**用法**

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, VirtualField,
  createFormActions, createEffectHook,
  useForm,
  useFormState,
  useFormEffects,
  useFieldState,
  LifeCycleTypes
} from '@uform/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return <React.Fragment>
        { props.label && <label>{props.label}</label> }
        { loading ? ' loading... ' : <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        /> }
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    }}
  </Field>
)

const actions = createFormActions()
const FormFragment = (props) => {
  const [formState, setFormState ] = useFormState({ extendVar: 0 })
  const { extendVar } = formState

  return <div>
    <button onClick={() => {
      setFormState({ extendVar: extendVar + 1 })
    }}>add</button>
    <div>count: {extendVar}</div>
  </div>
}

const App = () => {
  return (
    <Form actions={actions}>
      <FormFragment />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `useFieldState`

> 使用 useFieldState 为自定义组件提供状态管理能力

**签名**

```typescript
(defaultState: T): [state: IFieldState, setFieldState: (state?: IFieldState) => void]
```

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, VirtualField,
  createFormActions, createEffectHook,
  useForm,
  useFormEffects,
  useFieldState,
  LifeCycleTypes
} from '@uform/react'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => {
      const loading = state.props.loading
      return <React.Fragment>
        { props.label && <label>{props.label}</label> }
        { loading ? ' loading... ' : <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        /> }
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    }}
  </Field>
)

const changeTab$ = createEffectHook('changeTab')
const actions = createFormActions()
const TabFragment = (props) => {
  const [fieldState, setLocalFieldState ] = useFieldState({ current: 0 })
  const { current } = fieldState
  const { children, dataSource, form } = props

  const update = (cur) => {
    form.notify('changeTab', cur)
    setLocalFieldState({
      current: cur
    })
  }

  useFormEffects(($, { setFieldState }) => {
    dataSource.forEach((item, itemIdx) => {
      setFieldState(item.name, state => {
        state.display = itemIdx === current
      })
    })

    changeTab$().subscribe((idx) => {
      dataSource.forEach((item, itemIdx) => {
      setFieldState(item.name, state => {
        state.display = itemIdx === idx
      })
    })
    })
  })

  const btns = dataSource.map((item, idx) => {
    const focusStyle = idx === current ? { color: '#fff', background: 'blue' } : {}
    return <button style={focusStyle} onClick={() => {
      update(idx)
    }}>{item.label}</button>
  })

  return btns
}

const FormTab = (props) => {
  return <VirtualField name="layout_tab">
    {({ form }) => {
      return <TabFragment {...props} form={form} />
    }}
  </VirtualField>
}

const App = () => {
  return (
    <Form actions={actions}>
      <FormTab dataSource={[
        { label: 'tab-1', name: 'username' },
        { label: 'tab-2', name: 'age' }
      ]} />
      <div>
        <InputField name="username" label="username"/>
        <InputField name="age" label="age"/>
      </div>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### useForm

> 获取一个 [IForm](#IForm) 实例

**签名**

```typescript
type useForm = <
  Value = any,
  DefaultValue = any,
  EffectPayload = any,
  EffectAction = any
>(
  props: IFormProps<Value, DefaultValue, EffectPayload, EffectAction>
) => IForm
```

**用法**

```typescript
import { useForm } from '@uform/react'

const FormFragment = () => {
  const form = useForm()
  return <div>{form.getFieldValue('username')}</div>
}
```

#### useField

> 获取一个 [IFieldHook](#IFieldHook) 实例

**签名**

```typescript
type useField = (options: IFieldStateUIProps): IFieldHook
```

**用法**

```typescript
import { useField } from '@uform/react'

const FormFragment = (props) => {
  const {
    form,
    state,
    props: fieldProps,
    mutators
  } = useField({ name: 'username' })

  return <input {...fieldProps} {...props} value={state.value} onChange={mutators.change} />
}
```

#### useVirtualField

> 获取一个 [IVirtualFieldHook](#IVirtualFieldHook) 实例

**签名**

```typescript
type UseVirtualField = (options: IVirtualFieldStateProps): IVirtualFieldHook
```

**用法**

```typescript
import { UseVirtualField } from '@uform/react'

const FormFragment = (props) => {
  const {
    form,
    state,
    props: fieldProps,
  } = UseVirtualField({ name: 'username' })

  return <div style={{ width: fieldProps.width, height: fieldProps.height }}>
    {props.children}
  </div>
}
```

#### useFormSpy

> 获取一个 [ISpyHook](#ISpyHook) 实例, 实现[FormSpy](#FormSpy) 第一个例子

**签名**

```typescript
type useFormSpy = (props: IFormSpyProps): ISpyHook
```

**用法**

```typescript
import { useFormSpy, LifeCycleTypes } from '@uform/react'
const FormFragment = (props) => {
  const {
    form,
    state,
    type,
  } = useFormSpy({
    selector: LifeCycleTypes.ON_FORM_VALUES_CHANGE,
    reducer: (state, action, form) => ({
      count: state.count ? state.count + 1 : 1
    })
  })

  return <div>
    <div>count: {state.count || 0}</div>
  </div>
}
```

### API

> 整体完全继承@uform/react, 下面只列举@uform/antd 的特有 API

---

#### `createFormActions`

> 创建一个 [IFormActions](#IFormActions) 实例

**签名**

```typescript
createFormActions(): IFormActions
```

**用法**

```typescript
import { createFormActions } from '@uform/antd'

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
import { createAsyncFormActions } from '@uform/antd'

const actions = createAsyncFormActions()
actions.getFieldValue('username').then(val => console.log(val))
```

#### `FormEffectHooks`

> 返回包含所有 UForm 生命周期的钩子函数，可以被监听消费

**用法**

```typescript
import SchemaForm, { FormEffectHooks } from '@uform/antd'
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
import SchemaForm, { createEffectHook, createFormActions } from '@uform/antd'

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

> 包装字段组件，让字段组件只需要支持value/defaultValue/onChange属性即可快速接入表单

```typescript
type Connect = <T extends React.ComponentType<IFieldProps>>(options?: IConnectOptions<T>) =>
(Target: T) => React.PureComponent<IFieldProps>
```
**用法**

```typescript
import {registerFormField,connect} from '@uform/antd'

registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)
```

#### registerFormField

```typescript
type registerFormField(
   name        : string,                             //类型名称
   component   : React.ComponentType<IFieldProps>,   //类型组件
   noMiddleware: boolean                             //是否被middleware包装
)
```

**用法**

```jsx

import SchemaForm, { SchemaMarkupField as Field, registerFormField, connect, createFormActions } from '@uform/antd'

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

> 整体完全继承@uform/react, 下面只列举@uform/antd 的特有的 Interfaces

---

#### ISchema

> Schema 协议对象，主要用于约束一份 json 结构满足 Schema 协议

```typescript
interface ISchema {
  /** base json schema spec**/
  title?: React.ReactNode
  description?: React.ReactNode
  default?: any
  readOnly?: boolean
  writeOnly?: boolean
  type?: 'string' | 'object' | 'array' | 'number' | string
  enum?: Array<string | number | { label: React.ReactNode; value: any }>
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
  //数据与样式是否可见
  visible?: boolean
  //样式是否可见
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

#### IFormActions

```typescript
interface IFormActions {
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

  /** 获取当前表单Schema **/
  getFormSchema(): Schema

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
   * 校验表单，当校验失败时抛出异常
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

#### IFormAsyncActions

```typescript
interface IFormAsyncActions {
  /*
   * 表单提交，如果回调参数返回Promise，
   * 那么整个提交流程会hold住，同时loading为true，
   * 等待Promise resolve才触发表单onFormSubmitEnd事件，同时loading为false
   */
  submit(
    onSubmit?: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  
  /** 获取当前表单Schema **/
  getFormSchema(): Promise<Schema>

  /*
   * 重置表单
   */
  reset(options?: IFormResetOptions): Promise<void>
  /*
   * 获取状态变化情况，主要用于在表单生命周期钩子内判断当前生命周期中有哪些状态发生了变化，
   * 比如hasChanged(state,'value.aa')
   */
  hasChanged(target: any, path: FormPathPattern): Promise<boolean>
  /*
   * 清空错误消息，可以通过传FormPathPattern来批量或精确控制要清空的字段，
   * 比如clearErrors("*(aa,bb,cc)")
   */
  clearErrors: (pattern?: FormPathPattern) => Promise<void>
  /*
   * 校验表单, 当校验失败时抛出异常
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
  ): Promise<void>
  /*
   * 获取表单状态
   */
  getFormState(
    //transformer
    callback?: (state: IFormState) => any
  ): Promise<any>
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
  ): Promise<void>
  /*
   * 获取字段状态
   */
  getFieldState(
    //字段路径
    path: FormPathPattern,
    //transformer
    callback?: (state: IFieldState) => any
  ): Promise<void>
  getFormGraph(): Promise<IFormGraph>
  setFormGraph(graph: IFormGraph): Promise<void>
  subscribe(callback?: FormHeartSubscriber): Promise<number>
  unsubscribe(id: number): Promise<void>
  notify: <T>(type: string, payload: T) => Promise<void>
  dispatch: <T>(type: string, payload: T) => void
  setFieldValue(path?: FormPathPattern, value?: any): Promise<void>
  getFieldValue(path?: FormPathPattern): Promise<any>
  setFieldInitialValue(path?: FormPathPattern, value?: any): Promise<void>
  getFieldInitialValue(path?: FormPathPattern): Promise<any>
}
```

#### ButtonProps

```typescript
interface ButtonProps {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
}
```

#### CardProps

```typescript
interface CardProps extends HTMLAttributesWeak, CommonProps {
  prefixCls?: string;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  loading?: boolean;
  noHovering?: boolean;
  hoverable?: boolean;
  children?: React.ReactNode;
  id?: string;
  className?: string;
  size?: CardSize;
  type?: CardType;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  tabList?: CardTabListType[];
  tabBarExtraContent?: React.ReactNode | null;
  onTabChange?: (key: string) => void;
  activeTabKey?: string;
  defaultActiveTabKey?: string;
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


#### InternalFormats

```typescript
type InternalFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'idcard'
  | 'taodomain'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | string
```

#### CustomValidator

```typescript
declare type CustomValidator = (
  value: any,
  rescription?: ValidateDescription
) => ValidateResponse
```

#### ValidateDescription

```typescript
interface ValidateDescription {
  // 内置校验规则，参考string内置校验规则
  format?: InternalFormats
  // 自定义校验规则
  validator?: CustomValidator
  // 是否必填
  required?: boolean
  // 匹配规则
  pattern?: RegExp | string
  // 最大长度
  max?: number
  // 最大值（大于）
  maximum?: number
  // 最大值（大于等于）
  exclusiveMaximum?: number
  // 最小值（小于等于）
  exclusiveMinimum?: number
  // 最小值（小于）
  minimum?: number
  // 最小长度
  min?: number
  // 长度
  len?: number
  // 空格
  whitespace?: boolean
  // 是否包含在枚举列表中
  enum?: any[]
  // 错误信息
  message?: string
  [key: string]: any
}
```

#### ValidateArrayRules

```typescript
declare type ValidateArrayRules = Array<
  InternalFormats | CustomValidator | ValidateDescription
>
```

#### ValidatePatternRules

```typescript
declare type ValidatePatternRules =
  | InternalFormats
  | CustomValidator
  | ValidateDescription
  | ValidateArrayRules
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

```typescript
interface IMutators<V = any> {
   change: (value: V)=> void,//改变当前字段值
   dispatch: (name: string, payload : any) => void,//触发effect事件
   errors: (errors: string | Array<string>, ...formatValues: Array<string | number>) => void,//设置当前字段的错误消息
   push(value: V),//对当前字段的值做push操作
   pop(),//对当前字段的值做pop操作
   insert(index: number,value: V),//对当前字段的值做insert操作
   remove(name : string),//对当前字段的值做remove操作
   unshift(value : V),//对当前字段值做unshift操作
   shift(),//对当前字段值做shift操作
   move(fromIndex: number, toIndex: number)//对当前字段值做move操作
}
```

#### IFieldProps

```typescript
interface IFieldProps<V = any> {
   name                : string //字段数据路径
   path                : Array<string> //字段数组数据路径
   value               : V //字段值
   errors              : Array<string> //字段错误消息集合
   editable            : boolean | ((name:string) => boolean) //字段是否可编辑
   locale              : Locale //国际化文案对象
   loading             : boolean //是否处于加载态
   schemaPath          : Array<string> //schema path,考虑到有些schema其实是不占数据路径的，所以这个路径是真实路径
   getSchema           : (path: string) => ISchema //根据路径获取schema
   renderField         : (childKey: string, reactKey: string | number) => JSX.Element | string | null //根据childKey渲染当前字段的子字段
   renderComponent     : React.FunctionComponent<Partial<IFieldProps> | undefined>,//渲染当前字段的组件，对于x-render来说，可以借助它快速实现渲染包装功能
   getOrderProperties  : () => Array<{schema: ISchema, key: number, path: string, name: string }>,//根据properties里字段的x-index值求出排序后的properties
   mutators            : Mutators,//数据操作对象
   schema              : ISchema
}

```

```typescript

interface IConnectOptions<T> {
  //控制表单组件
  valueName?: string
  //事件名称
  eventName?: string
  //默认props
  defaultProps?: Partial<IConnectProps>
  //取值函数，有些场景我们的事件函数取值并不是事件回调的第一个参数，需要做进一步的定制
  getValueFromEvent?: (props:  IFieldProps['x-props'], event: Event, ...args: any[]) => any
  //字段组件props transformer
  getProps?: (connectProps: IConnectProps, fieldProps: IFieldProps) => IConnectProps
  //字段组件component transformer
  getComponent?: (
    target: T,
    connectProps: IConnectProps,
    fieldProps: IFieldProps
  ) => T
}

```

#### ISpyHook

```typescript
interface ISpyHook {
  form: IForm
  state: any
  type: string
}
```
