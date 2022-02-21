<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        x-component="PreviewText.Input"
        :x-component-props="{ label: '文本预览' }"
        default="Hello world"
      />

      <SchemaStringField
        name="switch"
        x-decorator="FormItem"
        :x-decorator-props="{ label: '开关' }"
        x-component="PreviewText.Switch"
        :default="true"
      />

      <SchemaArrayField
        name="checkboxGroup"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '复选框组',
        }"
        :enum="[
          { label: '复选框 1', name: 123, shape: 'square' },
          { label: '复选框 2', name: 222, shape: 'square' },
        ]"
        :default="[123, 222]"
        x-component="PreviewText.Checkbox"
        :x-component-props="{
          direction: 'horizontal',
          multiple: true,
        }"
      />

      <SchemaArrayField
        name="radio"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '单选框',
        }"
        :enum="[
          { label: '单选框 1', name: 1 },
          { label: '单选框 1', name: 2 },
        ]"
        :default="1"
        x-component="PreviewText.Checkbox"
        :x-component-props="{
          direction: 'horizontal',
        }"
      />

      <SchemaStringField
        name="stepper"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '步进器',
        }"
        :default="50"
        x-component="PreviewText.Stepper"
      />

      <SchemaStringField
        name="rate"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '评分',
        }"
        :default="3.5"
        x-component="PreviewText.Rate"
        :x-component-props="{
          allowHalf: true,
        }"
      />

      <SchemaStringField
        name="slider"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '滑块',
        }"
        :default="50"
        x-component="PreviewText.Slider"
      />

      <SchemaStringField
        name="uploader"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '文件上传',
        }"
        :default="[
          { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
          { url: 'https://cloud-image', isImage: true },
        ]"
        x-component="PreviewText.Uploader"
      />

      <SchemaStringField
        name="picker"
        default="湖州"
        x-component="PreviewText.Picker"
        :x-component-props="{
          fieldProps: {
            label: '选择器',
            placeholder: '点击选择城市',
          },
          pickerProps: {
            columns: [
              '杭州',
              '宁波',
              '温州',
              '绍兴',
              '湖州',
              '嘉兴',
              '金华',
              '衢州',
            ],
          },
        }"
      />

      <SchemaStringField
        name="datetimePicker"
        default="05:15"
        x-component="PreviewText.DatetimePicker"
        :x-component-props="{
          fieldProps: {
            label: '时间选择',
            placeholder: '点击选择时间',
          },
          popupProps: {},
          datetimePickerProps: {
            type: 'time',
          },
          fieldListeners: {},
          popupListeners: {},
          datetimePickerListeners: {},
        }"
      />

      <SchemaStringField
        name="area"
        default="北京市/北京市/东城区"
        x-component="PreviewText.Area"
        :x-component-props="{
          fieldProps: {
            label: '地区选择',
            placeholder: '点击选择省市区',
            format: (val) =>
              (val || [])
                .filter((item) => !!item)
                .map((item) => item && item.name)
                .join('/'),
          },
          popupProps: {},
          areaProps: {
            areaList: {
              province_list: {
                110000: '北京市',
                120000: '天津市',
              },
              city_list: {
                110100: '北京市',
                120100: '天津市',
              },
              county_list: {
                110101: '东城区',
                110102: '西城区',
              },
            },
          },
          fieldListeners: {},
          popupListeners: {},
          areaListeners: {},
        }"
      />

      <SchemaStringField
        name="calendar"
        default="2/24"
        x-component="PreviewText.Calendar"
        :x-component-props="{
          fieldProps: {
            label: '日历',
            placeholder: '选择日历',
            format: (date) =>
              date && `${date.getMonth() + 1}/${date.getDate()}`,
          },
          calendarProps: {},
          fieldListeners: {},
          calendarListeners: {},
        }"
      />
    </SchemaField>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, PreviewText, FormItem, Submit } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    PreviewText,
    FormItem,
  },
})

export default {
  components: { Submit, Form, ...fields },
  data() {
    return {
      form,
    }
  },
}
</script>
