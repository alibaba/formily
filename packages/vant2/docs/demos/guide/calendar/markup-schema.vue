<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField name="customCalendar" x-component="CustomCalendar" />
    </SchemaField>
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log"
      >提交</Submit
    >
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { Submit } from '@formily/vant2'
import CustomCalendar from './custom-calendar'

const form = createForm()
const fields = createSchemaField({
  components: {
    CustomCalendar,
  },
})

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    return {
      form,
    }
  },
  methods: {
    log(value) {
      console.log(value)
    },
  },
}
</script>
