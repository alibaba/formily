<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="hideFirstColumn"
        x-decorator="FormItem"
        x-component="Switch"
        title="隐藏A2"
      />
      <SchemaArrayField
        name="array"
        x-decorator="FormItem"
        x-component="ArrayTable"
      >
        <SchemaObjectField>
          <SchemaVoidField
            name="column1"
            x-component="ArrayTable.Column"
            :x-component-props="{ width: 80, title: 'Index' }"
            ><SchemaVoidField x-component="ArrayTable.Index" />
          </SchemaVoidField>
          <SchemaVoidField
            name="column2"
            x-component="ArrayTable.Column"
            :x-component-props="{
              title: '显隐->A2',
              width: 100,
            }"
          >
            <SchemaBooleanField
              name="a1"
              x-decorator="FormItem"
              x-component="Switch"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            name="column3"
            :x-component-props="{ title: 'A2', width: 200 }"
          >
            <SchemaStringField
              x-decorator="FormItem"
              name="a2"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
            name="column4"
            x-component="ArrayTable.Column"
            :x-component-props="{ title: 'A3' }"
          >
            <SchemaStringField
              name="a3"
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
            name="column5"
            x-component="ArrayTable.Column"
            :x-component-props="{
              title: 'Operations',
              prop: 'operations',
              width: 200,
              fixed: 'right',
            }"
          >
            <SchemaVoidField x-component="FormItem">
              <SchemaVoidField x-component="ArrayTable.Remove" />
              <SchemaVoidField x-component="ArrayTable.MoveUp" />
              <SchemaVoidField x-component="ArrayTable.MoveDown" />
            </SchemaVoidField>
          </SchemaVoidField>
        </SchemaObjectField>
        <SchemaVoidField x-component="ArrayTable.Addition" title="添加条目" />
      </SchemaArrayField>
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm, onFieldChange, onFieldReact } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  Submit,
  FormItem,
  ArrayTable,
  Input,
  Editable,
  Switch,
} from '@formily/element'

const fields = createSchemaField({
  components: {
    FormItem,
    ArrayTable,
    Input,
    Editable,
    Switch,
  },
})

export default {
  components: { FormProvider, Submit, ...fields },
  data() {
    const form = createForm({
      effects: () => {
        //主动联动模式
        onFieldChange('hideFirstColumn', ['value'], (field) => {
          field.query('array.column3').take((target) => {
            console.log('target', target)
            target.visible = !field.value
          })
          field.query('array.*.a2').take((target) => {
            target.visible = !field.value
          })
        })
        //被动联动模式
        onFieldReact('array.*.a2', (field) => {
          field.visible = !field.query('.a1').get('value')
        })
      },
    })

    return {
      form,
    }
  },
  methods: {
    log(...v) {
      console.log(...v)
    },
  },
}
</script>
