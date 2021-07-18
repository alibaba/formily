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
  ArrayCards,
  ArrayCardsRemove,
  ArrayCardsMoveDown,
  ArrayCardsMoveUp,
  ArrayCardsAddition,
  ArrayCardsIndex,
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
    ArrayCardsRemove,
    ArrayCardsMoveDown,
    ArrayCardsMoveUp,
    ArrayCardsAddition,
    ArrayCardsIndex,
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
          'x-component': 'ArrayCards',
          maxItems: 3,
          'x-decorator': 'FormItem',
          'x-component-props': {
            title: '字符串数组',
          },
          items: {
            type: 'void',
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayCardsIndex',
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
                'x-component': 'ArrayCardsRemove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCardsMoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCardsMoveDown',
              },
            },
          },
          properties: {
            addition: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayCardsAddition',
            },
          },
        },
        array: {
          type: 'array',
          'x-component': 'ArrayCards',
          maxItems: 3,
          'x-decorator': 'FormItem',
          'x-component-props': {
            title: '对象数组',
          },
          items: {
            type: 'object',
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayCardsIndex',
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
                'x-component': 'ArrayCardsRemove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCardsMoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCardsMoveDown',
              },
            },
          },
          properties: {
            addition: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayCardsAddition',
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
