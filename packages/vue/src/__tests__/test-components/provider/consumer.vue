<template>
  <div>consumer</div>
</template>

<script>
import { BroadcastSymbol } from '../../../constants'

export default {
  inject: {
    broadcast: {
      from: BroadcastSymbol
    }
  },
  methods: {
    getBroadcast() {
      return this.broadcast
    }
  }
}
</script>
