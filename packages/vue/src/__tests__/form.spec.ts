import Vue from 'vue'
import { render, fireEvent } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { createForm } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  ObjectField,
  VoidField,
} from '../vue2-components'
import { defineComponent } from 'vue-demi'
import { useParentForm, useField } from '../hooks'
import { h } from 'vue-demi'

Vue.component('FormProvider', FormProvider)
Vue.component('FormConsumer', FormConsumer)
Vue.component('ObjectField', ObjectField)
Vue.component('VoidField', VoidField)
Vue.component('Field', Field)

const Input = defineComponent({
  props: ['value'],
  setup(props, { attrs, listeners }) {
    const fieldRef = useField()
    return () => {
      const field = fieldRef.value
      return h('input', {
        class: 'test-input',
        attrs: {
          ...attrs,
          value: props.value,
          'data-testid': field.path.toString(),
        },
        on: {
          ...listeners,
          input: listeners.change,
        },
      })
    }
  },
})

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

test('useInjectionCleaner', async () => {
  const form = createForm()

  const { getByTestId } = render({
    name: 'TestComponent',
    setup() {
      return {
        form,
        Input,
      }
    },
    template: `<FormProvider :form="form">
      <Field name="parent">
        <FormProvider :form="form">
          <Field name="inner" :component="[Input]" />
        </FormProvider>
        <Field name="outer" :component="[Input]" />
      </Field>
    </FormProvider>`,
  })
  expect(form.mounted).toBeTruthy()
  expect(form.query('inner').take().mounted).toBeTruthy()
  expect(form.query('parent.outer').take().mounted).toBeTruthy()
  await fireEvent.update(getByTestId('parent.outer'), '123')
  expect(form.getValuesIn('parent.outer')).toBe('123')
  await fireEvent.update(getByTestId('inner'), '123')
  expect(form.getValuesIn('inner')).toBe('123')
})

test('FormConsumer', async () => {
  const form = createForm({
    values: {
      a: 'abc',
    },
  })
  const wrapper = mount({
    data() {
      return { form, Input }
    },
    template: `<FormProvider :form="form">
      <Field name="a" :component="[Input]" />
      <FormConsumer ref="consumer">
        <template #default="{ form }">
          <div class="consumer">{{JSON.stringify(form.values)}}</div>
        </template>
      </FormConsumer>
    </FormProvider>`,
  })
  expect(form.getValuesIn('a')).toBe('abc')
  expect(wrapper.find('.consumer').text()).toBe('{"a":"abc"}')
  form.setDisplay('none')
  expect(form.getValuesIn('a')).toBeUndefined()
  const $consumer = wrapper.vm.$refs.consumer as Vue
  $consumer.$forceUpdate()
  expect(wrapper.find('.consumer').text()).toBe('{}')
})
