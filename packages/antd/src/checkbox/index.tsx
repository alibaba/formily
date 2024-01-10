import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Checkbox as AntdCheckbox } from 'antd'
import { CheckboxProps, CheckboxGroupProps } from 'antd/lib/checkbox'
import { PreviewText } from '../preview-text'

type ComposedCheckbox = React.FC<React.PropsWithChildren<CheckboxProps>> & {
  Group?: React.FC<React.PropsWithChildren<CheckboxGroupProps>>
  __ANT_CHECKBOX?: boolean
}

export const Checkbox: ComposedCheckbox = connect(
  AntdCheckbox,
  mapProps({
    value: 'checked',
  })
)

Checkbox.__ANT_CHECKBOX = true

Checkbox.Group = connect(
  AntdCheckbox.Group,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Select, {
    mode: 'tags',
  })
)

export default Checkbox
