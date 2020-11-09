<template>
  <Field data-type="array" v-bind="$attrs"></Field>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Field from './Field.vue'

export default defineComponent({
  name: 'VueInternalFieldList',
  components: { Field },
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
  }
})
</script>
