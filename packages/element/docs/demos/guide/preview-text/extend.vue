<template>
  <FormLayout :labelCol="6" :wrapperCol="10">
    <FormProvider :form="form">
      <SchemaField>
        <SchemaStringField
          x-decorator="FormItem"
          title="文本预览"
          x-component="Input"
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
          title="日期范围预览"
          x-component="PreviewDatePickerText"
          :default="['2020-11-23 22:15:20', '2020-11-24 22:15:20']"
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
      <FormButtonGroup alignFormItem>
        <Button
          @click="
            () => {
              form.setState((state) => {
                state.editable = !state.editable
              })
            }
          "
          >切换阅读态</Button
        >
      </FormButtonGroup>
    </FormProvider>
  </FormLayout>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormLayout,
  FormItem,
  Input,
  PreviewSelectText,
  PreviewCascaderText,
  PreviewDatePickerText,
  FormButtonGroup,
} from '@formily/element'
import { Button } from 'element-ui'

const fields = createSchemaField({
  components: {
    FormItem,
    Input,
    PreviewSelectText,
    PreviewCascaderText,
    PreviewDatePickerText,
  },
})

export default {
  components: {
    FormProvider,
    FormLayout,
    FormButtonGroup,
    Button,
    ...fields,
  },
  data() {
    const form = createForm()
    return {
      form,
    }
  },
}
</script>
