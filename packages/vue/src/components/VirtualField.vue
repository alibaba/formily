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
  /* eslint-disable vue/require-prop-types  */
  /* eslint-disable vue/require-default-prop */
  props: {
    path: {
      type: String,
      default: ''
    },
    name: {
      default: ''
    },
    visible: {
      type: Boolean,
      default: true
    },
    display: {
      type: Boolean,
      default: true
    },
    computeState: Function,
    props: Object
  },
  setup(props) {
    const [res, syncValueBeforeUpdate] = useVirtualField(props)
    const { state, field, props: innerProps, form } = res

    syncValueBeforeUpdate({
      state: 'state',
      'state.props': 'innerProps'
    })

    provide(FieldSymbol, field)

    return {
      state,
      innerProps,
      form
    }
  }
})
</script>
