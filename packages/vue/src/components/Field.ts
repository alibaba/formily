import { provide, defineComponent, watch, computed } from 'vue-demi'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { FieldSymbol } from '../shared/context'
import ReactiveField from './ReactiveField'
import h from '../shared/h'
import { getRawComponent } from '../utils/getRawComponent'

import type { IFieldProps, DefineComponent } from '../types'

export default defineComponent({
  name: 'Field',
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
  setup(props: IFieldProps, { slots }) {
    const formRef = useForm()
    const parentRef = useField()

    const basePath = computed(() =>
      props.basePath !== undefined ? props.basePath : parentRef?.value?.address
    )
    const createField = () =>
      formRef.value.createField({
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
            field,
            form: field.form,
          })
      }
      return h(ReactiveField, componentData, children)
    }
  },
}) as DefineComponent<IFieldProps>
