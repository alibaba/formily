<template>
  <Form :form="form" :actions="actions">
    <Input name="a" required />
    <FormSpy>
      <template #default="{form: spyForm, type}">
        <!-- eslint-disable vue/singleline-html-element-content-newline -->
        <!-- eslint-disable-next-line prettier/prettier -->
        <div data-testid="spy-form">{{ (typeList.push(type) || true) && spyForm === form }}</div>
        <div data-testid="spy-type">{{ type }}</div>
        <div data-testid="spy-value">{{ spyForm.getFieldValue('a') }}</div>
      </template>
    </FormSpy>
  </Form>
</template>

<script>
import Input from './input.vue'
import { Form, FormSpy } from '../../../index'

export default {
  components: { Form, FormSpy, Input },
  /* eslint-disable vue/require-default-prop */
  props: {
    actions: Object,
    form: Object
  },
  data() {
    return {
      typeList: []
    }
  },
  methods: {
    getTypeList() {
      return this.typeList
    }
  }
}
</script>
