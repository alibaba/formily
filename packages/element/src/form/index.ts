import { FormProvider as _FormProvider, h } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { FormLayout, FormLayoutProps } from '../form-layout'

import type { Component } from 'vue'

const FormProvider = _FormProvider as unknown as Component

export type FormProps = FormLayoutProps & {
  form: Formily.Core.Models.Form
  component?: Component
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: Formily.Core.Types.IFormFeedback[]) => void
}

export const Form = defineComponent({
  setup(empty, { attrs, slots, listeners }) {
    const {
      form,
      component = 'form',
      onAutoSubmit = listeners?.autoSubmit,
      onAutoSubmitFailed = listeners?.autoSubmitFailed,
      ...props
    } = attrs as FormProps

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
                          form
                            .submit(onAutoSubmit as (e: any) => void)
                            .catch(onAutoSubmitFailed as (e: any) => void)
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
