import { connect, registerFormField } from '@uform/react-schema-renderer'
import { InputNumber } from 'antd'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../shared'

registerFormField(
  'number',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(InputNumber))
)
