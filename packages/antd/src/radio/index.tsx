import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Radio as AntdRadio } from 'antd'
import { RadioProps, RadioGroupProps } from 'antd/lib/radio'
import { PreviewText } from '../preview-text'

type ComposedRadio = React.FC<RadioProps> & {
  Group?: React.FC<RadioGroupProps>
  __ANT_RADIO?: boolean
}

export const Radio: ComposedRadio = connect(
  AntdRadio,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  })
)

Radio.__ANT_RADIO = true

Radio.Group = connect(
  AntdRadio.Group,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Select)
)

export default Radio
