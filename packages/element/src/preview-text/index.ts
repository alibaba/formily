import { defineComponent } from 'vue-demi'
import { createContext, useContext } from '../__builtins__/shared'
import { observer } from '@formily/reactive-vue'
import { h, useField } from '@formily/vue'
import { isArr, isValid } from '@formily/shared'
import { stylePrefix } from '../__builtins__/configs'
import { InputProps } from '../input'
import type { SelectProps } from '../select'
import type { CascaderProps } from '../cascader'
import type { DatePickerProps } from '../date-picker'
import type { TimePickerProps } from '../time-picker'
import { Space } from '../space'
import { Tag } from 'element-ui'
import { formatDate } from 'element-ui/src/utils/date-util'

const prefixCls = `${stylePrefix}-preview-text`
const PlaceholderContext = createContext('N/A')

export const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || 'N/A'

  return isValid(value) && value !== '' ? value : placeholder
}

export const PreviewInputText = defineComponent<InputProps>({
  props: [],
  setup(_props, { attrs, slots }) {
    return () => {
      return h(
        Space,
        {
          class: [prefixCls, attrs.class],
          style: attrs.style,
        },
        {
          default: () => [
            slots?.prepend?.(),
            slots?.prefix?.(),
            usePlaceholder(attrs.value),
            slots?.suffix?.(),
            slots?.append?.(),
          ],
        }
      )
    }
  },
})

export const PreviewSelectText = observer(
  defineComponent<SelectProps>({
    props: [],
    setup(_props, { attrs }) {
      const fieldRef = useField<Formily.Core.Models.Field>()
      const field = fieldRef.value
      const props = attrs as unknown as SelectProps
      const dataSource: any[] = field?.dataSource?.length
        ? field.dataSource
        : props?.options?.length
        ? props.options
        : []
      const placeholder = usePlaceholder()
      const getSelected = () => {
        const value = props.value
        if (props.multiple) {
          return isArr(value)
            ? value.map((val) => ({ label: val, value: val }))
            : []
        } else {
          return isValid(value) ? [{ label: value, value }] : []
        }
      }

      const getLabels = () => {
        const selected = getSelected()
        if (!selected.length) {
          return h(
            Tag,
            {},
            {
              default: () => placeholder,
            }
          )
        }
        return selected.map(({ value, label }, key) => {
          const text =
            dataSource?.find((item) => item.value == value)?.label || label
          return h(
            Tag,
            {
              key,
              props: {
                type: 'info',
                effect: 'light',
              },
            },
            {
              default: () => text || placeholder,
            }
          )
        })
      }

      return () => {
        return h(
          Space,
          {
            class: [prefixCls, attrs.class],
            style: attrs.style,
          },
          {
            default: () => getLabels(),
          }
        )
      }
    },
  })
)

export const PreviewCascaderText = observer(
  defineComponent<CascaderProps>({
    props: [],
    setup(_props, { attrs }) {
      const fieldRef = useField<Formily.Core.Models.Field>()
      const field = fieldRef.value
      const props = attrs as unknown as CascaderProps
      const dataSource: any[] = field?.dataSource?.length
        ? field.dataSource
        : props?.options?.length
        ? props.options
        : []
      const placeholder = usePlaceholder()
      const valueKey = props.props?.value || 'value'
      const labelKey = props.props?.label || 'label'
      const getSelected = () => {
        return isArr(props.value) ? props.value : []
      }

      const findLabel = (value: any, dataSource: any[]) => {
        for (let i = 0; i < dataSource?.length; i++) {
          const item = dataSource[i]
          if (item?.[valueKey] === value) {
            return item?.[labelKey]
          } else {
            const childLabel = findLabel(value, item?.children)
            if (childLabel) return childLabel
          }
        }
      }

      const getLabels = () => {
        const selected = getSelected()
        if (!selected?.length) {
          return h(
            Tag,
            {},
            {
              default: () => placeholder,
            }
          )
        }
        return selected.map((value, key) => {
          const text = findLabel(value, dataSource)
          return h(
            Tag,
            {
              key,
              props: {
                type: 'info',
                effect: 'light',
              },
            },
            {
              default: () => text || placeholder,
            }
          )
        })
      }

      return () => {
        return h(
          Space,
          {
            class: [prefixCls, attrs.class],
            style: attrs.style,
          },
          {
            default: () => getLabels(),
          }
        )
      }
    },
  })
)

export const PreviewDatePickerText = defineComponent<DatePickerProps>({
  props: [],
  setup(_props, { attrs }) {
    const props = attrs as unknown as DatePickerProps
    const placeholder = usePlaceholder()
    const getLabels = () => {
      if (isArr(props.value)) {
        const labels = (props.value as any[]).map(
          (value: String | Date) =>
            formatDate(value, props.format) || placeholder
        )

        return labels.join('~')
      } else {
        return formatDate(props.value, props.format) || placeholder
      }
    }

    return () => {
      return h(
        'div',
        {
          class: [prefixCls, attrs.class],
          style: attrs.style,
        },
        {
          default: () => getLabels(),
        }
      )
    }
  },
})

export const PreviewTimePickerText = defineComponent<TimePickerProps>({
  props: [],
  setup(_props, { attrs }) {
    const props = attrs as unknown as TimePickerProps
    const format = props.pickerOptions?.format || 'HH:mm:ss'
    const placeholder = usePlaceholder()
    const getLabels = () => {
      if (isArr(props.value)) {
        const labels = props.value.map(
          (value) => formatDate(value, format) || placeholder
        )

        return labels.join('~')
      } else {
        return formatDate(props.value, format) || placeholder
      }
    }

    return () => {
      return h(
        'div',
        {
          class: [prefixCls, attrs.class],
          style: attrs.style,
        },
        {
          default: () => getLabels(),
        }
      )
    }
  },
})

export const PreviewText = defineComponent<any>({
  setup(_props, { attrs }) {
    return () => {
      return h(
        'div',
        {
          class: [prefixCls, attrs.class],
          style: attrs.style,
        },
        {
          default: () => usePlaceholder(attrs.value),
        }
      )
    }
  },
})

export const PreviewTextPlaceholder = PlaceholderContext.Provider
export const usePreviewTextPlaceholder = usePlaceholder
