import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Checkbox as NextCheckbox } from '@alifd/next'
import {
  CheckboxProps,
  GroupProps as CheckboxGroupProps,
} from '@alifd/next/lib/checkbox'
import { PreviewText } from '../preview-text'

type ComposedCheckbox = React.FC<CheckboxProps> & {
  Group?: React.FC<CheckboxGroupProps>
}

export const Checkbox: ComposedCheckbox = connect(
  NextCheckbox,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  })
)

Checkbox.Group = connect(
  NextCheckbox.Group,
  mapProps({
    dataSource: true,
  }),
  mapReadPretty(PreviewText.Select)
)

export default Checkbox
