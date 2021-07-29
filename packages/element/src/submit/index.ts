import { h, useForm } from '@formily/vue'
import { IFormFeedback } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { defineComponent } from '@vue/composition-api'

import type { Button as ElButtonProps } from 'element-ui'
import { Button as ElButton } from 'element-ui'

export interface ISubmitProps extends ElButtonProps {
  onClick?: (e: MouseEvent) => any
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Submit = observer(
  defineComponent<ISubmitProps>({
    name: 'FSubmit',
    props: ['onClick', 'onSubmit', 'onSubmitSuccess', 'onSubmitFailed'],
    setup(props, { attrs, slots, listeners }) {
      const formRef = useForm()

      return () => {
        const {
          onClick = listeners?.click,
          onSubmit = listeners?.submit,
          onSubmitSuccess = listeners?.submitSuccess,
          onSubmitFailed = listeners?.submitFailed,
        } = props

        const form = formRef?.value
        return h(
          ElButton,
          {
            attrs: {
              nativeType: listeners?.submit ? 'button' : 'submit',
              type: 'primary',
              ...attrs,
              loading:
                attrs.loading !== undefined ? attrs.loading : form?.submitting,
            },
            on: {
              ...listeners,
              click: (e: any) => {
                if (onClick) {
                  if (onClick(e) === false) return
                }
                if (onSubmit) {
                  form
                    ?.submit(onSubmit as (e: any) => void)
                    .then(onSubmitSuccess as (e: any) => void)
                    .catch(onSubmitFailed as (e: any) => void)
                }
              },
            },
          },
          slots
        )
      }
    },
  })
)

export default Submit
