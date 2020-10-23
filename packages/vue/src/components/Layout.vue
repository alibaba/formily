<template>
  <div>
    <slot v-bind="childProps"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import { LayoutSymbol } from '../constants'
import { ILayoutProps } from '../types'
import { useLayout } from '../hooks/useLayout'

export default defineComponent({
  props: {},
  setup({
    required,
    label,
    addonBefore,
    addonAfter,
    description,
    ...props
  }: ILayoutProps) {
    const layout = useLayout({ ...props, isLayout: true })
    provide(LayoutSymbol, layout)
    const childProps = {
      ...layout,
      label,
      required,
      addonBefore,
      addonAfter,
      description
    }
    return {
      childProps
    }
  }
})
</script>
