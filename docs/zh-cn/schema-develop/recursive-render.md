# 实现递归渲染组件

递归渲染只有在 Schema 表单开发场景中才会存在，想要实现递归渲染，我们只需要借助`<SchemaField/>`组件即可快速实现递归渲染，当然，我们的递归渲染也会分为几类：

- 普通递归渲染
- 自增列表递归渲染
- 动态递归渲染

## 普通递归渲染

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  SchemaField,
  Submit,
  FormPath,
  FormButtonGroup
} from '@formily/antd'
import { Input } from '@formily/antd-components'
import Printer from '@formily/printer'
import { Checkbox } from 'antd'
import 'antd/dist/antd.css'

const transformOptions = (dataSource = [], path, currentValue = []) => {
  return dataSource.map(({ label, value, schema, ...others }, key) => {
    return (
      <div key={key}>
        <Checkbox {...others} value={value}>
          {label}
        </Checkbox>
        <div style={{ marginTop: 10 }}>
          {schema && currentValue.indexOf(value) > -1 && (
            <SchemaField
              path={FormPath.parse(path).parent()}
              schema={schema}
              onlyRenderProperties
            />
          )}
        </div>
      </div>
    )
  })
}

const DynamicCheckbox = ({ schema, value, path, mutators }) => {
  const props = schema.getExtendsComponentProps()
  const dataSource = schema.enum || []
  return (
    <Checkbox.Group
      {...props}
      value={value}
      onChange={(...args) => {
        mutators.change(...args)
      }}
    >
      {transformOptions(dataSource, path, value)}
    </Checkbox.Group>
  )
}

DynamicCheckbox.isFieldComponent = true

const App = () => {
  return (
    <Printer>
      <SchemaForm
        components={{
          Input,
          DynamicCheckbox
        }}
      >
        <Field
          name="aa"
          type="array"
          enum={[
            {
              label: '选项1',
              schema: {
                type: 'object',
                properties: {
                  bb: {
                    type: 'string',
                    title: '输入项1',
                    'x-component': 'Input'
                  },
                  cc: {
                    type: 'string',
                    title: '继续嵌套',
                    enum: [
                      {
                        label: '嵌套选项1',
                        value: '111',
                        schema: {
                          type: 'object',
                          properties: {
                            dd: {
                              type: 'string',
                              title: '输入项1',
                              'x-component': 'Input'
                            },
                            ee: {
                              type: 'string',
                              title: '输入项1',
                              'x-component': 'Input'
                            }
                          }
                        }
                      },
                      {
                        label: '嵌套选项2',
                        value: '222'
                      }
                    ],
                    'x-component': 'DynamicCheckbox'
                  }
                }
              },
              value: '111'
            },
            {
              label: '选项2',
              schema: {
                type: 'object',
                properties: {
                  ff: {
                    type: 'string',
                    title: '输入项2',
                    'x-component': 'Input'
                  }
                }
              },
              value: '222'
            }
          ]}
          x-component="DynamicCheckbox"
        />
        <FormButtonGroup>
          <Submit />
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

> 考虑到有些业务场景，交互述求是希望 UI 维度是可以做到下钻，但是后端数据层又希望数据层是扁平结构，所以我们可以考虑支持一个递归渲染组件

- 递归渲染，主要是使用 SchemaField 组件，需要注意的是，必须要传入 schema 对象和路径，如果只传路径，它会自动从顶层 json schema 去读
- 目前除了 schema.items/schema.properties 是可以用 SchemaMarkupField 来等价描述，但是对于用户自己扩展的递归属性(比如上面的 enum)，是没法通过 SchemaMarkupField 描述的，所以只能写纯 JSON

## 自增列表递归渲染

自增列表其实就是一种典型的递归渲染组件，想要实现一个自增列表其实也是比较简单，主要是借助 SchemaField 的递归渲染能力，同时借助 FieldAPI 的 mutators API 即可快速实现一个自增列表

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  SchemaField,
  Submit,
  FormPath,
  FormButtonGroup
} from '@formily/antd'
import { Input } from '@formily/antd-components'
import Printer from '@formily/printer'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const SelfIncList = ({ schema, value, path, mutators }) => {
  const props = schema.getExtendsComponentProps()
  const dataSource = schema.enum || []
  return (
    <>
      {value.map((_, key) => {
        return (
          <div key={key} style={{ display: 'flex' }}>
            <SchemaField
              path={FormPath.parse(path).concat(key)}
              schema={schema.items}
            />
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => {
                mutators.remove(key)
              }}
            >
              Remove
            </Button>
          </div>
        )
      })}
      <Button
        onClick={() => {
          mutators.push(schema.items.getEmptyValue())
        }}
      >
        Add
      </Button>
    </>
  )
}

SelfIncList.isFieldComponent = true

const App = () => {
  return (
    <Printer>
      <SchemaForm
        components={{
          Input,
          SelfIncList
        }}
        initialValues={{
          aa: [{}, {}]
        }}
      >
        <Field name="aa" type="array" x-component="SelfIncList">
          <Field type="object">
            <Field name="bb" title="输入项" type="string" x-component="Input" />
          </Field>
        </Field>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 动态递归渲染(混合开发)

动态递归渲染，相比前面两种递归渲染就会稍微复杂一些了，因为现实场景下，我们可能会遇到一种恶心场景，就是，一部分字段，需要前端去维护，但另外一部分字段，后端又希望动态去控制，那这就存在一个到底该如何支持这种混合开发模式了。

混合开发，我们推荐核心还是以 Schema 开发模式为主，静态字段可以借助 SchemaMarkupField 在前端维护，动态字段，我们就可以单独抽象一个自定义组件，然后在自定义组件中动态获取 JSON Schema 做递归渲染，这样就很轻松的达到了混合开发的目的了。

```jsx
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormSpy,
  SchemaField,
  FormEffectHooks,
  createControllerBox,
  createFormActions,
  FormPath
} from '@formily/antd'
import { Input, FormStep, FormLayout, FormCard } from '@formily/antd-components'
import { Button, Spin } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const actions = createFormActions()
const { onFormInit$ } = FormEffectHooks

const fetchSchema = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        type: 'object',
        properties: {
          'dynamic-1': {
            type: 'string',
            'x-component': 'input',
            title: '字段1'
          },
          'dynamic-2': {
            type: 'string',
            'x-component': 'input',
            title: '字段2'
          },
          'dynamic-3': {
            type: 'string',
            'x-component': 'input',
            title: '字段3'
          },
          'dynamic-4': {
            type: 'string',
            'x-component': 'input',
            title: '字段4'
          }
        }
      })
    }, 2000)
  })
}

const DynamicFields = createControllerBox('dynamics', ({ path }) => {
  const [schema, setSchema] = useState()

  useEffect(() => {
    fetchSchema().then(schema => {
      setSchema(schema)
    })
  }, [])

  if (!schema) {
    return (
      <div
        style={{
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <SchemaField
      path={FormPath.parse(path).parent()}
      schema={schema}
      onlyRenderProperties
    />
  )
})

const useBatchRequired = name => {
  const { setFieldState } = createFormActions()

  onFormInit$().subscribe(() => {
    setFieldState(name, state => {
      if (state.props.required === false) return
      state.required = true
    })
  })
}

const App = () => (
  <Printer>
    <SchemaForm
      components={{ Input, DynamicFields }}
      actions={actions}
      effects={() => {
        useBatchRequired('*')
      }}
    >
      <FormStep
        style={{ marginBottom: 20 }}
        dataSource={[
          { title: '步骤1', name: 'step-1' },
          { title: '步骤2', name: 'step-2' },
          { title: '步骤3', name: 'step-3' }
        ]}
      />
      <FormCard name="step-1" title="静态字段集">
        <FormLayout labelCol={8} wrapperCol={10}>
          <Field
            name="static-1"
            type="string"
            x-component="Input"
            title="字段1"
          />
          <Field
            name="static-2"
            type="string"
            x-component="Input"
            title="字段2"
          />
          <Field
            name="static-3"
            type="string"
            x-component="Input"
            title="字段3"
          />
          <Field
            name="static-4"
            type="string"
            x-component="Input"
            title="字段4"
          />
        </FormLayout>
      </FormCard>
      <FormCard name="step-2" title="动态字段集">
        <FormLayout labelCol={8} wrapperCol={10}>
          <DynamicFields />
        </FormLayout>
      </FormCard>
      <FormCard name="step-3" title="静态字段集">
        <FormLayout labelCol={8} wrapperCol={10}>
          <Field
            name="static-5"
            type="string"
            x-component="Input"
            title="字段5"
          />
          <Field
            name="static-6"
            type="string"
            x-component="Input"
            title="字段6"
          />
          <Field
            name="static-7"
            type="string"
            x-component="Input"
            title="字段7"
          />
          <Field
            name="static-8"
            type="string"
            x-component="Input"
            title="字段8"
          />
        </FormLayout>
      </FormCard>
      <FormSpy
        selector={FormStep.ON_FORM_STEP_CURRENT_CHANGE}
        initialState={{
          step: { value: 0 }
        }}
        reducer={(state, action) => {
          switch (action.type) {
            case FormStep.ON_FORM_STEP_CURRENT_CHANGE:
              return { ...state, step: action.payload }
            default:
              return { step: { value: 0 } }
          }
        }}
      >
        {({ state }) => {
          return (
            <FormButtonGroup align="center">
              <Button
                disabled={state.step.value === 0}
                onClick={() => {
                  actions.dispatch(FormStep.ON_FORM_STEP_PREVIOUS)
                }}
              >
                上一步
              </Button>
              <Button
                type={state.step.value == 2 ? 'primary' : undefined}
                onClick={() => {
                  if (state.step.value == 2) {
                    actions.submit()
                  } else {
                    actions.dispatch(FormStep.ON_FORM_STEP_NEXT)
                  }
                }}
              >
                {state.step.value == 2 ? '提交' : '下一步'}
              </Button>
              <Reset>重置</Reset>​
            </FormButtonGroup>
          )
        }}
      </FormSpy>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 以分步表单为例，我们定义了一个控制器组件(VirtualField)，可以拿到字段路径，同时不占用数据节点，借助SchemaField可以很方便的传入动态schema进行动态渲染
- 定义了useBatchRequired的EffectHook，可以批量给字段加必填
- 借助FormSpy可以监听分步组件内部事件，同时做状态映射