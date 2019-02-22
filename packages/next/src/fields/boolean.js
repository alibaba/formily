import { connect, registerFormField } from '@uform/react'
import { acceptEnum, mapStyledProps } from '../utils'
import { Switch } from '@alifd/next'

registerFormField(
  'boolean',
  connect({
    valueName: 'checked',
    getProps: mapStyledProps
  })(acceptEnum(Switch))
)
