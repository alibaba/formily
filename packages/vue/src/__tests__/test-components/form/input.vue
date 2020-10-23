<template>
  <Field v-bind="$attrs">
    <template #default="{state, mutators}">
      <div>
        <input
          :data-testid="`input-${$attrs.name}`"
          :disabled="!state.editable"
          :value="state.value || ''"
          @change="mutators.change"
          @blur="mutators.blur"
          @focus="mutators.focus"
        />
        <div data-testid="field-errors">
          {{ state.errors.length > 0 ? state.errors : '' }}
        </div>
        <div data-testid="field-warnings">
          {{ state.warnings.length > 0 ? state.warnings : '' }}
        </div>
      </div>
    </template>
  </Field>
</template>

<script>
import { Field } from '../../../index'

export default {
  components: { Field }
}
</script>
