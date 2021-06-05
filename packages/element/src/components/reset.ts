import { observer, h, useForm } from '@formily/vue'
import { getComponentByTag } from '../shared'
import { defineComponent } from 'vue-demi'

import type { Button as IElButton } from 'element-ui'

export type ResetProps = Formily.Core.Types.IFieldResetOptions & IElButton

const ElButton = getComponentByTag('el-button')

export const Reset = observer(
  defineComponent<ResetProps>({
    props: [
      'forceClear',
      'validate',
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
            props: props,
            attrs: context.attrs,
            on: {
              ...listeners,
              click: (e: any) => {
                if (listeners?.click) {
                  listeners.click(e)
                }
                form?.reset('*', {
                  forceClear: props.forceClear,
                  validate: props.validate,
                })
              },
            },
          },
          slots
        )
      }
    },
  })
)
