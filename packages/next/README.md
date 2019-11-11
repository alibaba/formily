# @uform/next

> UForm Fusion Next 组件插件包

```jsx
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  FormEffectHooks,
  createFormActions,
  FormGridRow,
  FormItemGrid,
  FormGridCol,
  FormPath,
  FormLayout,
  FormBlock,
  FormCard,
  FormTextBox,
  FormStep
} from './src/index'
import { Button } from '@alifd/next'
import '@alifd/next/dist/next.css'

const { onFormInit$ } = FormEffectHooks

const actions = createFormActions()

export default () => (
  <SchemaForm
    onSubmit={values => {
      console.log('提交')
      console.log(values)
    }}
    actions={actions}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 6 }}
    validateFirst
    effects={({ setFieldState, getFormGraph }) => {
      onFormInit$().subscribe(() => {
        setFieldState('col1', state => {
          state.visible = false
        })
      })
      FormStep.useEffects(['step-1', 'step-2', 'step-3'])
    }}
  >
    <FormStep
      style={{ marginBottom: 20 }}
      dataSource={[
        { title: '基本信息' },
        { title: '财务信息' },
        { title: '条款信息' }
      ]}
    />
    <FormCard name="step-1" title="基本信息">
      <Field name="a1" required title="A1" type="string" />
    </FormCard>
    <FormCard name="step-2" title="财务信息">
      <Field name="a2" required title="A2" type="string" />
    </FormCard>
    <FormCard name="step-3" title="条款信息">
      <Field name="a3" required title="A3" type="string" />
    </FormCard>
    <FormButtonGroup>
      <Submit>提交</Submit>
      <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_PREVIOUS)}>
        上一步
      </Button>
      <Button onClick={() => actions.dispatch(FormStep.ON_FORM_STEP_NEXT)}>
        下一步
      </Button>
    </FormButtonGroup>
  </SchemaForm>
)
```
