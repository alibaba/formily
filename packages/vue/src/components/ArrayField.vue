<template>
  <ReactiveField :field="field">
    <slot :field="field" :form="field.form"></slot>
  </ReactiveField>
</template>

<script lang="ts">
import { provide } from '@vue/composition-api'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { FieldSymbol } from '../shared'
import { VueComponent, IFieldProps } from '../types'
import ReactiveField from './ReactiveField.vue'
import { defineObservableComponent } from '../utils/define-observable-component'

export default defineObservableComponent({
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
    decorator: Array,
    component: Array,
    required: Boolean,
    display: String,
    pattern: String,
    validateFirst: Boolean,
    validator: {},
    reactions: Array
  },
  observableSetup<D extends VueComponent, C extends VueComponent>(
    collect,
    props: IFieldProps<D, C>
  ) {
    const form = useForm()
    const parent = useField()
    const field = useAttach(
      form.createArrayField({
        basePath: parent?.address,
        ...props
      })
    )
    provide(FieldSymbol, field)

    return collect({
      field
    })
  }
})
</script>
