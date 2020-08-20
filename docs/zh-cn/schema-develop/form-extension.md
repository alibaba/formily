# 理解表单扩展机制

Schema 模式开发表单与纯源码开发表单不一样的地方主要就是 Schema 模式它是一个黑盒，想要定制，必须要通过扩展 API 去定制，所以这既是它的优点，也是它的缺点：

- 优点：内置了很多便捷化方案，研发效率较高
- 缺点，内部概念较多，学习成本较高

所以，我们选择哪种开发模式，还是得基于自己当前的业务述求出发。

下面主要讲讲 Formily SchemaForm 的扩展机制，目前我们提供的扩展口子主要有：

- 扩展 Form UI 组件
- 扩展 FormItem UI 组件
- 扩展 Field 组件
- 扩展 VirtualField 组件
- 扩展校验模型(规则、文案、模板引擎)
- 扩展联动协议
- 扩展生命周期
- 扩展 Effect Hook
- 扩展状态(FormState/FieldState/VirtualFieldState)

## 扩展 Form UI 组件

如果我们使用的是@formily/antd 或者 @firmily/next 这样的包，其实我们默认已经给您注册了 Form UI 组件，当然，您也可以自己覆盖。
我们的扩展方式主要有两种：

- 全局注册方式
- 实例注册方式

实例注册优先级要比全局注册高

**全局注册方式**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  registerFormComponent
} from '@formily/antd' // 或者 @formily/next
import { Input } from 'antd'
import 'antd/dist/antd.css'

registerFormComponent(props => {
  return <div>全局扩展Form组件{props.children}</div>
})

const App = () => {
  return (
    <SchemaForm
      components={{ Input }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <Field type="string" name="name" title="Name" x-component="Input" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**实例注册方式**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd' // 或者 @formily/next
import { Input } from 'antd'
import 'antd/dist/antd.css'

const formComponent = props => {
  return <div>实例级扩展Form组件{props.children}</div>
}

const App = () => {
  return (
    <SchemaForm
      formComponent={formComponent}
      components={{ Input }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <Field type="string" name="name" title="Name" x-component="Input" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 扩展 FormItem UI 组件

如果我们使用的是@formily/antd 或者 @firmily/next 这样的包，其实我们默认已经给您注册了 Form Item UI 组件，当然，您也可以自己覆盖。
我们的扩展方式主要有两种：

- 全局注册方式
- 实例注册方式

实例注册优先级要比全局注册高

**全局注册方式**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  registerFormItemComponent
} from '@formily/antd' // 或者 @formily/next
import { Input } from 'antd'
import 'antd/dist/antd.css'

registerFormItemComponent(props => {
  return <div>全局扩展FormItem组件{props.children}</div>
})

const App = () => {
  return (
    <SchemaForm
      components={{ Input }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <Field type="string" name="name" title="Name" x-component="Input" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**实例注册方式**

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd' // 或者 @formily/next
import { Input } from 'antd'
import 'antd/dist/antd.css'

const formItemComponent = props => {
  return <div>实例级扩展FormItem组件{props.children}</div>
}

const App = () => {
  return (
    <SchemaForm
      formItemComponent={formItemComponent}
      components={{ Input }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <Field type="string" name="name" title="Name" x-component="Input" />
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 扩展 Field 组件

扩展 Schema Field 组件可以说是我们平时用的最多的扩展方案，主要是用于扩展具体字段 UI 组件，目前我们提供的扩展方式主要有：

- SchemaForm 中传入 components 扩展(要求组件满足 value/onChange API)
- SchemaForm 中传入 components 组件拥有 isFieldComponent 静态属性，可以拿到 FieldProps, 获取更多内容，则可以通过 useSchemaProps 方法
- registerFormField 全局注册扩展组件，要求传入组件名和具体组件，同时，如果针对满足 value/onChange 的组件，需要用 connect 包装，不包装，需要手动同步状态(借助 mutators)
- registerFormFields 全局批量注册扩展组件，同时，如果针对满足 value/onChange 的组件，需要用 connect 包装，不包装，需要手动同步状态(借助 mutators)

**components 实例扩展**

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field, useSchemaProps } from '@formily/antd' // 或者 @formily/next
import 'antd/dist/antd.css'

const CustomComponent = props => {
  return (
    <input
      value={props.value || ''}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}

const CustomFieldComponent = props => {
  const schemaProps = useSchemaProps()
  return (
    <input
      value={props.value || ''}
      onChange={e => props.mutators.change(e.target.value)}
    />
  )
}

CustomFieldComponent.isFieldComponent = true

const App = () => {
  const [value, setValue] = useState({})
  return (
    <SchemaForm
      components={{ CustomComponent, CustomFieldComponent }}
      onChange={values => {
        setValue(values)
      }}
    >
      <Field
        type="string"
        name="name"
        title="Name"
        x-component="CustomComponent"
      />
      <Field
        type="string"
        name="lastName"
        title="Last Name"
        x-component="CustomFieldComponent"
      />
      {JSON.stringify(value, null, 2)}
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**registerFormField 全局扩展**

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  registerFormField,
  connect
} from '@formily/antd' // 或者 @formily/next
import 'antd/dist/antd.css'

const CustomComponent = props => {
  return (
    <input
      value={props.value || ''}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}

registerFormField('CustomComponent2', connect()(CustomComponent))

const App = () => {
  const [value, setValue] = useState({})
  return (
    <SchemaForm
      onChange={values => {
        setValue(values)
      }}
    >
      <Field
        type="string"
        name="name"
        title="Name"
        x-component="CustomComponent2"
      />
      {JSON.stringify(value, null, 2)}
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**registerFormFields 全局批量扩展**

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  registerFormFields,
  connect
} from '@formily/antd' // 或者 @formily/next
import 'antd/dist/antd.css'

const CustomComponent = props => {
  return (
    <input
      value={props.value || ''}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}

registerFormFields({ CustomComponent3: connect()(CustomComponent) })

const App = () => {
  const [value, setValue] = useState({})
  return (
    <SchemaForm
      onChange={values => {
        setValue(values)
      }}
    >
      <Field
        type="string"
        name="name"
        title="Name"
        x-component="CustomComponent3"
      />
      {JSON.stringify(value, null, 2)}
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 扩展 VirtualField 组件

扩展 Schema VirtualField 组件，其实就是扩展布局组件，我们的扩展方式主要有：

- SchemaForm 中传入 components 只要组件拥有 isVirtualFieldComponent 静态属性，那么会被当做虚拟组件，同时组件属性可以拿到 VirtualFieldProps

- 通过 isVirtualFieldComponent (推荐)

- registerVirtualBox 全局扩展

- createVirtualBox 全局扩展

- createControllerBox 全局扩展


**通过 isVirtualFieldComponent (推荐)**

通过 `isVirtualFieldComponent` 声明为 `VirtualBox`，可以通过 `useSchemaProps` 拿到完整上下文内容。

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useSchemaProps,
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components'
import 'antd/dist/antd.css'

const CustomLayout = (props) => {
  const { children } = props
  const schemaProps = useSchemaProps()
  return <div style={{ border: '1px solid red', padding: 10 }}>
    {children}
  </div>
}

CustomLayout.isVirtualFieldComponent = true

const App = () => {
  return (
    <SchemaForm
      components={{
        Input,
        CustomLayout,
      }}
    >
      <Field
        x-component="CustomLayout"
        type="object"
      >
        <Field name="name" title="Name" x-component="Input" />
      </Field>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


**registerVirtualBox 全局扩展**

最原始的布局组件扩展方式，扩展完组件之后，布局组件使用方式与正常 Field 使用方式一样,扩展组件内部也能拿到完整的 FieldProps

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  registerFormFields,
  connect,
  registerVirtualBox
} from '@formily/antd' // 或者 @formily/next
import 'antd/dist/antd.css'

const CustomComponent = props => {
  return (
    <input
      value={props.value || ''}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}

const InstanceLayoutComponent = ({ children }) => {
  return <div>实例级布局组件{children}</div>
}

InstanceLayoutComponent.isVirtualFieldComponent = true

registerFormFields({ CustomComponent3: connect()(CustomComponent) })

registerVirtualBox('CustomLayout', ({ children, schema }) => {
  return (
    <div style={{ border: '1px solid red', padding: 10 }}>
      {children}
      {schema['x-component-props']['say']}
    </div>
  )
})

const App = () => {
  const [value, setValue] = useState({})
  return (
    <SchemaForm
      onChange={values => {
        setValue(values)
      }}
      components={{
        InstanceLayoutComponent
      }}
    >
      <Field
        type="object"
        name="instance-layout"
        x-component="InstanceLayoutComponent"
      >
        <Field
          type="object"
          name="layout"
          x-component="CustomLayout"
          x-component-props={{
            say: 'hello'
          }}
        >
          <Field
            type="string"
            name="name"
            title="Name"
            x-component="CustomComponent3"
          />
        </Field>
      </Field>
      {JSON.stringify(value, null, 2)}
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**createVirtualBox 全局扩展**

其实内部同样是使用 registerVirtualBox 来注册的，只是它会更具语义化，需要注意一点，如果是使用 createVirtualBox，在返回的组件中传入的属性，会自动映射到 Schema 的 x-component-props 上，扩展组件内部也只能拿到 x-component-props，拿不到 FieldProps

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createVirtualBox,
  registerFormFields,
  connect
} from '@formily/antd' // 或者 @formily/next
import 'antd/dist/antd.css'

const CustomComponent = props => {
  return (
    <input
      value={props.value || ''}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}

const CustomLayout2 = createVirtualBox('CustomLayout2', ({ children, say }) => {
  return (
    <div style={{ border: '1px solid red', padding: 10 }}>
      {children}
      {say}
    </div>
  )
})

registerFormFields({ CustomComponent3: connect()(CustomComponent) })

const App = () => {
  const [value, setValue] = useState({})
  return (
    <SchemaForm
      onChange={values => {
        setValue(values)
      }}
    >
      <CustomLayout2 say="hello">
        <Field
          type="string"
          name="name"
          title="Name"
          x-component="CustomComponent3"
        />
      </CustomLayout2>
      {JSON.stringify(value, null, 2)}
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**createControllerBox 全局扩展**

与 createVirtualBox 一样，可以创建出语义化组件，但是扩展组件内部可以拿到 FieldProps，所以可以实现出一些更复杂的布局组件

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createControllerBox
} from '@formily/antd' // 或者 @formily/next
import 'antd/dist/antd.css'

const CustomComponent = props => {
  return (
    <input
      value={props.value || ''}
      onChange={e => props.onChange(e.target.value)}
    />
  )
}

const CustomLayout3 = createControllerBox(
  'CustomLayout3',
  ({ children, schema }) => {
    return (
      <div style={{ border: '1px solid red', padding: 10 }}>
        {children}
        {schema['x-component-props']['say']}
      </div>
    )
  }
)

registerFormFields({ CustomComponent3: connect()(CustomComponent) })

const App = () => {
  const [value, setValue] = useState({})
  return (
    <SchemaForm
      onChange={values => {
        setValue(values)
      }}
    >
      <CustomLayout3 say="hello">
        <Field
          type="string"
          name="name"
          title="Name"
          x-component="CustomComponent3"
        />
      </CustomLayout3>
      {JSON.stringify(value, null, 2)}
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 扩展校验模型

这里主要是扩展文案，规则，校验消息模板引擎

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
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
    <SchemaForm
      components={{ Input }}
      onChange={values => {
        setValue(values)
      }}
    >
      <Field
        type="string"
        required
        name="name"
        title="Name"
        x-component="Input"
        x-rules={{
          customRule: true,
          format: 'custom_format',
          injectVar: '注入变量'
        }}
      />
      {JSON.stringify(value, null, 2)}
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 扩展联动协议

联动协议，我们之前在理解 Form Schema 中有提到，目前 Formily 内置了

- value:visible
- value:schema
- value:state
  3 种类型的联动协议，我们现在可以试着扩展一个 value:disabled，用于联动控制其他字段是否被禁用

```tsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, useValueLinkageEffect } from '@formily/antd' // 或者 @formily/next
import { Input, Select } from '@formily/antd-components'
import 'antd/dist/antd.css'

const useValueDisabledLinkageEffect = () => {
  useValueLinkageEffect({
    type: 'value:disabled',
    resolve: ({ target }, { setFieldState }) => {
      setFieldState(target, innerState => {
        innerState.props['x-component-props'] = {
          disabled: true
        }
      })
    },
    reject: ({ target }, { setFieldState }) => {
      setFieldState(target, innerState => {
        innerState.props['x-component-props'] = {
          disabled: false
        }
      })
    }
  })
}

const App = () => {
  const [value, setValue] = useState({})
  return (
    <SchemaForm
      components={{ Input, Select }}
      effects={() => {
        useValueDisabledLinkageEffect()
      }}
      schema={{
        type: 'object',
        properties: {
          aa: {
            type: 'string',
            enum: [
              { label: 'Disabled', value: true },
              { label: 'Undisabled', value: false }
            ],
            default: true,
            'x-linkages': [
              {
                type: 'value:disabled',
                condition: '{{ !!$self.value }}',
                target: 'bb'
              }
            ],
            'x-component': 'Select'
          },
          bb: {
            type: 'string',
            'x-component': 'Input'
          }
        }
      }}
      onChange={values => {
        setValue(values)
      }}
    >
      {JSON.stringify(value, null, 2)}
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 使用 useValueLinkageEffect 创建了一个 Effect Hook，在 effects 中注入即可注册联动协议
- useValueLinkageEffect 需要传入一个协议类型，同时需要传入条件满足的 resolve 回调和条件不满足的 reject 回调

## 扩展生命周期

扩展生命周期很简单，其实只需要调用 actions.dispatch 一个自定义事件即可，我们在生命周期章节内有具体案例

## 扩展 Effect Hook

我们在扩展联动协议的时候，其实已经涉及到了扩展 Effect Hook，Effect Hook 其实就像 React Hook 一样，它是一个逻辑复用方案
想要实现一个 Effect Hook，我们可能会使用到以下 API：

- FormEffectHooks 使用现成生命周期 Hook
- createEffectHook 创建扩展生命周期 Hook
- createFormActions，获取上下文中的 actions

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
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
    <SchemaForm
      actions={actions}
      components={{ Input, Select }}
      effects={() => {
        useMyEffect()
      }}
    >
      <Field
        type="string"
        name="aa"
        title="AA"
        x-component="Select"
        enum={[
          { label: 'Visible', value: true },
          { label: 'Hidden', value: false }
        ]}
      />
      <Field type="string" name="bb" title="BB" x-component="Input" />
      <Button
        onClick={() => {
          actions.dispatch('custom_event')
        }}
      >
        Click
      </Button>
    </SchemaForm>
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
  SchemaForm,
  SchemaMarkupField as Field,
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
    <SchemaForm
      actions={actions}
      components={{ Input, MyComponent }}
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
      <Field type="string" name="aa" title="AA" x-component="Input" />
      <Field type="string" name="bb" title="BB" x-component="MyComponent" />
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
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
