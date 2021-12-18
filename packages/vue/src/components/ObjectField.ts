import { provide, defineComponent, computed, watch } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import ReactiveField from './ReactiveField'
import { FieldSymbol } from '../shared/context'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'

import type { IObjectFieldProps, DefineComponent } from '../types'

export default defineComponent({
  name: 'ObjectField',
  props: [
    'name',
    'basePath',
    'title',
    'description',
    'value',
    'initialValue',
    'required',
    'display',
    'pattern',
    'hidden',
    'visible',
    'editable',
    'disabled',
    'readOnly',
    'readPretty',
    'dataSource',
    'validateFirst',
    'validator',
    'decorator',
    'component',
    'reactions',
    'content',
    'data',
  ],
  setup(props: IObjectFieldProps, { slots }) {
    const formRef = useForm()
    const parentRef = useField()

    const basePath = computed(() =>
      props.basePath !== undefined ? props.basePath : parentRef?.value?.address
    )
    const createField = () =>
      formRef.value.createObjectField({
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
}) as DefineComponent<IObjectFieldProps>
