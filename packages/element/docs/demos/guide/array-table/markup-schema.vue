<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="array"
        x-decorator="FormItem"
        x-component="ArrayTable"
        :x-component-props="{
          pagination: { pageSize: 10 },
        }"
      >
        <SchemaObjectField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            :x-component-props="{ width: 80, title: 'Index' }"
            ><SchemaVoidField
              x-decorator="FormItem"
              x-component="ArrayTable.Index"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
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
            x-component="ArrayTable.Column"
            :x-component-props="{ title: 'A2', width: 200 }"
          >
            <SchemaStringField
              x-decorator="FormItem"
              name="a2"
              :required="true"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
            x-component="ArrayTable.Column"
            :x-component-props="{ title: 'A3' }"
          >
            <SchemaStringField
              name="a3"
              :required="true"
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaVoidField>
          <SchemaVoidField
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
    <Button
      @click="
        () => {
          form.setInitialValues({
            array: range(100000),
          })
        }
      "
    >
      加载10W条超大数据
    </Button>
    <Alert
      :style="{ marginTop: '10px' }"
      title="注意：开启formily插件的页面，因为后台有数据通信，会占用浏览器算力，最好在无痕模式(无formily插件)下测试"
      type="warning"
    />
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { Submit, FormItem, ArrayTable, Input, Editable } from '@formily/element'
import { Button, Alert } from 'element-ui'

const fields = createSchemaField({
  components: {
    FormItem,
    ArrayTable,
    Input,
    Editable,
  },
})

export default {
  components: { FormProvider, Submit, Button, Alert, ...fields },
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
    range(count) {
      return Array.from(new Array(count)).map((_, key) => ({
        aaa: key,
      }))
    },
  },
}
</script>
