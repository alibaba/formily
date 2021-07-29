<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="string_array"
        :maxItems="3"
        x-decorator="FormItem"
        x-component="ArrayCollapse"
        :x-component-props="{
          accordion: true,
          defaultOpenPanelCount: 3,
        }"
      >
        <SchemaVoidField
          x-component="ArrayCollapse.Item"
          :x-component-props="{
            title: '字符串数组',
          }"
        >
          <SchemaVoidField x-component="ArrayCollapse.Index" />
          <SchemaStringField
            name="input"
            x-decorator="FormItem"
            title="Input"
            required
            x-component="Input"
          />
          <SchemaVoidField x-component="ArrayCollapse.Remove" />
          <SchemaVoidField x-component="ArrayCollapse.MoveUp" />
          <SchemaVoidField x-component="ArrayCollapse.MoveDown" />
        </SchemaVoidField>
        <SchemaVoidField
          x-component="ArrayCollapse.Addition"
          title="添加条目"
        />
      </SchemaArrayField>
      <SchemaArrayField
        name="array"
        :maxItems="3"
        x-decorator="FormItem"
        x-component="ArrayCollapse"
      >
        <SchemaObjectField
          x-component="ArrayCollapse.Item"
          :x-component-props="{
            title: '对象数组',
          }"
        >
          <SchemaVoidField x-component="ArrayCollapse.Index" />
          <SchemaStringField
            name="input"
            x-decorator="FormItem"
            title="Input"
            required
            x-component="Input"
          />
          <SchemaVoidField x-component="ArrayCollapse.Remove" />
          <SchemaVoidField x-component="ArrayCollapse.MoveUp" />
          <SchemaVoidField x-component="ArrayCollapse.MoveDown" />
        </SchemaObjectField>
        <SchemaVoidField
          x-component="ArrayCollapse.Addition"
          title="添加条目"
        />
      </SchemaArrayField>
      <SchemaArrayField
        name="string_array_unshift"
        :maxItems="3"
        x-decorator="FormItem"
        x-component="ArrayCollapse"
        :x-component-props="{
          defaultOpenPanelCount: 8,
        }"
      >
        <SchemaVoidField
          x-component="ArrayCollapse.Item"
          :x-component-props="{
            title: '字符串数组',
          }"
        >
          <SchemaVoidField x-component="ArrayCollapse.Index" />
          <SchemaStringField
            name="input"
            x-decorator="FormItem"
            title="Input"
            required
            x-component="Input"
          />
          <SchemaVoidField x-component="ArrayCollapse.Remove" />
          <SchemaVoidField x-component="ArrayCollapse.MoveUp" />
          <SchemaVoidField x-component="ArrayCollapse.MoveDown" />
        </SchemaVoidField>
        <SchemaVoidField
          x-component="ArrayCollapse.Addition"
          title="添加条目（unshift）"
          :x-component-props="{
            method: 'unshift',
          }"
        />
      </SchemaArrayField>
    </SchemaField>
    <FormButtonGroup>
      <Button
        @click="
          () => {
            form.setInitialValues({
              array: Array.from({ length: 10 }).map(() => ({
                input: 'default value',
              })),
              string_array: Array.from({ length: 10 }).map(
                () => 'default value'
              ),
              string_array_unshift: Array.from({ length: 10 }).map(
                () => 'default value'
              ),
            })
          }
        "
      >
        加载默认数据
      </Button>
      <Submit @submit="log">提交</Submit>
    </FormButtonGroup>
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
  ArrayCollapse,
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
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
