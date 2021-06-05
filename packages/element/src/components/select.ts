import { connect, mapProps, h } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { getComponentByTag } from '../shared'

import type {
  Select as ElSelectProps,
  Option as ElOptionProps,
} from 'element-ui'

export type SelectProps = ElSelectProps & {
  options?: Array<ElOptionProps | string>
}

const ElSelect = getComponentByTag('el-select')
const ElOption = getComponentByTag('el-option')

const SelectOption = defineComponent<SelectProps>({
  setup(empty, { attrs, slots }) {
    return () => {
      const props = attrs as unknown as SelectProps
      const options = props.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      ElOption,
                      { props: { label: option, value: option } },
                      {}
                    )
                  } else {
                    return h(ElOption, { props: option }, {})
                  }
                }),
            }
          : slots
      return h(ElSelect, { props }, children)
    }
  },
})

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true })
)
