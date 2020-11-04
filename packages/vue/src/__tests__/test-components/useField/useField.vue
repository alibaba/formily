<template>
  <!-- eslint-disable vue/singleline-html-element-content-newline -->
  <!-- eslint-disable-next-line prettier/prettier -->
  <div>
    <div data-testid="field-errors">{{ state.errors.join('') }}</div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useField from '../../../hooks/useField'

export default defineComponent({
  /* eslint-disable vue/require-prop-types  */
  /* eslint-disable vue/require-default-prop */
  props: ['initialProps'],
  setup({ initialProps }) {
    const [res, syncValueBeforeUpdate] = useField(initialProps)
    const { state = {}, field, props: innerProps, mutators, form } = res

    syncValueBeforeUpdate({
      field: 'field',
      state: 'state',
      mutators: 'mutators',
      'state.props': 'innerProps'
    })

    return {
      state,
      field,
      innerProps,
      form,
      mutators
    }
  },
  methods: {
    getResult() {
      return {
        state: this.state,
        field: this.field,
        props: this.innerProps,
        form: this.form,
        mutators: this.mutators
      }
    }
  }
})
</script>
