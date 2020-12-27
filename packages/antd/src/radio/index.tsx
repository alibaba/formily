import { connect, isVoidField, mapProps, mapReadPretty } from '@formily/react'
import { Radio as AntdRadio } from 'antd'
import { RadioProps, RadioGroupProps } from 'antd/lib/radio'
import { PreviewText } from '../preview-text'

type ComposedRadio = React.FC<RadioProps> & {
  Group?: React.FC<RadioGroupProps>
  __ANT_RADIO?: boolean
}

export const Radio: ComposedRadio = connect(
  AntdRadio,
  mapProps(
    {
      extract: 'value',
      to: 'checked',
    },
    {
      extract: 'onInput',
      to: 'onChange',
    }
  )
)

Radio.__ANT_RADIO = true

Radio.Group = connect(
  AntdRadio.Group,
  mapProps(
    {
      extract: 'dataSource',
      to: 'options',
    },
    (props, field) => {
      if (isVoidField(field)) return props
      return {
        ...props,
        value: field.value,
        onChange: (e) => {
          field?.onInput(e.target.value)
        },
      }
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Radio
