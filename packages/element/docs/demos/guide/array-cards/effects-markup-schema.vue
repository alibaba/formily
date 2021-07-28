<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="array"
        :maxItems="3"
        x-component="ArrayCards"
        x-decorator="FormItem"
        :x-component-props="{
          title: '对象数组',
        }"
      >
        <SchemaObjectField>
          <SchemaVoidField x-component="ArrayCards.Index" />
          <SchemaStringField
            name="aa"
            x-decorator="FormItem"
            title="AA"
            required
            description="AA输入123时隐藏BB"
            x-component="Input"
          />
          <SchemaStringField
            name="bb"
            x-decorator="FormItem"
            title="BB"
            required
            x-component="Input"
          />
          <SchemaStringField
            name="cc"
            x-decorator="FormItem"
            title="CC"
            required
            description="CC输入123时隐藏DD"
            x-component="Input"
          />
          <SchemaStringField
            name="dd"
            x-decorator="FormItem"
            title="DD"
            required
            x-component="Input"
          />
          <SchemaVoidField x-component="ArrayCards.Remove" />
          <SchemaVoidField x-component="ArrayCards.MoveUp" />
          <SchemaVoidField x-component="ArrayCards.MoveDown" />
        </SchemaObjectField>
        <SchemaVoidField x-component="ArrayCards.Addition" title="添加条目" />
      </SchemaArrayField>
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm, onFieldChange, onFieldReact } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormItem,
  FormButtonGroup,
  Submit,
  Input,
  ArrayCards,
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
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
    const form = createForm({
      effects: () => {
        //主动联动模式
        onFieldChange('array.*.aa', ['value'], (field, form) => {
          form.setFieldState(field.query('.bb'), (state) => {
            state.visible = field.value != '123'
          })
        })
        //被动联动模式
        onFieldReact('array.*.dd', (field) => {
          field.visible = field.query('.cc').get('value') != '123'
        })
      },
    })

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
