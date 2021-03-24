import { provide, defineComponent } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { VueComponent, IFieldProps } from '../types'
import ReactiveField from './ReactiveField'
import { FieldSymbol } from '../shared/context'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'
import { observer, useObserver } from '@formily/reactive-vue'

export default observer(defineComponent<IFieldProps<VueComponent, VueComponent>>({
  name: 'ArrayField',
  components: { ReactiveField },
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
      default: undefined
    },
    validateFirst: {
      type: Boolean,
      default: undefined
    },
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
    dataSource: {},
    validator: {},
    reactions: [Array, Function],
  },
  setup(props, { slots }) {
    const { track } = useObserver()
    const form = useForm()
    const parent = useField()
    const basePath = props.basePath !== undefined ? props.basePath : parent?.address
    const fieldRef = useAttach(() => form.createArrayField({
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
