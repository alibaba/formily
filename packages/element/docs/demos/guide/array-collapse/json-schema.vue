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
  FormItem,
  FormButtonGroup,
  Submit,
  Input,
  ArrayCollapse,
  ArrayCollapseItem,
  ArrayCollapseRemove,
  ArrayCollapseMoveDown,
  ArrayCollapseMoveUp,
  ArrayCollapseAddition,
  ArrayCollapseIndex,
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
    ArrayCollapseItem,
    ArrayCollapseRemove,
    ArrayCollapseMoveDown,
    ArrayCollapseMoveUp,
    ArrayCollapseAddition,
    ArrayCollapseIndex,
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
          'x-component': 'ArrayCollapse',
          maxItems: 3,
          'x-decorator': 'FormItem',
          items: {
            type: 'object',
            'x-component': 'ArrayCollapseItem',
            'x-component-props': {
              title: '字符串数组',
            },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayCollapseIndex',
              },
              input: {
                type: 'string',
                'x-decorator': 'FormItem',
                title: 'Input',
                required: true,
                'x-component': 'Input',
              },
              remove: {
                type: 'void',
                'x-component': 'ArrayCollapseRemove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCollapseMoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCollapseMoveDown',
              },
            },
          },
          properties: {
            addition: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayCollapseAddition',
            },
          },
        },
        array: {
          type: 'array',
          'x-component': 'ArrayCollapse',
          maxItems: 3,
          'x-decorator': 'FormItem',
          items: {
            type: 'object',
            'x-component': 'ArrayCollapseItem',
            'x-component-props': {
              title: '对象数组',
            },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayCollapseIndex',
              },
              input: {
                type: 'string',
                'x-decorator': 'FormItem',
                title: 'Input',
                required: true,
                'x-component': 'Input',
              },
              remove: {
                type: 'void',
                'x-component': 'ArrayCollapseRemove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCollapseMoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCollapseMoveDown',
              },
            },
          },
          properties: {
            addition: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayCollapseAddition',
            },
          },
        },
        array_unshift: {
          type: 'array',
          'x-component': 'ArrayCollapse',
          maxItems: 3,
          'x-decorator': 'FormItem',
          items: {
            type: 'object',
            'x-component': 'ArrayCollapseItem',
            'x-component-props': {
              title: '对象数组',
            },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayCollapseIndex',
              },
              input: {
                type: 'string',
                'x-decorator': 'FormItem',
                title: 'Input',
                required: true,
                'x-component': 'Input',
              },
              remove: {
                type: 'void',
                'x-component': 'ArrayCollapseRemove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCollapseMoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCollapseMoveDown',
              },
            },
          },
          properties: {
            addition: {
              type: 'void',
              title: '添加条目(unshift)',
              'x-component': 'ArrayCollapseAddition',
              'x-component-props': {
                method: 'unshift',
              },
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
