# @uform/react

> UForm 在 react 层的实现，内置表单状态核心管理(@uform/core), 通过结合 React 和核心管理机制，提供给开发者 API 可以快速操作表单，以及提供相应 UI 层渲染的支持。

> @uform/react 中主要包含了以下部分：
>
> - Form 表单容器
> - Field 表单字段
> - VirtualField 虚拟表单字段
> - FormaSpy 表单替身
> - FormProvider 表单核心提供者
> - FormConsumer 表单核心消费者
> - createFormActions 创建表单核心操作API实例
> - createAsyncFormActions 创建表单核心操作API实例（异步）
> - FormEffectHooks 表单生命周期hook

### 安装

```bash
npm install --save @uform/react
```

### 目录

<!-- toc -->

- [使用方式](#使用方式)
  - [`快速开始`](#快速开始)
  - [`基础类型字段`](#基础类型字段)
  - [`对象类型字段`](#对象类型字段)
  - [`简单数组类型字段`](#简单数组类型字段)
  - [`对象数组类型字段`](#对象数组类型字段)
- [Components](#components)
  - [`Form`](#Form)
  - [`Field`](#Field)
  - [`VirtualField`](#VirtualField)
  - [`FormSpy`](#FormSpy)
  - [`FormProvider`](#FormProvider)
  - [`FormConsumer`](#FormConsumer)
- [API](#API)
  - [`createFormActions`](#createFormActions)
  - [`createAsyncFormActions`](#createAsyncFormActions)
  - [`FormEffectHooks`](#FormEffectHooks)

### 使用方式

---

#### 快速开始

```jsx
import {
    Form,
    Field,
    FormPath,
    createFormActions,
    FormSpy,
    FormProvider,
    FormConsumer,
    FormEffectHooks
} from '@uform/react'

const { onFormInit$, onFormInputChange$, onFieldInputChange$ } = FormEffectHooks
const actions = createFormActions()
const App = () => {
  return <Form
    actions={actions}
    effects={() => {
      onFormInit$().subscribe(() => {
        console.log('初始化')
      })
      onFieldInputChange$().subscribe(state => {
        console.log('输入变化', state)
      })
    }}
    onChange={() => {}}
  >
    <label>username: <label>
    <Field>
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
  </Form>
}

```

#### 基础类型字段

示例：以输入框为例，如何快速绑定表单字段，后续例子都基于此字段拓展。

```jsx
const InputField = props => (
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

#### 对象类型字段

示例：用户信息 `user(username, age)`

```jsx

<Form actions={actions}>
  <Field name="user" initialValue={{
    username: undefined,
    age: undefined,
  }}>
    {({ state, mutators }) => {
      return (
        <React.Fragment>
          {['username', 'age'].map(key => {
            if (!mutators.exist(key)) return
            return (
              <React.Fragment key={key}>
                <InputField name={`user.${key}`}>
              </React.Fragment>
            )
          })}
        </React.Fragment>
      )
    })}
  </Field>
</Form>

```

#### 简单数组类型字段

示例：用户 id 列表，增删改查

```jsx
<Form actions={actions}>
<Field name="idList" initialValue={[]}>
    {({ state, mutators }) => {
      return (
        <div>
          {state.value.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <InputField name={`idList[${index}]`}>
                <button onClick={() => mutators.remove(index)}>Remove</button>
              </React.Fragment>
            )
          })}
          <button onClick={() => mutators.push()}>Add Item</button>
        </div>
      )
    }}
  </Field>
<Form>
```

#### 对象数组类型字段

示例：用户 id 列表，增删改查

```jsx
<Form actions={actions}>
<Field name="userList" initialValue={[]}>
    {({ state, mutators }) => {
      return (
        <div>
          {state.value.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Field name={`userList[${index}]`}>
                  {({ state, mutators }) => {
                    return (
                      <React.Fragment>
                        {['username', 'age'].map(key => {
                          if (!mutators.exist(key)) return
                          return (
                            <React.Fragment key={key}>
                              <InputField name={`user.${key}`}>
                            </React.Fragment>
                          )
                        })}
                      </React.Fragment>
                    )
                  }}
                </Field>
                <button onClick={() => mutators.remove(index)}>Remove</button>
              </React.Fragment>
            )
          }}
          <button onClick={() => mutators.push()}>Add Item</button>
        </div>
      )
    })}
  </Field>
<Form>
```

### Components

---

#### Form

> Form 组件属性定义

```typescript
interface IFormProps {
  //值
  value?: any
  defaultValue?: any
  //初始值
  initialValues?: any
  // formAPI
  actions?: IFormActions | IFormAsyncActions
  // 副作用
  effects?: IFormEffect<EffectPayload, IFormActions | IFormAsyncActions>
  // IForm实例
  form?: IForm
  onChange?: (values: Value) => void
  onSubmit?: (values: Value) => void | Promise<Value>
  onReset?: () => void
  onValidateFailed?: (valideted: IFormValidateResult) => void
  children?: React.ReactElement | ((form: IForm) => React.ReactElement)
  //是否使用脏检查，默认会走immer精确更新
  useDirty?: boolean
  // 是否可编辑，默认可编辑
  editable?: boolean
  //是否走悲观校验，遇到第一个校验失败就停止后续校验
  validateFirst?: boolean
}
```

#### Field

> Field 组件属性定义

```typescript
interface IFieldStateUIProps {
  //节点路径
  path?: FormPathPattern
  //节点路径
  nodePath?: FormPathPattern
  //数据路径
  dataPath?: FormPathPattern
  //数据路径
  name?: string
  //字段值，与values[0]是恒定相等
  value?: any
  //字段多参值，比如字段onChange触发时，给事件回调传了多参数据，那么这里会存储所有参数的值
  values?: any[]
  //初始值
  initialValue?: any
  //字段扩展属性
  props?: FieldProps
  //校验规则，具体类型描述参考后面文档
  rules?: ValidatePatternRules[]
  //是否必填
  required?: boolean
  //字段是否可编辑
  editable?: boolean
  //字段是否走脏检查
  useDirty?: boolean
  //字段状态计算容器，主要用于扩展核心联动规则
  computeState?: (draft: IFieldState, prevState: IFieldState) => void
  // 触发校验类型
  triggerType?: 'onChange' | 'onBlur'
  // 值格式化函数，从浏览器event中获取value
  getValueFromEvent?: (...args: any[]) => any
  children?: React.ReactElement | ((api: IFieldAPI) => React.ReactElement)
}
```

**用法**
TODO

#### VirtualField

> VirtualField 组件属性定义

```typescript
interface IVirtualFieldProps {
  //节点路径
  path?: FormPathPattern
  //节点路径
  nodePath?: FormPathPattern
  //数据路径
  dataPath?: FormPathPattern
  //数据路径
  name?: string
  //字段扩展属性
  props?: FieldProps
  //字段是否走脏检查
  useDirty?: boolean
  //字段状态计算容器，主要用于扩展核心联动规则
  computeState?: (draft: IFieldState, prevState: IFieldState) => void
  children?: React.ReactElement | ((api: IFieldAPI) => React.ReactElement)
}
```

**用法**
TODO

#### FormSpy

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

```typescript
import { Form, FormSpy } from '@uform/core'

const App = () => {
  return (
    <Form>
      <FormSpy
        selector={LifeCycleTypes.ON_FORM_VALUES_CHANGE}
        reducer={(state, action, form) => ({
          count: state.count ? state.count + 1 : 1
        })}
      >
        {({ state, type, form }) => {
          return <div>{state.count || 0}</div>
        }}
      </FormSpy>
    </Form>
  )
}
```

#### FormProvider

> 与 FormConsumer 搭配使用，常用与跨文件通信

**用法**

```typescript
import { FormProvider, FormConsumer } from '@uform/core'
import OtherFileForm from '../otherFile'

const App = () => {
  return (
    <FormProvider>
      <OtherFileForm />
      <FormConsumer>
        {({ status, state, submit, reset }) => {
          return (
            <Button disabled={status === 'submitting'} onClick={submit}>
              提交
            </Button>
          )
        }}
      </FormConsumer>
    </FormProvider>
  )
}
```

#### FormConsumer

> FormConsumer 组件属性定义

```typescript
interface IFormConsumerProps {
  // 选择器, 如：[ LifeCycleTypes.ON_FORM_SUBMIT_START, LifeCycleTypes.ON_FORM_SUBMIT_END ]
  selector?: string[] | string
  children?:
    | React.ReactElement
    | ((api: IFormConsumerAPI) => React.ReactElement)
}
```

### API

---

#### `createFormActions`

> 创建一个 IFormActions 实例, 成员方法 同[IForm](https://github.com/alibaba/uform/blob/v1/packages/core/README.zh-cn.md#iform)

**签名**

```typescript
createFormActions(): IFormActions
```

**用法**

```typescript
import { createFormActions } from '@uform/core'

const actions = createFormActions()
console.log(actions.getFieldValue('username'))
```

#### `createAsyncFormActions`

> 创建一个 IFormAsyncActions 实例，成员方法 同[IForm](https://github.com/alibaba/uform/blob/v1/packages/core/README.zh-cn.md#iform),
但是调用 API 返回的结果是异步的(promise)。

**签名**

```typescript
createAsyncFormActions(): IFormAsyncActions
actions.getFieldValue('username').then(val => console.log(val))
```

**用法**

```typescript
import { createAsyncFormActions } from '@uform/core'

const actions = createAsyncFormActions()
// 所有的API和formActions保持一致，但是会返回promise类型的结果
```

#### `FormEffectHooks`

> 返回包含所有 UForm 生命周期的钩子函数，可以被监听消费

**用法**

```typescript
import { FormEffectHooks, Form } from '@uform/core'
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
    <Form
      effects={() => {
        onFormInit$().subscribe(() => {
          console.log('初始化')
        })
      }}
    >
      ...
    </Form>
  )
}
```
