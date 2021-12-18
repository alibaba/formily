import { provide, defineComponent, computed, watch } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import ReactiveField from './ReactiveField'
import { FieldSymbol } from '../shared/context'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'

import type { IVoidFieldProps, DefineComponent } from '../types'

export default defineComponent({
  name: 'VoidField',
  props: [
    'name',
    'basePath',
    'title',
    'description',
    'display',
    'pattern',
    'hidden',
    'visible',
    'editable',
    'disabled',
    'readOnly',
    'readPretty',
    'decorator',
    'component',
    'reactions',
    'content',
    'data',
  ],
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
}) as DefineComponent<IVoidFieldProps>
