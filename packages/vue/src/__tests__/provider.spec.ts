import { fireEvent, getByTestId, queryByTestId } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { Broadcast } from '../shared'
import { createForm } from '@formily/core'
import { createFormActions } from '../index'
import ProviderComponent1 from './test-components/provider/provider1.vue'
import ProviderComponent2 from './test-components/provider/provider2.vue'

describe('provider hook', () => {
  test('basic', async () => {
    const actions = createFormActions()

    const { vm, element } = mount(ProviderComponent1, {
      propsData: {
        actions
      }
    })
    const broadcast = (vm as any).getBroadcast()
    expect(broadcast instanceof Broadcast).toEqual(true)

    expect(getByTestId(element, 'spy-value').textContent).toEqual('')

    fireEvent.change(queryByTestId(element, 'test-input'), {
      target: { value: 123 }
    })

    await new Promise(resolve => setTimeout(() => resolve()))

    expect(getByTestId(element, 'spy-value').textContent).toEqual('123')
  })

  test('custom form is invalid for provider', async () => {
    const customForm = createForm()
    const actions = createFormActions()

    const { vm, element } = mount(ProviderComponent2, {
      propsData: {
        actions,
        form: customForm
      }
    })
    const broadcast = (vm as any).getBroadcast()
    expect(broadcast instanceof Broadcast).toEqual(true)

    // 传入自定义的form会使得useForm绑定broadcast逻辑失效
    expect(getByTestId(element, 'spy-value').textContent).toEqual('undefined')
  })
})
