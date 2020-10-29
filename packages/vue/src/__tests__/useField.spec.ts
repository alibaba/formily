/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { queryByText } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import useForm from '../hooks/useForm'
import useField from '../hooks/useField'
import { FormSymbol } from '../constants'
import { createForm } from '@formily/core'
import { FormLifeCycle, LifeCycleTypes } from '@formily/core'
import UseFieldComponent from './test-components/useField/useField.vue'
import { defineComponent, provide } from '@vue/composition-api'

Vue.use(VueCompositionAPI)

describe('useField hook', () => {
  test('form is required', () => {
    expect(() => {
      useField({})
    }).toThrow()
  })

  test('basic ', () => {
    let globalForm
    let globalGraph
    const formInstance = createForm({
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FORM_GRAPH_CHANGE, graph => {
          globalGraph = graph
        })
      ]
    })

    const WrapperComponent = defineComponent({
      setup() {
        const form = useForm({
          form: formInstance
        })
        globalForm = form
        provide(FormSymbol, form)
      }
    })
    const initialProps = { name: 'username' }

    const { vm } = mount(UseFieldComponent, {
      propsData: {
        initialProps
      },
      parentComponent: WrapperComponent
    })

    const result = (vm as any).getResult()

    expect(result.form).toEqual(globalForm)
    expect(result.state.props).toEqual({})
    expect(result.state).toEqual({
      ...globalGraph.get('username').getState(),
      errors: [],
      mounted: false
    })
  })

  test('update', async () => {
    let globalForm

    const WrapperComponent = defineComponent({
      setup() {
        const form = useForm({})
        globalForm = form
        provide(FormSymbol, form)
      }
    })

    const initialProps = { name: 'username' }

    const { vm } = mount(UseFieldComponent, {
      propsData: {
        initialProps
      },
      parentComponent: WrapperComponent
    })

    let result = (vm as any).getResult()

    expect(result.state.value).toEqual(undefined)
    globalForm.setFormState(state => (state.values.username = 'abcd'))
    await vm.$forceUpdate()
    result = (vm as any).getResult()
    expect(result.state.value).toEqual('abcd')
  })

  test('mounted change', async () => {
    const WrapperComponent = defineComponent({
      setup() {
        const form = useForm({})
        provide(FormSymbol, form)
      }
    })

    const initialProps = { name: 'username' }

    const { vm } = mount(UseFieldComponent, {
      propsData: {
        initialProps
      },
      parentComponent: WrapperComponent
    })

    let result = (vm as any).getResult()

    expect(result.state.mounted).toEqual(false)
    await vm.$forceUpdate()
    result = (vm as any).getResult()
    expect(result.state.mounted).toEqual(true)
  })

  test('dirty', async () => {
    const formInstance = createForm({
      lifecycles: [new FormLifeCycle(LifeCycleTypes.ON_FIELD_CHANGE, () => {})]
    })

    const WrapperComponent = defineComponent({
      setup() {
        const form = useForm({
          form: formInstance
        })
        provide(FormSymbol, form)
      }
    })

    const initialProps = {
      name: 'username',
      props: { disabled: true },
      required: false,
      editable: true,
      rules: []
    }

    const { vm } = mount(UseFieldComponent, {
      propsData: {
        initialProps
      },
      parentComponent: WrapperComponent
    })

    let result = (vm as any).getResult()

    expect(result.props).toEqual({ disabled: true })
    expect(result.state.required).toEqual(false)
    expect(result.state.editable).toEqual(true)
    expect(result.state.rules).toEqual([])

    const rules = [() => ({ type: 'warning', message: 'warning msg' })]

    initialProps.required = true
    initialProps.editable = false
    initialProps.props = { disabled: false }
    initialProps.rules = [...rules]

    expect(result.props).toEqual({ disabled: true })
    expect(result.state.required).toEqual(false)
    expect(result.state.editable).toEqual(true)
    expect(result.state.rules).toEqual([])

    await new Promise(resolve => setTimeout(() => resolve()))
    result = (vm as any).getResult()

    expect(result.props).toEqual(initialProps.props)
    expect(result.state.required).toEqual(initialProps.required)
    expect(result.state.editable).toEqual(initialProps.editable)
    expect(result.state.rules).toEqual([...rules, { required: true }])
  })

  test('extented mutator', async () => {
    const WrapperComponent = defineComponent({
      setup() {
        const form = useForm({})
        provide(FormSymbol, form)
      }
    })

    const initialProps = { name: 'username' }

    const { vm: vm1 } = mount(UseFieldComponent, {
      propsData: {
        initialProps
      },
      parentComponent: WrapperComponent
    })

    const getValueFromEvent = e => e.target.value
    const eventValue = { target: { value: 'abc' } }
    let result1 = (vm1 as any).getResult()

    expect(result1.state.value).toEqual(undefined)
    result1.mutators.change(eventValue)
    await new Promise(resolve => setTimeout(() => resolve()))
    result1 = (vm1 as any).getResult()
    expect(result1.state.value).toEqual(eventValue)

    const { vm: vm2 } = mount(UseFieldComponent, {
      propsData: {
        initialProps: {
          ...initialProps,
          getValueFromEvent
        }
      },
      parentComponent: WrapperComponent
    })
    let result2 = (vm2 as any).getResult()

    expect(result2.state.value).toEqual(undefined)
    result2.mutators.change(eventValue)
    await new Promise(resolve => setTimeout(() => resolve()))
    result2 = (vm2 as any).getResult()
    expect(result2.state.value).toEqual('abc')
  })

  test('triggerType mutator onChange', async () => {
    const WrapperComponent = defineComponent({
      setup() {
        const form = useForm({})
        provide(FormSymbol, form)
      }
    })
    const initialProps = { name: 'username', required: true }

    const { vm: vm1 } = mount(UseFieldComponent, {
      propsData: {
        initialProps
      },
      parentComponent: WrapperComponent
    })

    let result1 = (vm1 as any).getResult()

    expect(result1.state.errors).toEqual([])
    expect(result1.state.value).toEqual(undefined)
    result1.mutators.change('123')
    await vm1.$forceUpdate()
    result1 = (vm1 as any).getResult()
    expect(result1.state.value).toEqual('123')
    expect(result1.state.errors).toEqual([])

    const { vm: vm2, element: element2 } = mount(UseFieldComponent, {
      propsData: {
        initialProps: {
          ...initialProps,
          triggerType: 'onChange'
        }
      },
      parentComponent: WrapperComponent
    })
    let result2 = (vm2 as any).getResult()

    expect(result2.state.errors).toEqual([])
    expect(result2.state.value).toEqual(undefined)

    result2.mutators.change('')
    await new Promise(resolve => setTimeout(() => resolve()))
    result2 = (vm2 as any).getResult()
    expect(result2.state.value).toEqual('')
    expect(queryByText(element2, 'This field is required')).toBeVisible()
  })

  test('triggerType mutator onBlur', async () => {
    const WrapperComponent = defineComponent({
      setup() {
        const form = useForm({})
        provide(FormSymbol, form)
      }
    })
    const initialProps = { name: 'username', required: true }

    const { vm: vm1 } = mount(UseFieldComponent, {
      propsData: {
        initialProps
      },
      parentComponent: WrapperComponent
    })

    let result1 = (vm1 as any).getResult()

    expect(result1.state.errors).toEqual([])
    result1.mutators.blur()
    await vm1.$nextTick()
    result1 = (vm1 as any).getResult()
    expect(result1.state.errors).toEqual([])

    const { vm: vm2, element: element2 } = mount(UseFieldComponent, {
      propsData: {
        initialProps: {
          ...initialProps,
          triggerType: 'onBlur'
        }
      },
      parentComponent: WrapperComponent
    })
    let result2 = (vm2 as any).getResult()

    expect(result2.state.errors).toEqual([])
    result2.mutators.blur()
    await vm2.$nextTick()
    await new Promise(resolve => setTimeout(() => resolve()))
    result2 = (vm2 as any).getResult()
    expect(queryByText(element2, 'This field is required')).toBeVisible()
  })
})
