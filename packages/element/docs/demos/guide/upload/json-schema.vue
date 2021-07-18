<template>
  <Form :form="form" :label-col="4" :wrapper-col="10">
    <SchemaField :schema="schema" />
    <FormButtonGroup align-form-item>
      <Submit @submit="onSubmit">提交</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import {
  Form,
  FormItem,
  Upload,
  Submit,
  FormButtonGroup,
} from '@formily/element'
import { Button } from 'element-ui'

const UploadButton = {
  functional: true,
  render(h) {
    return h(Button, {}, '上传图片')
  },
}

const schema = {
  type: 'object',
  properties: {
    base: {
      type: 'array',
      title: '上传',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        action: 'https://formily-vue.free.beeceptor.com/file',
        textContent: '上传',
      },
      required: true,
    },
    card: {
      type: 'array',
      title: '卡片上传',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        listType: 'picture-card',
        action: 'https://formily-vue.free.beeceptor.com/file',
      },
      required: true,
    },
    drag: {
      type: 'array',
      title: '拖拽上传',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        action: 'https://formily-vue.free.beeceptor.com/file',
        textContent: '将文件拖到此处，或者点击上传',
        drag: true,
      },
      required: true,
    },
    custom: {
      type: 'array',
      title: '自定义按钮',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        action: 'https://formily-vue.free.beeceptor.com/file',
      },
      'x-content': UploadButton,
      required: true,
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Upload,
  },
})

export default {
  components: { Form, SchemaField, Submit, FormButtonGroup },
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
