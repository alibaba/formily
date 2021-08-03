<template>
  <Form :form="form">
    <Field
      name="linkage"
      title="联动选择框"
      :decorator="[FormItem]"
      :component="[
        Select,
        {
          style: {
            width: '240px',
          },
        },
      ]"
      :enum="[
        { label: '发请求1', value: 1 },
        { label: '发请求2', value: 2 },
      ]"
    />
    <Field
      name="[Select]"
      title="异步选择框"
      :decorator="[FormItem]"
      :component="[
        Select,
        {
          style: {
            width: '240px',
          },
        },
      ]"
    />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm, onFieldReact } from '@formily/core'
import { Field } from '@formily/vue'
import { action } from '@formily/reactive'
import { Form, FormItem, Select, Submit, Reset } from '@formily/element'

const useAsyncDataSource = (pattern, service) => {
  onFieldReact(pattern, (field) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      })
    )
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async (field) => {
      const linkage = field.query('linkage').get('value')
      if (!linkage) return []
      return new Promise((resolve) => {
        setTimeout(() => {
          if (linkage === 1) {
            resolve([
              {
                label: 'AAA',
                value: 'aaa',
              },
              {
                label: 'BBB',
                value: 'ccc',
              },
            ])
          } else if (linkage === 2) {
            resolve([
              {
                label: 'CCC',
                value: 'ccc',
              },
              {
                label: 'DDD',
                value: 'ddd',
              },
            ])
          }
        }, 1500)
      })
    })
  },
})

export default {
  components: { Form, Field, Submit, Reset },
  data() {
    return {
      form,
      FormItem,
      Select,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
