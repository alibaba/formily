import { connect, h, mapProps, mapReadPretty } from '@formily/vue'
import type {
  Checkbox as _ElCheckboxProps,
  CheckboxGroup as ElCheckboxGroupProps,
} from 'element-ui'
import {
  Checkbox as ElCheckbox,
  CheckboxButton as ElCheckboxButton,
  CheckboxGroup as ElCheckboxGroup,
} from 'element-ui'
import { defineComponent, PropType } from 'vue-demi'
import { PreviewText } from '../preview-text'
import {
  composeExport,
  resolveComponent,
  SlotTypes,
  transformComponent,
} from '../__builtins__/shared'

type ElCheckboxProps = Omit<_ElCheckboxProps, 'value'> & {
  value: ElCheckboxProps['label']
}

export interface CheckboxProps extends ElCheckboxProps {
  option: Omit<_ElCheckboxProps, 'value'> & {
    value: ElCheckboxProps['label']
    label: SlotTypes
  }
}

const CheckboxOption = defineComponent<CheckboxProps>({
  name: 'Checkbox',
  inheritAttrs: false,
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
        const children = {
          default: () => [
            resolveComponent(slots.default ?? option.label, { option }),
          ],
        }
        const newProps = {} as Partial<ElCheckboxProps>
        Object.assign(newProps, option)
        newProps.label = option.value
        delete newProps.value

        return h(
          attrs.optionType === 'button' ? ElCheckboxButton : ElCheckbox,
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

export type CheckboxGroupProps = ElCheckboxGroupProps & {
  value: any[]
  options?: Array<CheckboxProps | string>
  optionType: 'default' | 'button'
}

const TransformElCheckboxGroup = transformComponent(ElCheckboxGroup, {
  change: 'input',
  uselessChange: 'change'
})

const CheckboxGroupOption = defineComponent<CheckboxGroupProps>({
  name: 'CheckboxGroup',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    optionType: {
      type: String as PropType<CheckboxGroupProps['optionType']>,
      default: 'default',
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
                      Checkbox,
                      {
                        props: {
                          option: {
                            label: option,
                            value: option,
                          },
                        },
                        attrs: {
                          optionType: customProps.optionType,
                        },
                      },
                      slots?.option
                        ? { default: () => slots.option({ option }) }
                        : {}
                    )
                  } else {
                    return h(
                      Checkbox,
                      {
                        props: {
                          option,
                        },
                        attrs: {
                          optionType: customProps.optionType,
                        },
                      },
                      slots?.option
                        ? { default: () => slots.option({ option }) }
                        : {}
                    )
                  }
                }),
            }
          : slots
      return h(
        TransformElCheckboxGroup,
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

const CheckboxGroup = connect(
  CheckboxGroupOption,
  mapProps({ dataSource: 'options' }),
  mapReadPretty(PreviewText.Select, {
    multiple: true,
  })
)

export const Checkbox = composeExport(connect(CheckboxOption), {
  Group: CheckboxGroup,
})

export default Checkbox
