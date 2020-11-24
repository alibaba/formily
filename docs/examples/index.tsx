import React from 'react'
import {
  Formily,
  Field,
  ArrayField,
  FormSpy,
  onFieldReact,
  useForm
} from '@formily/react'

export default () => {
  const form = useForm({
    pattern: 'disabled',
    effects: () => {
      onFieldReact('aa.cc.*.dd', field => {
        field.setComponentProps({
          disabled: field.getArraySibling(field.index, 'ee')?.value === '123'
        })
      })
    }
  })
  return (
    <Formily form={form}>
      <Field name="bb" component={['input']} />
      <Field name="aa">
        <ArrayField name="cc">
          {field => {
            const value = field.value || []
            return (
              <div>
                {value.map((_, index) => {
                  return (
                    <div key={index}>
                      <Field name={`${index}.dd`} component={['input']} />
                      <Field name={`${index}.ee`} component={['input']} />
                    </div>
                  )
                })}
                <button
                  onClick={() => {
                    field.push({})
                  }}
                >
                  添加
                </button>
              </div>
            )
          }}
        </ArrayField>
      </Field>
      <FormSpy>
        {form => {
          return JSON.stringify(form.query('aa')?.value)
        }}
      </FormSpy>
      <button
        onClick={() => {
          form.submit(console.log)
        }}
      >
        提交
      </button>
      <button
        onClick={() => {
          form.setPattern('editable')
        }}
      >
        编辑
      </button>
      <button
        onClick={() => {
          form.setPattern('disabled')
        }}
      >
        禁用
      </button>
    </Formily>
  )
}
