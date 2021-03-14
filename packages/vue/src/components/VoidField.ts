import { provide, markRaw } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { VueComponent, IVoidFieldProps } from '../types'
import ReactiveField from './ReactiveField'
import { defineObservableComponent } from '../shared/define-observable-component'
import { FieldSymbol } from '../shared/context'
import h from '../shared/compatible-create-element'
import { getRowComponentFromProps } from '../utils/get-row-component-from-props'

interface VoidField extends IVoidFieldProps<VueComponent, VueComponent>, Vue {}

export default defineObservableComponent<VoidField>({
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
  observableSetup(
    collect,
    props,
    { slots }
  ) {
    const form = useForm()
    const parent = useField()
    const basePath = props.basePath !== undefined ? props.basePath : parent?.address
    const field = useAttach(
      markRaw(form.createVoidField({
        ...props,
        basePath,
        ...getRowComponentFromProps(props)
      }))
    )
    provide(FieldSymbol, field)

    collect({
      field,
      form: field.form
    })

    return () => h(
      ReactiveField, 
      {
        props: {
          field
        }
      },
      {
        default: () => slots.default && slots.default({
          field,
          form: field.form
        })
      }
    )
  }
})
