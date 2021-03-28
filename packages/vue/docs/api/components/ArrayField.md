---
order: 1
---

# ArrayField

## 描述

作为@formily/core 的 [createArrayField](https://core.formilyjs.org/api/models/form#createarrayfield) Vue 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，ArrayField 组件属性参考[IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

::: warning
我们在使用 ArrayField 组件的时候，一定要记得传 name 属性。同时要使用 scoped slots 形式来组织子组件
:::

## 签名

```ts
type ArrayField = Vue.Component<any, any, any, IFieldFactoryProps>
```

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <ArrayField name="array">
      <template #default="{ field }">
        <div v-for="(item, index) in field.value || []" :key="item.id" :style="{ marginBottom: '10px' }">
          <Space>
            <Field :name="`${index}.value`" :component="[Input]" />
            <Button @click="() => {
              field.remove(index)
            }">
              Remove
            </Button>
            <Button @click="() => {
              field.moveUp(index)
            }">
              Move Up
            </Button>
            <Button @click="() => {
              field.moveDown(index)
            }">
              Move Down
            </Button>
          </Space>
        </div>
        <Button @click="() => field.push({ id: Date.now(), value: '' })">Add</Button>
      </template>
    </ArrayField>
  </FormProvider>
</template>

<script>
import { Input, Space, Button } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, ArrayField, Field } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

export default {
  components: { FormProvider, ArrayField, Field, Space, Button },
  data() {
    return {
      Input,
      form: createForm()
    }
  }
}
</script>

:::
