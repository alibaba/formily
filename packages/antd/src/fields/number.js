import { connect, registerFormField } from '@uform/react'
import { InputNumber } from 'antd'
import { acceptEnum, mapLoadingProps, mapTextComponent } from '../utils'

registerFormField(
  'number',
  connect({
    getProps: mapLoadingProps,
    getComponent: mapTextComponent
  })(acceptEnum(InputNumber))
)
