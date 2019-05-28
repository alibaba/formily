import { connect, registerFormField } from '@uform/react'
import { InputNumber } from 'antd'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'number',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(InputNumber))
)
