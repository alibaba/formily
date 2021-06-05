import { FormProvider as _FormProvider, createForm, h } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { FormLayout, FormLayoutProps } from './form-layout'

import type { Component } from 'vue'

const FormProvider = _FormProvider as unknown as Component

export type FormProps = FormLayoutProps & {
  form?: Formily.Core.Models.Form
  component: Component
  onAutoSubmit?: (values: any) => any
}

export const Form = defineComponent({
  setup(empty, { attrs, slots, listeners }) {
    const {
      form = createForm({}),
      component = 'form',
      onAutoSubmit = listeners?.autoSubmit,
      ...props
    } = attrs as FormProps
    const submitHandler = (
      Array.isArray(onAutoSubmit) ? onAutoSubmit[0] : onAutoSubmit
    ) as (values: any) => any
    return () =>
      h(
        FormProvider,
        { props: { form } },
        {
          default: () => [
            h(
              FormLayout,
              {
                props,
              },
              {
                default: () => [
                  h(
                    component,
                    {
                      on: {
                        submit: (e: Event) => {
                          e?.stopPropagation?.()
                          e?.preventDefault?.()
                          form.submit(submitHandler)
                        },
                      },
                    },
                    slots
                  ),
                ],
              }
            ),
          ],
        }
      )
  },
})
