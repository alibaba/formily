<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField x-component="FormStep" :x-component-props="{ formStep }">
        <SchemaVoidField
          x-component="FormStepPane"
          :x-component-props="{ title: '第一步' }"
        >
          <SchemaStringField
            name="aaa"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField
          x-component="FormStepPane"
          :x-component-props="{ title: '第二步' }"
        >
          <SchemaStringField
            name="bbb"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField
          type="void"
          x-component="FormStepPane"
          :x-component-props="{ title: '第三步' }"
        >
          <SchemaStringField
            name="ccc"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaVoidField>
      </SchemaVoidField>
    </SchemaField>
    <FormButtonGroup alignFormItem>
      <Button
        :disabled="!formStep.allowBack"
        @click="
          () => {
            formStep.back()
          }
        "
      >
        上一步
      </Button>
      <Button
        :disabled="!formStep.allowNext"
        @click="
          () => {
            formStep.next()
          }
        "
      >
        下一步
      </Button>
      <Submit :disabled="formStep.allowNext" @submit="log">提交</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormItem,
  FormStep,
  FormStepPane,
  FormButtonGroup,
  Submit,
  Input,
  createFormStep,
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormStep,
    FormStepPane,
    Input,
  },
})

export default {
  components: {
    FormProvider,
    FormButtonGroup,
    Button,
    Submit,
    ...SchemaField,
  },

  data() {
    const form = createForm()
    const formStep = createFormStep()

    return {
      form,
      formStep,
    }
  },
  methods: {
    log() {
      this.formStep.submit(console.log)
    },
  },
}
</script>

<style lang="scss" scoped></style>
