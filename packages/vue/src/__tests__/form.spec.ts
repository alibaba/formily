import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { render, fireEvent, waitFor } from '@testing-library/vue'
import { VueClass } from '@vue/test-utils'
import { createFormActions } from '../index'
import { LifeCycleTypes } from '@formily/core'
import FormComponent1 from './test-components/form/form1.vue'
import FormComponent2 from './test-components/form/form2.vue'
import FormComponent3 from './test-components/form/form3.vue'

Vue.use(VueCompositionAPI)

describe('test all apis', () => {
  test('Form', async () => {
    const actions = createFormActions()
    const onSubmitHandler = jest.fn()
    const onValidateFailedHandler = jest.fn()
    render(FormComponent1 as VueClass<FormComponent1>, {
      props: {
        actions,
        onSubmitHandler,
        onValidateFailedHandler
      }
    })
    try {
      await actions.submit()
    } catch (e) {
      expect(e).toEqual([
        {
          path: 'test-input',
          name: 'test-input',
          messages: ['This field is required']
        }
      ])
    }
    actions.setFieldState('test-input', state => {
      state.value = 'hello world'
    })
    await actions.submit()
    expect(onSubmitHandler).toBeCalledWith({ 'test-input': 'hello world' })
  })

  test('onSubmit async', async () => {
    const actions = createFormActions()
    const onSubmitEndHandler = jest.fn()
    const { getByTestId, queryByTestId } = render(
      FormComponent2 as VueClass<FormComponent2>,
      {
        props: {
          actions
        }
      }
    )
    expect(onSubmitEndHandler).toBeCalledTimes(0)
    fireEvent.click(queryByTestId('submit'))
    await new Promise(resolve => setTimeout(() => resolve(), 1000))
    const submitEle = await waitFor(() => getByTestId('submit'))
    expect(submitEle.textContent).not.toEqual(LifeCycleTypes.ON_FORM_INIT)
  })

  test('onSubmit unmount promise', async () => {
    const actions = createFormActions()
    const onSubmitEndHandler = jest.fn()

    const { getByTestId, queryByTestId } = render(
      FormComponent3 as VueClass<FormComponent3>,
      {
        props: {
          actions
        }
      }
    )

    expect(onSubmitEndHandler).toBeCalledTimes(0)
    fireEvent.click(queryByTestId('submit'))
    const submitEle = await waitFor(() => getByTestId('submit'))

    expect(submitEle.textContent).toEqual(LifeCycleTypes.ON_FORM_INIT)
  })
})

describe('major scenes', () => {
  //todo
  test('basic', () => {
    //todo
  })
})

describe('bugfix', () => {
  //todo
  test('basic', () => {
    //todo
  })
})
