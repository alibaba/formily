<template>
  <Field v-bind="$attrs">
    <template #default="{state, mutators}">
      <div>
        <div>show input</div>
        <input
          data-testid="radio1"
          type="radio"
          value="1"
          :name="$attrs.name"
          :checked="state.value === '1'"
          :disabled="!state.editable"
          @change="mutators.change"
        />
        Yes
        <br />
        <input
          data-testid="radio2"
          type="radio"
          value="0"
          :name="$attrs.name"
          :checked="state.value === '0'"
          :disabled="!state.editable"
          @change="mutators.change"
        />
        No
        <br />
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
