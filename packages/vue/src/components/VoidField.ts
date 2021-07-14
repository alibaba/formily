import { provide, defineComponent, computed, watch } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import ReactiveField from './ReactiveField'
import { FieldSymbol } from '../shared/context'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'

import type { IVoidFieldProps, DefineComponent } from '../types'

export default defineComponent<IVoidFieldProps>({
  name: 'VoidField',
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
    reactions: [Array, Function],
  },
  setup(props: IVoidFieldProps, { slots }) {
    const formRef = useForm()
    const parentRef = useField()

    const basePath = computed(() =>
      props.basePath !== undefined ? props.basePath : parentRef?.value?.address
    )
    const createField = () =>
      formRef.value.createVoidField({
        ...props,
        basePath: basePath.value,
        ...getRawComponent(props),
      })
    const [fieldRef, checker] = useAttach(createField())
    watch(
      () => props,
      () => (fieldRef.value = checker(createField())),
      { deep: true }
    )
    watch([formRef, parentRef], () => (fieldRef.value = checker(createField())))

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
}) as unknown as DefineComponent<IVoidFieldProps>
