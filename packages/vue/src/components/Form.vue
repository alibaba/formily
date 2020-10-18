<template>
  <div><slot :form="form"></slot></div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import { useForm } from '../hooks/useForm'
import { FieldSymbol } from '../constants'

export default defineComponent({
  name: 'VueInternalForm',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    defaultValue: {
      type: Object,
      default: () => ({})
    },
    initialValues: {
      type: Object,
      default: () => ({})
    },
    actions: {
      type: Object,
      default: () => ({})
    },
    effects: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      default: () => null
    },
    useDirty: {
      type: Boolean,
      default: false
    },
    editable: {
      type: [Boolean, Function],
      default: true
    },
    validateFirst: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const form = useForm(props)

    provide(FieldSymbol, form)

    return form
  }
})
</script>
