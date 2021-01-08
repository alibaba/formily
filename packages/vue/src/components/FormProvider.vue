<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import { FormSymbol } from '../shared/context'
import { IProviderProps } from '../types'
import { useAttach } from '../hooks/useAttach'

export default defineComponent({
  name: 'FormProvider',
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  setup(props: IProviderProps) {
    useAttach(props.form)
    provide(FormSymbol, props.form)
  }
})
</script>
