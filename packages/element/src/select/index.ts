import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import { PreviewText } from '../preview-text'

import type {
  Select as ElSelectProps,
  Option as ElOptionProps,
} from 'element-ui'
import { Select as ElSelect, Option as ElOption } from 'element-ui'
import { resolveComponent, SlotTypes } from '../__builtins__'

export type SelectProps = ElSelectProps & {
  options?: Array<
    Omit<ElOptionProps, 'label'> & {
      label: SlotTypes
    }
  >
}

const SelectOption = defineComponent<SelectProps>({
  name: 'FSelect',
  props: ['options'],
  setup(customProps, { attrs, slots, listeners }) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      ElOption,
                      { props: { value: option } },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option, { option }),
                        ],
                      }
                    )
                  } else {
                    return h(
                      ElOption,
                      {
                        props: {
                          ...option,
                          label: '',
                        },
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option.label, {
                            option,
                          }),
                        ],
                      }
                    )
                  }
                }),
            }
          : slots
      return h(
        ElSelect,
        {
          attrs: {
            ...attrs,
          },
          on: listeners,
        },
        children
      )
    }
  },
})

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true }),
  mapReadPretty(PreviewText.Select)
)

export default Select
