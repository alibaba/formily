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
    <div>
      <SchemaField path={path} schema={schema} />
      <FormItem name={`${name}.static-3`} label="字段3" component={Input} />
    </div>
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
        </FormLayout>
      </FormCard>
      <FormCard name="step-2" title="动态字段集">
        <FormLayout labelCol={8} wrapperCol={10}>
          <Field name="dynamics" type="object" x-component="DynamicFields" />
        </FormLayout>
      </FormCard>
      <FormCard name="step-3" title="静态字段集">
        <FormLayout labelCol={8} wrapperCol={10}>
          <Field
            name="static-13"
            type="string"
            x-component="Input"
            title="字段1"
          />
          <Field
            name="static-23"
            type="string"
            x-component="Input"
            title="字段2"
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
                type={state.step.value == 1 ? 'primary' : undefined}
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
