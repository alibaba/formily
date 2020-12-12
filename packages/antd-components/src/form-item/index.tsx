import { Form } from 'antd'
import { connect, mapProps, isVoidField } from '@formily/react'

export const FormItem = connect(
  mapProps(
    { extract: 'validateStatus' },
    { extract: 'title', to: 'label' },
    { extract: 'required' },
    (props, field) => {
      if (isVoidField(field)) return props
      if (field.invalid) {
        return {
          help: field.errors
        }
      } else {
        return {
          help: field.description
        }
      }
    }
  )
)(Form.Item)
