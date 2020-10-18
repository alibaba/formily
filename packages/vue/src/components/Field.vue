<template>
  <div v-if="!state.visible || !state.display"></div>
  <div v-else-if="$scopedSlots.default">
    <slot
      :form="form"
      :state="state"
      :props="innerProps"
      :mutators="mutators"
    ></slot>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import { useField } from '../hooks/useField'
import { FieldSymbol } from '../constants'

export default defineComponent({
  name: 'VueInternalField',
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
  setup(props) {
    const { state, field, props: innerProps, mutators, form } = useField(props)

    provide(FieldSymbol, field)

    return {
      state,
      innerProps,
      form,
      mutators
    }
  }
})
</script>
