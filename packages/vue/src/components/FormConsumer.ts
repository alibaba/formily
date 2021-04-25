import { defineComponent } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useForm } from '../hooks'
import h from '../shared/h'
import { Fragment } from '../shared/fragment'

export default observer(defineComponent({
  name: 'FormConsumer',
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const formRef = useForm()
    // const { track } = useObserver()
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
}))
