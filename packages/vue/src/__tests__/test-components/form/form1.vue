<template>
  <div>
    <Form
      :actions="actions"
      :effects="handleFieldChange"
      :on-submit="onSubmitHandler"
      :on-validate-failed="onValidateFailedHandler"
    >
      <Input name="test-input" required />
    </Form>
  </div>
</template>

<script>
import Input from './input.vue'
import { Form, FormEffectHooks } from '../../../index'

const { onFieldValueChange$ } = FormEffectHooks

export default {
  components: { Form, Input },
  /* eslint-disable vue/require-default-prop */
  props: {
    actions: Object,
    onValidateFailedHandler: Function,
    onSubmitHandler: Function
  },
  methods: {
    handleFieldChange($) {
      onFieldValueChange$('test-input').subscribe(() => {
        $.setFieldState('test-input', state => {
          state.value = 'hello world'
        })
      })
    }
  }
}
</script>
