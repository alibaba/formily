# @formily/next

### 安装

```bash
npm install --save @formily/next
```

### Components

---

#### `<SchemaForm/>`

基于@formily/react 的核心组件SchemaForm进一步扩展出来的SchemaForm组件，推荐生产环境下使用

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| schema    |通过schema渲染表单                  | [ISchema](#ISchema) |                |
| fields    |传入自定义表单组件                   | { [key: string]: [ISchemaFieldComponent](#ISchemaFieldComponent) } |                |
| virtualFields    |传入自定义虚拟组件                   | { [key: string]: [ISchemaVirtualFieldComponent](#ISchemaVirtualFieldComponent) } |                |
| formComponent    |全局注册Form渲染组件                  | string `or` React.ReactElement |                |
| formItemComponent    |全局注册FormItem渲染组件                  | React.ReactElement |                |
| labelCol    |label布局控制                  | number `or` { span: number; offset?: number } |                |
| wrapperCol    |FormItem布局控制                  | number `or` { span: number; offset?: number } |                |
| previewPlaceholder    |自定义预览placeholder                  | string `or` ((props: [IPreviewTextProps](#IPreviewTextProps)) => string) |                |
| prefix    |样式前缀                  | string |                |
| inline    |是否为内联表单                  | boolean |                |
| size    |单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。                  | 'large' `or` 'medium' `or` 'small' |                |
| labelAlign    |标签的位置                  | 'top' `or` 'left' `or` 'inset' |                |
| labelTextAlign    |标签的左右对齐方式                  | 'left' `or` 'right' |                |
| labelCol    |控制所有 Item 的 labelCol                  | `{}` |                |
| wrapperCol    |控制所有 Item 的 wrapperCol                  | `{}` |                |
| className    |扩展class                  | string |                |
| style    |自定义内联样式                  | React.CSSProperties |                |
| component    |设置标签类型                  | string `or` (() => void) |                |
| value    |全局value                  | {} |                |
| defaultValue    |全局defaultValue                  | {} |                |
| initialValues    |全局initialValues                  | {} |                |
| actions    |FormActions实例                  | [FormActions](#FormActions) |                |
| effects    |IFormEffect实例                  | IFormEffect<FormEffectPayload, [FormActions](#FormActions)> |                |
| form    |表单实例                  | [IForm](#IForm) |                |
| onChange    |表单变化回调                  | (values: {}) => void |                |
| onSubmit    |form内有 `htmlType="submit"` 或 actions.submit时 触发                  | (values: {}) => void `or` Promise<{}> |                |
| onReset    |form内有 <Reset/> 或 actions.reset时 触发                  | () => void |                |
| onValidateFailed    |校验失败时触发                  | (valideted: [IFormValidateResult](#IFormValidateResult)) => void |                |
| children    |全局value                  | React.ReactElement `or` ((form: [IForm](#IForm)) => React.ReactElement) |                |
| useDirty    |是否使用脏检查，默认会走immer精确更新                  | boolean |                |
| editable    |是否可编辑                  | boolean `or` ((name: string) => boolean) |                |
| validateFirst    |是否走悲观校验，遇到第一个校验失败就停止后续校验                  | boolean |                |


#### `<SchemaMarkupField/>`

> @formily/next 的核心组件，用于描述表单字段

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| name    |字段名                  | string |                |
| title    |字段label                   | React.ReactNode |                |
| description    |字段描述信息                   | React.ReactNode |                |
| readOnly    | 只读                  | boolean |                |
| writeOnly    | 只写                  | boolean |                |
| type    | 字段类型                  | 'string' `or` 'object' `or` 'array' `or` 'number' `or` string |                |
| enum    | 相当于字段dataSource                  |  `Array<string | number | { label: React.ReactNode; value: any }>` |                |
| required    | 是否必填，为true会同时设置校验规则                  | string[] `or` boolean |                |
| format    | 正则规则类型，详细类型可以往后看	                  | string |                |
| properties    | 对象属性	                  | { [key: string]: [ISchema](#ISchema) } |                |
| items    | 数组描述	                  | [ISchema](#ISchema) `or` [ISchema](#ISchema)[] |                |
| patternProperties    | 动态匹配对象的某个属性的 Schema	                  | { [key: string]: [ISchema](#ISchema) } |                |
| additionalProperties    | 匹配对象额外属性的 Schema	                  | [ISchema](#ISchema) |                |
| editable    | 字段是否可编辑                  | boolean |                |
| visible    | 字段是否显示（伴随value的显示和隐藏）                  | boolean |                |
| display    | 字段是否显示（纯视觉，不影响value）                  | boolean |                |
| x-component    | 用于渲染的组件                  | string |                | 
| x-component-props    | 组件的属性                  | { [name: string]: any } |                | 
| x-rules    | 校验规则                  | [ValidatePatternRules](#ValidatePatternRules) |                | 
| x-props    | 字段扩展属性	                  | { [name: string]: any } |                | 
| x-index    | 字段顺序	                  | number |                | 
| default    | 字段默认值	                  | any |                |
| const    |  校验字段值是否与 const 的值相等	                 | any |                |
| multipleOf    | 校验字段值是否可被 multipleOf 的值整除	                  | number |                |
| maximum    | 最大值                  | number |                |
| exclusiveMaximum    | 校验最大值（大于等于）	                  | number |                |
| minimum    | 最小值                  | number |                |
| exclusiveMinimum    | 最小值（小于等于）	                  | number |                |
| maxLength    | 最大长度                  | number |                |
| minLength    | 最小长度                  | number |                |
| pattern    | 正则校验规则	                  | string `or` RegExp |                |
| maxItems    | 最大项数                  | number |                |
| minItems    | 最小项数                  | number |                |
| uniqueItems    | 是否校验重复	                  | boolean |                |
| maxProperties    | 最大属性数量	                  | number |                |
| minProperties    | 最小属性数量	                  | number |                |

#### `<Submit/>`

> Submit 组件 Props

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| onSubmit    |触发提交的回调函数                  | [ISchemaFormProps.onSubmit](#ISchemaFormProps) |                |
| showLoading    |是否展示loading                  | boolean |                |
| type    |按钮的类型                  | 'primary' `or` 'secondary' `or` 'normal' |                |
| size    |按钮的尺寸                  | 'small' `or` 'medium' `or` 'large' |                |
| iconSize    |按钮中 Icon 的尺寸，用于替代 Icon 的默认大小                  | 'xxs' `or` 'xs' `or` 'small' `or` 'medium' `or` 'large' `or` 'xl' `or` 'xxl' `or` 'xxxl' |                |
| htmlType    |当 component = 'button' 时，设置 button 标签的 type 值                  | 'submit' `or` 'reset' `or` 'button' |                |
| component    |设置标签类型                  | 'button' `or` 'a'  |                |
| loading    |设置按钮的载入状态                  | boolean  |                |
| ghost    |是否为幽灵按钮                  | true `or` false `or` 'light' `or` 'dark'  |                |
| text    |是否为文本按钮                  | boolean  |                |
| warning    |是否为警告按钮                  | boolean  |                |
| disabled    |是否禁用                  | boolean  |                |
| onClick    |点击按钮的回调                  | (e: {}) => void  |                |
| href    |在Button组件使用component属性值为a时有效，代表链接页面的URL                  | string  |                |
| target    |在Button组件使用component属性值为a时有效，代表何处打开链接文档                  | string  |                |


#### `<Reset/>`

> Reset 组件 Props

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| forceClear    |是否清空                  | boolean |                |
| validate    |是否触发校验                  | boolean |                |
| type    |按钮的类型                  | 'primary' `or` 'secondary' `or` 'normal' |                |
| size    |按钮的尺寸                  | 'small' `or` 'medium' `or` 'large' |                |
| iconSize    |按钮中 Icon 的尺寸，用于替代 Icon 的默认大小                  | 'xxs' `or` 'xs' `or` 'small' `or` 'medium' `or` 'large' `or` 'xl' `or` 'xxl' `or` 'xxxl' |                |
| htmlType    |当 component = 'button' 时，设置 button 标签的 type 值                  | 'submit' `or` 'reset' `or` 'button' |                |
| component    |设置标签类型                  | 'button' `or` 'a'  |                |
| loading    |设置按钮的载入状态                  | boolean  |                |
| ghost    |是否为幽灵按钮                  | true `or` false `or` 'light' `or` 'dark'  |                |
| text    |是否为文本按钮                  | boolean  |                |
| warning    |是否为警告按钮                  | boolean  |                |
| disabled    |是否禁用                  | boolean  |                |
| onClick    |点击按钮的回调                  | (e: {}) => void  |                |
| href    |在Button组件使用component属性值为a时有效，代表链接页面的URL                  | string  |                |
| target    |在Button组件使用component属性值为a时有效，代表何处打开链接文档                  | string  |                |


#### `<FormSpy/>`

> FormSpy 组件属性定义

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| selector    |选择器, 如：[`LifeCycleTypes.ON_FORM_SUBMIT_START`, `LifeCycleTypes.ON_FORM_SUBMIT_END`]                  | string[] `or` string |                |
| reducer    |reducer函数，状态叠加处理，action为当前命中的生命周期的数据                  | (state: any, action: { type: string; payload: any }, form: IForm) => any |                |
| children    |内容                  | React.ReactElement `or` ((api: [IFormSpyAPI](#IFormSpyAPI)) => React.ReactElement) |                |


**用法**

例子 1： 实现一个统计表单 values 改变的计数器

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field, createFormActions, FormSpy, LifeCycleTypes } from '@formily/next'
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
          count: state.count ? state.count + 1 : 1
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
import { SchemaForm, SchemaMarkupField as Field, createFormActions, FormSpy, LifeCycleTypes } from '@formily/next'
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


#### `<Field/>(废弃)`

> 即将废弃，请使用[SchemaMarkupField](#SchemaMarkupField)

#### `<FormButtonGroup/>`

* IFormButtonGroupProps

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| sticky    |是否吸附在页面底部                  | boolean |                |
| itemStyle    |每个Btn的样式                  | React.CSSProperties |                |
| align    |对齐方式                  | 'left' `or` 'right' `or` 'start' `or` 'end' `or` 'top' `or` 'bottom' `or` 'center' |                |
| triggerDistance    | 按钮间距离                  | number |                |
| zIndex    | z-index                  | number |                |
| span    | 跨列配置                  | number | string |                |
| offset    | 偏移配置                  | number | string |                |

**用法**

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  Submit,
  FormButtonGroup,
  Reset
} from '@formily/next'
import { 
  setup,
  FormItemGrid,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/next-components'
import { Button } from '@alifd/next'
import Printer from '@formily/printer'
import '@alifd/next/dist/next.css'

setup()
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


### Hook

#### `useFormEffects`

通过使用 `useFormEffects` 可以轻松实现拥有局部逻辑表单。

* 使用 useFormEffects 可以实现局部effect的表单组件，效果同：[简单联动](#简单联动)
* 注意：监听的生命周期是从 `ON_FORM_MOUNT` 开始

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
  createVirtualBox
} from '@formily/next'
import { setup } from '@formily/next-components'

setup()
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


// 具有局部逻辑的表单
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

使用 useFormState 为自定义组件提供FormState扩展和管理能力

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
  createVirtualBox
} from '@formily/next'
import { setup } from '@formily/next-components'

setup()
const actions = createFormActions()
const FormFragment = createVirtualBox('fusestatform', (props) => {  
  const [formState, setFormState] = useFormState({ extendVar: 0 })
  const { extendVar } = formState

  return <div>
    <button onClick={() => {
      setFormState({ extendVar: extendVar + 1 })
    }}>add</button>
    <div>count: {extendVar}</div>
  </div>
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
import { SchemaForm,
  SchemaMarkupField as Field,
  createFormActions, createEffectHook,
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

const FormTab = createControllerBox('formTab', (props) => {
  const { form, props: comProps } = props;
  return <TabFragment {...comProps['x-component-props']} form={form} />
})

const App = () => {
  return (
    <SchemaForm actions={actions}>
      <FormTab dataSource={[
        { label: 'tab-1', name: 'username' },
        { label: 'tab-2', name: 'age' }
      ]} />
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

* 创建一个 [IForm](#IForm) 实例。需要注意的是，该操作会代理整个表单创建过程，包括actions的处理。
* useForm是底层方法，它在包装具有业务属性的表单框架时非常有用。

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
import { SchemaForm,
  SchemaMarkupField as Field,
  createFormActions, createEffectHook,
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
import { SchemaForm,
  SchemaMarkupField as Field,
  createFormActions, createEffectHook,
  useForm,  
  FormSpy,
  useFormEffects,
  LifeCycleTypes,
  createControllerBox,
  useField,
} from '@formily/next'

const CustomField = createControllerBox('customField', (props) => {
  const { name } = props;
  const realName = props.props['x-component-props']['x-name'];
  const {
    form,
    state,
    props: fieldProps,
    mutators
  } = useField({
      name: `${name}.${realName}`,
    })
  
  return <input {...fieldProps} value={state.value} onChange={mutators.change} />
})

const App = () => {
  return (
    <SchemaForm>
      <CustomField x-name="username" />
      <FormSpy>
        {({ state, form }) => <div>name: {form && form.getFieldValue('username')}</div>}
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
import { SchemaForm,
  SchemaMarkupField as Field,
  createFormActions, createEffectHook,
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
      <Field type="string" name="age" title="age"/>
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
import { SchemaForm,
  SchemaMarkupField as Field,
  createFormActions, createEffectHook,
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
  const { form } = useFormSpy({ selector: '*', reducer: v => v })
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
actions.getFieldValue('username').then(val => console.log(val))
```

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

* IConnectOptions

| 参数       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| valueName    | value字段的名称                 | string | `'value'`               |
| eventName    | 改变value的事件名                 | string | `'onChange'`               |
| defaultProps    | 默认属性                 | {} | {}               |
| getValueFromEvent    | 根据事件获取value                 | (event?: any, value?: any) => any |                |
| getProps    | 获取props的函数                 | (componentProps: {}, fieldProps: [MergedFieldComponentProps](#MergedFieldComponentProps)) => {} | void |                |
| getComponent    | 获取Component的函数                 |  (Target: any, componentProps: {}, fieldProps: [MergedFieldComponentProps](#MergedFieldComponentProps)) => React.JSXElementConstructor<any> |                |


**用法**

```typescript
import {registerFormField,connect} from '@formily/next'

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

```tsx

import SchemaForm, { SchemaMarkupField as Field, registerFormField, connect, createFormActions } from '@formily/next'

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
    clearInitialValue?:boolean
  }): Promise<void | IFormValidateResult>

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
    clearInitialValue?:boolean
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
  createMutators(field: IField): IMutators
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
        path: string;
        messages: string[];
    }>;
    warnings: Array<{
        path: string;
        messages: string[];
    }>;
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