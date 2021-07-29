<template>
  <FormProvider :form="form">
    <Space>
      <Field name="input" :component="[Input]" />
      <Field name="custom" :component="[Custom]" />
    </Space>
  </FormProvider>
</template>

<script>
import { defineComponent, h } from '@vue/composition-api'
import { createForm } from '@formily/core'
import { FormProvider, Field, useForm } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { Input, Space } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const Custom = observer(
  defineComponent({
    setup() {
      const formRef = useForm()
      return () => {
        const form = formRef.value
        return h('div', {}, [form.values.input])
      }
    },
  })
)

export default {
  components: {
    FormProvider,
    Field,
    Space,
  },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      Input,
      Custom,
      form,
    }
  },
}
</script>
