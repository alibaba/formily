<template>
  <div>
    <Form
      :actions="actions"
      :effects="handleFieldChange"
      :on-submit="handleSubmit"
      :on-reset="handleSubmit"
      :on-change="handleChange"
      :on-validate-failed="handleValidateFailed"
    >
      <Radio name="a1" required initial-value="1" />
      <Input name="a2" required />
      <Input name="a3" required />
    </Form>
  </div>
</template>

<script>
import Radio from './radio.vue'
import Input from './input.vue'
import { Form, FormEffectHooks } from '../../../index'

const { onFieldValueChange$ } = FormEffectHooks

export default {
  components: { Form, Radio, Input },
  props: {
    actions: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleFieldChange($, actions) {
      const { setFieldState } = actions
      // run effect after form mount
      onFieldValueChange$('a1').subscribe(x => {
        if (x.value === '0') {
          setFieldState('a2', state => (state.visible = false))
          setFieldState('a3', state => (state.display = false))
        } else if (x.value === '1') {
          setFieldState('a2', state => (state.visible = true))
          setFieldState('a3', state => (state.display = true))
        }
      })
    },
    handleSubmit() {},
    handleReset() {},
    handleChange() {},
    handleValidateFailed() {}
  }
}
</script>
