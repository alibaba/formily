import { provide, defineComponent } from 'vue-demi'
import { observer, useObserver } from '@formily/reactive-vue'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { VueComponent, IVoidFieldProps } from '../types'
import ReactiveField from './ReactiveField'
import { FieldSymbol } from '../shared/context'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'

export default observer(defineComponent<IVoidFieldProps<VueComponent, VueComponent>>({
  name: 'VoidField',
  components: { ReactiveField },
  /* eslint-disable vue/require-prop-types  */
  /* eslint-disable vue/require-default-prop */
  props: {
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
  },
  setup(props, { slots }) {
    const { track } = useObserver()
    const form = useForm()
    const parent = useField()
    const basePath = props.basePath !== undefined ? props.basePath : parent?.address
    const fieldRef = useAttach(() => form.createVoidField({
      ...props,
      basePath,
      ...getRawComponent(props)
    }), () => props.name)

    provide(FieldSymbol, fieldRef.value)

    return () => h(
      ReactiveField, 
      {
        props: {
          field: fieldRef.value
        }
      },
      {
        default: track(() => slots.default && slots.default({
          field: fieldRef.value,
          form: fieldRef.value.form
        }))
      }
    )
  }
}))
