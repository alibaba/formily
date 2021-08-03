<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="address"
        title="地址选择"
        required
        x-decorator="FormItem"
        x-component="Cascader"
        :x-component-props="{
          style: {
            width: '240px',
          },
        }"
      />
    </SchemaField>

    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Cascader, Submit } from '@formily/element'
import { action } from '@formily/reactive'
import axios from 'axios'

const transformAddress = (data = {}) => {
  return Object.entries(data).reduce((buf, [key, value]) => {
    if (typeof value === 'string')
      return buf.concat({
        label: value,
        value: key,
      })
    const { name, code, cities, districts } = value
    const _cities = transformAddress(cities)
    const _districts = transformAddress(districts)
    return buf.concat({
      label: name,
      value: code,
      children: _cities.length
        ? _cities
        : _districts.length
        ? _districts
        : undefined,
    })
  }, [])
}

const useAddress = (pattern) => {
  onFieldReact(pattern, (field) => {
    field.loading = true
    axios('//unpkg.com/china-location/dist/location.json')
      .then((res) => res.data)
      .then(
        action.bound((data) => {
          field.dataSource = transformAddress(data)
          field.loading = false
        })
      )
  })
}

const form = createForm({
  effects: () => {
    useAddress('address')
  },
})
const fields = createSchemaField({
  components: {
    FormItem,
    Cascader,
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
l
