import { defineObservableComponent } from '../shared/define-observable-component'
import { useForm } from '../hooks'
import h from '../shared/compatible-create-element'
import { Fragment } from '../shared/fragment-hack'

export default defineObservableComponent({
  name: 'FormConsumer',
  observableSetup(collect, props, { attrs, slots }) {
    const form = useForm()
    collect({
      form
    })
    return () => h(
      Fragment,
      { attrs },
      {
        default: () => slots.default && slots.default({
          form
        })
      }
    )
  }
})
