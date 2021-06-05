import { connect, mapProps, h } from '@formily/vue'
import { getComponentByTag } from '../shared'
import { Checkbox } from './checkbox'
import { defineComponent } from 'vue-demi'

import type { CheckboxGroup as ElCheckboxGroupProps } from 'element-ui'
import type { CheckboxProps } from './checkbox'

export type CheckboxGroupProps = ElCheckboxGroupProps & {
  value: any[]
  options?: Array<CheckboxProps | string>
}

const ElCheckboxGroup = getComponentByTag<CheckboxGroupProps>(
  'el-checkbox-group',
  { change: 'input' }
)

const CheckboxGroupOption = defineComponent<CheckboxGroupProps>({
  setup(empty, { attrs, slots }) {
    return () => {
      const props = attrs as unknown as CheckboxGroupProps
      const options = props.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      Checkbox,
                      { props: { option: { label: option, value: option } } },
                      {}
                    )
                  } else {
                    return h(Checkbox, { props: { option } }, {})
                  }
                }),
            }
          : slots
      return h(
        ElCheckboxGroup,
        {
          props: {
            value: props.value || [],
            ...props,
          },
        },
        children
      )
    }
  },
})

export const CheckboxGroup = connect(
  CheckboxGroupOption,
  mapProps({ dataSource: 'options' })
)
