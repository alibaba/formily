import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent, PropType } from '@vue/composition-api'
import {
  composeExport,
  transformComponent,
  resolveComponent,
} from '../__builtins__/shared'
import { PreviewText } from '../preview-text'
import type {
  Radio as VanRadioProps,
  RadioGroup as VanRadioGroupProps,
} from 'vant'
import { Radio as VanRadio, RadioGroup as VanRadioGroup } from 'vant'

export type RadioGroupProps = VanRadioGroupProps & {
  value: any
  options?: any[]
}

export type RadioProps = VanRadioProps

const TransformVanRadioGroup = transformComponent(VanRadioGroup, {
  change: 'input',
})

const RadioGroupOption = defineComponent<RadioGroupProps>({
  name: 'FRadioGroup',
  props: {
    options: {
      type: Array as PropType<RadioGroupProps['options']>,
      default: () => [],
    },
  },
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
                      VanRadio,
                      { props: { label: option, name: option } },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option, { option }),
                        ],
                      }
                    )
                  } else {
                    return h(
                      VanRadio,
                      {
                        props: {
                          ...option,
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
        TransformVanRadioGroup,
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

const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options' }),
  mapReadPretty(PreviewText.Checkbox)
)
export const Radio = composeExport(VanRadio, {
  Group: RadioGroup,
})

export default Radio
