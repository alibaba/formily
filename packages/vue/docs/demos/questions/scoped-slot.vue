<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'

// 带有作用域插槽的普通组件
const TextPreviewer = {
  functional: true,
  name: 'TextPreviewer',
  render(h, context) {
    return h('div', {}, [
      context.scopedSlots.default({
        slotProp: '有 default 作用域插槽组件的插槽属性值',
        onScopedFunc: ($event) => {
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
        default: (props) => context.scopedSlots.default(props),
      },
    })
  },
})

// 作用域插槽组件
const ScopedSlotComponent = {
  functional: true,
  render(h, { props }) {
    return h(
      'div',
      {
        on: {
          click: () => {
            props.onScopedFunc('作用域插槽传递事件函数，事件发生后进行值的回传')
          },
        },
      },
      [props.slotProp]
    )
  },
}

const { SchemaField } = createSchemaField({
  components: {
    ObservedComponent,
  },
})

const schema = {
  type: 'object',
  properties: {
    textPreview: {
      type: 'string',
      'x-component': 'ObservedComponent',
      'x-content': {
        default: ScopedSlotComponent,
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
