import { connect, mapReadPretty } from '@formily/react'
import { NumberPicker as InputNumber } from '@alifd/next'
import { PreviewText } from '../preview-text'

export const NumberPicker = connect(
  InputNumber,
  mapReadPretty(PreviewText.Input)
)

export default NumberPicker
