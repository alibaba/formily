import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import {
  composeExport,
  transformComponent,
  resolveComponent,
} from '../__builtins__/shared'
import type { CheckboxGroup as ElCheckboxGroupProps } from 'vant'
import { Checkbox as ElCheckbox, CheckboxGroup as ElCheckboxGroup } from 'vant'
import { PreviewText } from '../preview-text'

const TransformElCheckbox = transformComponent(ElCheckbox, {
  change: 'input',
})

const CheckboxOption = defineComponent({
  name: 'Checkbox',
  inheritAttrs: false,
  props: {
    option: {
      type: Object,
      default: null,
    },
  },
  setup(customProps, { attrs, slots, listeners }) {
    return () => {
      const props = attrs as any
      const option = customProps?.option
      if (option) {
        const children = {
          default: () => [
            resolveComponent(slots.default ?? option.label, { option }),
          ],
        }
        const newProps = {} as any
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
        TransformElCheckbox,
        {
          attrs: {
            ...props,
          },
          on: listeners,
        },
        {
          default: () => [props.label],
        }
      )
    }
  },
})

export type CheckboxGroupProps = ElCheckboxGroupProps & {
  value: any[]
  options?: Array<string>
}

const TransformElCheckboxGroup = transformComponent(ElCheckboxGroup, {
  change: 'input',
})

const CheckboxGroupOption = defineComponent<CheckboxGroupProps>({
  name: 'CheckboxGroup',
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
                      Checkbox,
                      {
                        props: {
                          option: {
                            label: option,
                            name: option,
                          },
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
  mapReadPretty(PreviewText.Checkbox, {
    multiple: true,
  })
)

export const Checkbox = composeExport(connect(CheckboxOption), {
  Group: CheckboxGroup,
})

export default Checkbox
