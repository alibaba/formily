import { Form } from '@formily/core'
import { FormProvider as _FormProvider, createForm } from '@formily/vue'
import type { Form as _ElFormProps } from 'element-ui'
import type { FunctionalComponentOptions, Component } from 'vue'
import { Form as ElFormComponent } from 'element-ui'

const FormProvider = _FormProvider as unknown as Component

export type ElFormProps = _ElFormProps & {
  form?: Form
  component: Component
  onAutoSubmit?: (values: any) => any
}

export const ElForm: FunctionalComponentOptions<ElFormProps> = {
  functional: true,
  render(h, context) {
    const {
      form = createForm({}),
      component = ElFormComponent,
      onAutoSubmit = context.listeners?.autoSubmit,
      ...props
    } = context.props
    const submitHandler = (
      Array.isArray(onAutoSubmit) ? onAutoSubmit[0] : onAutoSubmit
    ) as (values: any) => any
    return h(FormProvider, { props: { form } }, [
      h(
        component,
        {
          ...context.data,
          props,
          nativeOn: {
            submit: (e: Event) => {
              e?.stopPropagation?.()
              e?.preventDefault?.()
              form.submit(submitHandler)
            },
          },
        },
        context.children
      ),
    ])
  },
}

export default ElForm
