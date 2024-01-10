<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField x-component="Title" x-content="label为空时的展示: " />
      <SchemaStringField
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
        }"
      />
      <SchemaStringField
        title=""
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
        }"
      />
      <SchemaVoidField x-component="Title" x-content="冒号: " />
      <SchemaStringField
        title="默认"
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaStringField
        title="无冒号(colon=false)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          colon: false,
        }"
      />
      <SchemaVoidField x-component="Title" x-content="固定宽度设置: " />
      <SchemaStringField
        title="固定label宽度(labelWidth)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
        }"
      />
      <SchemaStringField
        title="固定label宽度(labelWidth)溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出"
        description="描述描述"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          tooltip: '提示提示',
        }"
      />
      <SchemaStringField
        title="固定label宽度(labelWidth)换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行"
        description="描述描述"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          labelWrap: true,
          tooltip: '提示提示',
        }"
      />
      <SchemaStringField
        title="固定内容宽度(wrapperWidth)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          wrapperWidth: 300,
        }"
      />
      <SchemaVoidField x-component="Title" x-content="对齐方式设置:" />
      <SchemaStringField
        title="label左对齐(labelAlign=left)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          labelAlign: 'left',
        }"
      />
      <SchemaStringField
        title="label右对齐(labelAlign=right默认)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          labelAlign: 'right',
        }"
      />
      <SchemaStringField
        title="内容左对齐(wrapperAlign=left默认)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          wrapperWidth: 240,
          wrapperAlign: 'left',
        }"
      />
      <SchemaStringField
        title="内容右对齐(wrapperAlign=right)"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          labelWidth: 300,
          wrapperWidth: 240,
          wrapperAlign: 'right',
        }"
      />
      <SchemaStringField
        title="tooltip"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          tooltip: 'tooltip',
        }"
      />
      <SchemaStringField
        title="tooltip"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          tooltip: 'tooltip',
          tooltipLayout: 'text',
        }"
      />
      <SchemaVoidField x-component="Title" x-content="是否撑满: " />
      <SchemaStringField
        title="默认不撑满(fullness=false)"
        x-decorator="FormItem"
        x-component="Select"
      />
      <SchemaStringField
        title="撑满(fullness=true)"
        x-decorator="FormItem"
        x-component="Select"
        :x-decorator-props="{
          fullness: true,
        }"
      />
      <SchemaVoidField x-component="Title" x-content="辅助信息: " />
      <SchemaStringField
        title="必填星号"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          asterisk: true,
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
      <SchemaStringField
        title="前缀"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          addonBefore: 'addonBefore',
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
      <SchemaStringField
        title="后缀"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          addonAfter: 'addonAfter',
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
      <SchemaStringField
        title="帮助信息feedbackText"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackText: 'feedbackText',
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
      <SchemaStringField
        title="额外信息extra"
        x-decorator="FormItem"
        x-component="Input"
        :x-decorator-props="{
          feedbackText: 'feedbackText',
          extra: 'extra',
          labelCol: 6,
          wrapperCol: 10,
        }"
      />
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
