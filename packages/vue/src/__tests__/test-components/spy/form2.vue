<template>
  <Form :form="form" :actions="actions">
    <Input name="a" required />
    <FormSpy :selector="[LifeCycleTypes.ON_FIELD_VALUE_CHANGE]">
      <template #default="{form: spyForm, type}">
        <!-- eslint-disable vue/singleline-html-element-content-newline -->
        <!-- eslint-disable-next-line prettier/prettier -->
        <div data-testid="spy-type">{{ (typeList.push(type) || true) && type }}</div>
        <div data-testid="spy-value">{{ spyForm.getFieldValue('a') }}</div>
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
      typeList: [],
      LifeCycleTypes
    }
  },
  methods: {
    getTypeList() {
      return this.typeList
    }
  }
}
</script>
