import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { Cascader as ELCascader } from 'element-ui'

import type { Cascader as ElCascaderProps } from 'element-ui'
import { PreviewCascaderText } from '../preview-text'

export type CascaderProps = ElCascaderProps

export const Cascader = connect(
  ELCascader,
  mapProps({ dataSource: 'options' }),
  mapReadPretty(PreviewCascaderText)
)
