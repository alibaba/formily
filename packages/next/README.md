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
  FormTextBox
} from './src/index'
import '@alifd/next/dist/next.css'

const { onFormInit$ } = FormEffectHooks

export default () => (
  <SchemaForm
    onSubmit={values => {
      console.log('提交')
      console.log(values)
    }}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 6 }}
    validateFirst
    effects={({ setFieldState, getFormGraph }) => {
      onFormInit$().subscribe(() => {
        setFieldState('col1', state => {
          state.visible = false
        })
      })
    }}
  >
    <FormCard title="详细信息">
      <FormItemGrid title="字段3" gutter={10} cols={[11, 15]}>
        ​<Field name="ddd" type="number" />
        ​<Field name="eee" type="date" />​
      </FormItemGrid>
      <Field type="object" name="mmm" title="对象字段">
        <FormItemGrid gutter={10} cols={[11, 15]}>
          ​<Field name="ddd1" default={123} type="number" />
          ​<Field name="[startDate,endDate]" type="daterange" />​
        </FormItemGrid>
      </Field>
      <FormLayout labelCol={8} wrapperCol={16}>
        <FormTextBox
          title="文本串联"
          text="订%s元/票 退%s元/票 改%s元/票"
          gutter={8}
        >
          <Field
            type="string"
            default={10}
            required
            name="aa1"
            x-props={{ style: { width: 80 } }}
            description="简单描述"
          />
          <Field
            type="number"
            default={20}
            required
            name="aa2"
            description="简单描述"
          />
          <Field
            type="number"
            default={30}
            required
            name="aa3"
            description="简单描述"
          />
        </FormTextBox>
      </FormLayout>
      <Field name="aas" type="string" title="字段4" />​<FormBlock title="区块">
        <Field name="ddd2" type="string" title="字段5" />​
        <Field name="eee2" type="string" title="字段6" />​
      </FormBlock>
    </FormCard>
    ​<FormGridRow>
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
