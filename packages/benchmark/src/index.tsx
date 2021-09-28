import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import { createForm } from '@formily/core'
import { Field, createSchemaField } from '@formily/react'
import { Input, Form, FormItem } from '@formily/antd'
import { Form as AntdForm, Input as AntdInput } from 'antd'
const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const PureAntdInput = () => {
  return (
    <>
      {Array.from({ length: 2000 }).map((_, i) => {
        return <AntdInput key={i} />
      })}
    </>
  )
}

const PureAntd = () => {
  return (
    <AntdForm>
      <h1>Please pay attention to the performance of the form input</h1>
      {Array.from({ length: 2000 }).map((_, i) => {
        return (
          <AntdForm.Item
            key={i}
            name={`name_${i}`}
            required
            label={`name ${i + 1}`}
          >
            <AntdInput />
          </AntdForm.Item>
        )
      })}
    </AntdForm>
  )
}

const PureJSX = () => {
  const form = useMemo(() => createForm(), [])
  return (
    <Form form={form}>
      <h1>Please pay attention to the performance of the form input</h1>
      {Array.from({ length: 2000 }).map((_, i) => {
        return (
          <Field
            key={i}
            name={`name_${i}`}
            title={`name ${i + 1}`}
            required
            decorator={[FormItem]}
            component={[Input, { placeholder: 'Please Input' }]}
          />
        )
      })}
    </Form>
  )
}

const PureJSONSchema = () => {
  const form = useMemo(() => createForm(), [])
  const schema = {
    type: 'object',
    properties: {},
  }
  Array.from({ length: 2000 }).forEach((_, i) => {
    schema.properties[`name_${i}`] = {
      type: 'string',
      title: `name ${i + 1}`,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Please Input',
      },
    }
  })
  return (
    <Form form={form}>
      <h1>Please pay attention to the performance of the form input</h1>
      <SchemaField schema={schema} />
    </Form>
  )
}

const PureMarkupSchema = () => {
  const form = useMemo(() => createForm(), [])
  return (
    <Form form={form}>
      <h1>Please pay attention to the performance of the form input</h1>
      <SchemaField>
        {Array.from({ length: 2000 }).map((_, i) => {
          return (
            <SchemaField.String
              key={i}
              name={`name_${i}`}
              title={`name ${i + 1}`}
              required
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{
                placeholder: 'Please Input',
              }}
            />
          )
        })}
      </SchemaField>
    </Form>
  )
}

const App = () => {
  const [visibleAntd, setVisibleAntd] = useState(false)
  const [visibleJSX, setVisibleJSX] = useState(false)
  const [visibleMarkupSchema, setVisibleMarkupSchema] = useState(false)
  const [visibleJSONSchema, setVisibleJSONSchema] = useState(false)
  const [visibleAntdInput, setVisibleAntdInput] = useState(false)
  return (
    <div>
      <button
        onClick={() => {
          setVisibleJSX(!visibleJSX)
        }}
      >
        Show JSX
      </button>
      <button
        onClick={() => {
          setVisibleMarkupSchema(!visibleMarkupSchema)
        }}
      >
        Show Markup Schema
      </button>
      <button
        onClick={() => {
          setVisibleJSONSchema(!visibleJSONSchema)
        }}
      >
        Show JSON Schema
      </button>
      <button
        onClick={() => {
          setVisibleAntd(!visibleAntd)
        }}
      >
        Show Antd
      </button>
      <button
        onClick={() => {
          setVisibleAntdInput(!visibleAntdInput)
        }}
      >
        Show Antd Input
      </button>
      {visibleJSX && <PureJSX />}
      {visibleMarkupSchema && <PureMarkupSchema />}
      {visibleJSONSchema && <PureJSONSchema />}
      {visibleAntd && <PureAntd />}
      {visibleAntdInput && <PureAntdInput />}
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
