import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { fireEvent, getByTestId, queryByTestId } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { createForm } from '@formily/core'
import { createFormActions, LifeCycleTypes } from '../index'
import FormComponent1 from './test-components/spy/form1.vue'
import FormComponent2 from './test-components/spy/form2.vue'
import FormComponent3 from './test-components/spy/form3.vue'

Vue.use(VueCompositionAPI)

const sleep = (duration = 100) =>
  new Promise(resolve => setTimeout(resolve, duration))

describe('useFormSpy hook', () => {
  test('basic', async () => {
    const opts = {}
    const form = createForm(opts)
    const actions = createFormActions()

    const { vm, element } = mount(FormComponent1, {
      propsData: {
        actions,
        form
      }
    })

    expect(getByTestId(element, 'spy-form').textContent).toEqual('true')
    expect(getByTestId(element, 'spy-type').textContent).toEqual(
      LifeCycleTypes.ON_FORM_INIT
    )
    expect(getByTestId(element, 'spy-value').textContent).toEqual('')
    fireEvent.change(queryByTestId(element, 'test-input'), {
      target: { value: 123 }
    })
    await sleep()
    const typeList = (vm as any).getTypeList()
    expect(typeList).toContain(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
    expect(typeList).toContain(LifeCycleTypes.ON_FIELD_CHANGE)
    expect(typeList).toContain(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
    expect(typeList).toContain(LifeCycleTypes.ON_FIELD_INPUT_CHANGE)
    expect(typeList).toContain(LifeCycleTypes.ON_FORM_INPUT_CHANGE)
    expect(getByTestId(element, 'spy-type').textContent).toEqual(
      typeList[typeList.length - 1]
    )
    expect(getByTestId(element, 'spy-value').textContent).toEqual('123')
  })

  test('selector', async () => {
    const opts = {}
    const form = createForm(opts)
    const actions = createFormActions()

    const { vm, element } = mount(FormComponent2, {
      propsData: {
        actions,
        form
      }
    })

    expect(getByTestId(element, 'spy-type').textContent).toEqual(
      LifeCycleTypes.ON_FORM_INIT
    )
    expect(getByTestId(element, 'spy-value').textContent).toEqual('')
    fireEvent.change(queryByTestId(element, 'test-input'), {
      target: { value: 123 }
    })
    await sleep()
    const typeList = (vm as any).getTypeList()
    expect(getByTestId(element, 'spy-type').textContent).toEqual(
      LifeCycleTypes.ON_FIELD_VALUE_CHANGE
    )
    expect(getByTestId(element, 'spy-type').textContent).toEqual(
      typeList[typeList.length - 1]
    )
    expect(getByTestId(element, 'spy-value').textContent).toEqual('123')
  })

  test('reducer', async () => {
    const opts = {}
    const form = createForm(opts)
    const actions = createFormActions()
    const { element } = mount(FormComponent3, {
      propsData: {
        actions,
        form
      }
    })

    expect(getByTestId(element, 'spy-value').textContent).toEqual('')
    fireEvent.change(queryByTestId(element, 'test-input'), {
      target: { value: 123 }
    })
    fireEvent.change(queryByTestId(element, 'test-input'), {
      target: { value: 456 }
    })
    fireEvent.change(queryByTestId(element, 'test-input'), {
      target: { value: 789 }
    })
    await sleep()
    expect(getByTestId(element, 'spy-value').textContent).toEqual('789')
    expect(getByTestId(element, 'spy-count').textContent).toEqual('1')
  })
})
