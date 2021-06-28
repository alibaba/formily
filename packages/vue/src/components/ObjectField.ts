import { provide, defineComponent, DefineComponent } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { VueComponent, IFieldProps } from '../types'
import ReactiveField from './ReactiveField'
import { observer } from '@formily/reactive-vue'
import { FieldSymbol } from '../shared/context'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'

type ObjectFieldProps = IFieldProps<VueComponent, VueComponent>

export default observer(
  defineComponent<ObjectFieldProps>({
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
    setup(props: ObjectFieldProps, { slots }) {
      // const { track } = useObserver()
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
  }) as unknown as DefineComponent<ObjectFieldProps>
)
