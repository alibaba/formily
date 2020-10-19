<template>
  <div>
    <slot v-bind="layoutItem"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useLayoutItem } from '../hooks/useLayout'

export default defineComponent({
  setup(props) {
    const layoutItem = useLayoutItem(props)
    return {
      layoutItem
    }
  }
})
</script>
