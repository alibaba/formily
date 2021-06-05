import { merge } from 'lodash'
import { observer, h, useForm } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { getComponentByTag } from '../shared'

import type { Button as ElButtonProps } from 'element-ui'

export type SubmitProps = ElButtonProps

const ElButton = getComponentByTag('el-button')

export const Submit = observer(
  defineComponent<SubmitProps>({
    props: [
      'size',
      'type',
      'plain',
      'round',
      'loading',
      'disabled',
      'icon',
      'autofocus',
      'nativeType',
    ],
    setup(props, context) {
      const formRef = useForm()

      const { listeners, slots } = context

      return () => {
        const form = formRef?.value
        return h(
          ElButton,
          {
            props: {
              ...merge(
                {
                  nativeType: listeners?.submit ? 'button' : 'submit',
                  type: 'primary',
                },
                props
              ),
              loading:
                props.loading !== undefined ? props.loading : form?.submitting,
            },
            attrs: context.attrs,
            on: {
              ...listeners,
              click: (e: any) => {
                if (listeners?.click) {
                  if (Array.isArray(listeners.click)) {
                    listeners.click.forEach((fn) => fn(e))
                  } else {
                    listeners.click(e)
                  }
                }
                if (listeners?.submit) {
                  form?.submit(listeners.submit as (e: any) => void)
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
