# 更多场景

因为 Formily 在表单层面上是一个非常完备的方案，而且还很灵活，支持的场景非常多，但是场景案例，我们无法一一列举。

所以，还是希望社区能帮助 Formily 完善更多场景案例！我们会不胜感激！😀

```tsx
import React from 'react'
import { createForm, isDataField } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  RecursionField,
  useField,
  useFieldSchema,
  observer,
} from '@formily/react'

const form = createForm()

const Input: React.FC = observer((props) => {
  return React.createElement('input', props)
})

const ButtonGroup: React.FC<any> = ({ onChange, value }) => {
  const field = useField()

  const dataSource = (field as any).dataSource

  const onClick = React.useCallback(
    (e) => {
      onChange(e.target.getAttribute('data-value'))
    },
    [onChange]
  )

  return (
    <div>
      {dataSource.map((x) => (
        <button key={x.value} data-value={x.value} onClick={onClick}>
          {x.label}-{value === x.value ? 'visible' : 'none'}
        </button>
      ))}
    </div>
  )
}

const VoidField: React.FC = (props) => {
  return (
    <div>
      Field: <div> {props.children}</div>
    </div>
  )
}

const FormItem = observer(({ children }) => {
  return <div>{children}</div>
})

const ArrayItems = observer((props) => {
  const field = useField()
  const schema = useFieldSchema()
  return (
    <div>
      {props.value?.map((item, index) => {
        return (
          <div key={index} style={{ marginBottom: 10 }}>
            <RecursionField name={index} schema={schema.items} />
          </div>
        )
      })}
      <button
        onClick={() => {
          field.push({})
        }}
      >
        Add Item
      </button>
    </div>
  )
})

const SchemaField = createSchemaField({
  components: {
    ArrayItems,
    Input,
    FormItem,
    VoidField,
    ButtonGroup,
  },
})

const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'array',
            enum: ['aa', 'bb'],
            default: 'aa',
            'x-decorator': 'FormItem',
            'x-component': 'ButtonGroup',
          },
          aa: {
            'x-reactions':
              "{{$self.display=$self.query(\".type\").value()==='aa'?'visible':'none'}}",
            type: 'object',
            properties: {
              aa_input: {
                type: 'string',
                default: 'aa',
                'x-component': 'Input',
                'x-decorator': 'FormItem',
              },
            },
          },
          bb: {
            'x-reactions':
              "{{$self.display=$self.query(\".type\").value()==='bb'?'visible':'none'}}",
            type: 'object',
            properties: {
              bb_input: {
                type: 'string',
                default: 'bb',
                'x-component': 'Input',
                'x-decorator': 'FormItem',
              },
            },
          },
        },
      },
    },
  },
}
export default () => {
  const reset = React.useCallback(() => {
    const field = form.query('array').take()
    if (field && isDataField(field)) {
      field.reset({ forceClear: true })
      // field.query("*").forEach((childField) => {
      //   if (isDataField(childField)) {
      //     childField.reset({ forceClear: true });
      //   }
      // });
    }
  }, [])

  return (
    <>
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
      <button onClick={reset}>Reset Field</button>
    </>
  )
}
```
