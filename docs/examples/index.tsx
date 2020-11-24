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
    effects: () => {
      // onFieldReact('aa', (field, form) => {
      //   field.setComponentProps({
      //     disabled: form.values.bb === '123'
      //   })
      // })
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
                    <Field
                      key={index}
                      name={`${index}.dd`}
                      component={['input']}
                    />
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
    </Formily>
  )
}
