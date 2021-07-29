import { Form as FormType, IFormFeedback } from '@formily/core'
import { FormProvider as _FormProvider, h } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import { FormLayout, FormLayoutProps } from '../form-layout'
import { PreviewText } from '../preview-text'
import { Component, VNode } from 'vue'

const FormProvider = _FormProvider as unknown as Component

export interface FormProps extends FormLayoutProps {
  form: FormType
  component?: Component
  previewTextPlaceholder: string | (() => VNode)
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Form = defineComponent<FormProps>({
  name: 'FForm',
  props: [
    'form',
    'component',
    'previewTextPlaceholder',
    'onAutoSubmit',
    'onAutoSubmitFailed',
  ],
  setup(props, { attrs, slots, listeners }) {
    return () => {
      const {
        form,
        component = 'form',
        onAutoSubmit = listeners?.autoSubmit,
        onAutoSubmitFailed = listeners?.autoSubmitFailed,
        previewTextPlaceholder = slots?.previewTextPlaceholder,
      } = props
      return h(
        FormProvider,
        { props: { form } },
        {
          default: () =>
            h(
              PreviewText.Placeholder,
              {
                props: {
                  value: previewTextPlaceholder,
                },
              },
              {
                default: () => [
                  h(
                    FormLayout,
                    {
                      attrs,
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
            ),
        }
      )
    }
  },
})

export default Form
