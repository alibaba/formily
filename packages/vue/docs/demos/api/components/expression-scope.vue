<template>
  <FormProvider :form="form">
    <SchemaField :scope="{ $outerScope: 'outer scope value' }">
      <SchemaVoidField x-component="Container">
        <SchemaVoidField
          name="div"
          x-component="Text"
          :x-component-props="{ text: `{{$innerScope + ' ' + $outerScope}}` }"
        />
      </SchemaVoidField>
    </SchemaField>
  </FormProvider>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { createForm } from '@formily/core'
import {
  FormProvider,
  h,
  createSchemaField,
  ExpressionScope,
} from '@formily/vue'

const Container = defineComponent({
  setup(_props, { slots }) {
    return () =>
      h(
        ExpressionScope,
        {
          props: { value: { $innerScope: 'inner scope value' } },
        },
        slots
      )
  },
})
const Text = defineComponent({
  props: ['text'],
  setup(props) {
    return () => h('div', {}, { default: () => props.text })
  },
})
const SchemaField = createSchemaField({
  components: { Container, Text },
})

export default {
  components: { FormProvider, ...SchemaField },
  data() {
    return {
      Text,
      form: createForm(),
    }
  },
}
</script>
