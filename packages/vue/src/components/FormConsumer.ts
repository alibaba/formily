import { defineComponent, DefineComponent } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useForm } from '../hooks'
import h from '../shared/h'
import { Fragment } from '../shared/fragment'

export default observer(defineComponent({
  name: 'FormConsumer',
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const formRef = useForm()
    return () => h(
      Fragment,
      { attrs },
      {
        default: () => slots.default?.({
          form: formRef.value
        })
      }
    )
  }
}) as unknown  as DefineComponent)
