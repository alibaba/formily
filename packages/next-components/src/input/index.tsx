import { connect } from '@formily/react-schema-renderer'
import { Input as NextInput } from '@alifd/next'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../shared'

export const Input = connect<'TextArea'>({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(acceptEnum(NextInput))

Input.TextArea = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(acceptEnum(NextInput.TextArea))

export default Input
