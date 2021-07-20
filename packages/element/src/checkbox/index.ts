import { connect, h } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'

import type { Checkbox as _ElCheckboxProps } from 'element-ui'
import { Checkbox as ElCheckbox } from 'element-ui'

type ElCheckboxProps = Omit<_ElCheckboxProps, 'value'> & {
  value: ElCheckboxProps['label']
}

export interface CheckboxProps extends ElCheckboxProps {
  option: Omit<_ElCheckboxProps, 'value'> & {
    value: ElCheckboxProps['label']
    label: string
  }
}

const CheckboxOption = defineComponent<CheckboxProps>({
  name: 'Checkbox',
  props: {
    option: {
      type: Object,
      default: null,
    },
  },
  setup(curtomProps, { attrs, slots, listeners }) {
    return () => {
      const props = attrs as unknown as CheckboxProps
      const option = curtomProps?.option
      if (option) {
        const children = option.label
          ? { default: () => [option.label] }
          : slots
        const newProps = {} as Partial<ElCheckboxProps>
        Object.assign(newProps, option)
        newProps.label = option.value
        delete newProps.value

        return h(
          ElCheckbox,
          {
            attrs: {
              ...newProps,
            },
          },
          children
        )
      }

      return h(
        ElCheckbox,
        {
          attrs: {
            ...props,
          },
          on: listeners,
        },
        slots
      )
    }
  },
})

export const Checkbox = connect(CheckboxOption)
