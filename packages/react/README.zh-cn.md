# @uform/react

> UForm 在 react 层的实现，内置表单状态核心管理(@uform/core), 通过结合 React 和核心管理机制，提供给开发者 API 可以快速操作表单，以及提供相应 UI 层渲染的支持。
> @uform/react 中主要包含了以下部分：
>
> - Form 表单容器
> - Field 表单字段
> - VirtualField 虚拟表单字段
> - FormaSpy 表单替身
> - FormProvider 表单核心提供者
> - FormConsumer 表单核心消费者(即将废弃，请使用FormSpy)
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
  - [`字段校验`](#字段校验)
  - [`对象类型字段`](#对象类型字段)
  - [`简单数组类型字段`](#简单数组类型字段)
  - [`对象数组类型字段`](#对象数组类型字段)
  - [`combo字段`](#combo字段)
  - [`跨文件消费表单数据`](#跨文件消费表单数据)
- [Components](#components)
  - [`Form`](#Form)
  - [`Field`](#Field)
  - [`VirtualField`](#VirtualField)
  - [`FormSpy`](#FormSpy)
  - [`FormProvider`](#FormProvider)
  - [`FormConsumer(即将废弃，请使用FormSpy)`](#FormConsumer(即将废弃，请使用FormSpy))
- [API](#API)
  - [`createFormActions`](#createFormActions)
  - [`createAsyncFormActions`](#createAsyncFormActions)
  - [`FormEffectHooks`](#FormEffectHooks)
- [Interface](#Interface)
  - [`IFormActions`](#IFormActions)
  - [`IFormAsyncActions`](#IFormAsyncActions)
  - [`IFieldState`](#IFieldState)
  - [`ValidatePatternRules`](#ValidatePatternRules)
  - [`ValidateArrayRules`](#ValidateArrayRules)
  - [`CustomValidator`](#CustomValidator)
  - [`ValidateDescription`](#ValidateDescription)
  - [`ValidateResponse`](#ValidateResponse)
  - [`SyncValidateResponse`](#SyncValidateResponse)
  - [`AsyncValidateResponse`](#AsyncValidateResponse)

### 使用方式

---

#### 快速开始

```typescript
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

```typescript
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

#### 字段校验

示例：必填校验 + error类型校验 + warning类型校验 + 自定义校验
校验的类型可以是 [ValidatePatternRules](#ValidatePatternRules)，即 [string](#string内置校验规则) | [CustomValidator](#CustomValidator) | [ValidateDescription](#ValidateDescription) | [ValidateArrayRules](#ValidateArrayRules)

```typescript
<Form>
  // 简单必填校验
  <InputField name="username" required />

  // 错误类型校验
  <InputField name="age" rules={[
    (val) => val === undefiend ? { type: 'error', message: 'age is required' } : undefined
  ]} required>

  // warning类型校验
  <InputField name="gender" rules={[
    (val) => val === undefiend ? { type: 'warning', message: 'gender is required' } : undefined
  ]} required>

  // 内置校验, 默认均为error类型
  <InputField name="id" rules={[
    {
      format: 'number',
      message: 'id is not a number.'
    },
    (val) => val === undefiend ? { type: 'warning', message: 'verifyCode is required' } : undefined
  ]} required>

  // 自定义校验, 可以自定义返回类型
  <InputField name="verifyCode" rules={[
    {
      validator(value) {
        return value === 123 ? 'This field can not be 123 {{scope.outerVariable}}' : undefined
      },
      scope: {
        outerVariable: 'addonAfter'
      }
    },
    {
      validator(value) {
        return value === 456 ? { type: 'error', message: 'This field can not be 456' } : undefined
      },
    },
  ]} required>

</Form>
```

#### 对象类型字段

示例：用户信息 `user(username, age)`
```typescript

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
```typescript
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
```typescript
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
                              <InputField name={`userList[${index}]${key}`}>
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

#### combo字段

示例：combo username 和 age字段, 更多用法，请点击[FormSpy](#FormSpy)查看
```typescript
<Form actions={actions}>
  <FormSpy>
    {({ state, form }) => {
      return <div>
        name: {form.getFieldValue('username')}
        age: {form.getFieldValue('age')}
      </div>
    }}
  </FormSpy>
<Form>
```

#### 跨文件消费表单数据

```typescript
文件目录
  -- app
  -- components
    -- customForm
```

示例：跨文件消费表单数据, 更多用法，请参考[FormProvider](#FormProvider) 和 [FormSpy](#FormSpy)

```typescript
import CustomForm from '../components/customForm'

const App = () => {
  return <FormProvider>
    <CustomForm>
    <FormSpy>
      {({ state, form }) => {
        return <div>
          name: {form.getFieldValue('username')}
          age: {form.getFieldValue('age')}
        </div>
      }}
    </FormSpy>
  </FormProvider>
}
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
  effects?: IFormEffect<any, IFormActions | IFormAsyncActions>
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

例子：各种类型的字段

```typescript
<Form actions={actions}>
  // 普通字段
  <Field name="id">
    {({ state, mutator }) => {
      return <input value={state.value} onChange={mutator}>
    }}
  </Field>

  // 对象字段
  <Field name="user" initValue={{}}>
    {({ state: outterState }) => {
      return <React.Fragment>
        {Object.keys(outterState.value).map(objKey => {
          return <Field name={`user.${objKey}`}>
            {({ state, mutator }) => {
              return <input value={state.value} onChange={mutator}>
            }}
          </Field>
        })}
      </React.Fragment>      
    }}
  </Field>

  // 普通数组
  <Field name="idList" initValue={[]}>
    {({ state: outterState }) => {
      return <React.Fragment>
        {outterState.value.map((item, index) => {
          return <Field name={`idList[${index}]`}>
            {({ state, mutator }) => {
              return <input value={state.value} onChange={mutator}>
            }}
          </Field>
        })}
      </React.Fragment>      
    }}
  </Field>

  // 对象数组
  <Field name="userList" initValue={[]}>
    {({ state: outterState }) => {
      return <React.Fragment>
        {outterState.value.map((item, index) => {
          return <Field name={`userList[${index}]`} initValue={{}}>
            {({ state: outterState }) => {
              return <React.Fragment>
                {Object.keys(outterState.value).map(objKey => {
                  return <Field name={`userList[${index}].${objKey}`}>
                    {({ state, mutator }) => {
                      return <input value={state.value} onChange={mutator}>
                    }}
                  </Field>
                })}
              </React.Fragment>      
            }}
          </Field>
        })}
      </React.Fragment>      
    }}
  </Field>
</Form>
```


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

例子：动态设置布局组件的属性

```typescript
// render
<Form actions={actions}>
  <Field name="user" initialValue={{}}>
      {({ state, mutator }) => {
          return <VirtualField name="layout">
              {({ state: layoutState }) => {
                  return <Layout width={state.width} height={state.height}>
                      <InputField name="username" />
                      <InputField name="age" />
                  </Layout>
              }}
          </VirtualField>
      }}
  </Field>
</Form>

// some where dynamic change layout's props
actions.setFieldState('user.layout', (state) => {
    state.width = '100px'
    state.height = '100px'
})

```

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

例子1： 实现一个统计表单values改变的计数器

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

例子2：实现常用combo组件

```typescript
import { Form, FormSpy } from '@uform/core'

const App = () => {
  return (
    <Form>
      <FormSpy>
        {({ state, form }) => {
          return <div>
            name: {form.getFieldValue('username')}
            age: {form.getFieldValue('age')}
          </div>
        }}
      </FormSpy>
    </Form>
  )
}
```

#### FormProvider

> 与 FormSpy 搭配使用，常用与跨文件通信

**用法**

```typescript
import { FormProvider, FormSpy } from '@uform/core'
import OtherFileForm from '../otherFile'

const App = () => {
  return (
    <FormProvider>
      <OtherFileForm />
      <FormSpy>
        {({ status, state, submit, reset }) => {
          return (
            <Button disabled={status === 'submitting'} onClick={submit}>
              提交
            </Button>
          )
        }}
      </FormSpy>
    </FormProvider>
  )
}
```

#### FormConsumer(即将废弃，请使用FormSpy)

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

> 创建一个 [IFormActions](#IFormActions) 实例

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

> 创建一个 [IFormAsyncActions](#IFormAsyncActions) 实例，成员方法 同[IFormActions](#IFormActions),
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

### Interface

---

#### IFormActions

```typescript
interface IFormActions {
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

#### IFormAsyncActions

```typescript
interface IFormAsyncActions {
  submit(
    onSubmit?: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  reset(options?: IFormResetOptions): Promise<void>
  hasChanged(target: any, path: FormPathPattern): Promise<boolean>
  clearErrors: (pattern?: FormPathPattern) => Promise<void>
  validate(path?: FormPathPattern, options?: {}): Promise<IFormValidateResult>
  setFormState(callback?: (state: IFormState) => any): Promise<void>
  getFormState(callback?: (state: IFormState) => any): Promise<any>
  setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => void
  ): Promise<void>
  getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => any
  ): Promise<any>
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

#### ValidatePatternRules

```typescript
declare type ValidatePatternRules = string | CustomValidator | ValidateDescription | ValidateArrayRules;
```

#### ValidateArrayRules

```typescript
declare type ValidateArrayRules = Array<string | CustomValidator | ValidateDescription>;
```

### string内置校验规则

todo

#### CustomValidator

```typescript
declare type CustomValidator = (value: any, rescription?: ValidateDescription) => ValidateResponse;
```

#### ValidateDescription

```typescript
interface ValidateDescription {
    format?: string;
    validator?: CustomValidator;
    required?: boolean;
    pattern?: RegExp | string;
    max?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    exclusiveMinimum?: number;
    minimum?: number;
    min?: number;
    len?: number;
    whitespace?: boolean;
    enum?: any[];
    message?: string;
    [key: string]: any;
}
```

#### ValidateResponse

```typescript
export declare type ValidateResponse = SyncValidateResponse | AsyncValidateResponse;
```

#### SyncValidateResponse

```typescript
declare type SyncValidateResponse = null | string | boolean | {
    type?: 'error' | 'warning';
    message: string;
};
```

#### AsyncValidateResponse

```typescript
declare type AsyncValidateResponse = Promise<SyncValidateResponse>;
```
