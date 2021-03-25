# @formily/next

### 安装

```bash
npm install --save @formily/next
```

### Components

---

#### `<SchemaForm/>`

基于@formily/react 的核心组件 SchemaForm 进一步扩展出来的 SchemaForm 组件，推荐生产环境下使用

| 参数               | 说明                                                                                                          | 类型                                                                             | 默认值 |
| :----------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------- | :----- |
| schema             | 通过 schema 渲染表单                                                                                          | [ISchema](#ISchema)                                                              |        |
| fields             | 传入自定义表单组件                                                                                            | { [key: string]: [ISchemaFieldComponent](#ISchemaFieldComponent) }               |        |
| virtualFields      | 传入自定义虚拟组件                                                                                            | { [key: string]: [ISchemaVirtualFieldComponent](#ISchemaVirtualFieldComponent) } |        |
| formComponent      | 全局注册 Form 渲染组件                                                                                        | string `or` React.ReactElement                                                   |        |
| formItemComponent  | 全局注册 FormItem 渲染组件                                                                                    | React.ReactElement                                                               |        |
| labelCol           | label 布局控制                                                                                                | number `or` { span: number; offset?: number }                                    |        |
| wrapperCol         | FormItem 布局控制                                                                                             | number `or` { span: number; offset?: number }                                    |        |
| previewPlaceholder | 自定义预览 placeholder                                                                                        | string `or` ((props: [IPreviewTextProps](#IPreviewTextProps)) => string)         |        |
| prefix             | 样式前缀                                                                                                      | string                                                                           |        |
| inline             | 是否为内联表单                                                                                                | boolean                                                                          |        |
| size               | 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。 | 'large' `or` 'medium' `or` 'small'                                               |        |
| labelAlign         | 标签的位置                                                                                                    | 'top' `or` 'left' `or` 'inset'                                                   |        |
| labelTextAlign     | 标签的左右对齐方式                                                                                            | 'left' `or` 'right'                                                              |        |
| labelCol           | 控制所有 Item 的 labelCol                                                                                     | `{}`                                                                             |        |
| wrapperCol         | 控制所有 Item 的 wrapperCol                                                                                   | `{}`                                                                             |        |
| className          | 扩展 class                                                                                                    | string                                                                           |        |
| style              | 自定义内联样式                                                                                                | React.CSSProperties                                                              |        |
| component          | 设置标签类型                                                                                                  | string `or` (() => void)                                                         |        |
| value              | 全局 value                                                                                                    | {}                                                                               |        |
| defaultValue       | 全局 defaultValue                                                                                             | {}                                                                               |        |
| initialValues      | 全局 initialValues                                                                                            | {}                                                                               |        |
| actions            | FormActions 实例                                                                                              | [FormActions](#FormActions)                                                      |        |
| effects            | IFormEffect 实例                                                                                              | IFormEffect<FormEffectPayload, [FormActions](#FormActions)>                      |        |
| form               | 表单实例                                                                                                      | [IForm](#IForm)                                                                  |        |
| onChange           | 表单变化回调                                                                                                  | (values: {}) => void                                                             |        |
| onSubmit           | form 内有 `htmlType="submit"` 或 actions.submit 时 触发                                                       | (values: {}) => void `or` Promise<{}>                                            |        |
| onReset            | form 内有 <Reset/> 或 actions.reset 时 触发                                                                   | () => void                                                                       |        |
| onValidateFailed   | 校验失败时触发                                                                                                | (valideted: [IFormValidateResult](#IFormValidateResult)) => void                 |        |
| children           | 全局 value                                                                                                    | React.ReactElement `or` ((form: [IForm](#IForm)) => React.ReactElement)          |        |
| useDirty           | 是否使用脏检查，默认会走 immer 精确更新                                                                       | boolean                                                                          |        |
| editable           | 是否可编辑                                                                                                    | boolean `or` ((name: string) => boolean)                                         |        |
| validateFirst      | 是否走悲观校验，遇到第一个校验失败就停止后续校验                                                              | boolean                                                                          |        |

#### `<SchemaMarkupField/>`

> @formily/next 的核心组件，用于描述表单字段

| 参数                 | 说明                                    | 类型                                                          | 默认值 |
| :------------------- | :-------------------------------------- | :------------------------------------------------------------ | :----- | ---------------------------------------- | --- |
| name                 | 字段名                                  | string                                                        |        |
| title                | 字段 label                              | React.ReactNode                                               |        |
| description          | 字段描述信息                            | React.ReactNode                                               |        |
| readOnly             | 只读                                    | boolean                                                       |        |
| writeOnly            | 只写                                    | boolean                                                       |        |
| type                 | 字段类型                                | 'string' `or` 'object' `or` 'array' `or` 'number' `or` string |        |
| enum                 | 相当于字段 dataSource                   | `Array<string                                                 | number | { label: React.ReactNode; value: any }>` |     |
| required             | 是否必填，为 true 会同时设置校验规则    | string[] `or` boolean                                         |        |
| format               | 正则规则类型，详细类型可以往后看        | string                                                        |        |
| properties           | 对象属性                                | { [key: string]: [ISchema](#ISchema) }                        |        |
| items                | 数组描述                                | [ISchema](#ISchema) `or` [ISchema](#ISchema)[]                |        |
| patternProperties    | 动态匹配对象的某个属性的 Schema         | { [key: string]: [ISchema](#ISchema) }                        |        |
| additionalProperties | 匹配对象额外属性的 Schema               | [ISchema](#ISchema)                                           |        |
| editable             | 字段是否可编辑                          | boolean                                                       |        |
| visible              | 字段是否显示（伴随 value 的显示和隐藏） | boolean                                                       |        |
| display              | 字段是否显示（纯视觉，不影响 value）    | boolean                                                       |        |
| x-component          | 用于渲染的组件                          | string                                                        |        |
| x-component-props    | 组件的属性                              | { [name: string]: any }                                       |        |
| x-rules              | 校验规则                                | [ValidatePatternRules](#ValidatePatternRules)                 |        |
| x-props              | 字段扩展属性                            | { [name: string]: any }                                       |        |
| x-index              | 字段顺序                                | number                                                        |        |
| default              | 字段默认值                              | any                                                           |        |
| const                | 校验字段值是否与 const 的值相等         | any                                                           |        |
| multipleOf           | 校验字段值是否可被 multipleOf 的值整除  | number                                                        |        |
| maximum              | 最大值                                  | number                                                        |        |
| exclusiveMaximum     | 校验最大值（大于等于）                  | number                                                        |        |
| minimum              | 最小值                                  | number                                                        |        |
| exclusiveMinimum     | 最小值（小于等于）                      | number                                                        |        |
| maxLength            | 最大长度                                | number                                                        |        |
| minLength            | 最小长度                                | number                                                        |        |
| pattern              | 正则校验规则                            | string `or` RegExp                                            |        |
| maxItems             | 最大项数                                | number                                                        |        |
| minItems             | 最小项数                                | number                                                        |        |
| uniqueItems          | 是否校验重复                            | boolean                                                       |        |
| maxProperties        | 最大属性数量                            | number                                                        |        |
| minProperties        | 最小属性数量                            | number                                                        |        |

#### `<Submit/>`

> Submit 组件 Props

| 参数        | 说明                                                                 | 类型                                                                                     | 默认值 |
| :---------- | :------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :----- |
| onSubmit    | 触发提交的回调函数                                                   | [ISchemaFormProps.onSubmit](#ISchemaFormProps)                                           |        |
| showLoading | 是否展示 loading                                                     | boolean                                                                                  |        |
| type        | 按钮的类型                                                           | 'primary' `or` 'secondary' `or` 'normal'                                                 |        |
| size        | 按钮的尺寸                                                           | 'small' `or` 'medium' `or` 'large'                                                       |        |
| iconSize    | 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小                         | 'xxs' `or` 'xs' `or` 'small' `or` 'medium' `or` 'large' `or` 'xl' `or` 'xxl' `or` 'xxxl' |        |
| htmlType    | 当 component = 'button' 时，设置 button 标签的 type 值               | 'submit' `or` 'reset' `or` 'button'                                                      |        |
| component   | 设置标签类型                                                         | 'button' `or` 'a'                                                                        |        |
| loading     | 设置按钮的载入状态                                                   | boolean                                                                                  |        |
| ghost       | 是否为幽灵按钮                                                       | true `or` false `or` 'light' `or` 'dark'                                                 |        |
| text        | 是否为文本按钮                                                       | boolean                                                                                  |        |
| warning     | 是否为警告按钮                                                       | boolean                                                                                  |        |
| disabled    | 是否禁用                                                             | boolean                                                                                  |        |
| onClick     | 点击按钮的回调                                                       | (e: {}) => void                                                                          |        |
| href        | 在 Button 组件使用 component 属性值为 a 时有效，代表链接页面的 URL   | string                                                                                   |        |
| target      | 在 Button 组件使用 component 属性值为 a 时有效，代表何处打开链接文档 | string                                                                                   |        |

#### `<Reset/>`

> Reset 组件 Props

| 参数       | 说明                                                                 | 类型                                                                                     | 默认值 |
| :--------- | :------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :----- |
| forceClear | 是否清空                                                             | boolean                                                                                  |        |
| validate   | 是否触发校验                                                         | boolean                                                                                  |        |
| type       | 按钮的类型                                                           | 'primary' `or` 'secondary' `or` 'normal'                                                 |        |
| size       | 按钮的尺寸                                                           | 'small' `or` 'medium' `or` 'large'                                                       |        |
| iconSize   | 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小                         | 'xxs' `or` 'xs' `or` 'small' `or` 'medium' `or` 'large' `or` 'xl' `or` 'xxl' `or` 'xxxl' |        |
| htmlType   | 当 component = 'button' 时，设置 button 标签的 type 值               | 'submit' `or` 'reset' `or` 'button'                                                      |        |
| component  | 设置标签类型                                                         | 'button' `or` 'a'                                                                        |        |
| loading    | 设置按钮的载入状态                                                   | boolean                                                                                  |        |
| ghost      | 是否为幽灵按钮                                                       | true `or` false `or` 'light' `or` 'dark'                                                 |        |
| text       | 是否为文本按钮                                                       | boolean                                                                                  |        |
| warning    | 是否为警告按钮                                                       | boolean                                                                                  |        |
| disabled   | 是否禁用                                                             | boolean                                                                                  |        |
| onClick    | 点击按钮的回调                                                       | (e: {}) => void                                                                          |        |
| href       | 在 Button 组件使用 component 属性值为 a 时有效，代表链接页面的 URL   | string                                                                                   |        |
| target     | 在 Button 组件使用 component 属性值为 a 时有效，代表何处打开链接文档 | string                                                                                   |        |

#### `<FormSpy/>`

> FormSpy 组件属性定义

| 参数     | 说明                                                                                     | 类型                                                                               | 默认值 |
| :------- | :--------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :----- |
| selector | 选择器, 如：[`LifeCycleTypes.ON_FORM_SUBMIT_START`, `LifeCycleTypes.ON_FORM_SUBMIT_END`] | string[] `or` string                                                               |        |
| reducer  | reducer 函数，状态叠加处理，action 为当前命中的生命周期的数据                            | (state: any, action: { type: string; payload: any }, form: IForm) => any           |        |
| children | 内容                                                                                     | React.ReactElement `or` ((api: [IFormSpyAPI](#IFormSpyAPI)) => React.ReactElement) |        |

**用法**

例子 1： 实现一个统计表单 values 改变的计数器

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  FormSpy,
  LifeCycleTypes,
} from '@formily/next'
import { setup } from '@formily/next-components'

setup() //内部会完全按照UForm注册规则将组件注册一遍

const actions = createFormActions()

const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field type="string" title="username" name="username" />
      <FormSpy
        selector={LifeCycleTypes.ON_FORM_VALUES_CHANGE}
        reducer={(state, action, form) => ({
          count: state.count ? state.count + 1 : 1,
        })}
      >
        {({ state, type, form }) => {
          return <div>count: {state.count || 0}</div>
        }}
      </FormSpy>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

例子 2：实现常用 combo 组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  FormSpy,
  LifeCycleTypes,
} from '@formily/next'
import { setup } from '@formily/next-components'

setup() //内部会完全按照UForm注册规则将组件注册一遍

const actions = createFormActions()

const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field type="string" title="username" name="username" />
      <Field type="string" title="age" name="age" />
      <FormSpy>
        {({ state, form }) => {
          // 由于formSpy会监听所有周期，包括form未init之前，所以form实例可能为null
          return (
            <div>
              name: {form && form.getFieldValue('username')}
              <br />
              age: {form && form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormProvider />`

表单常常会有外部组件通信的场景，`<FormProvider/>` 则是为此而生。

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  FormProvider,
  SchemaForm,
  SchemaMarkupField as Field,
  FormSpy,
} from '@formily/next'
import { Input } from '@formily/next-components'

const FormFrag = () => {
  return (
    <SchemaForm components={{ Input }}>
      <Field name="username" title="username" x-component="Input" />
    </SchemaForm>
  )
}

const App = () => {
  return (
    <FormProvider>
      <FormFrag />
      <FormSpy>
        {({ form: spyForm }) => {
          return (
            <div>username: {spyForm && spyForm.getFieldValue('username')}</div>
          )
        }}
      </FormSpy>
    </FormProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<Form/>`

适用于纯 JSX 开发，开发者可以基于此进行二次封装。

| 参数               | 说明                                                                                                          | 类型                                                                     | 默认值 |
| :----------------- | :------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------- | :----- |
| labelCol           | label 布局控制                                                                                                | number `or` { span: number; offset?: number }                            |        |
| wrapperCol         | FormItem 布局控制                                                                                             | number `or` { span: number; offset?: number }                            |        |
| previewPlaceholder | 详情页的文本态占位符                                                                                          | string `or` ((props: [IPreviewTextProps](#IPreviewTextProps)) => string) | N/A    |
| prefix             | 样式前缀                                                                                                      | string                                                                   |        |
| inline             | 是否为内联表单                                                                                                | boolean                                                                  |        |
| size               | 单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。 | 'large' `or` 'medium' `or` 'small'                                       |        |
| labelAlign         | 标签的位置                                                                                                    | 'top' `or` 'left' `or` 'inset'                                           |        |
| labelTextAlign     | 标签的左右对齐方式                                                                                            | 'left' `or` 'right'                                                      |        |
| labelCol           | 控制所有 Item 的 labelCol                                                                                     | `{}`                                                                     |        |
| wrapperCol         | 控制所有 Item 的 wrapperCol                                                                                   | `{}`                                                                     |        |
| className          | 扩展 class                                                                                                    | string                                                                   |        |
| style              | 自定义内联样式                                                                                                | React.CSSProperties                                                      |        |
| component          | 设置标签类型                                                                                                  | string `or` (() => void)                                                 |        |
| value              | 全局 value                                                                                                    | {}                                                                       |        |
| defaultValue       | 全局 defaultValue                                                                                             | {}                                                                       |        |
| initialValues      | 全局 initialValues                                                                                            | {}                                                                       |        |
| actions            | FormActions 实例                                                                                              | [FormActions](#FormActions)                                              |        |
| effects            | IFormEffect 实例                                                                                              | IFormEffect<FormEffectPayload, [FormActions](#FormActions)>              |        |
| form               | 表单实例                                                                                                      | [IForm](#IForm)                                                          |        |
| onChange           | 表单变化回调                                                                                                  | (values: {}) => void                                                     |        |
| onSubmit           | form 内有 `htmlType="submit"` 或 actions.submit 时 触发                                                       | (values: {}) => void `or` Promise<{}>                                    |        |
| onReset            | form 内有 <Reset/> 或 actions.reset 时 触发                                                                   | () => void                                                               |        |
| onValidateFailed   | 校验失败时触发                                                                                                | (valideted: [IFormValidateResult](#IFormValidateResult)) => void         |        |
| children           | 全局 value                                                                                                    | React.ReactElement `or` ((form: [IForm](#IForm)) => React.ReactElement)  |        |
| useDirty           | 是否使用脏检查，默认会走 immer 精确更新                                                                       | boolean                                                                  |        |
| editable           | 是否可编辑                                                                                                    | boolean `or` ((name: string) => boolean)                                 |        |
| validateFirst      | 是否走悲观校验，遇到第一个校验失败就停止后续校验                                                              | boolean                                                                  |        |

#### `<FormItem>`

适用于纯 JSX 开发，开发者可以基于此进行二次封装。

> 当 `<FormItem>` 接收 `component` 字段时，`<FormItem>` 会继承对应组件的所有属性。

| 参数              | 说明                                                                                                                  | 类型                                                                                 | 默认值      |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :---------- | ----------- | ----------- | --- |
| label             | 字段 label                                                                                                            | React.ReactNode                                                                      |             |
| component         | 表单组件                                                                                                              | React.ReactNode                                                                      |             |
| path              | 字段路径                                                                                                              | [FormPathPattern](#FormPathPattern)                                                  |             |
| name              | 字段名                                                                                                                | [FormPathPattern](#FormPathPattern)                                                  |             |
| dataType          | 数据类型(array/object)                                                                                                | string                                                                               |             |
| value             | 字段值                                                                                                                | any                                                                                  |             |
| initialValue      | 初始化字段值                                                                                                          | any                                                                                  |             |
| values            | 字段集合, 从 onChange 获取的所有参数                                                                                  | any                                                                                  |             |
| triggerType       | 字段触发校验类型                                                                                                      | 'onChange' `                                                                         | ` 'onBlur'  |             |
| getValueFromEvent | 字段变更时，从 event 中获取 value 的计算函数                                                                          | (...args: any[]) => any                                                              |             |
| itemClassName     | formItem 类名                                                                                                         | string                                                                               |             |
| itemStyle         | formItem 样式控制                                                                                                     | { [key: string]: string `                                                            | ` number }  |             |
| rules             | 校验规则                                                                                                              | [ValidatePatternRules](#ValidatePatternRules)                                        |             |
| required          | 是否必填，为 true 会同时设置校验规则                                                                                  | string[] `or` boolean                                                                |             |
| editable          | 字段是否可编辑                                                                                                        | boolean                                                                              |             |
| visible           | 字段是否显示（伴随 value 的显示和隐藏）                                                                               | boolean                                                                              |             |
| display           | 字段是否显示（纯视觉，不影响 value）                                                                                  | boolean                                                                              |             |
| useDirty          | 是否使用脏检查                                                                                                        | boolean                                                                              | false       |
| computeState      | 计算字段状态                                                                                                          | (draft: [IFieldState](#IFieldState), prevState: [IFieldState](#IFieldState)) => void |             |
| valueName         | value 字段名                                                                                                          | string                                                                               | value       |
| eventName         | value 变更方式                                                                                                        | string                                                                               | onChange    |
| labelCol          | `(next)`控制 Item 的 labelCol                                                                                         | `{}`                                                                                 |             |
| wrapperCol        | `(next)`控制 Item 的 wrapperCol                                                                                       | `{}`                                                                                 |             |
| validateState     | `(next)`校验状态，如不设置，则会根据校验规则自动生成                                                                  | 'error' `                                                                            | `'success'` | `'loading'` | ` 'warning' |     |
| hasFeedback       | `(next)`配合 validateState 属性使 f 用，是否展示 success/loading 的校验状态图标, 目前只有 Input 支持成                | boolean                                                                              |             |
| size              | `(next)`单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。 | 'large' `                                                                            | `'small'`   | ` 'medium'  |             |
| labelAlign        | `(next)`标签的位置                                                                                                    | 'top' `                                                                              | `'left'`    | ` 'inset'   |             |
| labelTextAlign    | `(next)`标签的左右对齐方式                                                                                            | 'left' `                                                                             | ` 'right'   |             |
| asterisk          | `(next)`required 的星号是否显示                                                                                       | boolean                                                                              | true        |
| help              | `(next)`自定义提示信息，如不设置，则会根据校验规则自动生成.                                                           | React.ReactNode                                                                      |             |
| extra             | `(next)`额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 位于错误信息后面             | React.ReactNode                                                                      |             |

#### `<Field/>(废弃)`

> 即将废弃，请使用[SchemaMarkupField](#SchemaMarkupField)

#### InternalForm

底层的 `<Form>` 组件，具备完整的功能性，没有 UI 的限制，开发者根据特定场景需求，基于此组件进行开发。

**用法**

```tsx
import {
  InternalForm as Form,
  InternalField as Field,
  createFormActions,
  FormEffectHooks,
} from '@formily/next'

const { onFormInit$, onFormInputChange$, onFieldInputChange$ } = FormEffectHooks
const actions = createFormActions()
const App = () => {
  return (
    <Form
      actions={actions}
      effects={() => {
        onFormInit$().subscribe(() => {
          console.log('初始化')
        })
        onFieldInputChange$().subscribe((state) => {
          console.log('输入变化', state)
        })
      }}
      onChange={() => {}}
    >
      <React.Fragment>
        <label>username: </label>
        <Field name="username">
          {({ state, mutators }) => (
            <React.Fragment>
              <input
                disabled={!state.editable}
                value={state.value || ''}
                onChange={mutators.change}
                onBlur={mutators.blur}
                onFocus={mutators.focus}
              />
              {state.errors}
              {state.warnings}
            </React.Fragment>
          )}
        </Field>
      </React.Fragment>
    </Form>
  )
}
```

#### InternalField

底层的 `<Field>` 组件，具备完整的功能性，没有 UI 的限制，开发者根据特定场景需求，基于此组件进行开发。

**用法**

示例：以输入框为例，如何快速绑定表单字段。

```tsx
import { InternalField as Field } from '@formily/next'

const InputField = (props) => (
  <Field {...props}>
    {({ state, mutators }) => (
      <div>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        {state.errors}
        {state.warnings}
      </div>
    )}
  </Field>
)
```

#### InternalVirtualField

底层的 `<VirtualField>` 组件，具备完整的功能性，常用作布局组件，开发者根据特定场景需求，基于此组件进行开发。

**用法**

示例：布局组件为例，如何根据 API 设置布局样式。

```tsx
import { createFormActions, Form, Field, VirtualField } from '@formily/next'

const Layout = ({ children, width = '100px', height = '100px' }) => {
  return (
    <div style={{ border: '1px solid #999', width, height }}>{children}</div>
  )
}

const actions = createFormActions()
const App = () => {
  return (
    <Form actions={actions}>
      <Field name="user" initialValue={{}}>
        {({ state, mutator }) => {
          return (
            <VirtualField name="user.layout">
              {({ state: layoutState }) => {
                return (
                  <Layout
                    width={layoutState.props.width}
                    height={layoutState.props.height}
                  />
                )
              }}
            </VirtualField>
          )
        }}
      </Field>

      <button
        onClick={() => {
          // some where dynamic change layout's props
          actions.setFieldState('user.layout', (state) => {
            state.props.width = '200px'
            state.props.height = '200px'
          })
        }}
      >
        change layout
      </button>
    </Form>
  )
}
```

#### `<FieldList>`

数组类型的 `Field`，用于开发自增组件

| 参数              | 说明                                         | 类型                                                                                 | 默认值     |
| :---------------- | :------------------------------------------- | :----------------------------------------------------------------------------------- | :--------- | --- |
| path              | 字段路径                                     | [FormPathPattern](#FormPathPattern)                                                  |            |
| name              | 字段名                                       | [FormPathPattern](#FormPathPattern)                                                  |            |
| value             | 字段值                                       | any                                                                                  |            |
| initialValue      | 初始化字段值                                 | any                                                                                  | []         |
| values            | 字段集合, 从 onChange 获取的所有参数         | any                                                                                  |            |
| triggerType       | 字段触发校验类型                             | 'onChange' `                                                                         | ` 'onBlur' |     |
| getValueFromEvent | 字段变更时，从 event 中获取 value 的计算函数 | (...args: any[]) => any                                                              |            |
| props             | 字段属性                                     | `{}`                                                                                 |            |
| rules             | 校验规则                                     | [ValidatePatternRules](#ValidatePatternRules)                                        |            |
| required          | 是否必填，为 true 会同时设置校验规则         | string[] `or` boolean                                                                |            |
| editable          | 字段是否可编辑                               | boolean                                                                              |            |
| visible           | 字段是否显示（伴随 value 的显示和隐藏）      | boolean                                                                              |            |
| display           | 字段是否显示（纯视觉，不影响 value）         | boolean                                                                              |            |
| useDirty          | 是否使用脏检查                               | boolean                                                                              | false      |
| computeState      | 计算字段状态                                 | (draft: [IFieldState](#IFieldState), prevState: [IFieldState](#IFieldState)) => void |            |

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@alifd/next'
import styled from 'styled-components'
import { Form, FormItem, InternalFieldList as FieldList } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const RowStyleLayout = styled((props) => <div {...props} />)`
  .next-btn {
    margin-right: 16px;
  }
  .next-form-item {
    display: inline-flex;
    margin-right: 16px;
    margin-bottom: 16px;
  }
`

const App = () => {
  return (
    <Form>
      <FieldList
        name="userList"
        initialValue={[
          { username: 'morally', age: 21 },
          { username: 'bill', age: 22 },
        ]}
      >
        {({ state, mutators }) => {
          const onAdd = () => mutators.push()
          return (
            <div>
              {state.value.map((item, index) => {
                const onRemove = (index) => mutators.remove(index)
                const onMoveUp = (index) => mutators.moveUp(index)
                const onMoveDown = (index) => mutators.moveDown(index)
                return (
                  <RowStyleLayout key={index}>
                    <FormItem
                      name={`userList.${index}.username`}
                      component={Input}
                      title="用户名"
                    />
                    <FormItem
                      name={`userList.${index}.age`}
                      component={Input}
                      title="年龄"
                    />
                    <Button onClick={onRemove.bind(null, index)}>remove</Button>
                    <Button onClick={onMoveUp.bind(null, index)}>up</Button>
                    <Button onClick={onMoveDown.bind(null, index)}>down</Button>
                  </RowStyleLayout>
                )
              })}
              <Button onClick={onAdd}>add</Button>
            </div>
          )
        }}
      </FieldList>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `<FormButtonGroup/>`

- IFormButtonGroupProps

| 参数            | 说明               | 类型                                                                               | 默认值 |
| :-------------- | :----------------- | :--------------------------------------------------------------------------------- | :----- | --- |
| sticky          | 是否吸附在页面底部 | boolean                                                                            |        |
| itemStyle       | 每个 Btn 的样式    | React.CSSProperties                                                                |        |
| align           | 对齐方式           | 'left' `or` 'right' `or` 'start' `or` 'end' `or` 'top' `or` 'bottom' `or` 'center' |        |
| triggerDistance | 按钮间距离         | number                                                                             |        |
| zIndex          | z-index            | number                                                                             |        |
| span            | 跨列配置           | number                                                                             | string |     |
| offset          | 偏移配置           | number                                                                             | string |     |

**用法**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  Submit,
  FormButtonGroup,
  Reset,
} from '@formily/next'
import {
  setup,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout,
} from '@formily/next-components'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

setup()
const App = () => {
  const [state, setState] = useState({ editable: true })
  return (
    <Printer>
      <SchemaForm onSubmit={(v) => console.log(v)}>
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

### Hook

#### `useFormTableQuery`

- 调用 useFormTableQuery 会返回 Table 和 Form 属性，只需简单传递给对应组件即可
- useFormTableQuery 的传入参数是一个返回 Promise 对象的函数，该函数约定了它的出入参形式，如果接口请求出入参不符合这个约定，需要手动转换。

```typescript
const useFormTableQuery = (
  service: (payload: IQueryParams) => IQueryResponse | Promise<IQueryResponse>,
  middlewares?: IEffectMiddleware<ISchemaFormActions>[]
)
```

- useFormTableQuery 入参

| 参数   | 说明                 | 类型                                                                        | 默认值                                   |
| :----- | :------------------- | :-------------------------------------------------------------------------- | :--------------------------------------- | --- |
| 参数 1 | 列表请求服务         | (payload: [IQueryParams](#IQueryParams)) => [IQueryResponse](#IQueryParams) | Promise<[IQueryResponse](#IQueryParams)> |     |
| 参数 2 | 请求处理 middlewares | IEffectMiddleware<[ISchemaFormActions](#IFormActions)>                      |                                          |

- useFormTableQuery 返回结果

| 参数    | 说明                      | 类型                                                                                    | 默认值 |
| :------ | :------------------------ | :-------------------------------------------------------------------------------------- | :----- |
| trigger | 触发列表请求              | any                                                                                     |        |
| form    | Form 属性，主要为 effects | { effects: [IFormEffect](#IFormEffect) }                                                |        |
| table   | Table 属性                | { loading:boolean, dataSource: any[], pagination: [Pagination](#Pagination), onChange } |        |

**用法**

```jsx
import React from 'react'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset,
} from '@formily/next'
import { Input } from '@formily/next-components'
import { fetch } from 'mfetch'
import { Table, Pagination } from '@alifd/next'

const service = ({ values, pagination, sorter = {}, filters = {} }) => {
  return fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      ...values,
      ...filters,
    },
  })
    .then((res) => res.json())
    .then(({ results, info }) => {
      return {
        dataSource: results,
        ...pagination,
        total: 200,
      }
    })
}

const App = () => {
  const { form, table, pagination } = useFormTableQuery(service)
  return (
    <>
      <SchemaForm
        {...form}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field type="string" name="name" title="Name" x-component="Input" />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <Table {...table} rowKey={(record) => record.login.uuid}>
        <Table.Column
          sortable
          title="name"
          dataIndex="name"
          cell={(val, idx, record) => {
            return `${val.first} ${val.last}`
          }}
        />
        <Table.Column
          filters={[
            { label: 'male', value: 'male' },
            { label: 'female', value: 'female' },
          ]}
          title="gender"
          dataIndex="gender"
        />
        <Table.Column title="email" dataIndex="email" />
      </Table>
      <Pagination
        {...pagination}
        style={{ marginTop: 10 }}
        pageSizeSelector="filter"
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `useFormEffects`

通过使用 `useFormEffects` 可以轻松实现拥有局部逻辑表单。

- 使用 useFormEffects 可以实现局部 effect 的表单组件，效果同：[简单联动](#简单联动)
- 注意：监听的生命周期是从 `ON_FORM_MOUNT` 开始

**签名**

```typescript
(effects: IFormEffect): void
```

**用法**

> 注意：使用`useFormState`的必须是自定义组件，即外层必须是 `VirtualField`。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  VirtualField,
  createFormActions,
  useFormEffects,
  LifeCycleTypes,
  createVirtualBox,
} from '@formily/next'
import { setup } from '@formily/next-components'

setup()
const actions = createFormActions()

const FragmentContainer = createVirtualBox('ffb', (props) => {
  useFormEffects(($, { setFieldState }) => {
    $(LifeCycleTypes.ON_FORM_MOUNT).subscribe(() => {
      setFieldState('a~', (state) => (state.visible = false))
    })

    $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'trigger').subscribe(
      (triggerState) => {
        setFieldState('a~', (state) => {
          state.visible = triggerState.value
        })
      }
    )

    $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'a').subscribe((fieldState) => {
      setFieldState('a-copy', (state) => {
        state.value = fieldState.value
      })
    })
  })

  return <React.Fragment>{props.children}</React.Fragment>
})

// 具有局部逻辑的表单
const FormFragment = () => {
  return (
    <FragmentContainer>
      <Field
        type="radio"
        name="trigger"
        title="trigger"
        enum={[
          { label: 'show', value: true },
          { label: 'hide', value: false },
        ]}
      />
      <Field type="string" name="a" title="a" />
      <Field type="string" name="a-copy" title="a-copy" />
    </FragmentContainer>
  )
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

使用 useFormState 为自定义组件提供 FormState 扩展和管理能力

**签名**

```typescript
(defaultState: T): [state: IFormState, setFormState: (state?: IFormState) => void]
```

**用法**

> 注意：使用`useFormState`的必须是自定义组件，即外层必须是 `VirtualField`。

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  useFormState,
  createFormActions,
  LifeCycleTypes,
  createVirtualBox,
} from '@formily/next'
import { setup } from '@formily/next-components'

setup()
const actions = createFormActions()
const FormFragment = createVirtualBox('fusestatform', (props) => {
  const [formState, setFormState] = useFormState({ extendVar: 0 })
  const { extendVar } = formState

  return (
    <div>
      <button
        onClick={() => {
          setFormState({ extendVar: extendVar + 1 })
        }}
      >
        add
      </button>
      <div>count: {extendVar}</div>
    </div>
  )
})

const App = () => {
  return (
    <SchemaForm actions={actions}>
      <FormFragment />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### `useFieldState`

使用 useFieldState 为自定义组件提供状态管理能力

**签名**

```typescript
(defaultState: T): [state: IFieldState, setFieldState: (state?: IFieldState) => void]
```

**用法**

> 注意：使用`useFormState`的必须是自定义组件，即外层必须要有 `VirtualField`。

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  createEffectHook,
  useForm,
  useFormEffects,
  useFieldState,
  LifeCycleTypes,
  createControllerBox,
} from '@formily/next'
import { setup } from '@formily/next-components'

setup()
const changeTab$ = createEffectHook('changeTab')
const actions = createFormActions()
const TabFragment = (props) => {
  const [fieldState, setLocalFieldState] = useFieldState({ current: 0 })
  const { current } = fieldState
  const { children, dataSource, form } = props

  const update = (cur) => {
    form.notify('changeTab', cur)
    setLocalFieldState({
      current: cur,
    })
  }

  useFormEffects(($, { setFieldState }) => {
    dataSource.forEach((item, itemIdx) => {
      setFieldState(item.name, (state) => {
        state.display = itemIdx === current
      })
    })

    changeTab$().subscribe((idx) => {
      dataSource.forEach((item, itemIdx) => {
        setFieldState(item.name, (state) => {
          state.display = itemIdx === idx
        })
      })
    })
  })

  const btns = dataSource.map((item, idx) => {
    const focusStyle =
      idx === current ? { color: '#fff', background: 'blue' } : {}
    return (
      <button
        style={focusStyle}
        onClick={() => {
          update(idx)
        }}
      >
        {item.label}
      </button>
    )
  })

  return btns
}

const FormTab = createControllerBox('formTab', (props) => {
  const { form, props: comProps } = props
  return <TabFragment {...comProps['x-component-props']} form={form} />
})

const App = () => {
  return (
    <SchemaForm actions={actions}>
      <FormTab
        dataSource={[
          { label: 'tab-1', name: 'username' },
          { label: 'tab-2', name: 'age' },
        ]}
      />
      <div>
        <Field type="string" title="username" name="username" />
        <Field type="string" title="age" name="age" />
      </div>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### useForm

- 创建一个 [IForm](#IForm) 实例。需要注意的是，该操作会代理整个表单创建过程，包括 actions 的处理。
- useForm 是底层方法，它在包装具有业务属性的表单框架时非常有用。

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

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  createEffectHook,
  useForm,
  FormSpy,
  useFormEffects,
  useFieldState,
  LifeCycleTypes,
  createVirtualBox,
} from '@formily/next'
import { setup } from '@formily/next-components'

setup()
const actions = createFormActions()
const App = () => {
  const form = useForm({
    value: { username: 'moe' },
    actions,
  })

  return (
    <SchemaForm form={form}>
      <Field type="string" title="username" name="username" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### useField

`useField` 是一个非常底层的方法，一般情况不会用到它，但是它对于强业务诉求的定制非常有用。

**签名**

```typescript
type useField = (options: IFieldStateUIProps): IFieldHook
```

**用法**

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  createEffectHook,
  useForm,
  FormSpy,
  useFormEffects,
  LifeCycleTypes,
  createControllerBox,
  useField,
} from '@formily/next'

const CustomField = createControllerBox('customField', (props) => {
  const { name } = props
  const realName = props.props['x-component-props']['x-name']
  const { form, state, props: fieldProps, mutators } = useField({
    name: `${name}.${realName}`,
  })

  return (
    <input {...fieldProps} value={state.value} onChange={mutators.change} />
  )
})

const App = () => {
  return (
    <SchemaForm>
      <CustomField x-name="username" />
      <FormSpy>
        {({ state, form }) => (
          <div>name: {form && form.getFieldValue('username')}</div>
        )}
      </FormSpy>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### useVirtualField

`useVirtualField` 是一个非常底层的方法，一般情况不会用到它，但是它对于强业务诉求的定制非常有用。

**签名**

```typescript
type UseVirtualField = (options: IVirtualFieldStateProps): IVirtualFieldHook
```

**用法**

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  createEffectHook,
  useForm,
  FormSpy,
  useFormEffects,
  LifeCycleTypes,
  createControllerBox,
  useVirtualField,
} from '@formily/next'
import { setup } from '@formily/next-components'

setup()

const LayoutBox = createControllerBox('LayoutBox', (props) => {
  useVirtualField({ name: 'random' })
  return <div className="layout-box">{props.children}</div>
})

const App = () => {
  return (
    <SchemaForm>
      <LayoutBox>
        <Field type="string" name="username" title="username" />
      </LayoutBox>
      <Field type="string" name="age" title="age" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### useFormSpy

通过`useFormSpy`可以快速实现[FormSpy](#FormSpy) 的功能

**签名**

```typescript
type useFormSpy = (props: IFormSpyProps): ISpyHook
```

**用法**

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  createEffectHook,
  useForm,
  FormSpy,
  useFormEffects,
  LifeCycleTypes,
  createControllerBox,
  useFormSpy,
} from '@formily/next'
import { setup } from '@formily/next-components'

setup()

const CustomSpy = createControllerBox('CustomSpy', (props) => {
  const { form } = useFormSpy({ selector: '*', reducer: (v) => v })
  return <div>name: {form && form.getFieldValue('username')}</div>
})

const App = () => {
  return (
    <SchemaForm>
      <Field type="string" name="username" title="username" />
      <CustomSpy />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### useDeepFormItem

获取顶部设置与 `FormItem` 相关属性，常用于布局组件需要和表单组件对齐等需求。搭配 `<FormItemDeepProvider>` 一起使用

**用法**

```tsx
import { useDeepFormItem, FormItemDeepProvider } from '@formily/next'
import { Form } from '@alifd/next'
const CustomComponent = (props) => {
  const {
    prefixCls,
    labelAlign,
    labelCol: contextLabelCol,
    wrapperCol: contextWrapperCol,
  } = useDeepFormItem()

  return (
    <Form.Item
      prefixCls={prefixCls}
      labelAlign={labelAlign}
      labelCol={{ span: contextLabelCol }}
      wrapperCol={{ span: contextWrapperCol }}
    >
      {props.children}
    </Form.Item>
  )
}

const App = () => {
  return (
    <FormItemDeepProvider labelAlign="top" labelCol={6} wrapperCol={18}>
      <CustomComponent />
    </FormItemDeepProvider>
  )
}
```

#### useShallowFormItem

当想保留大部分表单组件的属性，并且阻隔某些指定属性时，搭配 `<FormItemShallowProvider>` 一起使用

**用法**

下列 `<NoLabelInput>` 除了`label`以外，会继承其他所有顶部的 `FormItem` 属性。

```tsx
import { SchemaField, FormItemShallowProvider, useShallowFormItem } from '@formily/next'
import { Form } from '@alifd/next'
const NoLabelInput = (props) => {
  return <FormItemShallowProvider label={undefined}>
    <SchemaField path={props.path} type="string">
  </FormItemShallowProvider>
}

```

### API

> 整体完全继承@formily/react, 下面只列举@formily/next 的特有 API

---

#### `createFormActions`

> 创建一个 [IFormActions](#IFormActions) 实例

**签名**

```typescript
createFormActions(): IFormActions
```

**用法**

```typescript
import { createFormActions } from '@formily/next'

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
import { createAsyncFormActions } from '@formily/next'

const actions = createAsyncFormActions()
actions.getFieldValue('username').then((val) => console.log(val))
```

#### setValidationLanguage

设置校验规则语种，搭配[setValidationLocale](#setValidationLocale) 使用

**签名**

```typescript
const setValidationLanguage = (lang: string) => void;
```

**用法**

```tsx
import { setValidationLanguage } from '@formily/next'
setValidationLanguage('zh')
```

#### setValidationLocale

设置校验规则命中时，message 的定义, 搭配[setValidationLanguage](#setValidationLanguage) 使用

**签名**

```typescript
interface ILocaleMessages {
  [key: string]: string | ILocaleMessages
}
interface ILocales {
  [lang: string]: ILocaleMessages
}
const setValidationLocale: (locale: ILocales) => void
```

**用法**

```tsx
import { setValidationLanguage, setValidationLocale } from '@formily/next'

setValidationLanguage('zh')
setValidationLocale({
  zh: {
    required: '这是修改默认的必填文案',
  },
})
```

#### registerValidationFormats

拓展校验正则 format, 当不满足此规则时即报错。

**签名**

```typescript
type ValidateFormatsMap = {
    [key in string]: RegExp;
};
static registerFormats(formats: ValidateFormatsMap): void
```

**用法**

```tsx
import { registerValidationFormats } from '@formily/next'

registerValidationFormats({
  custom_format: /^\d+$/
})

<Field
  type="string"
  required
  name="username"
  title="UserName"
  x-component="Input"
  x-rules={{
    format: 'custom_format',
  }}
/>
```

#### registerValidationMTEngine

注册校验消息模板引擎

**签名**

```tsx
static (template: any) => void;
```

**用法**

```tsx
import { setValidationLocale, registerValidationMTEngine } from '@formily/next'
setValidationLocale({
  en: {
    required: '这是定制必填文案 <% injectVar %>',
  },
})

registerValidationMTEngine((message, context) => {
  return message.replace(/\<\%\s*([\w.]+)\s*\%\>/g, (_, $0) => {
    return '替代inject的文案'
  })
})
```

#### FormPath

完全等价于 [depath](https://github.com/janryWang/depath)，提供了针对数据路径一系列的解析，匹配，取值，求值的能力。可以帮助我们在表单的很多地方高效实现业务逻辑。更详尽的内容，可以参考[理解表单路径系统](https://formilyjs.org/#/L3TOTn/JjSLSJFXiw)

#### `FormEffectHooks`

> 返回包含所有 Formily 生命周期的钩子函数，可以被监听消费

**用法**

```typescript
import SchemaForm, { FormEffectHooks } from '@formily/next'
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
  onFieldInitialValueChange$, // 字段初始值变化时触发
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

```tsx
import SchemaForm, { createEffectHook, createFormActions } from '@formily/next'

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

> 包装字段组件，让字段组件只需要支持 value/defaultValue/onChange 属性即可快速接入表单

```typescript
type Connect = <T extends React.ComponentType<IFieldProps>>(
  options?: IConnectOptions<T>
) => (Target: T) => React.PureComponent<IFieldProps>
```

- IConnectOptions

| 参数              | 说明                  | 类型                                                                                                                                       | 默认值       |
| :---------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :----------- | --- |
| valueName         | value 字段的名称      | string                                                                                                                                     | `'value'`    |
| eventName         | 改变 value 的事件名   | string                                                                                                                                     | `'onChange'` |
| defaultProps      | 默认属性              | {}                                                                                                                                         | {}           |
| getValueFromEvent | 根据事件获取 value    | (event?: any, value?: any) => any                                                                                                          |              |
| getProps          | 获取 props 的函数     | (componentProps: {}, fieldProps: [MergedFieldComponentProps](#MergedFieldComponentProps)) => {}                                            | void         |     |
| getComponent      | 获取 Component 的函数 | (Target: any, componentProps: {}, fieldProps: [MergedFieldComponentProps](#MergedFieldComponentProps)) => React.JSXElementConstructor<any> |              |

**用法**

```typescript
import { registerFormField, connect } from '@formily/next'

registerFormField(
  'string',
  connect()((props) => <input {...props} value={props.value || ''} />)
)
```

#### mapStyledProps

表单常使用 `mapStyledProps` 与 `connect` 搭配，它能够将当前表单字段的状态传递到 `<FormItem>` 上，实现
`loading`，`error`, `warning` 三种状态。

**用法**

```tsx
const Input = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(Input))
```

#### mapTextComponent

表单常使用 `mapTextComponent` 与 `connect` 搭配，它能够将当前表单字段在非编辑态时，显示预览值`<PreviewText>`，
并且会自动处理有 `dataSource` 等情况。

**用法**

```tsx
const Input = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(Input))
```

#### registerFormFields

全局批量注册拓展组件

```typescript
function registerFormFields(object: ISchemaFormRegistry['fields'])
```

**用法**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  registerFormFields,
  connect,
} from '@formily/next' // 或者 @formily/next

const CustomComponent1 = (props) => {
  return (
    <input
      value={props.value || ''}
      onChange={(e) => props.onChange(e.target.value)}
    />
  )
}
const CustomComponent2 = (props) => {
  return (
    <select
      value={props.value || ''}
      onChange={(e) => props.onChange(e.target.value)}
    />
  )
}

registerFormFields({
  CustomComponent1: connect()(CustomComponent1),
  CustomComponent2: connect()(CustomComponent2),
})

const App = () => {
  return (
    <SchemaForm>
      <Field
        name="component1"
        title="component1"
        x-component="CustomComponent1"
      />
      <Field
        name="component2"
        title="component2"
        x-component="CustomComponent2"
      />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### registerFormComponent

全局扩展 `<Form/>` UI 组件

```typescript
function registerFormComponent<Props = any>(
  component: React.JSXElementConstructor<Props>
)
```

**用法**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  registerFormComponent,
} from '@formily/next'
import { Input } from '@formily/next-components'

registerFormComponent((props) => {
  return <div>全局扩展Form组件{props.children}</div>
})

const App = () => {
  return (
    <SchemaForm components={{ Input }}>
      <Field type="string" name="name" title="Name" x-component="Input" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### registerFormItemComponent

全局扩展 `<FormItem/>` UI 组件

```typescript
function registerFormItemComponent(component: React.JSXElementConstructor<any>)
```

**用法**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  registerFormItemComponent,
} from '@formily/next'
import { Input } from '@formily/next-components'

registerFormItemComponent((props) => {
  return <div>全局扩展FormItem组件{props.children}</div>
})

const App = () => {
  return (
    <SchemaForm components={{ Input }}>
      <Field type="string" name="name" title="Name" x-component="Input" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### registerPreviewTextComponent

全局扩展 `<PreviewText/>` UI 组件

```typescript
function registerPreviewTextComponent(
  component: React.JSXElementConstructor<any>
)
```

**用法**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  registerPreviewTextComponent,
} from '@formily/next'
import { Input } from '@formily/next-components'

registerPreviewTextComponent((props) => {
  return <div>**自定义PreviewText**</div>
})

const App = () => {
  return (
    <SchemaForm components={{ Input }} editable={false}>
      <Field type="string" name="name" title="Name" x-component="Input" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
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

```tsx
import SchemaForm, {
  SchemaMarkupField as Field,
  registerFormField,
  connect,
  createFormActions,
} from '@formily/next'

registerFormField(
  'custom-string',
  connect()((props) => <input {...props} value={props.value || ''} />)
)
const actions = createFormActions()

const App = () => {
  return (
    <SchemaForm actions={actions}>
      <Field type="custom-string" name="custom-string" title="Custom Field" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### createControllerBox

创建虚拟表单字段，常用于创建表单布局组件。主要适用于`JSX-Schema`场景下。

```typescript
function createControllerBox<T = {}>(
  key: string,
  component?: React.JSXElementConstructor<ISchemaVirtualFieldComponentProps>
)
```

**用法**

```jsx
import SchemaForm, {
  SchemaMarkupField as Field,
  createControllerBox,
  createFormActions,
} from '@formily/next'
import { Input } from '@formily/next-components'

const FormLayout = createControllerBox('controller-form-layout', (props) => {
  return (
    <div>
      {props.children}
      {props.schema['x-component-props']['attr']}
    </div>
  )
})

const App = () => {
  return (
    <SchemaForm components={{ Input }}>
      <FormLayout attr="hello">
        <Field name="text" title="text" x-component="Input" />
      </FormLayout>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### createVirtualBox

创建虚拟表单字段，常用于创建表单布局组件。主要适用于`JSX-Schema`场景下。

```typescript
function createVirtualBox<T = {}>(
  key: string,
  component?: React.JSXElementConstructor<any>
)
```

**用法**

```jsx
import SchemaForm, {
  SchemaMarkupField as Field,
  createVirtualBox,
  createFormActions,
} from '@formily/next'
import { Input } from '@formily/next-components'

const FormLayout = createVirtualBox('c-form-layout', (props) => {
  return (
    <div>
      {props.children}
      {props.attr}
    </div>
  )
})

const App = () => {
  return (
    <SchemaForm components={{ Input }}>
      <FormLayout attr="hello">
        <Field name="text" title="text" x-component="Input" />
      </FormLayout>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### registerVirtualBox

注册虚拟表单字段，常用于生成表单布局组件。这种方式主要适用于 `json-schema` 模式下。

```typescript
function registerVirtualBox(
  name: string,
  component: ComponentWithStyleComponent<ISchemaVirtualFieldComponentProps>
)
```

**用法**

```jsx
import SchemaForm, {
  SchemaMarkupField as Field,
  registerVirtualBox,
} from '@formily/next'
import { Input } from '@formily/next-components'

registerVirtualBox('CustomLayout', (props) => {
  return (
    <div>
      {props.children}
      {props.schema['x-component-props']['attr']}
    </div>
  )
})

const App = () => {
  return (
    <SchemaForm components={{ Input }}>
      <Field
        type="object"
        name="layout"
        x-comppnent="CustomLayout"
        x-component-props={{
          attr: 'hello',
        }}
      >
        <Field name="text" title="text" x-component="Input" />
      </Field>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### getRegistry

获取预先注册的所有组件。

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
function getRegistry () => ISchemaFormRegistry
```

**用法**

```tsx
import SchemaForm, {
  SchemaMarkupField as Field,
  getRegistry,
} from '@formily/next'

registerVirtualBox('CustomLayout', (props) => {
  return (
    <div>
      {props.children}
      {props.schema['x-component-props']['attr']}
    </div>
  )
})

getRegistry()
```

#### cleanRegistry

清理预先注册的所有组件。

```typescript
function cleanRegistry()
```

**用法**

```tsx
import SchemaForm, {
  SchemaMarkupField as Field,
  cleanRegistry,
} from '@formily/next'

registerVirtualBox('CustomLayout', (props) => {
  return (
    <div>
      {props.children}
      {props.schema['x-component-props']['attr']}
    </div>
  )
})

cleanRegistry()
```

### Interfaces

整体完全继承@formily/react, 下面只列举@formily/next 的特有的 Interfaces

---

#### ISchema

Schema 协议对象，主要用于约束一份 json 结构满足 Schema 协议

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
  ['x-linkages']?: Array<{
    target: FormPathPattern
    type: string
    [key: string]: any
  }>
  ['x-mega-props']?: { [name: string]: any }
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
    //是否清空默认值
    clearInitialValue?: boolean
  }): Promise<void | IFormValidateResult>

  /*
   * 校验表单, 当校验失败时抛出异常(注意：该校验只针对对x-rules进行校验，不会校验手动设置的errors)
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
  reset(options?: {
    //强制清空
    forceClear?: boolean
    //强制校验
    validate?: boolean
    //重置范围，用于批量或者精确控制要重置的字段
    selector?: FormPathPattern
    //是否清空默认值
    clearInitialValue?: boolean
  }): Promise<void>
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

#### ISchemaFieldAdaptorProps

```typescript
interface ISchemaFieldAdaptorProps
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
  //是否在卸载时自动删除字段值
  unmountRemoveValue: boolean
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
declare type ISchemaFieldComponent = ComponentWithStyleComponent<ISchemaFieldComponentProps> & {
  __WRAPPERS__?: ISchemaFieldWrapper[]
}
```

#### ISchemaVirtualFieldComponent

```typescript
declare type ISchemaVirtualFieldComponent = ComponentWithStyleComponent<ISchemaVirtualFieldComponentProps> & {
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
  change: (value: V) => void //改变当前字段值
  dispatch: (name: string, payload: any) => void //触发effect事件
  errors: (
    errors: string | Array<string>,
    ...formatValues: Array<string | number>
  ) => void //设置当前字段的错误消息
  push(value: V) //对当前字段的值做push操作
  pop() //对当前字段的值做pop操作
  insert(index: number, value: V) //对当前字段的值做insert操作
  remove(name: string) //对当前字段的值做remove操作
  unshift(value: V) //对当前字段值做unshift操作
  shift() //对当前字段值做shift操作
  move(fromIndex: number, toIndex: number) //对当前字段值做move操作
}
```

#### IFieldProps

```typescript
interface IFieldProps<V = any> {
  name: string //字段数据路径
  path: Array<string> //字段数组数据路径
  value: V //字段值
  errors: Array<string> //字段错误消息集合
  editable: boolean | ((name: string) => boolean) //字段是否可编辑
  locale: Locale //国际化文案对象
  loading: boolean //是否处于加载态
  schemaPath: Array<string> //schema path,考虑到有些schema其实是不占数据路径的，所以这个路径是真实路径
  getSchema: (path: string) => ISchema //根据路径获取schema
  renderField: (
    childKey: string,
    reactKey: string | number
  ) => JSX.Element | string | null //根据childKey渲染当前字段的子字段
  renderComponent: React.FunctionComponent<Partial<IFieldProps> | undefined> //渲染当前字段的组件，对于x-render来说，可以借助它快速实现渲染包装功能
  getOrderProperties: () => Array<{
    schema: ISchema
    key: number
    path: string
    name: string
  }> //根据properties里字段的x-index值求出排序后的properties
  mutators: Mutators //数据操作对象
  schema: ISchema
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
  getValueFromEvent?: (
    props: IFieldProps['x-props'],
    event: Event,
    ...args: any[]
  ) => any
  //字段组件props transformer
  getProps?: (
    connectProps: IConnectProps,
    fieldProps: IFieldProps
  ) => IConnectProps
  //字段组件component transformer
  getComponent?: (
    target: T,
    connectProps: IConnectProps,
    fieldProps: IFieldProps
  ) => T
}
```

### IForm

```typescript
interface IForm {
  submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<IFormSubmitResult>
  clearErrors: (pattern?: FormPathPattern) => void
  hasChanged(target: any, path: FormPathPattern): boolean
  reset(options?: IFormResetOptions): Promise<void | IFormValidateResult>
  validate(
    path?: FormPathPattern,
    options?: IFormExtendedValidateFieldOptions
  ): Promise<IFormValidateResult>
  setFormState(callback?: (state: IFormState) => any, silent?: boolean): void
  getFormState(callback?: (state: IFormState) => any): any
  setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => void,
    silent?: boolean
  ): void
  getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => any
  ): any
  unsafe_do_not_use_transform_data_path(path: FormPathPattern): FormPathPattern //eslint-disable-line
  registerField(props: IFieldStateProps): IField
  registerVirtualField(props: IVirtualFieldStateProps): IVirtualField
  createMutators(field: IField | FormPathPattern): IMutators
  getFormGraph(): IFormGraph
  setFormGraph(graph: IFormGraph): void
  subscribe(callback?: FormHeartSubscriber): number
  unsubscribe(id: number): void
  notify: <T>(type: string, payload?: T) => void
  setFieldValue(path?: FormPathPattern, value?: any): void
  getFieldValue(path?: FormPathPattern): any
  setFieldInitialValue(path?: FormPathPattern, value?: any): void
  getFieldInitialValue(path?: FormPathPattern): any
}
```

#### IFormActions

```typescript
interface IFormActions {
  submit(
    onSubmit?: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  reset(options?: IFormResetOptions): void
  hasChanged(target: any, path: FormPathPattern): boolean
  validate(path?: FormPathPattern, options?: {}): Promise<IFormValidateResult>
  setFormState(callback?: (state: IFormState) => any): void
  getFormState(callback?: (state: IFormState) => any): any
  clearErrors: (pattern?: FormPathPattern) => void
  setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => void
  ): void
  getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => any
  ): any
  getFormGraph(): IFormGraph
  setFormGraph(graph: IFormGraph): void
  subscribe(callback?: FormHeartSubscriber): number
  unsubscribe(id: number): void
  notify: <T>(type: string, payload?: T) => void
  dispatch: <T>(type: string, payload?: T) => void
  setFieldValue(path?: FormPathPattern, value?: any): void
  getFieldValue(path?: FormPathPattern): any
  setFieldInitialValue(path?: FormPathPattern, value?: any): void
  getFieldInitialValue(path?: FormPathPattern): any
}
```

#### IFormValidateResult

```typescript
interface IFormValidateResult {
  errors: Array<{
    path: string
    messages: string[]
  }>
  warnings: Array<{
    path: string
    messages: string[]
  }>
}
```

#### IFormProps

```typescript
interface IFormProps<
  Value = {},
  DefaultValue = {},
  FormEffectPayload = any,
  FormActions = any
> {
  value?: Value
  defaultValue?: DefaultValue
  initialValues?: DefaultValue
  actions?: FormActions
  effects?: IFormEffect<FormEffectPayload, FormActions>
  form?: IForm
  onChange?: (values: Value) => void
  onSubmit?: (values: Value) => void | Promise<Value>
  onReset?: () => void
  onValidateFailed?: (valideted: IFormValidateResult) => void
  children?:
    | React.ReactElement
    | React.ReactElement[]
    | ((form: IForm) => React.ReactElement)
  useDirty?: boolean
  editable?: boolean | ((name: string) => boolean)
  validateFirst?: boolean
}
```

#### ISchemaFormProps

```typescript
interface ISchemaFormProps<
  Value = any,
  DefaultValue = any,
  FormEffectPayload = any,
  FormActions = ISchemaFormActions | ISchemaFormAsyncActions
> extends IFormProps<Value, DefaultValue, FormEffectPayload, FormActions> {
  schema?: ISchema
  fields?: ISchemaFormRegistry['fields']
  components?: {
    [key: string]: React.JSXElementConstructor<any>
  }
  virtualFields?: ISchemaFormRegistry['virtualFields']
  formComponent?: ISchemaFormRegistry['formComponent']
  formItemComponent?: ISchemaFormRegistry['formItemComponent']
  expressionScope?: { [key: string]: any }
}
```

#### IFormSpyAPI

```typescript
interface IFormSpyAPI {
  form: IForm
  type: string
  state: any
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

#### MergedFieldComponentProps

```typescript
interface MergedFieldComponentProps extends IFieldState {
  schema: Schema
  mutators: IMutators
  form: IForm
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}
```

#### Pagination

```typescript
interface Pagination {
  total: number
  pageSize: number
  current: number
}
```

#### IQueryParams

```typescript
type IQueryParams = {
  pagination: {
    total: number
    pageSize: number
    current: number
  }
  sorter?: {
    order: string
    field: string
    columnKey: string
    column: any
  }
  filters?: {
    [dataIndex: string]: any
  }
  values: any
}
```

#### IQueryResponse

```typescript
type IQueryResponse = {
  dataSource: any[]
  total: number
  pageSize: number
  current: number
}
```
