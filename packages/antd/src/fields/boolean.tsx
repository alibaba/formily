import { Switch } from 'antd'
import { connect, registerFormField } from '@uform/react-schema-renderer'
import { acceptEnum, mapStyledProps } from '../shared'

registerFormField(
  'boolean',
  connect({
    valueName: 'checked',
    getProps: mapStyledProps
  })(acceptEnum(Switch))
)
