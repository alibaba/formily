import { getComponentByTag } from '../shared'
import { connect, mapProps } from '@formily/vue'

const ElDatePanel = getComponentByTag('el-date-panel', { change: 'pick' })

export const DatePanel = connect(
  ElDatePanel,
  mapProps({ readOnly: 'readonly' })
)
