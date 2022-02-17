import { observer } from '@formily/reactive-vue'
import { isVoidField } from '@formily/core'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import { resolveComponent } from '../__builtins__/shared'
import { PreviewText } from '../preview-text'
import type { Field as VanFieldProps } from 'vant'
import { Field as VanField } from 'vant'

export type FieldProps = VanFieldProps

const BaseField = observer(
  defineComponent({
    name: 'FField',
    setup(props, { attrs, slots, listeners }) {
      return () => {
        return h(
          VanField,
          {
            attrs,
            on: listeners,
          },
          {
            input: () => slots.default?.(),
          }
        )
      }
    },
  })
)

export const Field = connect(
  BaseField,
  mapReadPretty(PreviewText.VanField),
  mapProps(
    { validateStatus: true, required: true, readOnly: 'readonly' },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      const takeMessage = () => {
        const split = (messages: any[]) => {
          return messages.reduce((buf, text, index) => {
            if (!text) return buf
            return index < messages.length - 1
              ? buf.concat([text, ', '])
              : buf.concat([text])
          }, [])
        }
        if (field.validating) return
        if (props.feedbackText) return props.feedbackText
        if (field.selfErrors.length) return split(field.selfErrors)
        if (field.selfWarnings.length) return split(field.selfWarnings)
        if (field.selfSuccesses.length) return split(field.selfSuccesses)
      }
      const errorMessages = takeMessage()
      return {
        errorMessage: resolveComponent(
          Array.isArray(errorMessages)
            ? errorMessages.join(', ')
            : errorMessages
        ),
        extra: props.extra || field.description,
      }
    },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      return {
        feedbackStatus:
          field.validateStatus === 'validating'
            ? 'pending'
            : (Array.isArray(field.decorator) &&
                field.decorator[1]?.feedbackStatus) ||
              field.validateStatus,
      }
    },
    (props, field) => {
      if (isVoidField(field)) return props

      if (!field) return props
      let asterisk = false
      if (field.required && field.pattern !== 'readPretty') {
        asterisk = true
      }
      if ('asterisk' in props) {
        asterisk = props.asterisk
      }
      return {
        asterisk,
      }
    }
  )
)

export default Field
