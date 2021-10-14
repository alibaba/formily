import Vue from 'vue'
import { render } from '@testing-library/vue'
import { createForm } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  ObjectField,
  VoidField,
} from '../vue2-components'
import { defineComponent } from 'vue-demi'
import { useParentForm } from '../hooks'
import { h } from 'vue-demi'

Vue.component('FormProvider', FormProvider)
Vue.component('FormConsumer', FormConsumer)
Vue.component('ObjectField', ObjectField)
Vue.component('VoidField', VoidField)
Vue.component('Field', Field)

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

  expect(form.mounted).toBeTruthy()
})

const DisplayParentForm = defineComponent({
  setup() {
    const form = useParentForm()

    return () => h('div', [form.value.displayName])
  },
})

test('useParentForm', () => {
  const { queryByTestId } = render({
    components: {
      DisplayParentForm,
    },
    data() {
      const form = createForm()
      return { form }
    },
    template: `<FormProvider :form="form">
    <ObjectField name="aa">
      <Field name="bb">
        <DisplayParentForm data-testid="111" />
      </Field>
    </ObjectField>
    <VoidField name="cc">
      <Field name="dd">
        <DisplayParentForm data-testid="222" />
      </Field>
    </VoidField>
    <DisplayParentForm data-testid="333" />
  </FormProvider>`,
  })
  expect(queryByTestId('111').textContent).toBe('ObjectField')
  expect(queryByTestId('222').textContent).toBe('Form')
  expect(queryByTestId('333').textContent).toBe('Form')
})
