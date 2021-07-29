<template>
  <FormProvider :form="form">
    <Space>
      <Field
        name="price"
        title="价格"
        :initialValue="5.2"
        :decorator="[FormItem]"
        :component="[
          InputNumber,
          {
            placeholder: '请输入',
            style: {
              width: 100,
            },
          },
        ]"
      />
      <FormItem>×</FormItem>
      <Field
        name="count"
        title="数量"
        :initialValue="100"
        :decorator="[FormItem]"
        :component="[
          InputNumber,
          {
            placeholder: '请输入',
            style: {
              width: 100,
            },
          },
        ]"
      />
      <FormConsumer>
        <template #default="{ form }">
          <FormItem>
            = {{ `${form.values.price * form.values.count} 元` }}</FormItem
          >
        </template>
      </FormConsumer>
    </Space>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { InputNumber, FormItem, Space } from '@formily/element'
import { FormProvider, FormConsumer, Field } from '@formily/vue'

const form = createForm()

export default {
  components: { FormProvider, FormConsumer, Field, FormItem, Space },
  data() {
    return {
      form,
      InputNumber,
      FormItem,
    }
  },
}
</script>
