import { connect } from '@formily/react-schema-renderer'
import { Select } from '@alifd/meet';
import { mapStyledProps, mapTextComponent, mapSelectComponent } from '../shared'

export const select =
  connect({
    getProps: mapStyledProps,
    getComponent(Target, ...args) {
      return mapTextComponent(mapSelectComponent(Target, ...args), ...args);
    }
  })(Select)

