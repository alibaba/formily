<template>
  <Field data-type="array" v-bind="$attrs"></Field>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Field from './Field.vue'

export default defineComponent({
  name: 'VueInternalFieldList',
  components: { Field },
  props: {
    path: {
      type: String,
      default: ''
    },
    triggerType: {
      type: String,
      default: 'onChange'
    }
  }
})
</script>
