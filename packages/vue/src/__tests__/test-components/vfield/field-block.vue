<template>
  <VirtualField v-bind="$attrs">
    <fieldset>
      <legend>{{ `block-${$attrs.name}` }}</legend>
      <slot></slot>
    </fieldset>
  </VirtualField>
</template>

<script>
import { VirtualField } from '../../../index'

export default {
  components: { VirtualField }
}
</script>
