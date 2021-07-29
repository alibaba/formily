import Vue from 'vue'
import { render } from '@testing-library/vue'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer } from '../vue2-components'

Vue.component('FormProvider', FormProvider)
Vue.component('FormConsumer', FormConsumer)

test('render form', () => {
  const form = createForm()
  render({
    data() {
      return { form }
    },
    template: `<FormProvider :form="form">
      <FormConsumer>
        <template #default="{ form }">
          {{ form.mounted }}
        </template>
      </FormConsumer>
      <FormConsumer />
    </FormProvider>`,
  })

  const errorRender = () =>
    render({
      template: `<FormConsumer />`,
    })

  expect(form.mounted).toBeTruthy()
  expect(errorRender).toThrow('Can not found form instance from context.')
})
