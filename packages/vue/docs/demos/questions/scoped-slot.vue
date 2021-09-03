<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script>
import { createForm } from "@formily/core"
import { FormProvider, createSchemaField } from "@formily/vue"
import { observer } from "@formily/reactive-vue"
import { defineComponent } from '@vue/composition-api'

// 普通组件
const TextPreviewer = {
  functional: true,
  name: "TextPreviewer",
  render(h, context) {
    return h("div", null, [
      context.scopedSlots.default({
        scopedData: "作用域插槽 default 的值",
      }),
      context.scopedSlots.other({
        scopedData: "作用域插槽 other 的值（可通过点击事件传值）",
        onAlert: ($event) => {
          alert($event)
        },
      }),
    ])
  },
}

// 响应式组件
const ObservedComponent = observer({
  functional: true,
  components: {
    TextPreviewer,
  },
  render(h, context) {
    return h(TextPreviewer, {
      scopedSlots: {
        // 除 default 插槽需要转换外，其余可正常使用。
        default: (props) => context.scopedSlots.defaultSlot(props),
        other: (props) => context.scopedSlots.other(props),
      },
    })
  },
})

// 作用域插槽组件 1
const ScopeSlotComponent1 = {
  functional: true,
  render(h, { props }) {
    return h("span", [props.scopedData])
  },
}
// 作用域插槽组件 2
const ScopeSlotComponent2 = {
  functional: true,
  render(h, { props }) {
    return h(
      "div",
      {
        on: {
          click: () => {
            props.onAlert("作用域插槽传递事件函数，事件发生后进行值的回传")
          },
        },
      },
      [props.scopedData],
    )
  },
}

const { SchemaField } = createSchemaField({
  components: {
    ObservedComponent,
  },
})

const schema = {
  type: "object",
  properties: {
    textPreview: {
      type: "string",
      "x-component": "ObservedComponent",
      "x-content": {
        defaultSlot: ScopeSlotComponent1,
        other: ScopeSlotComponent2,
      },
    },
  },
}

export default defineComponent({
  components: { FormProvider, SchemaField },
  data() {
    return {
      form: createForm(),
      schema,
    }
  },
})
</script>
