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
  FormGridCol,
  FormPath
} from './src/index'
import '@alifd/next/dist/next.css'

const { onFieldInputChange$, onFormChange$,onFormInit$ } = FormEffectHooks

export default () => (
  <SchemaForm
    onSubmit={values => {
      console.log('提交')
      console.log(values)
    }}
    validateFirst
    effects={({ setFieldState, getFormGraph }) => {
      onFieldInputChange$('array.*.aa').subscribe(({ value, name }) => {
        setFieldState(
          FormPath.transform(name, /\d/, $0 => `array.${$0}.bb`),
          state => {
            state.errors = value == '123' ? '联动错误' : ''
          }
        )
      })
      onFormInit$().subscribe(()=>{
        setFieldState('col1',state=>{
          state.visible = false
        })
      })
    }}
  >
    <FormGridRow>
      <FormGridCol name="col1" span={6}>
        <Field name="hello" type="string" title="Hello" />
      </FormGridCol>
      <FormGridCol span={6}>
        <Field name="hello2" type="string" title="Hello" />
      </FormGridCol>
    </FormGridRow>
    <FormButtonGroup>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </SchemaForm>
)
```
