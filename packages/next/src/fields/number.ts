import { connect, registerFormField } from '@formily/react-schema-renderer'
import { NumberPicker } from '@alifd/next'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../shared'

registerFormField(
  'number',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(NumberPicker))
)
