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
  Submit,
  FormItem,
  ArrayTable,
  ArrayTableColumn,
  ArrayTableAddition,
  ArrayTableMoveDown,
  ArrayTableMoveUp,
  ArrayTableRemove,
  ArrayTableIndex,
  ArrayTableSortHandle,
  Input,
  Editable,
} from '@formily/element'

const fields = createSchemaField({
  components: {
    FormItem,
    ArrayTable,
    ArrayTableColumn,
    ArrayTableAddition,
    ArrayTableMoveDown,
    ArrayTableMoveUp,
    ArrayTableRemove,
    ArrayTableIndex,
    ArrayTableSortHandle,
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
                'x-component': 'ArrayTableColumn',
                'x-component-props': {
                  width: 80,
                  title: 'Index',
                  align: 'center',
                },
                properties: {
                  index: {
                    type: 'void',
                    'x-component': 'ArrayTableIndex',
                  },
                },
              },
              column2: {
                type: 'void',
                'x-component': 'ArrayTableColumn',
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
                'x-component': 'ArrayTableColumn',
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
                'x-component': 'ArrayTableColumn',
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
                'x-component': 'ArrayTableColumn',
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
                        'x-component': 'ArrayTableRemove',
                      },
                      moveDown: {
                        type: 'void',
                        'x-component': 'ArrayTableMoveDown',
                      },
                      moveUp: {
                        type: 'void',
                        'x-component': 'ArrayTableMoveUp',
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
              'x-component': 'ArrayTableAddition',
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
