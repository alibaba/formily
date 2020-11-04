/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import VueCompositionAPI, {
  defineComponent,
  provide
} from '@vue/composition-api'
import { mount } from '@vue/test-utils'
import useForm from '../hooks/useForm'
import useVirtualField from '../hooks/useVirtualField'
import { FormSymbol } from '../constants'
import { FormLifeCycle, LifeCycleTypes, createForm } from '@formily/core'

Vue.use(VueCompositionAPI)

describe('useVirtualField hook', () => {
  test('form is required', () => {
    expect(() => {
      useVirtualField({})
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
    const TestComponent = defineComponent({
      setup() {
        const [res, syncValueBeforeUpdate] = useVirtualField({
          name: 'username'
        })

        syncValueBeforeUpdate({
          state: 'state',
          'state.props': 'props'
        })
        return res
      },
      template: '<div></div>'
    })

    const FormComponent = defineComponent({
      components: { TestComponent },
      setup() {
        const form = useForm({
          form: formInstance
        })
        globalForm = form
        provide(FormSymbol, form)
        return { form }
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const wrapper = mount(FormComponent)
    const { vm: wrapperVm } = wrapper
    const { vm: childVm } = wrapper.findComponent(TestComponent)

    expect(wrapperVm.form).toEqual(globalForm)
    expect(childVm.state.props).toEqual({})
    expect(childVm.state).toEqual({
      ...globalGraph.get('username').getState(),
      mounted: false
    })
  })

  test('update', async () => {
    let globalForm
    const TestComponent = defineComponent({
      setup() {
        const [res, syncValueBeforeUpdate] = useVirtualField({
          name: 'username'
        })

        syncValueBeforeUpdate({
          state: 'state',
          'state.props': 'props'
        })
        return res
      },
      template: '<div></div>'
    })

    const FormComponent = defineComponent({
      components: { TestComponent },
      setup() {
        const form = useForm({})
        globalForm = form
        provide(FormSymbol, form)
        return {}
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm: childVm } = mount(FormComponent).findComponent(TestComponent)

    expect(childVm.state.visible).toEqual(true)
    globalForm.setFieldState('username', state => (state.visible = false))

    await childVm.$forceUpdate()

    expect(childVm.state.visible).toEqual(false)
  })

  test('mounted change', async () => {
    const TestComponent = defineComponent({
      setup() {
        const [res, syncValueBeforeUpdate] = useVirtualField({
          name: 'username'
        })

        syncValueBeforeUpdate({
          state: 'state',
          'state.props': 'props'
        })
        return res
      },
      template: '<div></div>'
    })

    const FormComponent = defineComponent({
      components: { TestComponent },
      setup() {
        const form = useForm({})
        provide(FormSymbol, form)
        return {}
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm: childVm } = mount(FormComponent).findComponent(TestComponent)

    expect(childVm.state.mounted).toEqual(false)
    await childVm.$forceUpdate()
    expect(childVm.state.mounted).toEqual(true)
  })

  test('dirty', async () => {
    const initialProps = {
      name: 'username',
      props: { disabled: true }
    }
    const TestComponent = defineComponent({
      setup() {
        const [res, syncValueBeforeUpdate] = useVirtualField(initialProps)
        const { props: innerProps, state } = res

        syncValueBeforeUpdate({
          state: 'state',
          'state.props': 'innerProps'
        })

        return {
          innerProps,
          state
        }
      },
      template: '<div></div>'
    })

    const FormComponent = defineComponent({
      components: { TestComponent },
      setup() {
        const formInstance = createForm({
          lifecycles: [
            new FormLifeCycle(LifeCycleTypes.ON_FIELD_CHANGE, () => {})
          ]
        })
        const form = useForm({
          form: formInstance
        })
        provide(FormSymbol, form)
        return {}
      },
      template: `
        <div>
          <TestComponent></TestComponent>
        </div>
        `
    })

    const { vm: childVm } = mount(FormComponent).findComponent(TestComponent)

    expect(childVm.innerProps).toEqual({ disabled: true })
    initialProps.props = { disabled: false }

    expect(childVm.innerProps).toEqual({ disabled: true })
    await new Promise(resolve => setTimeout(() => resolve()))
    expect(childVm.innerProps).toEqual(initialProps.props)
  })
})
