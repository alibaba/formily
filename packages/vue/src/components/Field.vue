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
  name: 'Field',
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
    const basePath = props.basePath ? props.basePath : parent?.address
    const field = useAttach(
      form.createField({
        ...props,
        basePath
      })
    )
    provide(FieldSymbol, field)

    return collect({
      field
    })
  }
})
</script>
