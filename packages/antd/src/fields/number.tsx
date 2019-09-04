import { connect, registerFormField } from '@uform/react-schema-form'
import { InputNumber } from 'antd'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'number',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(InputNumber))
)
