import { connect, mapProps } from '@formily/react'
import { Transfer as AntdTransfer } from 'antd'

export const Transfer = connect(
  AntdTransfer,
  mapProps(
    {
      extract: 'value',
      to: 'targetKeys'
    },
    {
      extract: 'dataSource'
    }
  )
)

export default Transfer
