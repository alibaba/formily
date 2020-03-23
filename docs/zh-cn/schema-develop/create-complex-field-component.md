# 实现超复杂自定义组件

超复杂自定义组件，往往是表单的某个模块的交互实在复杂，用 Formily 传统方案基本上无解，它的复杂度主要体现在：

- 可能存在字段集是动态字段，需要做动态递归渲染
- 字段集内部存在复杂联动
- 字段集需要做校验
- 交互复杂，布局复杂
- 需要考虑可复用，相当于一个业务模块，给其他人消费

那么，针对以上问题，为什么 Formily 的传统方案解决不了呢？主要有 2 点原因：

- Formily 推荐用户将所有联动都抽离到顶部 effects 中维护
- Formily 推荐每个自定义组件都是足够内聚的，尽量做到都是类似于 Input 这样的组件，只需要支持 value/onChange 即可

这样的原则针对以上提到的问题基本上完全不适用了，所以这就需要一种权衡，80%场景下，我们是推荐都按照 Formily 推荐的传统方案来实现表单，但是对于这 20%的场景，我们该如何解决呢？

将问题分解之后，我们针对不同需求，有不同解决方案，大家可以根据实际情况，自行组合使用：

- 在组件中使用 useFormEffects 实现局部联动

- 在组件中使用 FormItem 实现布局自由的表单开发

- 在组件中使用 SchemaField 实现动态递归渲染

## 综合案例

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
  useFormEffects,
  createControllerBox,
  createFormActions,
  FormItem,
  FormPath
} from '@formily/antd'
import {
  Input,
  FormStep,
  FormLayout,
  FormCard,
  Select
} from '@formily/antd-components'
import { Button, Spin } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const actions = createFormActions()
const { onFormInit$, onFieldValueChange$ } = FormEffectHooks

const fetchSchema = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        type: 'object',
        properties: {
          'dynamic-1': {
            type: 'string',
            'x-component': 'Select',
            enum: [
              { label: 'visible', value: true },
              { label: 'hidden', value: false }
            ],
            default: false,
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
    }, 500)
  })
}

const useBatchRequired = name => {
  const { setFieldState } = createFormActions()

  onFormInit$().subscribe(() => {
    setFieldState(name, state => {
      if (state.props.required === false) return
      state.required = true
    })
  })
}

const useLinkageVisible = (source, target) => {
  const { setFieldState } = createFormActions()

  onFieldValueChange$(source).subscribe(fieldState => {
    setFieldState(target, state => {
      state.visible = fieldState.value
    })
  })
}

const DynamicFields = ({ path, name }) => {
  const [schema, setSchema] = useState()

  useFormEffects(({ setFieldState }) => {
    // useBatchRequired(`${name}.*`) 这里使用该effect hook是不会生效，因为内部是监听的onFormInit，因为表单已经初始化，所以不会触发逻辑
    setFieldState(`${name}.*(dynamic-1,dynamic-2)`, state => {
      state.required = true
    })

    useLinkageVisible(`${name}.dynamic-1`, `${name}.*(!dynamic-1)`)
  })

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
    <>
      <SchemaField path={path} schema={schema} />
      <FormItem name={`${name}.static-1`} label="字段1" component={Input} />
      <FormItem name={`${name}.static-2`} label="字段2" component={Input} />
      <FormItem name={`${name}.static-3`} label="字段3" component={Input} />
    </>
  )
}

DynamicFields.isFieldComponent = true

const App = () => (
  <Printer>
    <SchemaForm
      components={{ Input, DynamicFields, Select }}
      actions={actions}
      effects={() => {
        useBatchRequired('step-1.*')
      }}
    >
      <FormStep
        style={{ marginBottom: 20 }}
        dataSource={[
          { title: '步骤1', name: 'step-1' },
          { title: '步骤2', name: 'step-2' }
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
        </FormLayout>
      </FormCard>
      <FormCard name="step-2" title="动态字段集">
        <FormLayout labelCol={8} wrapperCol={10}>
          <Field name="dynamics" type="object" x-component="DynamicFields" />
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
                type={state.step.value == 1 ? 'primary' : undefined}
                onClick={() => {
                  if (state.step.value == 1) {
                    actions.submit()
                  } else {
                    actions.dispatch(FormStep.ON_FORM_STEP_NEXT)
                  }
                }}
              >
                {state.step.value == 1 ? '提交' : '下一步'}
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

## 总结

以上例子比较综合复杂，它涵盖了自定义组件中如何使用 useFormEffects/FormItem/SchemaField，但是需要注意的是：

- useFormEffects 中写的联动，是具有全局效果的，所以，你完全可以在 A 组件内部隐式的控制 B、C、D...组件的联动，这样在一定程度上是可以提高开发效率，但是也容易埋坑，如果一个项目是多人协作，对方是完全不知道你的组件到底做了什么，所以，我们要尽可能的做到，在 useFormEffects 内写的联动逻辑，只是与组件内部字段相关的，同时要多关注，组件内部和外部是否存在联动冲突问题
- FormItem 组件，name 属性必须传完整路径，因为 FormItem 组件与 SchemaForm 是共享上下文的，所以可以享受到 labelCol/wraperCol 的批量控制效果
- 注意，用于递归渲染的SchemaField组件必须要传schema对象，否则会存在子字段读取schema失效的风险问题。