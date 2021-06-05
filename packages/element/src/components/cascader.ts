import { getComponentByTag } from '../shared'
import { connect, mapProps } from '@formily/vue'

import type { Cascader as ElCascaderProps } from 'element-ui'

export type CascaderProps = ElCascaderProps

const ElCascader = getComponentByTag<CascaderProps>('el-cascader')

export const Cascader = connect(ElCascader, mapProps({ dataSource: 'options' }))
