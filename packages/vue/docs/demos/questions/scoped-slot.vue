<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script>
import { createForm } from "@formily/core"
import { FormProvider, createSchemaField } from "@formily/vue"
import { observer } from "@formily/reactive-vue"

// 普通组件
const TextPreviewer = {
  functional: true,
  name: "TextPreviewer",
  render(h, context) {
    return h("div", null, [
      context.scopedSlots.default({
        scopedData: "作用域插槽 default 的值",
      }),
      context.scopedSlots.others({
        scopedData: "作用域插槽 others 的值（可点击）",
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
        // 除 default 插槽外，其余可正常使用。
        default: (props) => context.scopedSlots.defaultSlot(props),
        others: (props) => context.scopedSlots.others(props),
      },
    })
  },
})

// 作用域插槽组件1
const ScopeSlotComponent1 = {
  functional: true,
  render(h, { props }) {
    return h("span", [props.scopedData])
  },
}
// 作用域插槽组件2
const ScopeSlotComponent2 = {
  functional: true,
  render(h, { props }) {
    return h(
      "div",
      {
        on: {
          click: () => {
            props.onAlert("通过作用域插槽传递事件进行传值")
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
        others: ScopeSlotComponent2,
      },
    },
  },
}

export default {
  components: { FormProvider, SchemaField },
  data() {
    return {
      form: createForm(),
      schema,
    }
  },
}
</script>
