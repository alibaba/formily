import { connect, registerFormField } from '@formily/react-schema-renderer'
import { Input } from 'antd'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../shared'

registerFormField(
  'string',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(Input))
)
