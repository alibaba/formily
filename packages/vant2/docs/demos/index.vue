<template>
  <Form :form="form" @autoSubmit="log" @autoSubmitFailed="log">
    <SchemaField>
      <SchemaStringField
        name="input"
        x-component="Input"
        :x-component-props="{ label: '输入框', placeholder: '请输入' }"
      />

      <SchemaStringField
        name="switch"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '开关',
        }"
        x-component="Switch"
        :x-component-props="{
          size: 20,
        }"
      />

      <SchemaStringField
        name="checkbox"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '复选框',
        }"
        x-component="Checkbox"
        :x-component-props="{
          shape: 'square',
        }"
      />

      <SchemaArrayField
        name="checkboxGroup"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '复选框组',
        }"
        :enum="[
          { label: '复选框 1', name: 1, shape: 'square' },
          { label: '复选框 2', name: 2, shape: 'square' },
        ]"
        x-component="Checkbox.Group"
        :x-component-props="{
          direction: 'horizontal',
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
        x-component="Radio.Group"
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
        x-component="Stepper"
      />

      <SchemaStringField
        name="rate"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '评分',
        }"
        x-component="Rate"
      />

      <SchemaStringField
        name="slider"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '滑块',
        }"
        x-component="Slider"
      />

      <SchemaStringField
        name="uploader"
        x-decorator="FormItem"
        :x-decorator-props="{
          label: '文件上传',
        }"
        x-component="Uploader"
      />

      <SchemaStringField
        name="picker"
        x-component="Picker"
        :x-component-props="{
          formItemProps: {
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
        x-component="DatetimePicker"
        :x-component-props="{
          formItemProps: {
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
        x-component="Area"
        :x-component-props="{
          formItemProps: {
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
        x-component="Calendar"
        :x-component-props="{
          formItemProps: {
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

    <Submit :style="{ 'margin-top': '16px' }" round block> 提交 </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import {
  Form,
  FormItem,
  Input,
  Switch,
  Checkbox,
  Radio,
  Stepper,
  Rate,
  Slider,
  Uploader,
  Picker,
  DatetimePicker,
  Area,
  Calendar,
  Submit,
} from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    Input,
    FormItem,
    Switch,
    Checkbox,
    Radio,
    Stepper,
    Rate,
    Slider,
    Uploader,
    Picker,
    DatetimePicker,
    Area,
    Calendar,
  },
})

export default {
  components: { Submit, Form, ...fields },
  data() {
    return {
      form,
    }
  },

  methods: {
    log(value) {
      console.log(value)
    },
  },
}
</script>
