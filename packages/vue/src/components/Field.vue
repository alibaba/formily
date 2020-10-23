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
import { IFieldStateUIProps } from '../types'

export default defineComponent({
  name: 'VueInternalField',
  /* eslint-disable vue/require-prop-types  */
  /* eslint-disable vue/require-default-prop */
  props: {
    path: {
      default: ''
    },
    name: {
      default: ''
    },
    value: {},
    values: Array,
    initialValue: {},
    props: Object,
    rules: {},
    required: Boolean,
    editable: {
      type: Boolean,
      default: true
    },
    unmountRemoveValue: Boolean,
    visible: {
      type: Boolean,
      default: true
    },
    display: {
      type: Boolean,
      default: true
    },
    dataType: String,
    computeState: Function,
    getValueFromEvent: Function,
    triggerType: {
      type: String,
      default: 'onChange'
    }
  },
  setup(props: IFieldStateUIProps) {
    const { state = {}, field, props: innerProps, mutators, form } = useField(
      props
    )

    provide(FieldSymbol, field)

    return {
      state,
      field,
      innerProps,
      form,
      mutators
    }
  }
})
</script>
