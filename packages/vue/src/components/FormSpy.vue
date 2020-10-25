<template>
  <div>
    <slot
      v-if="this.$scopedSlots.default"
      :form="form"
      :type="type"
      :state="state"
    ></slot>
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
      type: [String, Array],
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
    const { form, type, state } = useFormSpy(props)
    return { form, type, state }
  }
})
</script>
