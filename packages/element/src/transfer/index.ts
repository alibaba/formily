import { connect, mapProps } from '@formily/vue'

import type { Transfer as ElTransferProps } from 'element-ui'
import { Transfer as ElTransfer } from 'element-ui'

export type TransferProps = ElTransferProps

export const Transfer = connect(ElTransfer, mapProps({ dataSource: 'data' }))

export default Transfer
