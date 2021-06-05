<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField
        x-component="FormLayout"
        :x-component-props="{
          labelCol: 6,
          wrapperCol: 10,
        }"
      >
        <SchemaStringField
          name="input"
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
          :required="true"
        />
        <SchemaStringField
          name="select"
          title="选择框"
          x-decorator="FormItem"
          x-component="Select"
          :required="true"
        />
      </SchemaVoidField>
    </SchemaField>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { components } from '@formily/element'

const fields = createSchemaField({ components })

export default {
  components: { FormProvider, ...fields },
  data() {
    const form = createForm()
    return {
      form,
    }
  },
}
</script>
