import { defineComponent, computed, toRef, Ref } from '@vue/composition-api'
import {
  createContext,
  resolveComponent,
  useContext,
  composeExport,
} from '../__builtins__/shared'
import { h } from '@formily/vue'
import { isValid } from '@formily/shared'
import { stylePrefix } from '../__builtins__/configs'

const prefixCls = `${stylePrefix}-preview-text`
const PlaceholderContext = createContext('N/A')

export const usePlaceholder = (value?: Ref<any>) => {
  const placeholderCtx = useContext(PlaceholderContext)
  const placeholder = computed(() => {
    return isValid(value?.value) && value.value !== ''
      ? value.value
      : resolveComponent(placeholderCtx.value) || 'N/A'
  })
  return placeholder
}

const Input = defineComponent({
  name: 'FPreviewTextInput',
  props: ['value'],
  setup(props, { attrs, slots }) {
    const value = toRef(props, 'value')
    const placeholder = usePlaceholder(value)
    return () => {
      return h(
        'div',
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () => [
            slots?.prepend?.(),
            slots?.prefix?.(),
            [
              h(
                'span',
                {
                  class: [`${stylePrefix}-preview-title`],
                },
                {
                  default: () => [attrs.label],
                }
              ),
            ],
            placeholder.value,
            slots?.suffix?.(),
            slots?.append?.(),
          ],
        }
      )
    }
  },
})

const Text = defineComponent<any>({
  name: 'FPreviewText',
  setup(_props, { attrs }) {
    const placeholder = usePlaceholder()

    return () => {
      return h(
        'div',
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () => placeholder.value,
        }
      )
    }
  },
})

export const PreviewText = composeExport(Text, {
  Input,
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder,
})

export default PreviewText
