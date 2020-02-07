import { connect, registerFormField } from '@uform/react-schema-renderer'
import { Select } from '@alifd/meet';
import { mapStyledProps, mapTextComponent, mapSelectComponent } from '../shared'

registerFormField(
  'select',
  connect({
    getProps: mapStyledProps,
    getComponent(Target, ...args) {
      return mapTextComponent(mapSelectComponent(Target, ...args), ...args);
    }
  })(Select)
)
