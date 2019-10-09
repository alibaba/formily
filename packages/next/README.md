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
  FormPath
} from './src/index'
import '@alifd/next/dist/next.css'

const { onFieldInputChange$ } = FormEffectHooks

export default () => (
  <SchemaForm
    onSubmit={console.log}
    effects={({ getFormSchema }) => {
      onFieldInputChange$('array.*.aa').subscribe(({ value, name }) => {
        console.log(getFormSchema())
      })
    }}
  >
    <Field
      name="array"
      type="array"
      x-component-props={{ title: 'Card List', renderAddition: '添加' }}
    >
      <Field type="object">
        <Field
          type="string"
          required
          name="aa"
          title="AA"
          x-item-props={{ triggerType: 'onBlur' }}
        />
        <Field type="string" required name="bb" title="BB" />
      </Field>
    </Field>
    <FormButtonGroup>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </SchemaForm>
)
```
