<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="date"
        title="普通日期"
        x-decorator="FormItem"
        x-component="DatePicker"
      />
      <SchemaStringField
        name="week"
        title="周"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'week',
        }"
      />
      <SchemaStringField
        name="month"
        title="月"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'month',
        }"
      />
      <SchemaStringField
        name="year"
        title="年"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'year',
        }"
      />
      <SchemaStringField
        name="dateTime"
        title="日期时间"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'datetime',
        }"
      />
      <SchemaArrayField
        name="dates"
        title="多个日期"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'dates',
        }"
      />
      <SchemaArrayField
        name="dateRange"
        title="日期范围"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'daterange',
        }"
      />
      <SchemaArrayField
        name="monthRange"
        title="月范围"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'monthrange',
        }"
      />
      <SchemaArrayField
        name="dateTimeRange"
        title="日期时间范围"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'datetimerange',
        }"
      />
    </SchemaField>
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, DatePicker, Submit } from '@formily/element'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    DatePicker,
  },
})

export default {
  components: { Form, ...fields, Submit },
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
l
