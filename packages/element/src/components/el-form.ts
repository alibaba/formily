import { FormProvider as _FormProvider, createForm } from '@formily/vue'
import { getComponentByTag } from '../shared'

import type { Form as _ElFormProps } from 'element-ui'
import type { FunctionalComponentOptions, Component } from 'vue'

const FormProvider = _FormProvider as unknown as Component

export type ElFormProps = _ElFormProps & {
  form?: Formily.Core.Models.Form
  component: Component
  onAutoSubmit?: (values: any) => any
}

const ElFormComponent = getComponentByTag('el-form')

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
