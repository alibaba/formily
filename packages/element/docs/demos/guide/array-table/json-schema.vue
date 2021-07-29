<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { Submit, FormItem, ArrayTable, Input, Editable } from '@formily/element'

const fields = createSchemaField({
  components: {
    FormItem,
    ArrayTable,
    Input,
    Editable,
  },
})

export default {
  components: { FormProvider, Submit, ...fields },
  data() {
    const form = createForm()
    const schema = {
      type: 'object',
      properties: {
        array: {
          type: 'array',
          'x-decorator': 'FormItem',
          'x-component': 'ArrayTable',
          items: {
            type: 'object',
            properties: {
              column1: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': {
                  width: 80,
                  title: 'Index',
                  align: 'center',
                },
                properties: {
                  index: {
                    type: 'void',
                    'x-component': 'ArrayTable.Index',
                  },
                },
              },
              column2: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { width: 200, title: 'A1' },
                properties: {
                  a1: {
                    type: 'string',
                    'x-decorator': 'Editable',
                    'x-component': 'Input',
                  },
                },
              },
              column3: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { width: 200, title: 'A2' },
                properties: {
                  a2: {
                    type: 'string',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                },
              },
              column4: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { title: 'A3' },
                properties: {
                  a3: {
                    type: 'string',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                },
              },
              column5: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': {
                  title: 'Operations',
                  prop: 'operations',
                  width: 200,
                  fixed: 'right',
                },
                properties: {
                  item: {
                    type: 'void',
                    'x-component': 'FormItem',
                    properties: {
                      remove: {
                        type: 'void',
                        'x-component': 'ArrayTable.Remove',
                      },
                      moveDown: {
                        type: 'void',
                        'x-component': 'ArrayTable.MoveDown',
                      },
                      moveUp: {
                        type: 'void',
                        'x-component': 'ArrayTable.MoveUp',
                      },
                    },
                  },
                },
              },
            },
          },
          properties: {
            add: {
              type: 'void',
              'x-component': 'ArrayTable.Addition',
              title: '添加条目',
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
    log(...v) {
      console.log(...v)
    },
  },
}
</script>
