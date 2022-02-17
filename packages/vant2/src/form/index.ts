import { Form as FormType, IFormFeedback } from '@formily/core'
import { FormProvider as _FormProvider, h, useForm } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import { FormLayout, FormLayoutProps } from '../form-layout'
import { PreviewText } from '../preview-text'
import { Component, VNode } from 'vue'
import { Form as VanFrom } from 'vant'

const FormProvider = _FormProvider as unknown as Component

export interface FormProps extends FormLayoutProps {
  form?: FormType
  component?: Component
  previewTextPlaceholder: string | (() => VNode)
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Form = defineComponent<FormProps>({
  name: 'FForm',
  props: ['form', 'previewTextPlaceholder'],
  setup(props, { attrs, slots, listeners }) {
    const top = useForm()

    return () => {
      const { form, previewTextPlaceholder = slots?.previewTextPlaceholder } =
        props

      const renderContent = () => {
        return h(
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
                  attrs: {
                    ...attrs,
                  },
                },
                {
                  default: () => [
                    h(
                      VanFrom,
                      {
                        on: listeners,
                      },
                      slots
                    ),
                  ],
                }
              ),
            ],
          }
        )
      }

      if (form) {
        return h(
          FormProvider,
          { props: { form } },
          {
            default: () => renderContent(form),
          }
        )
      }

      if (!top.value) throw new Error('must pass form instance by createForm')

      return renderContent(top.value)
    }
  },
})

export default Form
