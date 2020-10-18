<template>
  <Form
    :actions="actions"
    :effects="handleFieldChange"
    @submit="handleSubmit"
    @reset="handleSubmit"
    @change="handleChange"
    @validate-failed="handleValidateFailed"
  >
    <Radio name="a1" required />
    <Input name="a2" required />
    <Input name="a3" required />
  </Form>
</template>

<script>
import Radio from './radio.vue'
import Input from './input.vue'

export default {
  components: { Radio, Input },
  props: {
    actions: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleFieldChange($, { setFieldState }) {
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
