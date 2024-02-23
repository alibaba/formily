import { connect, h, mapProps, mapReadPretty } from '@formily/vue'
import type {
  Radio as ElRadioProps,
  RadioGroup as ElRadioGroupProps,
} from 'element-ui'
import {
  Radio as ElRadio,
  RadioButton,
  RadioGroup as ElRadioGroup,
} from 'element-ui'
import { defineComponent, PropType } from 'vue-demi'
import { PreviewText } from '../preview-text'
import {
  composeExport,
  resolveComponent,
  SlotTypes,
  transformComponent,
} from '../__builtins__/shared'

export type RadioGroupProps = ElRadioGroupProps & {
  value: any
  options?: (
    | (Omit<ElRadioProps, 'value'> & {
        value: ElRadioProps['label']
        label: SlotTypes
      })
    | string
  )[]
  optionType: 'default' | 'button'
}

export type RadioProps = ElRadioProps

const TransformElRadioGroup = transformComponent(ElRadioGroup, {
  change: 'input',
  uselessChange:'change'
})

const RadioGroupOption = defineComponent<RadioGroupProps>({
  name: 'FRadioGroup',
  props: {
    options: {
      type: Array as PropType<RadioGroupProps['options']>,
      default: () => [],
    },
    optionType: {
      type: String as PropType<RadioGroupProps['optionType']>,
      default: 'default',
    },
  },
  setup(customProps, { attrs, slots, listeners }) {
    return () => {
      const options = customProps.options || []
      const OptionType =
        customProps.optionType === 'button' ? RadioButton : ElRadio
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      OptionType,
                      { props: { label: option } },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option, { option }),
                        ],
                      }
                    )
                  } else {
                    return h(
                      OptionType,
                      {
                        props: {
                          ...option,
                          value: undefined,
                          label: option.value,
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
        TransformElRadioGroup,
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
  mapReadPretty(PreviewText.Select)
)
export const Radio = composeExport(ElRadio, {
  Group: RadioGroup,
})

export default Radio
