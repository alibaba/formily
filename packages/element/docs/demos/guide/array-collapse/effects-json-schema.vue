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
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
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
        array: {
          type: 'array',
          'x-component': 'ArrayCollapse',
          maxItems: 3,
          title: '对象数组',
          items: {
            type: 'object',
            'x-component': 'ArrayCollapse.Item',
            'x-component-props': {
              header: '对象数组',
            },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayCollapse.Index',
              },
              aa: {
                type: 'string',
                'x-decorator': 'FormItem',
                title: 'AA',
                required: true,
                'x-component': 'Input',
                description: '输入123',
              },
              bb: {
                type: 'string',
                title: 'BB',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-reactions': [
                  {
                    dependencies: ['.aa'],
                    when: "{{$deps[0] != '123'}}",
                    fulfill: {
                      schema: {
                        title: 'BB',
                        'x-disabled': true,
                      },
                    },
                    otherwise: {
                      schema: {
                        title: 'Changed',
                        'x-disabled': false,
                      },
                    },
                  },
                ],
              },
              remove: {
                type: 'void',
                'x-component': 'ArrayCollapse.Remove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayCollapse.MoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayCollapse.MoveDown',
              },
            },
          },
          properties: {
            addition: {
              type: 'void',
              title: '添加条目',
              'x-component': 'ArrayCollapse.Addition',
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
