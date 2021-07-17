<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="array"
        x-decorator="FormItem"
        x-component="ArrayTable"
      >
        <SchemaObjectField>
          <SchemaVoidField
            x-component="ArrayTableColumn"
            :x-component-props="{ width: 80, title: 'Index' }"
            ><SchemaVoidField
              x-decorator="FormItem"
              x-component="ArrayTableIndex"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTableColumn"
            :x-component-props="{ prop: 'a1', title: 'A1', width: 200 }"
          >
            <SchemaStringField
              x-decorator="Editable"
              name="a1"
              :required="true"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTableColumn"
            :x-component-props="{ prop: 'a2', title: 'A2', width: 200 }"
          >
            <SchemaStringField
              x-decorator="FormItem"
              name="a2"
              :required="true"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTableColumn"
            :x-component-props="{ prop: 'a3', title: 'A3' }"
          >
            <SchemaStringField
              name="a3"
              :required="true"
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTableColumn"
            :x-component-props="{
              title: 'Operations',
              prop: 'operations',
              width: 200,
              fixed: 'right',
            }"
          >
            <SchemaVoidField x-component="FormItem">
              <SchemaVoidField x-component="ArrayTableRemove" />
              <SchemaVoidField x-component="ArrayTableMoveUp" />
              <SchemaVoidField x-component="ArrayTableMoveDown" />
            </SchemaVoidField>
          </SchemaVoidField>
        </SchemaObjectField>
        <SchemaVoidField x-component="ArrayTableAddition" title="添加条目" />
      </SchemaArrayField>
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  Submit,
  FormItem,
  ArrayTable,
  ArrayTableColumn,
  ArrayTableAddition,
  ArrayTableMoveDown,
  ArrayTableMoveUp,
  ArrayTableRemove,
  ArrayTableIndex,
  ArrayTableSortHandle,
  Input,
  Editable,
} from '@formily/element'

const fields = createSchemaField({
  components: {
    FormItem,
    ArrayTable,
    ArrayTableColumn,
    ArrayTableAddition,
    ArrayTableMoveDown,
    ArrayTableMoveUp,
    ArrayTableRemove,
    ArrayTableIndex,
    ArrayTableSortHandle,
    Input,
    Editable,
  },
})

export default {
  components: { FormProvider, Submit, ...fields },
  data() {
    const form = createForm()
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
