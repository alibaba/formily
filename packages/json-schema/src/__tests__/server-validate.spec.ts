import { createForm, Form } from '@formily/core'
import { ISchema, Schema, SchemaKey } from '../'

// 这是schema
const schemaJson = {
  type: 'object',
  title: 'xxx配置',
  properties: {
    string: {
      type: 'string',
      title: 'string',
      maxLength: 5,
      required: true,
    },
    number: {
      type: 'number',
      title: 'number',
      required: true,
    },
    url: {
      type: 'string',
      title: 'url',
      format: 'url',
    },
    arr: {
      type: 'array',
      title: 'array',
      maxItems: 2,
      required: true,
      items: {
        type: 'object',
        properties: {
          string: {
            type: 'string',
            title: 'string',
            required: true,
          },
        },
      },
    },
  },
}
// 这是需要校验的数据
const schemaData = {
  string: '123456', // 超过5个字
  // number 字段不存在
  url: 'xxxxx', // 不合法的url
  arr: [
    {
      string: '1',
    },
    {
      string: '2',
    },
    {
      // 数组超出2项
      string: '', // 没有填
    },
  ],
}

function recursiveField(
  form: Form,
  schema: ISchema,
  basePath?: string,
  name?: SchemaKey
) {
  const fieldSchema = new Schema(schema)
  const fieldProps = fieldSchema.toFieldProps()

  function recursiveProperties(propBasePath?: string) {
    fieldSchema.mapProperties((propSchema, propName) => {
      recursiveField(form, propSchema, propBasePath, propName)
    })
  }

  if (name === undefined || name === null) {
    recursiveProperties(basePath)
    return
  }

  if (schema.type === 'object') {
    const field = form.createObjectField({
      ...fieldProps,
      name,
      basePath,
    })

    recursiveProperties(field.address.toString())
  } else if (schema.type === 'array') {
    const field = form.createArrayField({
      ...fieldProps,
      name,
      basePath,
    })

    const fieldAddress = field.address.toString()
    const fieldValues = form.getValuesIn(fieldAddress)
    fieldValues.forEach((value: any, index: number) => {
      if (schema.items) {
        const itemsSchema = Array.isArray(schema.items)
          ? schema.items[index] || schema.items[0]
          : schema.items

        recursiveField(form, itemsSchema as ISchema, fieldAddress, index)
      }
    })
  } else if (schema.type === 'void') {
    const field = form.createVoidField({
      ...fieldProps,
      name,
      basePath,
    })

    recursiveProperties(field.address.toString())
  } else {
    form.createField({
      ...fieldProps,
      name,
      basePath,
    })
  }
}
test('server validate', async () => {
  const form = createForm({
    values: schemaData,
  })
  recursiveField(form, schemaJson)
  let errors: any[]
  try {
    await form.validate()
  } catch (e) {
    errors = e
  }
  expect(errors).not.toBeUndefined()
})
