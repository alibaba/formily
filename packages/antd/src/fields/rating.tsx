import { connect, registerFormField } from '@formily/react-schema-renderer'
import { Rate } from 'antd'
import { mapStyledProps } from '../shared'

registerFormField(
  'rating',
  connect({
    getProps: mapStyledProps
  })(Rate)
)
