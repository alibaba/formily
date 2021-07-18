<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField
        x-component="FormGrid"
        :x-component-props="{
          maxColumns: 3,
          minColumns: 2,
        }"
      >
        <SchemaStringField
          name="aaa"
          title="aaa"
          x-decorator="FormItem"
          :x-decorator-props="{ gridSpan: 2 }"
          x-component="Input"
        />
        <SchemaStringField
          name="bbb"
          title="bbb"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="ccc"
          title="ccc"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="ddd"
          title="ddd"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="eee"
          title="eee"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="fff"
          title="fff"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          name="ggg"
          title="ggg"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaVoidField>
    </SchemaField>
    <Submit @submit="onSubmit">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, Input, Submit, FormGrid } from '@formily/element'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
})

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    return {
      form,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
