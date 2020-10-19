<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, computed } from '@vue/composition-api'
import { BroadcastSymbol } from '../constants'
import { Broadcast } from '../shared'

export default defineComponent({
  props: {
    path: {
      type: String,
      default: ''
    },
    triggerType: {
      type: String,
      default: 'onChange'
    }
  },
  setup() {
    const broadcast = computed<Broadcast>(() => {
      return new Broadcast()
    })

    provide(BroadcastSymbol, broadcast)
  }
})
</script>
