<template>
  <div>
    <slot :form="form"></slot>
  </div>
</template>

<script lang="ts">
import { defineObservableComponent } from '../utils/define-observable-component'
import { useForm } from '../hooks'

export default defineObservableComponent({
  name: 'FormConsumer',
  observableSetup(collect) {
    const form = useForm()
    return collect({
      form
    })
  }
})
</script>
