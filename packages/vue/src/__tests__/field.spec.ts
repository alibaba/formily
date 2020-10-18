import { render, fireEvent } from '@testing-library/vue'
import FormComponent from './test-components/field/form.vue'
import { createFormActions, createAsyncFormActions } from '../index'
import { IFormActions, IFormAsyncActions } from '../types'

describe('test all apis', () => {
  let actions: IFormActions
  let asyncActions: IFormAsyncActions

  const renderForm = (isAsync = false) =>
    render(FormComponent, {
      props: { actions: isAsync ? asyncActions : actions }
    })

  beforeAll(() => {
    actions = createFormActions()
    asyncActions = createAsyncFormActions()
  })

  test('field visible and display', () => {
    const { queryByTestId } = renderForm()
    const radio1Ele = queryByTestId('radio1')
    fireEvent.click(radio1Ele)
    const inputA2 = queryByTestId('input-a2')
    fireEvent.change(inputA2, { target: { value: '123' } })
    const inputA3 = queryByTestId('input-a3')
    fireEvent.change(inputA3, { target: { value: '456' } })
    let formState = actions.getFormState()
    expect(formState.values.a2).toEqual('123')
    expect(formState.values.a3).toEqual('456')
    const radio2Ele = queryByTestId('radio2')
    fireEvent.click(radio2Ele)
    formState = actions.getFormState()
    expect(formState.values.a2).toBeUndefined()
    expect(formState.values.a3).toEqual('456')
  })
})
