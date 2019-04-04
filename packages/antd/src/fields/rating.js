import { connect, registerFormField } from '@uform/react'
import { Rate } from 'antd'
import { mapStyledProps } from '../utils'

registerFormField(
  'rating',
  connect({
    getProps: mapStyledProps
  })(Rate)
)
