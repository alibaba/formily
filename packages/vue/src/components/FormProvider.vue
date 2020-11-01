<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
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
    const broadcast = new Broadcast()
    provide(BroadcastSymbol, broadcast)
  }
})
</script>
