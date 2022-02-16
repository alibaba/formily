<template>
  <FormProvider :form="form">
    <Field name="customCalendar" :component="[CustomCalendar]" />
    <Submit 
      :style="{ 'margin-top': '16px' }" 
      round 
      block 
      @submit="log"
    >
      提交
    </Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { Submit } from '@formily/vant2'
import CustomCalendar from './custom-calendar'

const form = createForm()

export default {
  components: { FormProvider, Field, Submit },
  data() {
    return {
      CustomCalendar,
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
