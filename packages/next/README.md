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

const { onFieldInputChange$, onFormChange$ } = FormEffectHooks

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
        <Field
          type="string"
          name="bb"
          title="BB"
          x-rules={[
            {
              format: 'url',
              required: true,
              validator: async value => {
                await new Promise(resolve => {
                  setTimeout(() => {
                    resolve()
                  }, 1000)
                })
                return value == '123' ? '异步校验失败' : ''
              }
            },
            {
              validator(value) {
                return value === '//baidu.com'
                  ? { type: 'warning', message: '百度可能会窃取您的数据' }
                  : ''
              }
            }
          ]}
        />
      </Field>
    </Field>
    <FormButtonGroup>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </SchemaForm>
)
```
