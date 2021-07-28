<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <FormButtonGroup>
      <Submit @submit="log">提交</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormButtonGroup,
  FormItem,
  Submit,
  Input,
  DatePicker,
  Editable,
} from '@formily/element'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    DatePicker,
    Editable,
  },
})

const schema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      title: '日期',
      'x-decorator': 'Editable',
      'x-component': 'DatePicker',
    },
    input: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'Editable',
      'x-component': 'Input',
    },
    void: {
      type: 'void',
      title: '虚拟节点容器',
      'x-component': 'Editable.Popover',
      'x-reactions':
        "{{(field) => field.title = field.query('.void.date2').get('value') || field.title}}",
      properties: {
        date2: {
          type: 'string',
          title: '日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
        input2: {
          type: 'string',
          title: '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
    iobject: {
      type: 'object',
      title: '对象节点容器',
      'x-component': 'Editable.Popover',
      'x-reactions':
        '{{(field) => field.title = field.value && field.value.date || field.title}}',
      properties: {
        date: {
          type: 'string',
          title: '日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
        input: {
          type: 'string',
          title: '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
}

export default {
  components: {
    FormButtonGroup,
    FormProvider,
    Submit,
    SchemaField,
  },

  data() {
    const form = createForm()

    return {
      schema,
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
