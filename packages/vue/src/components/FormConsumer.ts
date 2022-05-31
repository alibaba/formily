import { defineComponent } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useForm } from '../hooks'
import h from '../shared/h'

export default observer(
  defineComponent({
    name: 'FormConsumer',
    inheritAttrs: false,
    setup(props, { slots }) {
      const formRef = useForm()
      return () => {
        // just like <Fragment>
        return h(
          'div',
          { style: { display: 'contents' } },
          {
            default: () =>
              slots.default?.({
                form: formRef.value,
              }),
          }
        )
      }
    },
  }),
  {
    // make sure observables updated <cannot be tracked by tests>
    scheduler: /* istanbul ignore next */ (update) =>
      Promise.resolve().then(update),
  }
)
