import { connect, registerFormField } from '@uform/react'
import { Input } from 'antd'
import { acceptEnum, mapLoadingProps, mapTextComponent } from '../utils'

registerFormField(
  'string',
  connect({
    getProps: mapLoadingProps,
    getComponent: mapTextComponent
  })(acceptEnum(Input))
)
