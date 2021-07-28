import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import { composeExport, getComponentByTag } from '../__builtins__/shared'
import type {
  Checkbox as _ElCheckboxProps,
  CheckboxGroup as ElCheckboxGroupProps,
} from 'element-ui'
import {
  Checkbox as ElCheckbox,
  CheckboxGroup as ElCheckboxGroup,
} from 'element-ui'
import { PreviewText } from '../preview-text'

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

export type CheckboxGroupProps = ElCheckboxGroupProps & {
  value: any[]
  options?: Array<CheckboxProps | string>
}

const TransformElCheckboxGroup = getComponentByTag(ElCheckboxGroup, {
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
