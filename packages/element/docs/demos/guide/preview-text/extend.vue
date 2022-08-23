<template>
  <Form
    :labelCol="6"
    :wrapperCol="10"
    :form="form"
    :previewTextPlaceholder="vnode"
  >
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
        x-component="PreviewText.Select"
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
        x-component="PreviewText.DatePicker"
        default="2020-11-23 22:15:20"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="日期范围预览"
        x-component="PreviewText.DatePicker"
        :default="['2020-11-23 22:15:20', '2020-11-24 22:15:20']"
      />
      <SchemaStringField
        x-decorator="FormItem"
        title="Cascader预览"
        x-component="PreviewText.Cascader"
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
  </Form>
</template>

<script>
import { h } from 'vue-demi'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import {
  Form,
  FormItem,
  Input,
  PreviewText,
  FormButtonGroup,
} from '@formily/element'
import { Button } from 'element-ui'

const fields = createSchemaField({
  components: {
    FormItem,
    Input,
    PreviewText,
  },
})

export default {
  components: {
    Form,
    FormButtonGroup,
    Button,
    ...fields,
  },
  data() {
    const form = createForm()
    return {
      form,
      vnode: () => h('div', {}, '123'),
    }
  },

  mounted() {},
}
</script>
