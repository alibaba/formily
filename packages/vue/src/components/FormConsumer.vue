<template>
  <FormSpy ref="spy" v-bind="$attrs">
    <template #default="{ form, type }">
      <slot
        v-if="this.$scopedSlots.default"
        v-bind="transformFormAPI(form, type, ref)"
      ></slot>
      <slot v-else></slot>
    </template>
  </FormSpy>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { deprecate } from '@formily/shared'
import FormSpy from './FormSpy.vue'
import { IForm, LifeCycleTypes } from '@formily/core'
import { IFormConsumerAPI } from '../types'

const transformStatus = (type: string, ref: any) => {
  switch (type) {
    case LifeCycleTypes.ON_FORM_INIT:
      return 'initialize'
    case LifeCycleTypes.ON_FORM_SUBMIT_START:
      ref.current.submitting = true
      return 'submitting'
    case LifeCycleTypes.ON_FORM_SUBMIT_END:
      ref.current.submitting = false
      return 'submitted'
    default:
      return ref.current.submitting ? 'submitting' : type
  }
}

const transformFormAPI = (
  api: IForm,
  type: string,
  ref: any
): IFormConsumerAPI => {
  deprecate('FormConsumer', 'Please use FormSpy Component.')
  return {
    status: transformStatus(type, ref),
    state: api.getFormState(),
    submit: api.submit,
    reset: api.reset
  }
}

export default defineComponent({
  components: { FormSpy },
  props: {
    path: {
      type: String,
      default: ''
    },
    triggerType: {
      type: String,
      default: 'onChange'
    }
  },
  setup() {
    const spy = ref(null)
    return {
      transformFormAPI,
      spy
    }
  }
})
</script>
