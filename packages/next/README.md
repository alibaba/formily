# @uform/next

> UForm Fusion Next 组件插件包

```jsx
import { SchemaForm, Field, FormButtonGroup, Submit } from './src/index'
import '@alifd/next/dist/next.css'
export default () => (
  <SchemaForm onSubmit={console.log}>
    <Field name="array" type="array" x-component-props={{ title: 'Card List' }}>
      <Field type="object">
        <Field type="string" required name="aa" title="AA" />
        <Field type="string" required name="bb" title="BB" />
      </Field>
    </Field>
    <FormButtonGroup>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </SchemaForm>
)
```
