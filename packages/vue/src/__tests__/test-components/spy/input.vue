<template>
  <Field v-bind="$attrs">
    <template #default="{state, mutators}">
      <input
        data-testid="test-input"
        :value="state.value || ''"
        @change="mutators.change"
      />
    </template>
  </Field>
</template>

<script>
import { Field } from '../../../index'

export default {
  components: { Field }
}
</script>
