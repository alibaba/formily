<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="string_array"
        :maxItems="3"
        x-decorator="FormItem"
        x-component="ArrayCards"
        :x-component-props="{
          title: '字符串数组',
        }"
      >
        <SchemaVoidField>
          <SchemaVoidField x-component="ArrayCardsIndex" />
          <SchemaStringField
            name="input"
            x-decorator="FormItem"
            title="Input"
            required
            x-component="Input"
          />
          <SchemaVoidField x-component="ArrayCardsRemove" />
          <SchemaVoidField x-component="ArrayCardsMoveUp" />
          <SchemaVoidField x-component="ArrayCardsMoveDown" />
        </SchemaVoidField>
        <SchemaVoidField x-component="ArrayCardsAddition" title="添加条目" />
      </SchemaArrayField>
      <SchemaArrayField
        name="array"
        :maxItems="3"
        x-decorator="FormItem"
        x-component="ArrayCards"
        :x-component-props="{
          title: '对象数组',
        }"
      >
        <SchemaObjectField>
          <SchemaVoidField x-component="ArrayCardsIndex" />
          <SchemaStringField
            name="input"
            x-decorator="FormItem"
            title="Input"
            required
            x-component="Input"
          />
          <SchemaVoidField x-component="ArrayCardsRemove" />
          <SchemaVoidField x-component="ArrayCardsMoveUp" />
          <SchemaVoidField x-component="ArrayCardsMoveDown" />
        </SchemaObjectField>
        <SchemaVoidField x-component="ArrayCardsAddition" title="添加条目" />
      </SchemaArrayField>
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormItem,
  FormButtonGroup,
  Submit,
  Input,
  ArrayCards,
  ArrayCardsRemove,
  ArrayCardsMoveDown,
  ArrayCardsMoveUp,
  ArrayCardsAddition,
  ArrayCardsIndex,
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
    ArrayCardsRemove,
    ArrayCardsMoveDown,
    ArrayCardsMoveUp,
    ArrayCardsAddition,
    ArrayCardsIndex,
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

    return {
      form,
    }
  },
  methods: {
    log(values) {
      console.log(values)
    },
  },
}
</script>

<style lang="scss" scoped></style>
