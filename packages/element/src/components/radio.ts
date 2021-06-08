import { connect, mapProps, h } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { getComponentByTag } from '../shared'

import type {
  Radio as ElRadioProps,
  RadioGroup as ElRadioGroupProps,
} from 'element-ui'

export type RadioGroupProps = ElRadioGroupProps & {
  value: any
  options?: (Omit<ElRadioProps, 'value'> & {
    value: ElRadioProps['label']
    label: string
  })[]
}

export type RadioProps = ElRadioProps

const ElRadioGroup = getComponentByTag('el-radio-group', { change: 'input' })
const ElRadio = getComponentByTag('el-radio')

const RadioGroupOption = defineComponent<RadioGroupProps>({
  props: ['options'],
  setup(customProps, { attrs, slots, listeners }) {
    return () => {
      const props = attrs as unknown as RadioGroupProps
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      ElRadio,
                      { props: { label: option } },
                      { default: () => [option] }
                    )
                  } else {
                    return h(
                      ElRadio,
                      {
                        props: {
                          ...option,
                          value: undefined,
                          label: option.value,
                        },
                      },
                      { default: () => [option.label] }
                    )
                  }
                }),
            }
          : slots
      return h(
        ElRadioGroup,
        {
          props: {
            value: props.value || [],
            props,
          },
          on: listeners,
        },
        children
      )
    }
  },
})

export const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options' })
)
export const Radio = ElRadio
