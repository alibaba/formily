import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/vue'
import { getComponentByTag } from '../shared'

import type { FormItem as _ElFormItemProps } from 'element-ui'

export type ElFormItemProps = _ElFormItemProps & { title: string }

const ElFormItemComponent = getComponentByTag('el-form-item')

export const ElFormItem = connect(
  ElFormItemComponent,
  mapProps({ title: 'label', required: true }, (props, field) => ({
    error: !isVoidField(field)
      ? field.errors.length
        ? field.errors.join('，')
        : undefined
      : undefined,
  }))
)
