import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Select as NextSelect } from '@alifd/next'
import { PreviewText } from '../preview-text'
import { mapSize, mapStatus } from '../__builtins__'

export const Select = connect(
  NextSelect,
  mapProps(
    {
      dataSource: true,
    },
    mapSize,
    mapStatus
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select
