<template>
  <div>
    <slot v-bind="layoutItem"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useLayoutItem } from '../hooks/useLayout'

export default defineComponent({
  props: {
    /* eslint-disable vue/require-prop-types  */
    /* eslint-disable vue/require-default-prop */
    span: Number,
    full: Boolean,
    labelAlign: String,
    inset: Boolean,
    labelWidth: Number,
    wrapperWidth: Number,
    labelCol: Number,
    wrapperCol: Number
  },
  setup(props) {
    const layoutItem = useLayoutItem(props)
    return {
      layoutItem
    }
  }
})
</script>
