import { connect, registerFormField } from '@formily/react-schema-renderer'
import { acceptEnum, mapStyledProps } from '../shared'
import { Switch } from '@alifd/next'

registerFormField(
  'boolean',
  connect({
    valueName: 'checked',
    getProps: mapStyledProps
  })(acceptEnum(Switch))
)
