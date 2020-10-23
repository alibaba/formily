<template>
  <div><slot :form="internalForm"></slot></div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import { useForm } from '../hooks/useForm'
import { FormSymbol } from '../constants'
import { IFormProps, IFormActions, IFormAsyncActions } from '../types'

export default defineComponent({
  name: 'VueInternalForm',
  /* eslint-disable vue/require-prop-types  */
  /* eslint-disable vue/require-default-prop */
  props: {
    value: {},
    defaultValue: {},
    initialValues: {},
    actions: {},
    effects: {},
    form: Object,
    useDirty: Boolean,
    editable: [Boolean, Function],
    validateFirst: Boolean,
    onChange: Function,
    onSubmit: Function,
    onReset: Function,
    onValidateFailed: Function
  },
  setup(props: IFormProps<any, any, any, IFormActions | IFormAsyncActions>) {
    const form = useForm(props)

    provide(FormSymbol, form)

    return {
      internalForm: form
    }
  }
})
</script>
