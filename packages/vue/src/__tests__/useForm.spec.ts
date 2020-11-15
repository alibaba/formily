/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import VueCompositionAPI, {
  defineComponent,
  provide
} from '@vue/composition-api'
import { mount } from '@vue/test-utils'
import { Broadcast } from '../shared'
import { BroadcastSymbol } from '../constants'
import { createForm } from '@formily/core'
import useForm from '../hooks/useForm'
import { createFormActions, createAsyncFormActions } from '../index'

Vue.use(VueCompositionAPI)

describe('useForm hook', () => {
  test('return createForm instance', () => {
    const opts = {}
    const form = createForm(opts)

    const TestComponent = defineComponent({
      setup() {
        const result = useForm({ form })
        return { form: result }
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, new Broadcast())
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    expect(vm.form).toEqual(form)
  })

  test('createForm instance binding api call with broadcast', () => {
    const fn = jest.fn()
    const typeArr = []
    const broadcastInstance = new Broadcast()
    broadcastInstance.subscribe(fn)
    broadcastInstance.subscribe((a: any) => {
      typeArr.push(a.type)
    })

    const TestComponent = defineComponent({
      setup() {
        const result = useForm({})
        return { form: result }
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, broadcastInstance)
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    // 第一次formChange: initialized, editable(从true -> undefined , 有问题)
    // 第二次formChange: mounted
    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    expect(typeArr).toEqual([
      'onFormWillInit',
      'onFormGraphChange',
      'onFormInit',
      'onFormChange',
      'onFormMount',
      'onFormChange'
    ])
    expect(fn).toBeCalledTimes(6)

    const targetValues = { username: 'abcd' }
    vm.form.setFormState(state => (state.values = targetValues))

    // 第三次formChange: values
    expect(typeArr).toEqual([
      'onFormWillInit',
      'onFormGraphChange',
      'onFormInit',
      'onFormChange',
      'onFormMount',
      'onFormChange',
      'onFormValuesChange',
      'onFormChange',
      'onFormHostRender'
    ])
    expect(fn).toBeCalledTimes(9)
    expect(vm.form.getFormState(state => state.values)).toEqual(targetValues)
  })

  test('useForm with initialValues', () => {
    const targetValues = { username: 'abcd' }
    const values = { age: 20 }

    const TestComponent = defineComponent({
      setup() {
        const result = useForm({ initialValues: targetValues, value: values })
        return { form: result }
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, new Broadcast())
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    expect(vm.form.getFormState(state => state.initialValues)).toEqual(
      targetValues
    )
    expect(vm.form.getFormState(state => state.values)).toEqual({
      ...targetValues,
      ...values
    })
  })

  test('useForm with defaultValue', () => {
    const targetValues = { username: 'abcd' }
    const values = { age: 20 }

    const TestComponent = defineComponent({
      setup() {
        const result = useForm({ defaultValue: targetValues, value: values })
        return { form: result }
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, new Broadcast())
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    expect(vm.form.getFormState(state => state.initialValues)).toEqual(
      targetValues
    )
    expect(vm.form.getFormState(state => state.values)).toEqual({
      ...targetValues,
      ...values
    })
  })

  test('useForm with values', () => {
    const targetValues = { username: 'abcd' }
    const TestComponent = defineComponent({
      setup() {
        const result = useForm({ value: targetValues })
        return { form: result }
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, new Broadcast())
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    expect(vm.form.getFormState(state => state.initialValues)).toEqual({})
    expect(vm.form.getFormState(state => state.values)).toEqual(targetValues)
  })

  test('useForm with editable', () => {
    const TestComponent = defineComponent({
      setup() {
        const result = useForm({ editable: false })
        return { form: result }
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, new Broadcast())
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    expect(vm.form.getFormState(state => state.editable)).toEqual(false)
  })

  test('FormState change', () => {
    const form = createForm({})
    expect(form.getFormState(state => state.mounted)).toEqual(false)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(form.getFormState(state => state.editable)).toEqual(true)

    const TestComponent = defineComponent({
      setup() {
        const result = useForm({ form })
        return { form: result }
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, new Broadcast())
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    expect(vm.form.getFormState(state => state.mounted)).toEqual(true)
    expect(vm.form.getFormState(state => state.initialized)).toEqual(true)
    expect(vm.form.getFormState(state => state.editable)).toEqual(true)
  })

  test('FormActions will implemented(sync)', () => {
    const actions = createFormActions()
    expect(actions.getFormState()).toEqual(undefined)
    const targetValues = { username: 'abcd' }
    actions.setFormState(state => (state.values = targetValues))
    expect(actions.getFormState(state => state.values)).toEqual(undefined)

    const TestComponent = defineComponent({
      setup() {
        const result = useForm({ actions })
        return { form: result }
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, new Broadcast())
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    expect(actions.getFormState()).not.toEqual(undefined)
    expect(vm.form.getFormState()).toEqual(actions.getFormState())
    expect(actions.getFormState(state => state.values)).toEqual({})
  })

  test('FormActions will implemented(async)', async () => {
    const actions = createAsyncFormActions()
    const targetValues = { username: 'abcd' }

    const TestComponent = defineComponent({
      setup() {
        const result = useForm({ actions })
        return { form: result }
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, new Broadcast())
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    const initialValues = await actions.getFormState(state => state.values)
    expect(initialValues).toEqual({})
    await actions.setFormState(state => (state.values = targetValues))

    const resultValues = await actions.getFormState(state => state.values)
    expect(resultValues).toEqual(targetValues)
    const actionResultValues = await vm.form.getFormState(state => state.values)
    expect(actionResultValues).toEqual(resultValues)
  })

  test('broadaast context', () => {
    const TestComponent = defineComponent({
      setup() {
        const result = useForm({})
        return { form: result }
      },
      template: '<div></div>'
    })

    const broadcastInstance = new Broadcast()

    const WrapperComponent = defineComponent({
      components: { TestComponent },
      setup() {
        provide(BroadcastSymbol, broadcastInstance)
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    expect(broadcastInstance.context).toEqual(undefined)

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    const symbolList = Object.getOwnPropertySymbols(vm.form)
    expect({ ...broadcastInstance.context, [symbolList[0]]: true }).toEqual({
      ...vm.form,
      dispatch: vm.form.notify
    })
  })
})
