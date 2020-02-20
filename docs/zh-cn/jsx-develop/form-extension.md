# 理解表单扩展机制

纯源码开发的扩展机制，主要有：

- 扩展 FormItem 渲染组件
- 扩展校验模型(规则、文案、模板引擎)
- 扩展生命周期
- 扩展 Effect Hook
- 扩展状态(FormState/FieldState/VirtualFieldState)

## 扩展 FormItem 组件

FormItem 组件扩展，其实就是 FormItem 组件上的 component 属性，我们只需要传一个符合 value/onChange 规范的组件给 FormItem 即可，当然，如果我们使用的是别人的组件，而且组件也不支持 value/onChange 这个规范，那么我们有两种方式适配

- FormItem 组件上传 eventName/valueName/getValueFromEvent 做适配
- 使用 connect API 包装组件

目前@formily/antd-components 和@formily/next-components 里的组件都是默认包装好的，因为它还做了一些高级适配

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem, FormButtonGroup, Reset, connect } from '@formily/antd'
import { Input } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const MyComponent1 = ({ value, onChange }) => {
  return (
    <div>
      {value}
      <Button
        onClick={() => {
          onChange('this is inner value')
        }}
      >
        Click
      </Button>
    </div>
  )
}

const MyComponent2 = ({ customValue, onInput }) => {
  return (
    <div>
      {customValue}
      <Button
        onClick={() => {
          onInput('this is inner value')
        }}
      >
        Click
      </Button>
    </div>
  )
}

const MyComponent3 = connect({
  eventName: 'onInput',
  valueName: 'customValue'
})(({ customValue, onInput }) => {
  return (
    <div>
      {customValue}
      <Button
        onClick={() => {
          onInput('this is inner value')
        }}
      >
        Click
      </Button>
    </div>
  )
})

const App = () => {
  const [value, setValue] = useState({
    aa: 'first render value'
  })
  return (
    <Form initialValues={value}>
      <FormItem name="aa" component={MyComponent1} />
      <FormItem
        name="bb"
        eventName="onInput"
        valueName="customValue"
        component={MyComponent2}
      />
      <FormItem name="cc" component={MyComponent3} />
    </Form>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

## 扩展校验模型

这里主要是扩展文案，规则，校验消息模板引擎

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormPath,
  setValidationLocale,
  registerValidationRules,
  registerValidationFormats,
  registerValidationMTEngine
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components'
import 'antd/dist/antd.css'

setValidationLocale({
  zh: {
    required: '这是定制必填文案',
    custom_format: '必须是数字  <% injectVar %>'
  }
})

registerValidationMTEngine((message, context) => {
  return message.replace(/\<\%\s*([\w.]+)\s*\%\>/g, (_, $0) => {
    return FormPath.getIn(context, $0)
  })
})

registerValidationRules({
  customRule: value => {
    return value == '123' ? '不能等于123' : ''
  }
})

registerValidationFormats({
  custom_format: /^\d+$/
})

const App = () => {
  const [value, setValue] = useState({})
  return (
    <Form
      onChange={values => {
        setValue(values)
      }}
    >
      <FormItem
        required
        name="name"
        label="Name"
        component={Input}
        rules={{
          customRule: true,
          format: 'custom_format',
          injectVar: '注入变量'
        }}
      />
      {JSON.stringify(value, null, 2)}
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 扩展生命周期

扩展生命周期很简单，其实只需要调用 actions.dispatch 一个自定义事件即可，我们在生命周期章节内有具体案例

## 扩展 Effect Hook

我们在扩展联动协议的时候，其实已经涉及到了扩展 Effect Hook，Effect Hook 其实就像 React Hook 一样，它是一个逻辑复用方案
想要实现一个 Effect Hook，我们可能会使用到以下 API：

- FormEffectHooks 使用现成生命周期 Hook
- createEffectHook 创建扩展生命周期 Hook
- createFormActions，获取上下文中的 actions

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormEffectHooks,
  createEffectHook,
  createFormActions
} from '@formily/antd' // 或者 @formily/next
import { Input, Select } from '@formily/antd-components'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const customEvent$ = createEffectHook('custom_event')

const useMyEffect = () => {
  const { setFieldState } = createFormActions() //局部actions，它会继承全局actions
  onFieldValueChange$('aa').subscribe(({ value }) => {
    setFieldState('bb', state => {
      state.visible = value
    })
  })
  customEvent$().subscribe(() => {
    setFieldState('bb', state => {
      state.visible = !state.visible
    })
  })
}

const actions = createFormActions()

const App = () => {
  return (
    <Form
      actions={actions}
      effects={() => {
        useMyEffect()
      }}
    >
      <FormItem
        name="aa"
        label="AA"
        component={Select}
        dataSource={[
          { label: 'Visible', value: true },
          { label: 'Hidden', value: false }
        ]}
      />
      <FormItem name="bb" label="BB" component={Input} />
      <Button
        onClick={() => {
          actions.dispatch('custom_event')
        }}
      >
        Click
      </Button>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- createFormActions 在 effects 内部调用，会继承全局 actions，如果在外部调用，则会创建唯一实例
- createEffectHook 可以创建一个自定义事件的订阅器，只能在 effects 内部使用

## 扩展状态

扩展状态，其实就是在业务逻辑处理过程中，可能需要往 FormState 或者 FieldState 中挂状态，方便读取，也不需要自己维护状态

我们扩展状态的方式主要有以下几种：

- 直接调用 actions.setFormState/actions.setFieldState 设置状态，这种方式主要在 Form 组件外部调用，在 effects 里消费
- 使用 useFormState/useFieldState 设置状态，这种方式主要在自定义组件内部使用，使用这两个 API，我们可以将状态挂在 FormGraph 里，这样就能统一走 FormGraph 对其做时间旅行操作

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormEffectHooks,
  useFieldState,
  useFormState,
  createFormActions,
  FormButtonGroup
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const { onFieldChange$, onFormChange$ } = FormEffectHooks

const actions = createFormActions()

const MyComponent = () => {
  const [state, setFieldState] = useFieldState({
    extendState: 'innerState'
  })
  const [formState, setFormState] = useFormState({
    extendState: 'innerState'
  })
  return (
    <div>
      <FormButtonGroup>
        <Button
          onClick={() => {
            setFieldState({
              extendState: Math.random() * 1000 + ''
            })
          }}
        >
          Change Current Field State
        </Button>
        <Button
          onClick={() => {
            setFormState({
              extendState: Math.random() * 1000 + ''
            })
          }}
        >
          Change Form State
        </Button>
      </FormButtonGroup>
      <div>
        Current Field State:
        {state.extendState}
      </div>
      <div>
        Form State:
        {formState.extendState}
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Form
      actions={actions}
      effects={({ hasChanged, setFieldState }) => {
        onFormChange$().subscribe(formState => {
          if (hasChanged(formState, 'extendState')) {
            setFieldState('aa', state => {
              state.value = formState.extendState
            })
          }
        })
        onFieldChange$('aa').subscribe(fieldState => {
          if (hasChanged(fieldState, 'extendState')) {
            setFieldState('aa', state => {
              state.value = fieldState.extendState
            })
          }
        })
      }}
    >
      <FormItem name="aa" label="AA" component={Input} />
      <FormItem name="bb" label="BB" component={MyComponent} />
      <FormButtonGroup>
        <Button
          onClick={() => {
            actions.setFieldState('aa', state => {
              state.extendState = 'this is extend field state'
            })
          }}
        >
          Change Field State
        </Button>
        <Button
          onClick={() => {
            actions.setFormState(state => {
              state.extendState = 'this is extend form state'
            })
          }}
        >
          Change Form State
        </Button>
      </FormButtonGroup>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
