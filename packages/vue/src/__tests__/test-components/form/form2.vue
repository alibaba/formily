<template>
  <div>
    <Form :actions="actions" :on-submit="onSubmitHandler">
      <Input name="test-input" required />
      <FormSpy>
        <template #default="{type}">
          <!-- eslint-disable vue/singleline-html-element-content-newline -->
          <!-- eslint-disable-next-line prettier/prettier -->
          <button ref="submit" data-testid="submit" @click="submit">{{ type }}</button>
        </template>
      </FormSpy>
    </Form>
  </div>
</template>

<script>
import Input from './input.vue'
import { Form, FormSpy } from '../../../index'

export default {
  components: { Form, FormSpy, Input },
  /* eslint-disable vue/require-default-prop */
  props: {
    actions: Object
  },
  methods: {
    onSubmitHandler() {
      return new Promise(resolve => {
        setTimeout(resolve)
      })
    },
    async submit() {
      try {
        await this.actions.submit()
      } catch (err) {
        // nothing
      }
    }
  }
}
</script>
