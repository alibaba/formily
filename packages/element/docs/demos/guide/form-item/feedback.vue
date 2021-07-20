<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField x-component="Title" x-content="表单状态: " />
      <SchemaStringField
        title="错误状态(feedbackStatus=error)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        :x-decorator-props="{
          feedbackStatus: 'error',
        }"
      />
      <SchemaStringField
        title="警告状态(feedbackStatus=warning)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        :x-decorator-props="{
          feedbackStatus: 'warning',
        }"
      />
      <SchemaStringField
        title="成功状态(feedbackStatus=success)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        :x-decorator-props="{
          feedbackStatus: 'success',
        }"
      />
      <SchemaStringField
        title="加载状态(feedbackStatus=pending)"
        x-decorator="FormItem"
        x-component="Input"
        description="description"
        :x-decorator-props="{
          feedbackStatus: 'pending',
        }"
      />
      <SchemaVoidField x-component="Title" x-content="反馈信息的布局: " />
      <SchemaStringField
        title="紧凑模式required"
        x-decorator="FormItem"
        x-component="Input"
        :required="true"
        :x-decorator-props="{
          feedbackLayout: 'terse',
        }"
      />
      <SchemaStringField
        title="紧凑模式有feedback(feedbackLayout=terse)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'error',
          feedbackText: 'error message',
          feedbackLayout: 'terse',
        }"
      />
      <SchemaStringField
        title="紧凑模式无feedback(feedbackLayout=terse)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackLayout: 'terse',
        }"
      />
      <SchemaStringField
        title="松散模式(feedbackLayout=loose)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'error',
          feedbackText: 'error message',
          feedbackLayout: 'loose',
        }"
      />
      <SchemaStringField
        title="弹出模式(feedbackLayout=popover)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'warning',
          feedbackText: 'warning message',
          feedbackLayout: 'popover',
        }"
      />
      <SchemaStringField
        title="弹出模式(feedbackLayout=popover)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'error',
          feedbackText: 'error message',
          feedbackLayout: 'popover',
        }"
      />
      <SchemaStringField
        title="弹出模式(feedbackLayout=popover)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackStatus: 'success',
          feedbackText: 'success message',
          feedbackLayout: 'popover',
        }"
      />
      <SchemaVoidField x-component="Title" x-content="组件的适配情况: " />
      <SchemaVoidField
        x-component="FormLayout"
        :x-component-props="{
          labelCol: 6,
          wrapperCol: 10,
        }"
      >
        <SchemaStringField
          title="Select"
          x-decorator="FormItem"
          x-component="Select"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
        <SchemaStringField
          title="DatePicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
        <SchemaStringField
          title="DateRangePicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
          :x-component-props="{
            type: 'daterange',
          }"
        />
        <SchemaStringField
          title="YearPicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
          :x-component-props="{
            type: 'year',
          }"
        />
        <SchemaStringField
          title="MonthPicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
          :x-component-props="{
            type: 'month',
          }"
        />
        <SchemaStringField
          title="TimePicker"
          x-decorator="FormItem"
          x-component="TimePicker"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
        <SchemaStringField
          title="InputNumber"
          x-decorator="FormItem"
          x-component="InputNumber"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
        <SchemaStringField
          title="Cascader"
          x-decorator="FormItem"
          x-component="Cascader"
          :x-decorator-props="{
            feedbackStatus: 'success',
            feedbackIcon: SuccessIcon,
          }"
        />
      </SchemaVoidField>
    </SchemaField>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import {
  FormItem,
  InputNumber,
  Input,
  Cascader,
  Select,
  DatePicker,
  FormLayout,
  TimePicker,
} from '@formily/element'

const SuccessIcon = {
  functional: true,
  render(h) {
    return h('i', {
      class: 'el-icon-circle-check',
      style: { color: '#8AE65C' },
    })
  },
}

const Title = {
  functional: true,
  render(h, context) {
    return h('p', context.data, context.children)
  },
}

const fields = createSchemaField({
  components: {
    Title,
    FormItem,
    InputNumber,
    Input,
    Cascader,
    Select,
    DatePicker,
    FormLayout,
    TimePicker,
  },
})

export default {
  components: { FormProvider, ...fields },
  data() {
    const form = createForm()
    return {
      form,
      SuccessIcon,
    }
  },
}
</script>
