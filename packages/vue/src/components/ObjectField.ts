import { provide, defineComponent } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import ReactiveField from './ReactiveField'
import { observer } from '@formily/reactive-vue'
import { FieldSymbol } from '../shared/context'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'

import type { IObjectFieldProps, DefineComponent } from '../types'

export default observer(
  defineComponent<IObjectFieldProps>({
    name: 'ObjectField',
    /* eslint-disable vue/require-prop-types  */
    /* eslint-disable vue/require-default-prop */
    props: {
      name: {},
      title: {},
      description: {},
      value: {},
      initialValue: {},
      basePath: {},
      decorator: Array,
      component: Array,
      display: String,
      pattern: String,
      required: {
        type: Boolean,
        default: undefined,
      },
      validateFirst: {
        type: Boolean,
        default: undefined,
      },
      hidden: {
        type: Boolean,
        default: undefined,
      },
      visible: {
        type: Boolean,
        default: undefined,
      },
      editable: {
        type: Boolean,
        default: undefined,
      },
      disabled: {
        type: Boolean,
        default: undefined,
      },
      readOnly: {
        type: Boolean,
        default: undefined,
      },
      readPretty: {
        type: Boolean,
        default: undefined,
      },
      dataSource: {},
      validator: {},
      reactions: [Array, Function],
    },
    setup(props: IObjectFieldProps, { slots }) {
      const formRef = useForm()
      const parentRef = useField()
      const basePath =
        props.basePath !== undefined
          ? props.basePath
          : parentRef?.value?.address
      const fieldRef = useAttach(
        () =>
          formRef.value.createObjectField({
            ...props,
            basePath,
            ...getRawComponent(props),
          }),
        [() => props.name, formRef]
      )

      provide(FieldSymbol, fieldRef)

      return () => {
        const field = fieldRef.value
        const componentData = {
          props: {
            field,
          },
        }
        const children = {
          ...slots,
        }
        if (slots.default) {
          children.default = () =>
            slots.default({
              field: field,
              form: field.form,
            })
        }
        return h(ReactiveField, componentData, children)
      }
    },
  }) as unknown as DefineComponent<IObjectFieldProps>
)
