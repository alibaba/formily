import { connect, mapProps } from '@formily/react'
import { Transfer as AntdTransfer } from 'antd'

export const Transfer = connect(
  AntdTransfer,
  mapProps({
    value: 'targetKeys',
    dataSource: true,
  })
)

Transfer.defaultProps = {
  render: (item) => item.title,
}

export default Transfer
