import { connect, registerFormField } from '@uform/react-schema-renderer'
import { mapStyledProps } from '../shared'
import { Switch } from '@alifd/meet';

registerFormField(
  'boolean',
  connect({
    valueName: 'checked',
    getProps: mapStyledProps
  })(Switch)
)
