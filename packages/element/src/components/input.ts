import { getComponentByTag } from '../shared'
import { connect, mapProps } from '@formily/vue'

import type { Input as ElInputProps } from 'element-ui'

export type InputProps = ElInputProps

const ElInput = getComponentByTag<InputProps>('el-input', { change: 'input' })

export const Input = connect(ElInput, mapProps({ readOnly: 'readonly' }))
