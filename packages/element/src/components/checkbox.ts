import { connect, h } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { getComponentByTag } from '../shared'

import type { Checkbox as _ElCheckboxProps } from 'element-ui'

type ElCheckboxProps = Omit<_ElCheckboxProps, 'value'> & {
  value: ElCheckboxProps['label']
}

export interface CheckboxProps extends ElCheckboxProps {
  option: Omit<_ElCheckboxProps, 'value'> & {
    value: ElCheckboxProps['label']
    label: string
  }
}

const ElCheckbox = getComponentByTag('el-checkbox')

const CheckboxOption = defineComponent<CheckboxProps>({
  setup(empty, { attrs, slots }) {
    const props = attrs as unknown as CheckboxProps
    const option = props?.option
    if (option) {
      const children = option.label ? { default: () => [option.label] } : slots
      const newProps = {} as Partial<ElCheckboxProps>
      Object.assign(newProps, option)
      newProps.label = option.value
      delete newProps.value
      return h(
        ElCheckbox,
        {
          attrs: {
            ...props,
            ...newProps,
          },
        },
        children
      )
    }
    return h(
      ElCheckbox,
      {
        attrs: props,
      },
      slots
    )
  },
})

export const Checkbox = connect(CheckboxOption)
