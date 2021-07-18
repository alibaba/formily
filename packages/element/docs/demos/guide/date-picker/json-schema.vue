<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, DatePicker, Submit } from '@formily/element'

const schema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      title: '普通日期',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    week: {
      type: 'string',
      title: '周',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'week',
      },
    },
    month: {
      type: 'string',
      title: '月',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'month',
      },
    },
    year: {
      type: 'string',
      title: '年',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'year',
      },
    },
    dateTime: {
      type: 'string',
      title: '日期时间',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'datetime',
      },
    },
    dates: {
      type: 'array',
      title: '多个日期',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'dates',
      },
    },
    dateRange: {
      type: 'string',
      title: '日期范围',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'daterange',
      },
    },
    monthRange: {
      type: 'string',
      title: '月范围',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'monthrange',
      },
    },
    dateTimeRange: {
      type: 'string',
      title: '日期时间范围',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        type: 'datetimerange',
      },
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    DatePicker,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
    return {
      form,
      schema,
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
