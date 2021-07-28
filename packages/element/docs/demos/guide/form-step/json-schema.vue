<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" :scope="{ formStep }" />
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
import { FormProvider, createSchemaField, FormConsumer } from '@formily/vue'
import {
  FormItem,
  FormStep,
  FormButtonGroup,
  Submit,
  Input,
} from '@formily/element'
import { Button } from 'element-ui'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const schema = {
  type: 'object',
  properties: {
    collapse: {
      type: 'void',
      'x-component': 'FormStep',
      'x-component-props': {
        formStep: '{{formStep}}',
      },
      properties: {
        step1: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '第一步',
          },
          properties: {
            aaa: {
              type: 'string',
              title: 'AAA',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
        step2: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '第二步',
          },
          properties: {
            bbb: {
              type: 'string',
              title: 'AAA',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
        step3: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '第三步',
          },
          properties: {
            ccc: {
              type: 'string',
              title: 'AAA',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
      },
    },
  },
}

export default {
  components: {
    FormProvider,
    FormConsumer,
    FormButtonGroup,
    Button,
    Submit,
    SchemaField,
  },

  data() {
    const form = createForm()
    const formStep = FormStep.createFormStep()
    return {
      schema,
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
