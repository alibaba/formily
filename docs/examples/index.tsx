import React from 'react'
import {
  Formily,
  Field,
  useField,
  ArrayField,
  FormSpy,
  onFieldReact,
  useForm
} from '@formily/react'

const FormItem = props => {
  const field = useField()
  return (
    <div>
      {props.children}
      {field.errors?.map(err => err.messages.join(',')).join(',')}
    </div>
  )
}

export default () => {
  const form = useForm({
    pattern: 'disabled',
    middlewares: [
      state => {
        return {
          ...state,
          decorator: [FormItem]
        }
      }
    ],
    effects: () => {
      onFieldReact('aa.cc.*.dd', field => {
        const value = field.query('.ee').get(field => field.value)
        field.setPattern(value === '123' ? 'disabled' : 'editable')
      })
    }
  })
  return (
    <Formily form={form}>
      <Field name="bb" required component={['input']} validator="url" />
      <Field name="kk" required component={['input']} />
      <Field name="aa">
        <ArrayField name="cc">
          {field => {
            const value = field.value || []
            return (
              <div>
                {value.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <Field
                        name={`${index}.dd`}
                        required
                        component={['input']}
                      />
                      <Field name={`${index}.ee`} component={['input']} />
                      <button
                        onClick={() => {
                          field.moveUp(index)
                        }}
                      >
                        上移
                      </button>
                      <button
                        onClick={() => {
                          field.moveDown(index)
                        }}
                      >
                        下移
                      </button>
                      <button
                        onClick={e => {
                          e.preventDefault()
                          field.remove(index)
                        }}
                      >
                        移除
                      </button>
                    </div>
                  )
                })}
                <button
                  onClick={e => {
                    e.preventDefault()
                    field.push({ id: new Date().getTime() })
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
      <FormSpy>
        {form => {
          return JSON.stringify(form.errors)
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
