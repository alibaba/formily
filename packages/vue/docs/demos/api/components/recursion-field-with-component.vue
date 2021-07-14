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
import { defineComponent, h } from '@vue/composition-api'
// or "import { defineComponent, h } from 'vue'" if using vue3
import { Input, Button, Space } from 'ant-design-vue'
import { createForm } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  RecursionField,
  useField,
  useFieldSchema,
} from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import 'ant-design-vue/dist/antd.css'

const ArrayItems = observer(
  defineComponent({
    setup() {
      const fieldRef = useField()
      const schemaRef = useFieldSchema()

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const items = field.value?.map((item, index) => {
          return h('div', { key: item.id, style: { marginBottom: '10px' } }, [
            h(Space, [
              // params of render function is different in vue3
              h(RecursionField, {
                props: { schema: schema.items, name: index },
              }),
              h(Button, { on: { click: () => field.remove(index) } }, [
                'Remove',
              ]),
            ]),
          ])
        })
        const button = h(
          Button,
          { on: { click: () => field.push({ id: Date.now() }) } },
          ['Add']
        )
        return h('div', [items, button])
      }
    },
  })
)

const { SchemaField, SchemaStringField, SchemaArrayField, SchemaObjectField } =
  createSchemaField({
    components: {
      ArrayItems,
      Input,
    },
  })

export default {
  components: {
    FormProvider,
    SchemaField,
    SchemaStringField,
    SchemaArrayField,
    SchemaObjectField,
  },
  data() {
    return {
      form: createForm(),
    }
  },
}
</script>
