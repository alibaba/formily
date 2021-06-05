import { getComponentByTag } from '../shared'
import { connect, mapProps } from '@formily/vue'

import type { InputNumber as _ElInputNumberProps } from 'element-ui'

export type InputNumberProps = _ElInputNumberProps

const ElInputNumber = getComponentByTag<InputNumberProps>('el-input-number', {
  change: 'input',
})

export const InputNumber = connect(
  ElInputNumber,
  mapProps({ readOnly: 'readonly' }, (props) => {
    let controlsPosition = 'right'
    if (props.controlsPosition) {
      controlsPosition = props.controlsPosition
    }
    return {
      controlsPosition,
    }
  })
)
