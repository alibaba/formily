<template>
  <div>
    <slot v-if="this.$scopedSlots.default" v-bind="childProps"></slot>
    <slot v-if="this.$slots.default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useFormSpy } from '../hooks/useFormSpy'

export default defineComponent({
  name: 'VueInternalFormSpy',
  props: {
    selector: {
      type: String,
      default: '*'
    },
    reducer: {
      type: Function,
      default: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
  },
  setup(props) {
    return {
      childProps: useFormSpy(props)
    }
  }
})
</script>
