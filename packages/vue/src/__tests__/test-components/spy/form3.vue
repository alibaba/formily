<template>
  <Form :form="form" :actions="actions">
    <Input name="a" required />
    <FormSpy
      :selector="[LifeCycleTypes.ON_FIELD_VALUE_CHANGE]"
      :reducer="reducer"
    >
      <template #default="{state}">
        <!-- eslint-disable vue/singleline-html-element-content-newline -->
        <!-- eslint-disable-next-line prettier/prettier -->
        <div data-testid="spy-value">{{ state.value }}</div>
        <div data-testid="spy-count">{{ state.count }}</div>
      </template>
    </FormSpy>
  </Form>
</template>

<script>
import Input from './input.vue'
import { Form, FormSpy, LifeCycleTypes } from '../../../index'

export default {
  components: { Form, FormSpy, Input },
  /* eslint-disable vue/require-default-prop */
  props: {
    actions: Object,
    form: Object
  },
  data() {
    return {
      LifeCycleTypes
    }
  },
  methods: {
    reducer(state, { payload }) {
      return {
        count: (state.count || 0) + 1,
        value: payload.value
      }
    }
  }
}
</script>
