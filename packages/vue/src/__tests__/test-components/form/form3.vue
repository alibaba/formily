<template>
  <div>
    <Form v-if="visible" :actions="actions" :on-submit="onSubmitHandler">
      <Input name="test-input" required />
      <FormSpy>
        <template #default="{type}">
          <!-- eslint-disable vue/singleline-html-element-content-newline -->
          <!-- eslint-disable-next-line prettier/prettier -->
          <button data-testid="submit" @click="() => actions.submit()">{{ type }}</button>
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
  data() {
    return {
      visible: true
    }
  },
  methods: {
    onSubmitHandler() {
      return new Promise(resolve => {
        this.hide()
        setTimeout(resolve)
      })
    },
    hide() {
      this.visible = false
    }
  }
}
</script>
