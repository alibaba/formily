import { Switch } from 'antd'
import { connect, registerFormField } from '@uform/react-schema-form'
import { acceptEnum, mapStyledProps } from '../utils'

registerFormField(
  'boolean',
  connect({
    valueName: 'checked',
    getProps: mapStyledProps
  })(acceptEnum(Switch))
)
