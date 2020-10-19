<template>
  <div v-if="!state.visible || !state.display"></div>
  <div v-else-if="$scopedSlots.default">
    <slot :form="form" :state="state" :props="innerProps"></slot>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import { FieldSymbol } from '../constants'
import { useVirtualField } from '../hooks/useVirtualField'

export default defineComponent({
  name: 'VueInternalVirtualField',
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { state, field, props: innerProps, form } = useVirtualField(props)
    provide(FieldSymbol, field)

    return {
      state,
      innerProps,
      form
    }
  }
})
</script>
