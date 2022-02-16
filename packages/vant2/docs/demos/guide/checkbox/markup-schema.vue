<template>
  <Form class="checkbox" :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="single"
        x-component="Checkbox"
        :x-component-props="{ label: '选项' }"
      />
      <SchemaArrayField
        name="multiple"
        :enum="[
          { label: '选项1', name: 1 },
          { label: '选项2', name: 2 },
        ]"
        x-component="Checkbox.Group"
      />
      <SchemaArrayField
        :default="[1, 2]"
        x-pattern="readPretty"
        name="multipleRead"
        :enum="[
          { label: '选项1', name: 1 },
          { label: '选项2', name: 2 },
        ]"
        x-component="Checkbox.Group"
      />
    </SchemaField>
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, Checkbox, Submit } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    Checkbox,
  },
})

export default {
  components: { Form, ...fields, Submit },
  data() {
    return {
      form,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox {
  ::v-deep {
    .van-checkbox {
      margin: 0 0 8px;
    }
  }
}
</style>
