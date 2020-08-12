```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormEffects,
  FormEffectHooks,
  FormPath,
  createVirtualBox,
  createFormActions
} from '@formily/antd'
import { Radio, Input, ArrayCards } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldInputChange$ } = FormEffectHooks

const actions = createFormActions()

const ReuseLogic = createVirtualBox('ReuseLogic', props => {
  useFormEffects(($, { setFieldState }) => {
    setFieldState('array.*.visible', state => {
      state.value = state.value === undefined ? false : state.value
    })
    onFieldInputChange$('array.*.visible').subscribe(fieldState => {
      setFieldState(
        FormPath.transform(fieldState.name, /\d/, $1 => `array.${$1}.bb`),
        state => {
          state.visible = fieldState.value === true
        }
      )
    })
  })

  return <React.Fragment>{props.children}</React.Fragment>
})

const UserList = () => {
  return (
    <ReuseLogic>
      <Field
        title="列表"
        name="array"
        maxItems={3}
        type="array"
        x-component="ArrayCards"
        default={[{ visible: true }, { visible: true }]}
      >
        <Field type="object">
          <Field
            name="visible"
            x-component="RadioGroup"
            title="显示/隐藏"
            enum={[
              { label: '显示', value: true },
              { label: '隐藏', value: false }
            ]}
          />
          <Field name="bb" x-component="Input" title="BB" />
        </Field>
      </Field>
    </ReuseLogic>
  )
}

// 点击setFormState的button之后，修改1.列表为隐藏，然后删掉1，会发现异常
const App = () => {
  return (
    // <Printer>
    <SchemaForm
      components={{ ArrayCards, RadioGroup: Radio.Group, Input }}
      actions={actions}
    >
      <UserList />
      <button
        onClick={() => {
          actions.setFormState(state => {
            state.values = {
              array: [{ visible: true }, { visible: true }]
            }
          })
        }}
      >
        setFormState
      </button>
    </SchemaForm>
    // </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```
