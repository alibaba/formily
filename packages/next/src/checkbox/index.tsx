import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Checkbox as NextCheckbox } from '@alifd/next'
import {
  CheckboxProps,
  GroupProps as CheckboxGroupProps,
} from '@alifd/next/lib/checkbox'
import { PreviewText } from '../preview-text'
import { mapSize } from '../__builtins__'

type ComposedCheckbox = React.FC<React.PropsWithChildren<CheckboxProps>> & {
  Group?: React.FC<React.PropsWithChildren<CheckboxGroupProps>>
}

export const Checkbox: ComposedCheckbox = connect(
  NextCheckbox,
  mapProps(
    {
      value: 'checked',
    },
    mapSize
  )
)

Checkbox.Group = connect(
  NextCheckbox.Group,
  mapProps(
    {
      dataSource: true,
    },
    mapSize
  ),
  mapReadPretty(PreviewText.Select, {
    mode: 'multiple',
  })
)

export default Checkbox
