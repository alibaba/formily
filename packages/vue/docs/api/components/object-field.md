---
order: 2
---

# ObjectField

## 描述

作为@formily/core 的 [createObjectField](https://core.formilyjs.org/api/models/form#createobjectfield) Vue 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，ObjectField 组件属性参考[IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

::: warning
我们在使用 ObjectField 组件的时候，一定要记得传 name 属性。同时要使用 scoped slot 形式来组织子组件
:::

## 签名

```ts
type ObjectField = Vue.Component<any, any, any, IFieldFactoryProps>
```

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <ObjectField name="object">
      <template #default="{ field }">
        <div v-for="key in Object.keys(field.value || {})" :key="key" :style="{ marginBottom: '10px' }">
          <Space>
            <Field :name="key" :component="[Input, { placeholder: key }]" />
            <Button @click="field.removeProperty(key)" >
              Remove
            </Button>
          </Space>
        </div>
        <Space>
          <Field
            name="propertyName"
            basePath=""
            required
            :component="[Input, { placeholder: 'Property Name' }]"
          />
          <Button @click="addPropertyToField(field)">
            Add
          </Button>
        </Space>
      </template>
    </ObjectField>
  </FormProvider>
</template>

<script>
import { Input, Space, Button } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, ObjectField, Field } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

export default {
  components: { FormProvider, ObjectField, Field, Space, Button },
  data() {
    return {
      Input,
      form: createForm()
    }
  },
  methods: {
    addPropertyToField(field) {
      const name = this.form.values.propertyName
      if (name && !this.form.existValuesIn(`object.${name}`)) {
        field.addProperty(name, '')
        this.form.deleteValuesIn('propertyName')
      }
    }
  }
}
</script>

:::
