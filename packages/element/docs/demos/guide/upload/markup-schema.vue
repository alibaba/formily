<template>
  <Form :form="form" :label-col="4" :wrapper-col="10">
    <SchemaField>
      <SchemaArrayField
        name="upload"
        title="上传"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          action: 'https://formily-vue.free.beeceptor.com/file',
          textContent: '上传',
        }"
        required
      />
      <SchemaArrayField
        name="upload2"
        title="卡片上传"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          listType: 'picture-card',
          action: 'https://formily-vue.free.beeceptor.com/file',
        }"
        required
      />
      <SchemaArrayField
        name="upload3"
        title="拖拽上传"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          action: 'https://formily-vue.free.beeceptor.com/file',
          textContent: '将文件拖到此处，或者点击上传',
          drag: true,
        }"
        required
      />
      <SchemaArrayField
        name="custom"
        title="自定义按钮"
        x-decorator="FormItem"
        x-component="Upload"
        :x-component-props="{
          action: 'https://formily-vue.free.beeceptor.com/file',
        }"
        required
        :x-content="UploadButton"
      />
    </SchemaField>
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

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Upload,
  },
})

export default {
  components: { Form, ...fields, Submit, FormButtonGroup },
  data() {
    return {
      UploadButton,
      form,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
