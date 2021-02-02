import { provide } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { VueComponent, IVoidFieldProps } from '../types'
import ReactiveField from './ReactiveField'
import { defineObservableComponent } from '../utils/define-observable-component'
import { FieldSymbol } from '../shared/context'
import h from '../utils/compatible-create-element'
import { getRowComponentFromProps } from '../utils/get-row-component-from-props'

export default defineObservableComponent({
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
    reactions: Array,
  },
  observableSetup<D extends VueComponent, C extends VueComponent>(
    collect,
    props: IVoidFieldProps<D, C>,
    { slots }
  ) {
    const form = useForm()
    const parent = useField()
    const basePath = props.basePath ? props.basePath : parent?.address
    const field = useAttach(
      form.createVoidField({
        ...props,
        basePath,
        ...getRowComponentFromProps(props)
      })
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