<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="string_array"
        x-decorator="FormItem"
        title="字符串数组"
        :maxItems="3"
        x-component="ArrayTabs"
      >
        <SchemaStringField
          x-decorator="FormItem"
          required
          x-component="Input"
        />
      </SchemaArrayField>
      <SchemaArrayField
        name="array"
        x-decorator="FormItem"
        title="对象数组"
        :maxItems="3"
        x-component="ArrayTabs"
      >
        <SchemaObjectField>
          <SchemaStringField
            x-decorator="FormItem"
            title="AAA"
            name="aaa"
            required
            x-component="Input"
          />
          <SchemaStringField
            x-decorator="FormItem"
            title="BBB"
            name="bbb"
            required
            x-component="Input"
          />
        </SchemaObjectField>
      </SchemaArrayField>
    </SchemaField>
    <FormButtonGroup>
      <Submit @submit="log">提交</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormItem,
  FormButtonGroup,
  Submit,
  Input,
  Select,
  ArrayTabs,
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    ArrayTabs,
  },
})

export default {
  components: {
    FormProvider,
    FormButtonGroup,
    Button,
    Submit,
    ...SchemaField,
  },

  data() {
    const form = createForm()

    return {
      form,
    }
  },
  methods: {
    log(values) {
      console.log(values)
    },
  },
}
</script>

<style lang="scss" scoped></style>
