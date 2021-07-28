<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormButtonGroup,
  Submit,
  FormItem,
  Space,
  Input,
  Select,
  DatePicker,
  ArrayItems,
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Space,
    Input,
    Select,
    DatePicker,
    ArrayItems,
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
    const schema = {
      type: 'object',
      properties: {
        string_array: {
          type: 'array',
          'x-component': 'ArrayItems',
          'x-decorator': 'FormItem',
          title: '字符串数组',
          items: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.SortHandle',
              },
              input: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              remove: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Remove',
              },
            },
          },
          properties: {
            add: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayItems.Addition',
            },
          },
        },
        array: {
          type: 'array',
          'x-component': 'ArrayItems',
          'x-decorator': 'FormItem',
          title: '对象数组',
          items: {
            type: 'object',
            properties: {
              space: {
                type: 'void',
                'x-component': 'Space',
                properties: {
                  sort: {
                    type: 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.SortHandle',
                  },
                  date: {
                    type: 'string',
                    title: '日期',
                    'x-decorator': 'FormItem',
                    'x-component': 'DatePicker',
                    'x-component-props': {
                      type: 'daterange',
                      style: {
                        width: '250px',
                      },
                    },
                  },
                  input: {
                    type: 'string',
                    title: '输入框',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                  select: {
                    type: 'string',
                    title: '下拉框',
                    enum: [
                      { label: '选项1', value: 1 },
                      { label: '选项2', value: 2 },
                    ],
                    'x-decorator': 'FormItem',
                    'x-component': 'Select',
                    'x-component-props': {
                      style: {
                        width: '250px',
                      },
                    },
                  },
                  remove: {
                    type: 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Remove',
                  },
                },
              },
            },
          },
          properties: {
            add: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayItems.Addition',
            },
          },
        },
        array2: {
          type: 'array',
          'x-component': 'ArrayItems',
          'x-decorator': 'FormItem',
          'x-component-props': { style: { width: '600px' } },
          title: '对象数组',
          items: {
            type: 'object',
            'x-decorator': 'ArrayItems.Item',
            properties: {
              space: {
                type: 'void',
                'x-component': 'Space',
                properties: {
                  sort: {
                    type: 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.SortHandle',
                  },
                  date: {
                    type: 'string',
                    title: '日期',
                    'x-decorator': 'FormItem',
                    'x-component': 'DatePicker',
                    'x-component-props': {
                      type: 'daterange',
                      style: {
                        width: '250px',
                      },
                    },
                  },
                  input: {
                    type: 'string',
                    title: '输入框',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                  remove: {
                    type: 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Remove',
                  },
                },
              },
            },
          },
          properties: {
            add: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayItems.Addition',
            },
          },
        },
      },
    }

    return {
      form,
      schema,
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
