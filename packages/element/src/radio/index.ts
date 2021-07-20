import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import { getComponentByTag } from '../__builtins__/shared'
import { PreviewSelectText } from '../preview-text'
import type {
  Radio as ElRadioProps,
  RadioGroup as ElRadioGroupProps,
} from 'element-ui'
import { Radio as ElRadio, RadioGroup as ElRadioGroup } from 'element-ui'

export type RadioGroupProps = ElRadioGroupProps & {
  value: any
  options?: (Omit<ElRadioProps, 'value'> & {
    value: ElRadioProps['label']
    label: string
  })[]
}

export type RadioProps = ElRadioProps

const TransformElRadioGroup = getComponentByTag(ElRadioGroup, {
  change: 'input',
})

const RadioGroupOption = defineComponent<RadioGroupProps>({
  name: 'RadioGroup',
  props: {
    options: {
      type: Array,
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

export const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options' }),
  mapReadPretty(PreviewSelectText)
)
export const Radio = ElRadio
