import { Form } from 'antd'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'

export const FormItem = connect(
  Form.Item,
  mapProps(
    { extract: 'validateStatus' },
    { extract: 'title', to: 'label' },
    { extract: 'required' },
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
