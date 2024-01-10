import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Radio as NextRadio } from '@alifd/next'
import {
  RadioProps,
  GroupProps as RadioGroupProps,
} from '@alifd/next/lib/radio'
import { PreviewText } from '../preview-text'
import { mapSize } from '../__builtins__'

type ComposedRadio = React.FC<React.PropsWithChildren<RadioProps>> & {
  Group?: React.FC<React.PropsWithChildren<RadioGroupProps>>
}

export const Radio: ComposedRadio = connect(
  NextRadio,
  mapProps(
    {
      value: 'checked',
    },
    mapSize
  )
)

Radio.Group = connect(
  NextRadio.Group,
  mapProps(
    {
      dataSource: true,
    },
    mapSize
  ),
  mapReadPretty(PreviewText.Select)
)

export default Radio
