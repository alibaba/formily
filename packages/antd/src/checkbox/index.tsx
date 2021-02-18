import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Checkbox as AntdCheckbox } from 'antd'
import { CheckboxProps, CheckboxGroupProps } from 'antd/lib/checkbox'
import { PreviewText } from '../preview-text'

type ComposedCheckbox = React.FC<CheckboxProps> & {
  Group?: React.FC<CheckboxGroupProps>
  __ANT_CHECKBOX?: boolean
}

export const Checkbox: ComposedCheckbox = connect(
  AntdCheckbox,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  })
)

Checkbox.__ANT_CHECKBOX = true

Checkbox.Group = connect(
  AntdCheckbox.Group,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Select)
)

export default Checkbox
