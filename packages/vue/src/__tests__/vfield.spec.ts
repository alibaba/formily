import { render, fireEvent } from '@testing-library/vue'
import { createFormActions, createAsyncFormActions } from '../index'
import { IFormActions, IFormAsyncActions } from '../types'
import FormComponent from './test-components/vfield/form.vue'

describe('test all apis', () => {
  let actions: IFormActions
  let asyncActions: IFormAsyncActions
  let onSubmitHandler: any
  let onResetHandler: any
  let onValidateFailedHandler: any
  let onChangeHandler: any

  const renderForm = (isAsync = false) =>
    render(FormComponent, {
      props: {
        actions: isAsync ? asyncActions : actions,
        onSubmitHandler,
        onResetHandler,
        onChangeHandler,
        onValidateFailedHandler
      }
    })

  beforeAll(() => {
    actions = createFormActions()
    asyncActions = createAsyncFormActions()
    onSubmitHandler = jest.fn()
    onResetHandler = jest.fn()
    onValidateFailedHandler = jest.fn()
    onChangeHandler = jest.fn()
  })

  test('virtualField visible and display', () => {
    const { queryByTestId } = renderForm()
    const radio1Ele = queryByTestId('radio1')
    fireEvent.click(radio1Ele)
    const inputB1 = queryByTestId('input-b.b1')
    fireEvent.change(inputB1, { target: { value: '123' } })
    const inputC1 = queryByTestId('input-c.c1')
    fireEvent.change(inputC1, { target: { value: '456' } })

    let formState = actions.getFormState()
    expect(formState.values.b1).toEqual('123')
    expect(formState.values.c1).toEqual('456')
    expect(formState.values).toEqual({ a1: '1', b1: '123', c1: '456' })
    const radio2Ele = queryByTestId('radio2')
    fireEvent.click(radio2Ele)
    formState = actions.getFormState()
    expect(formState.values.b1).toBeUndefined()
    expect(formState.values).toEqual({ a1: '0', c1: '456', b1: undefined })
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
