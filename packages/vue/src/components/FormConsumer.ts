import { defineComponent, DefineComponent } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useForm } from '../hooks'
import h from '../shared/h'
import { Fragment } from '../shared/fragment'

export default observer(
  defineComponent({
    name: 'FormConsumer',
    inheritAttrs: false,
    setup(props, { slots }) {
      const formRef = useForm()
      return () => {
        const children = {
          ...slots,
        }
        if (slots.default) {
          children.default = () =>
            slots.default({
              form: formRef.value,
            })
        }
        return h(Fragment, {}, children)
      }
    },
  }) as unknown as DefineComponent
)
