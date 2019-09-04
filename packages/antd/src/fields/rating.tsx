import { connect, registerFormField } from '@uform/react-schema-form'
import { Rate } from 'antd'
import { mapStyledProps } from '../utils'

registerFormField(
  'rating',
  connect({
    getProps: mapStyledProps
  })(Rate)
)
