import Vue, { FunctionalComponentOptions } from 'vue'
import { render, fireEvent, waitFor } from '@testing-library/vue'
import { defineComponent, h } from '@vue/composition-api'
import { createForm, Field as FieldType } from '@formily/core'
import { useField, useFormEffects, connect, mapProps, mapReadPretty } from '../'
import {
  FormProvider,
  ArrayField,
  ObjectField,
  VoidField,
  Field,
} from '../vue2-components'
import ReactiveField from '../components/ReactiveField'
// import { expectThrowError } from './shared'
import { isField, isVoidField, onFieldChange } from '@formily/core'

Vue.component('FormProvider', FormProvider)
Vue.component('ArrayField', ArrayField)
Vue.component('ObjectField', ObjectField)
Vue.component('VoidField', VoidField)
Vue.component('Field', Field)
Vue.component('ReactiveField', ReactiveField as unknown as Vue)

const Decorator: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h('div', context.data, context.children)
  },
}

const Input = defineComponent({
  props: ['value'],
  setup(props, { attrs, listeners }) {
    const fieldRef = useField()
    return () => {
      const field = fieldRef.value
      return h('input', {
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

const Normal: FunctionalComponentOptions = {
  functional: true,
  render(h) {
    return h('div')
  },
}

test('render field', async () => {
  const form = createForm()
  const onChange = jest.fn()
  const atChange = jest.fn()
  const atBlur = jest.fn()
  const atFocus = jest.fn()

  const { getByTestId, queryByTestId } = render(
    defineComponent({
      name: 'TestComponent',
      setup() {
        return {
          form,
          Normal,
          Input,
          Decorator,
          onChange,
          atChange,
          atFocus,
          atBlur,
        }
      },
      template: `<FormProvider :form="form">
      <Field
        name="aa"
        :decorator="[Decorator]"
        :component="[Input, { onChange }]"
      />
      <ArrayField name="bb" :decorator="[Decorator]">
        <div data-testid="bb-children"></div>
      </ArrayField>
      <ObjectField name="cc" :decorator="[Decorator]">
        <Field name="mm" :decorator="[Decorator]" :component="[Input]" />
        <ObjectField name="pp" :decorator="[Decorator]" />
        <ArrayField name="tt" :decorator="[Decorator]" />
        <VoidField name="ww" />
      </ObjectField>
      <VoidField name="dd" :decorator="[Decorator]">
        <div data-testid="dd-children">
          <Field name="oo" :decorator="[Decorator]" :component="[Input]" />
        </div>
      </VoidField>
      <VoidField name="xx" :decorator="[Decorator]" :component="[Normal]" />
      <Field
        name="ee"
        :visible="false"
        :decorator="[Decorator]"
        :component="[Input]"
      />
      <Field name="ff" :decorator="[]" :component="[]" />
      <Field name="gg" :decorator="null" :component="null" />
      <Field name="hh" :decorator="[null]" :component="[null, null]" />
      <Field
        name="kk"
        :decorator="[Decorator]"
        :component="[Input, { onChange: null }]"
      />
      <Field
        name="ll"
        :decorator="[Decorator]"
        :component="[Input, { '@change': atChange, '@focus': atFocus, '@blur': atBlur }]"
      />
    </FormProvider>`,
    })
  )
  expect(form.mounted).toBeTruthy()
  expect(form.query('aa').take().mounted).toBeTruthy()
  expect(form.query('bb').take().mounted).toBeTruthy()
  expect(form.query('cc').take().mounted).toBeTruthy()
  expect(form.query('dd').take().mounted).toBeTruthy()
  await fireEvent.update(getByTestId('aa'), '123')
  await fireEvent.update(getByTestId('kk'), '123')
  await fireEvent.focus(getByTestId('ll'))
  await fireEvent.blur(getByTestId('ll'))
  await fireEvent.update(getByTestId('ll'), '123')
  expect(onChange).toBeCalledTimes(1)
  expect(atChange).toBeCalledTimes(1)
  expect(atFocus).toBeCalledTimes(1)
  expect(atBlur).toBeCalledTimes(1)
  expect(getByTestId('bb-children')).not.toBeUndefined()
  expect(getByTestId('dd-children')).not.toBeUndefined()
  expect(queryByTestId('ee')).toBeNull()
  expect(form.query('aa').get('value')).toEqual('123')
  expect(form.query('kk').get('value')).toEqual('123')
})

test('ReactiveField', () => {
  render({
    template: `<ReactiveField :field="null" />`,
  })
  render({
    template: `<ReactiveField :field="null">
      <div></div>
    </ReactiveField>`,
  })
})

test('useAttch', async () => {
  const form1 = createForm()
  const MyComponent = defineComponent({
    props: ['form', 'name1', 'name2', 'name3', 'name4'],
    data() {
      return { Input, Decorator }
    },
    template: `<FormProvider :form="form">
      <Field :name="name1" :decorator="[Decorator]" :component="[Input]" />
      <ArrayField :name="name2" :decorator="[Decorator]" :component="[Input]" />
      <ObjectField :name="name3" :decorator="[Decorator]" :component="[Input]" />
      <VoidField :name="name4" :decorator="[Decorator]" :component="[Input]" />
    </FormProvider>`,
  })
  const { updateProps } = render(MyComponent, {
    props: {
      form: form1,
      name1: 'aa',
      name2: 'bb',
      name3: 'cc',
      name4: 'dd',
    },
  })
  expect(form1.mounted).toBeTruthy()
  expect(form1.query('aa').take().mounted).toBeTruthy()
  expect(form1.query('bb').take().mounted).toBeTruthy()
  expect(form1.query('cc').take().mounted).toBeTruthy()
  expect(form1.query('dd').take().mounted).toBeTruthy()
  await updateProps({
    name1: 'aaa',
    name2: 'bbb',
    name3: 'ccc',
    name4: 'ddd',
  })
  await Vue.nextTick()
  expect(form1.query('aa').take().mounted).toBeFalsy()
  expect(form1.query('bb').take().mounted).toBeFalsy()
  expect(form1.query('cc').take().mounted).toBeFalsy()
  expect(form1.query('dd').take().mounted).toBeFalsy()
  expect(form1.query('aaa').take().mounted).toBeTruthy()
  expect(form1.query('bbb').take().mounted).toBeTruthy()
  expect(form1.query('ccc').take().mounted).toBeTruthy()
  expect(form1.query('ddd').take().mounted).toBeTruthy()
  const form2 = createForm()
  await updateProps({
    form: form2,
  })
  await Vue.nextTick()
  expect(form1.unmounted).toBeTruthy()
  expect(form2.mounted).toBeTruthy()
})

test('useFormEffects', async () => {
  const form = createForm()
  const CustomField = defineComponent({
    props: ['value'],
    setup(props) {
      const fieldRef = useField<FieldType>()
      useFormEffects(() => {
        onFieldChange('aa', ['value'], (target) => {
          if (isVoidField(target)) return
          fieldRef.value.setValue(target.value)
        })
      })
      return () => {
        return h('div', { attrs: { 'data-testid': 'custom-value' } }, [
          props.value,
        ])
      }
    },
  })
  const { queryByTestId } = render({
    data() {
      return { form, Decorator, Input, CustomField }
    },
    template: `<FormProvider :form="form">
      <Field name="aa" :decorator="[Decorator]" :component="[Input]" />
      <Field name="bb" :component="[CustomField]" />
    </FormProvider>`,
  })
  expect(queryByTestId('custom-value').textContent).toEqual('')
  form.query('aa').take((aa) => {
    if (isField(aa)) {
      const value = '123' as any
      aa.setValue(value)
    }
  })
  await waitFor(() => {
    expect(queryByTestId('custom-value').textContent).toEqual('123')
  })
})

test('connect', async () => {
  const CustomField = connect(
    {
      functional: true,
      props: ['list'],
      render(h, context) {
        return h('div', [context.props.list])
      },
    },
    mapProps({ value: 'list', loading: true }, (props, field) => {
      return {
        ...props,
        mounted: field.mounted ? 1 : 2,
      }
    }),
    mapReadPretty({
      render(h) {
        return h('div', 'read pretty')
      },
    })
  )
  const BaseComponent = {
    functional: true,
    name: 'BaseComponent',
    render(h, context) {
      return h('div', [context.props.value])
    },
  } as FunctionalComponentOptions
  const CustomField2 = connect(
    BaseComponent,
    mapProps({ value: true, loading: true }),
    mapReadPretty({
      render(h) {
        return h('div', 'read pretty')
      },
    })
  )

  const CustomField3 = connect(
    Input,
    mapProps(),
    mapReadPretty({
      render(h) {
        return h('div', 'read pretty')
      },
    })
  )

  const CustomFormItem = connect(
    {
      functional: true,
      render(h, context) {
        return h('div', context.data, context.children)
      },
    },
    mapProps(),
    mapReadPretty({
      render(h) {
        return h('div', 'read pretty')
      },
    })
  )

  const form = createForm()
  const { queryByText, getByTestId } = render({
    components: {
      CustomFormItem,
    },
    data() {
      return {
        form,
        Decorator,
        CustomField,
        CustomField2,
        CustomField3,
      }
    },
    template: `<FormProvider :form="form">
      <Field name="aa" :decorator="[Decorator]" :component="[CustomField]" />
      <Field name="bb" :decorator="[Decorator]" :component="[CustomField2]" />
      <Field name="cc" :decorator="[Decorator]" :component="[CustomField3]" />
      <CustomFormItem>dd</CustomFormItem>
    </FormProvider>`,
  })
  form.query('aa').take((field) => {
    field.setState((state) => {
      state.value = '123'
    })
  })

  expect(queryByText('dd')).toBeVisible()
  await waitFor(() => {
    expect(queryByText('123')).toBeVisible()
  })

  fireEvent.update(getByTestId('cc'), '123')
  expect(queryByText('123')).toBeVisible()
  expect(form.query('cc').get('value')).toEqual('123')

  form.query('aa').take((field) => {
    if (!isField(field)) return
    field.readPretty = true
  })
  await waitFor(() => {
    expect(queryByText('123')).toBeNull()
    expect(queryByText('read pretty')).toBeVisible()
  })
})
