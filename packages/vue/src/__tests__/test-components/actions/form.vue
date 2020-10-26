<template>
  <div>
    <Form
      :actions="actions"
      :effects="handleFieldChange"
      :on-submit="onSubmitHandler"
      :on-reset="onResetHandler"
      :on-change="onChangeHandler"
      :on-validate-failed="onValidateFailedHandler"
    >
      <Input name="aaa" required />
    </Form>
  </div>
</template>

<script>
import Input from './input.vue'
import { Form } from '../../../index'

export default {
  components: { Form, Input },
  props: {
    /* eslint-disable vue/require-default-prop */
    actions: {
      type: Object,
      default: () => ({})
    },
    onSubmitHandler: Function,
    onResetHandler: Function,
    onChangeHandler: Function,
    onValidateFailedHandler: Function
  },
  methods: {
    handleFieldChange($, { setFieldState }) {
      $('onChangeFieldValue').subscribe(({ name, value }) => {
        setFieldState(name, state => {
          state.value = value
        })
      })
    }
  }
}
</script>
