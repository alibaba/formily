import { connect, registerFormField } from '@uform/react'
import { Input } from 'antd'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils'

const { TextArea } = Input

registerFormField(
  'textarea',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(TextArea))
)
