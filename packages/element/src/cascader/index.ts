import { connect, mapProps } from '@formily/vue'
import { Cascader as ELCascader } from 'element-ui'

import type { Cascader as ElCascaderProps } from 'element-ui'

export type CascaderProps = ElCascaderProps

export const Cascader = connect(ELCascader, mapProps({ dataSource: 'options' }))
