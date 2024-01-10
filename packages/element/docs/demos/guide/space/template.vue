<template>
  <FormProvider :form="form">
    <FormLayout :labelCol="6" :wrapperCol="16">
      <VoidField
        name="name"
        title="姓名"
        :decorator="[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none',
          },
        ]"
        :component="[Space]"
      >
        <Field
          name="firstName"
          :decorator="[FormItem]"
          :component="[Input]"
          required
        />
        <Field
          name="lastName"
          :decorator="[FormItem]"
          :component="[Input]"
          required
        />
      </VoidField>
      <VoidField
        name="texts"
        title="文本串联"
        :decorator="[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none',
          },
        ]"
        :component="[Space]"
      >
        <Field
          name="aa"
          :decorator="[
            FormItem,
            {
              addonAfter: '单位',
            },
          ]"
          :component="[Input]"
          required
        />
        <Field
          name="bb"
          :decorator="[
            FormItem,
            {
              addonAfter: '单位',
            },
          ]"
          :component="[Input]"
          required
        />
        <Field
          name="cc"
          :decorator="[
            FormItem,
            {
              addonAfter: '单位',
            },
          ]"
          :component="[Input]"
          required
        />
      </VoidField>
      <Field
        name="textarea"
        title="文本框"
        :decorator="[FormItem]"
        :component="[
          TextArea,
          {
            style: {
              width: 400,
            },
          },
        ]"
        required
      />
      <FormButtonGroup alignFormItem>
        <Submit :onSubmit="log">提交</Submit>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, Field, VoidField } from '@formily/vue'
import {
  FormLayout,
  FormItem,
  Input,
  TextArea,
  Submit,
  Space,
  FormButtonGroup,
} from '@formily/element'

const form = createForm()

export default {
  components: {
    FormProvider,
    FormLayout,
    FormButtonGroup,
    VoidField,
    Field,
    Submit,
  },
  data() {
    return {
      FormItem,
      Input,
      TextArea,
      Space,
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
