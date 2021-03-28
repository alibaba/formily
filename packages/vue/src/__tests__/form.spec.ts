import Vue from 'vue'
import { render } from '@testing-library/vue'
import { createForm } from '@formily/core'
import { FormProvider } from '../'
import { FormConsumer } from '../components'

Vue.component('FormProvider', FormProvider)
Vue.component('FormConsumer', FormConsumer)

test('render form', () => {
  const form = createForm()
  render({
    data() { return { form } },
    template: `<FormProvider :form="form">
      <FormConsumer>
        <template #default="{ form }">
          {{ form.mounted }}
        </template>
      </FormConsumer>
      <FormConsumer />
    </FormProvider>`
  })
  expect(form.mounted).toBeTruthy()
})
