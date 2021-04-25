import { provide, defineComponent } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { VueComponent, IVoidFieldProps } from '../types'
import ReactiveField from './ReactiveField'
import { FieldSymbol } from '../shared/context'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'

export default defineComponent<IVoidFieldProps<VueComponent, VueComponent>>({
  name: 'VoidField',
  /* eslint-disable vue/require-prop-types  */
  /* eslint-disable vue/require-default-prop */
  props: ({
    name: {},
    title: {},
    description: {},
    basePath: {},
    decorator: Array,
    component: Array,
    display: String,
    pattern: String,
    hidden: {
      type: Boolean,
      default: undefined
    },
    visible: {
      type: Boolean,
      default: undefined
    },
    editable: {
      type: Boolean,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    readOnly: {
      type: Boolean,
      default: undefined
    },
    readPretty: {
      type: Boolean,
      default: undefined
    },
    reactions: [Array, Function],
  } as any),
  setup(props: IVoidFieldProps<VueComponent, VueComponent>, { slots }) {
    // const { track } = useObserver()
    const formRef = useForm()
    const parentRef = useField()
    const basePath = props.basePath !== undefined ? props.basePath : parentRef?.value?.address
    const fieldRef = useAttach(() => formRef.value.createVoidField({
      ...props,
      basePath,
      ...getRawComponent(props)
    }), [() => props.name, formRef])

    provide(FieldSymbol, fieldRef)

    return () => h(
      ReactiveField, 
      {
        props: {
          field: fieldRef.value
        }
      },
      {
        default: () => slots.default && slots.default({
          field: fieldRef.value,
          form: fieldRef.value.form
        })
      }
    )
  }
})
