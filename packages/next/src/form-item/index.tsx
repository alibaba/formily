import { Form } from '@alifd/next'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'

export const FormItem = connect(
  Form.Item,
  mapProps(
    { validateStatus: 'validateState', title: 'label', required: true },
    (props, field) => {
      if (!field) return props
      if (isVoidField(field)) return props
      if (field.invalid) {
        return {
          help: field.editable ? field.errors : field.description,
        }
      } else {
        return {
          help: field.description,
        }
      }
    }
  )
)

export default FormItem
