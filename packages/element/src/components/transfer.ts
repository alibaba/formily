import { getComponentByTag } from '../shared'
import { connect, mapProps } from '@formily/vue'

import type { Transfer as ElTransferProps } from 'element-ui'

export type TransferProps = ElTransferProps

const ElTransfer = getComponentByTag<TransferProps>('el-transfer')

export const Transfer = connect(ElTransfer, mapProps({ dataSource: 'data' }))
