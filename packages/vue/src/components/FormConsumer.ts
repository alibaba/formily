import { defineObservableComponent } from '../utils/define-observable-component'
import { useForm } from '../hooks'
import h from '../utils/compatible-create-element'

export default defineObservableComponent({
  name: 'FormConsumer',
  observableSetup(collect, props, { attrs, slots }) {
    const form = useForm()
    collect({
      form
    })
    return () => h(
      'div',
      { attrs },
      {
        default: () => slots.default && slots.default({
          form
        })
      }
    )
  }
})