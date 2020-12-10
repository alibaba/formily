import React, { useMemo } from 'react'
import {
  createForm,
  FormProvider,
  FormConsumer,
  Field,
  ArrayField,
  onFieldReact,
  connect,
  mapProps,
  mapReadPretty,
  isVoidField
} from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Form, Input as AntdInput, Select } from 'antd'
import { PreviewText } from '@formily/react-shared-components'
import 'antd/dist/antd.css'

const FormItem = connect(
  mapProps(
    { extract: 'validateStatus' },
    { extract: 'title', to: 'label' },
    { extract: 'required' },
    (props, field) => {
      if (isVoidField(field)) return props
      if (field.invalid) {
        return {
          help: field.errors.reduce(
            (msg, info) => msg.concat(info.messages),
            []
          )
        }
      } else {
        return {
          help: field.description
        }
      }
    }
  )
)(Form.Item)

const Input = connect(mapReadPretty(PreviewText))(AntdInput)

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem
  }
})

export default () => {
  const form = useMemo(
    () =>
      createForm({
        pattern: 'disabled',
        initialValues: {
          bb: '123'
        },
        effects: () => {
          onFieldReact('kk', (field, form) => {
            field.setDisplay(form.values.bb === '321' ? 'visibility' : 'none')
          })
          onFieldReact('aa.cc.*.dd', field => {
            const value = field.query('.ee').get(field => field.value)
            field.setPattern(value === '123' ? 'disabled' : 'editable')
          })
        }
      }),
    []
  )
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Markup
          name="ioo"
          x-decorator="FormItem"
          x-decorator-props={{ tooltip: 'asdasd' }}
          title="IOO"
          x-component="Input"
          x-component-props={{ placeholder: 'asd' }}
        />
        <SchemaField.Markup type="object" name="yuu" required={['poo']}>
          <SchemaField.Markup
            name="poo"
            x-decorator="FormItem"
            title="POO"
            x-component="Input"
            x-reactions={[
              {
                dependencies: ['ioo#inputValue'],
                when: '{{$deps[0] == 123}}',
                fullfill: {
                  state: {
                    value: '3333'
                  }
                }
              }
            ]}
          />
        </SchemaField.Markup>
      </SchemaField>
      <Field
        name="bb"
        initialValue="123"
        required
        description={<div>122333</div>}
        title="BB"
        decorator={[FormItem]}
        component={[Input]}
        validator="url"
      />
      <Field name="kk" required component={[Input]} />
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
                        component={[Input]}
                      />
                      <Field name={`${index}.ee`} component={[Input]} />
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
      <FormConsumer>
        {form => {
          return JSON.stringify(form.query('aa').get().value)
        }}
      </FormConsumer>
      <FormConsumer>
        {form => {
          return JSON.stringify(form.errors)
        }}
      </FormConsumer>
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
    </FormProvider>
  )
}
