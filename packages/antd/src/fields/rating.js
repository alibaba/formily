import { connect, registerFormField } from '@uform/react'
import { Rate } from 'antd'
import { mapLoadingProps } from '../utils'

registerFormField(
  'rating',
  connect({
    getProps: mapLoadingProps
  })(Rate)
)
