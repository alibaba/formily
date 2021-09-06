<template>
  <FormProvider :form="form">
    <FormLayout :labelCol="6" :wrapperCol="16">
      <SchemaField :schema="schema" />
      <FormButtonGroup alignFormItem>
        <Submit onSubmit="log">提交</Submit>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import {
  FormButtonGroup,
  FormLayout,
  FormItem,
  Input,
  Submit,
  Space,
} from '@formily/element'

const { SchemaField } = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    Space,
  },
})

export default {
  components: {
    FormProvider,
    FormButtonGroup,
    FormLayout,
    SchemaField,
    Submit,
  },
  data() {
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'void',
          title: '姓名',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            asterisk: true,
            feedbackLayout: 'none',
          },
          'x-component': 'Space',
          properties: {
            firstName: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              required: true,
            },
            lastName: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              required: true,
            },
          },
        },
        texts: {
          type: 'void',
          title: '文本串联',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            asterisk: true,
            feedbackLayout: 'none',
          },
          'x-component': 'Space',
          properties: {
            aa: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                addonAfter: '单位',
              },
              'x-component': 'Input',
              required: true,
            },
            bb: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                addonAfter: '单位',
              },
              'x-component': 'Input',
              required: true,
            },
            cc: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                addonAfter: '单位',
              },
              'x-component': 'Input',
              required: true,
            },
          },
        },

        textarea: {
          type: 'string',
          title: '文本框',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {
            style: {
              width: 400,
            },
          },
          required: true,
        },
      },
    }

    const form = createForm()

    return {
      form,
      schema,
    }
  },
  methods: {
    logs(value) {
      console.log(value)
    },
  },
}
</script>
