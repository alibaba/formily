import { Form } from '@alifd/next'
import { connect, mapProps, isVoidField } from '@formily/react'

export const FormItem = connect(
  Form.Item,
  mapProps(
    { extract: 'validateStatus', to: 'validateState' },
    { extract: 'title', to: 'label' },
    { extract: 'required' },
    (props, field) => {
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
