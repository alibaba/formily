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
import { VueComponent, IVoidFieldProps } from '../types'
import ReactiveField from './ReactiveField.vue'
import { defineObservableComponent } from '../utils/define-observable-component'

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
    reactions: Array
  },
  observableSetup<D extends VueComponent, C extends VueComponent>(
    collect,
    props: IVoidFieldProps<D, C>
  ) {
    const form = useForm()
    const parent = useField()
    const basePath = props.basePath ? props.basePath : parent?.address
    const field = useAttach(
      form.createVoidField({
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
