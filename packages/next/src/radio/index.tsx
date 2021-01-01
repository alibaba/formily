import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Radio as NextRadio } from '@alifd/next'
import {
  RadioProps,
  GroupProps as RadioGroupProps,
} from '@alifd/next/lib/radio'
import { PreviewText } from '../preview-text'

type ComposedRadio = React.FC<RadioProps> & {
  Group?: React.FC<RadioGroupProps>
}

export const Radio: ComposedRadio = connect(
  NextRadio,
  mapProps({
    extract: 'value',
    to: 'checked',
  })
)

Radio.Group = connect(
  NextRadio.Group,
  mapProps({
    extract: 'dataSource',
  }),
  mapReadPretty(PreviewText.Select)
)

export default Radio
