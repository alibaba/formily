---
order: 5
---

# RecursionField (自增列表递归)

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField name="custom" x-component="ArrayItems">
        <SchemaObjectField>
          <SchemaStringField name="input" x-component="Input" />
        </SchemaObjectField>
      </SchemaArrayField>
    </SchemaField>
  </FormProvider>
</template>

<script>
import { h } from '@vue/composition-api'
// or "import { h } from 'vue'" if the version of vue > 3
import { Input, Button, Space } from 'ant-design-vue';
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, RecursionField, defineObservableComponent, useField, useFieldSchema } from '@formily/vue'
import 'ant-design-vue/dist/antd.css';

const ArrayItems = defineObservableComponent({
  props: ['value', 'disabled', 'readOnly'],
  observableSetup (collect, props) {
    const field = useField()
    const schema = useFieldSchema()

    // make sure the component can respond to changes of field/schema
    collect({
      field,
      schema
    })

    return () => {
      const items = props.value?.map((item, index) => {
        return h('div', { key: item.id, style: { marginBottom: '10px' } }, [
          h(Space, [
            // params of render function is different in vue3
            h(RecursionField, { props: { schema: schema.items, name: index } }),
            h(Button, { on: { click: () => field.remove(index) } }, ['Remove']),
          ])
        ])
      })
      const button = h(Button, { on: { click: () => field.push({ id: Date.now() }) } }, ['Add'])
      return h('div', [items, button])
    }
  },
})

const { SchemaField, SchemaStringField, SchemaArrayField, SchemaObjectField } = createSchemaField({
  components: {
    ArrayItems,
    Input,
  },
})

export default {
  components: { FormProvider, SchemaField, SchemaStringField, SchemaArrayField, SchemaObjectField },
  data() {
    return {
      form: createForm()
    }
  }
}
</script>

:::

使用[useField](/api/hooks/useField)和[useFieldSchema](/api/shared/use-field-schema)来获取当前字段上下文中的字段实例和字段 schema
