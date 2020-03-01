import { connect } from '@formily/react-schema-renderer'
import { TextField } from '@alifd/meet';
import { mapStyledProps, mapTextComponent } from '../shared'

export const Input = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(TextField)




