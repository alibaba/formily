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
  props: {
    /* eslint-disable vue/require-prop-types  */
    /* eslint-disable vue/require-default-prop */
    hasBorder: Boolean,
    context: {},
    isRoot: Boolean,
    isLayout: Boolean,
    defaultSettings: {},
    children: {},
    full: Boolean,
    layoutProps: {},
    className: String,
    label: {},
    required: Boolean,
    labelAlign: String,
    inline: Boolean,
    inset: Boolean,
    autoRow: Boolean,
    columns: Number,
    flex: Boolean,
    enableSafeWidth: Boolean,
    labelWidth: [Number, String],
    wrapperWidth: [Number, String],
    labelCol: Number,
    wrapperCol: Number,
    addonBefore: {},
    addonAfter: {},
    description: {},
    gutter: [Number, String],
    span: Number,
    grid: Boolean,
    contextColumns: Number,
    contextResponsive: Object,
    responsive: Object,
    size: String
  },
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
