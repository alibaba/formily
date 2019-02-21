import { connect, registerFormField } from '@uform/react'
import { acceptEnum, mapLoadingProps } from '../utils'
import { Switch } from 'antd'

registerFormField(
  'boolean',
  connect({
    valueName: 'checked',
    getProps: mapLoadingProps
  })(acceptEnum(Switch))
)
