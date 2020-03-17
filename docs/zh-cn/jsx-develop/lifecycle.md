# 理解表单生命周期

在 Formily 表单系统中，主要由几部分构成：

- Form
  - FormState
  - FormLifeCycle
- Field
  - FieldState
  - VirtualFieldState
  - FieldLifeCycle

可以看到，想要构成一个表单系统，必须要有一套完备的生命周期，才能驱动整个系统更好的运作，生命周期，就像心脏一样，它会不断的跳动，往外派发事件，借助生命周期，我们就能构建一个无限复杂的表单系统，毫不含糊的说，我们的业务逻辑，90%以上都是基于生命周期而来的。

所以，深度了解 Formily 生命周期体系之后，我们就可以更高效的开发表单了。

## 类型列举

| 常量名                          | 常量值                        | 描述                                             | Hook                          | 返回值     |
| ------------------------------- | ----------------------------- | ------------------------------------------------ | ----------------------------- | ---------- |
| ON_FORM_WILL_INIT               | "onFormWillInit"              | 表单初始化前触发                                 | ` onFormWillInit$ `              | FormState  |
| ON_FORM_INIT                    | "onFormInit"                  | 表单初始化之后触发                               | ` onFormInit$ `                  | FormState  |
| ON_FORM_CHANGE                  | "onFormChange"                | 表单状态变化时触发                               | ` onFormChange$ `                | FormState  |
| ON_FORM_MOUNT                   | "onFormMount"                 | 表单组件挂载完毕时触发                           | ` onFormMount$ `                 | FormState  |
| ON_FORM_UNMOUNT                 | "onFormUnmount"               | 表单组件卸载时触发                               | ` onFormUnmount$ `               | FormState  |
| ON_FORM_SUBMIT                  | "onFormSubmit"                | 表单提交时触发                                   | ` onFormSubmit$ `                | FormState  |
| ON_FORM_RESET                   | "onFormReset"                 | 表单重置时触发                                   | ` onFormReset$ `                 | FormState  |
| ON_FORM_SUBMIT_START            | "onFormSubmitStart"           | 表单提交开始时触发                               | ` onFormSubmitStart$ `           | FormState  |
| ON_FORM_SUBMIT_END              | "onFormSubmitEnd"             | 表单提交完成时触发                               | ` onFormSubmitEnd$ `             | FormState  |
| ON_FORM_SUBMIT_VALIDATE_START   | "onFormSubmitValidateStart"   | 表单提交校验开始时触发                           | ` onFormSubmitValidateStart$ `   | FormState  |
| ON_FORM_SUBMIT_VALIDATE_SUCCESS | "onFormSubmitValidateSuccess" | 表单提交校验成功时触发                           | ` onFormSubmitValidateSuccess$ ` | FormState  |
| ON_FORM_SUBMIT_VALIDATE_FAILED  | "onFormSubmitValidateFailed"  | 表单提交校验失败时触发                           | ` onFormSubmitValidateFailed$ `  | FormState  |
| ON_FORM_ON_SUBMIT_SUCCESS   | "onFormOnSubmitSuccess"   | 表单自定义onSubmit成功，入参为onSubmit返回值                           | ` onFormOnSubmitSuccess$ `   | any  |
| ON_FORM_ON_SUBMIT_FAILED | "onFormOnSubmitFailed" | 表单自定义onSubmit失败，入参为onSubmit抛出异常                           | ` onFormOnSubmitFailed$ ` | Error  |
| ON_FORM_VALUES_CHANGE           | "onFormValuesChange"          | 表单值变化时触发                                 | ` onFormValuesChange$ `          | FormState  |
| ON_FORM_INITIAL_VALUES_CHANGE   | "onFormInitialValuesChange"   | 表单初始值变化时触发                             | ` onFormInitialValuesChange$ `   | FormState  |
| ON_FORM_VALIDATE_START          | "onFormValidateStart"         | 表单校验开始时触发                               | ` onFormValidateStart$ `         | FormState  |
| ON_FORM_VALIDATE_END            | "onFormValidateEnd"           | 表单校验结束时触发                               | ` onFormValidateEnd$ `           | FormState  |
| ON_FORM_INPUT_CHANGE            | "onFormInputChange"           | 表单输入事件触发时触发(人为操作，不包含间接联动) | ` onFormInputChange$ `           | FormState  |
| ON_FORM_GRAPH_CHANGE            | "onFormGraphChange"           | 表单树结构变化时触发                             | ` onFormGraphChange$ `           | FormGraph  |
| ON_FIELD_WILL_INIT              | "onFieldWillInit"             | 字段初始化前触发                                 | ` onFieldWillInit$ `             | FieldState |
| ON_FIELD_INIT                   | "onFieldInit"                 | 字段初始化时触发                                 | ` onFieldInit$ `                 | FieldState |
| ON_FIELD_CHANGE                 | "onFieldChange"               | 字段状态发生变化时触发                           | ` onFieldChange$ `               | FieldState |
| ON_FIELD_INPUT_CHANGE           | "onFieldInputChange"          | 字段输入事件触发时触发(人为操作，不包含间接联动) | ` onFieldInputChange$ `          | FieldState |
| ON_FIELD_VALUE_CHANGE           | "onFieldValueChange"          | 字段值变化时触发                                 | ` onFieldValueChange$ `          | FieldState |
| ON_FIELD_INITIAL_VALUE_CHANGE   | "onFieldInitialValueChange"   | 字段初始值变化时触发                             | ` onFieldInitialValueChange$ `   | FieldState |
| ON_FIELD_VALIDATE_START         | "onFieldValidateStart"        | 字段校验开始时触发                               | ` onFieldValidateStart$ `        | FieldState |
| ON_FIELD_VALIDATE_END           | "onFieldValidateEnd"          | 字段校验结束时触发                               | ` onFieldValidateEnd$ `          | FieldState |
| ON_FIELD_MOUNT                  | "onFieldMount"                | 字段挂载时触发                                   | ` onFieldMount$ `                | FieldState |
| ON_FIELD_UNMOUNT                | "onFieldUnmount"              | 字段卸载时触发                                   | ` onFieldUnmount$ `              | FieldState |

## 引入生命周期

```typescript
import { LifeCycleTypes, FormEffectHooks } from '@formily/antd' //或者@formily/next

const { ON_FIELD_MOUNT } = LifeCycleTypes
const { onFieldMount$ } = FormEffectHooks
```

## 消费生命周期

### 字段联动消费

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  LifeCycleTypes,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { merge } from 'rxjs'
import { Input, Select } from '@formily/antd-components' // 或者@formily/next-components
import 'antd/dist/antd.css'

const App = () => {
  return (
    <Form
      labelCol={5}
      wrapperCol={14}
      effects={($, { setFieldState }) => {
        $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
          setFieldState('aa', state => {
            state.value = 321
          })
        })
        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'aa').subscribe(fieldState => {
          setFieldState('bb', state => {
            state.visible = fieldState.value === 123
          })
        })
      }}
    >
      <FormItem
        label="AA"
        dataSource={[
          { label: '123', value: 123 },
          { label: '321', value: 321 }
        ]}
        name="aa"
        component={Select}
      />
      <FormItem label="BB" name="bb" component={Input} />
      <FormButtonGroup offset={5}>
        <Submit>查询</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 在 effects 中使用\$订阅生命周期
- 通过订阅 ON_FORM_INIT 在表单初始化时设置字段状态
- 通过订阅 ON_FIELD_VALUE_CHANGE 在字段值变化时设置字段状态

### 外部 UI 消费

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  LifeCycleTypes,
  createFormActions,
  FormProvider,
  FormSpy,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { merge } from 'rxjs'
import { Button } from 'antd'
import { Input, Select } from '@formily/antd-components' // 或者@formily/next-components
import 'antd/dist/antd.css'

const actions = createFormActions()

const App = () => {
  return (
    <FormProvider>
      <Form
        actions={actions}
        labelCol={5}
        wrapperCol={14}
        effects={($, { setFieldState }) => {
          $('customEvent').subscribe(() => {
            setFieldState('cc', state => {
              state.visible = !state.visible
            })
          })
        }}
      >
        <FormItem label="BB" name="bb" component={Input} />
        <FormItem label="CC" name="cc" component={Input} />
        <FormButtonGroup offset={5}>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
        <FormSpy
          initialState={{
            actions: []
          }}
          reducer={(state, action) => {
            return {
              actions: state.actions.concat(action)
            }
          }}
        >
          {({ state }) => {
            const { actions } = state
            return (
              <div>
                全量生命周期
                <div
                  style={{
                    margin: 20,
                    height: 100,
                    overflow: 'auto',
                    border: '1px solid red',
                    padding: 10
                  }}
                >
                  {(actions || []).map((action, key) => {
                    return <div key={key}>{action.type}</div>
                  })}
                </div>
              </div>
            )
          }}
        </FormSpy>
        <FormSpy
          selector="*(onFormChange,onFieldChange)"
          initialState={{
            actions: []
          }}
          reducer={(state, action) => {
            return {
              actions: state.actions.concat(action)
            }
          }}
        >
          {({ state }) => {
            const { actions } = state
            return (
              <div>
                指定生命周期
                <div
                  style={{
                    margin: 20,
                    height: 100,
                    overflow: 'auto',
                    border: '1px solid red',
                    padding: 10
                  }}
                >
                  {(actions || []).map((action, key) => {
                    return <div key={key}>{action.type}</div>
                  })}
                </div>
              </div>
            )
          }}
        </FormSpy>
      </Form>
      <FormSpy
        selector="customEvent"
        initialState={{
          actions: []
        }}
        reducer={(state, action) => {
          return {
            actions: state.actions.concat(action)
          }
        }}
      >
        {({ state }) => {
          const { actions } = state
          return (
            <div>
              指定生命周期
              <div
                style={{
                  margin: 20,
                  height: 100,
                  overflow: 'auto',
                  border: '1px solid red',
                  padding: 10
                }}
              >
                {(actions || []).map((action, key) => {
                  return <div key={key}>{action.type}</div>
                })}
              </div>
            </div>
          )
        }}
      </FormSpy>
      <FormButtonGroup align="center">
        <Button
          onClick={() => {
            actions.dispatch('customEvent')
          }}
        >
          自定义生命周期
        </Button>
      </FormButtonGroup>
    </FormProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 使用 FormSpy 可以监听 Form 的所有生命周期，同时它也提供了类似 redux 的 reducer API，我们可以借助 reducer 自己构建出各种符合业务述求的状态
- 使用 FormSpy 可以指定 selector 监听部分生命周期
- 使用 actions.dispatch 可以扩展表单生命周期，同时也可以借助 FormSpy 来消费，也可以在 effects 中消费，actions 调用必须先把 actions 传给 SchemaForm 进行握手，否则调用不会生效，只要握手成功，则可以在任意位置调用
- FormSpy 可以在 SchemaForm 外部监听 Form 生命周期，但是要求必须要使用 FormProvider

### 自定义组件消费

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  FormEffectHooks,
  useFormEffects,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { merge } from 'rxjs'
import { Input, Select } from '@formily/antd-components' // 或者@formily/next-components
import 'antd/dist/antd.css'

const { onFieldValueChange$, onFieldInit$ } = FormEffectHooks

const CostomComponent = () => {
  useFormEffects(($, { setFieldState }) => {
    setFieldState('aa', state => {
      state.value = 321
    })
    onFieldValueChange$('aa').subscribe(fieldState => {
      setFieldState('bb', state => {
        state.visible = fieldState.value === 123
      })
    })
  })
  return (
    <div>
      <FormItem
        label="AA"
        dataSource={[
          { label: '123', value: 123 },
          { label: '321', value: 321 }
        ]}
        name="aa"
        component={Select}
      />
      <FormItem label="BB" name="bb" component={Input} />
    </div>
  )
}

const App = () => {
  return (
    <Form labelCol={5} wrapperCol={14}>
      <CostomComponent />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 自定义组件内部使用 useFormEffects 可以订阅表单生命周期，需要注意一个地方，在 useFormEffects 内部无法监听 onFormInit 事件，因为组件渲染到自定义组件的时候，其实表单已经初始化，所以，如果我们需要做一些初始化操作，只需要在 useFormEffects 入参回调函数内直接写即可，这样代表当前自定义组件初始化时执行。
- 自定义组件内部可以使用纯源码开发模式，使用 FormItem 组件
