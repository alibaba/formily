<template>
  <FormLayout :labelCol="6" :wrapperCol="10">
    <FormProvider :form="form">
      <SchemaField>
        <SchemaStringField
          x-decorator="FormItem"
          title="文本预览"
          x-component="PreviewInputText"
          default="Hello world"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="选择项预览"
          x-component="PreviewSelectText"
          :x-component-props="{
            multiple: true,
          }"
          :default="['123', '222']"
          :enum="[
            { label: 'A111', value: '123' },
            {
              label: 'A222',
              value: '222',
            },
          ]"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="日期预览"
          x-component="PreviewDatePickerText"
          default="2020-11-23 22:15:20"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="时间预览"
          x-component="PreviewTimePickerText"
          :default="['2020-11-23 22:15:20', '2020-11-23 23:15:20']"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="Cascader预览"
          x-component="PreviewCascaderText"
          :default="['hangzhou', 'yuhang']"
          :enum="[
            { label: '杭州', value: 'hangzhou' },
            { label: '余杭', value: 'yuhang' },
          ]"
        />
      </SchemaField>
    </FormProvider>
  </FormLayout>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormLayout,
  FormItem,
  PreviewInputText,
  PreviewSelectText,
  PreviewCascaderText,
  PreviewDatePickerText,
  PreviewTimePickerText,
} from '@formily/element'

const fields = createSchemaField({
  components: {
    FormItem,
    PreviewInputText,
    PreviewSelectText,
    PreviewCascaderText,
    PreviewDatePickerText,
    PreviewTimePickerText,
  },
})

export default {
  components: {
    FormProvider,
    FormLayout,
    ...fields,
  },
  data() {
    const form = createForm()
    return {
      form,
    }
  },
  methods: {
    log(v) {
      console.log(v)
    },
  },
}
</script>
