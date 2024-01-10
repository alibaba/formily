<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField x-component="FormStep" :x-component-props="{ formStep }">
        <SchemaVoidField
          x-component="FormStep.StepPane"
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
          x-component="FormStep.StepPane"
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
          x-component="FormStep.StepPane"
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
    <FormConsumer>
      <template #default>
        <FormButtonGroup>
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
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, createSchemaField } from '@formily/vue'
import {
  FormItem,
  FormStep,
  FormButtonGroup,
  Submit,
  Input,
} from '@formily/element'
import { Button } from 'element-ui'
import Template from '../editable/template.vue'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})
const formStep = FormStep.createFormStep()

export default {
  components: {
    FormConsumer,
    FormProvider,
    FormButtonGroup,
    Button,
    Submit,
    Template,
    ...SchemaField,
  },

  data() {
    const form = createForm()

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
