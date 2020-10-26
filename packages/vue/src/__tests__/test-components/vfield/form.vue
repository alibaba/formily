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
      <Radio name="a1" required initial-value="1" />
      <FieldBlock name="b">
        <Input name="b.b1" required />
      </FieldBlock>
      <FieldBlock name="c">
        <Input name="c.c1" required />
      </FieldBlock>
    </Form>
  </div>
</template>

<script>
import Radio from './radio.vue'
import Input from './input.vue'
import FieldBlock from './field-block.vue'
import { Form, FormEffectHooks } from '../../../index'

const { onFieldValueChange$ } = FormEffectHooks

export default {
  components: { Form, Radio, Input, FieldBlock },
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
      onFieldValueChange$('a1').subscribe(x => {
        if (x.value === '0') {
          setFieldState('b', state => (state.visible = false))
          setFieldState('c', state => (state.display = false))
        } else if (x.value === '1') {
          setFieldState('b', state => (state.visible = true))
          setFieldState('c', state => (state.display = true))
        }
      })
    }
  }
}
</script>
