<template>
  <FormProvider>
    <Form :form="form" :actions="actions">
      <Input name="a" />
      <Consumer ref="consumer"></Consumer>
    </Form>
    <FormSpy>
      <template #default="{form: spyForm}">
        <!-- eslint-disable vue/singleline-html-element-content-newline -->
        <!-- eslint-disable-next-line prettier/prettier -->
        <div data-testid="spy-value">{{ typeof spyForm }}</div>
      </template>
    </FormSpy>
  </FormProvider>
</template>

<script>
import Input from './input.vue'
import Consumer from './consumer.vue'
import { Form, FormSpy, FormProvider } from '../../../index'

export default {
  components: { Form, FormSpy, FormProvider, Input, Consumer },
  /* eslint-disable vue/require-default-prop */
  props: {
    actions: Object,
    form: Object
  },
  methods: {
    getBroadcast() {
      return this.$refs.consumer.getBroadcast()
    }
  }
}
</script>
