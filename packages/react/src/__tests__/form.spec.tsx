import React, { useState } from 'react'
import {
  Form,
  Field,
  createFormActions,
  FormEffectHooks,
  IFieldStateUIProps,
  FormSpy,
} from '../index'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { LifeCycleTypes } from '@formily/core'

const Input: React.FC<IFieldStateUIProps> = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <div>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        {state.errors}
        {state.warnings}
      </div>
    )}
  </Field>
)

const { onFieldValueChange$ } = FormEffectHooks

describe('test all apis', () => {
  test('Form', async () => {
    const actions = createFormActions()
    const onSubmitHandler = jest.fn()
    const onValidateFailedHandler = jest.fn()
    render(
      <Form
        onSubmit={onSubmitHandler}
        onValidateFailed={onValidateFailedHandler}
        actions={actions}
        effects={$ => {
          onFieldValueChange$('aaa').subscribe(fieldState => {
            $.setFieldState('aaa', state => {
              state.value = 'hello world'
            })
          })
        }}
      >
        <Input name="aaa" required />
      </Form>
    )
    try {
      await actions.submit()
    } catch (e) {
      expect(e).toEqual([{ path: 'aaa', name: 'aaa', messages: ['This field is required'] }])
    }
    actions.setFieldState('aaa', state => {
      state.value = '123'
    })
    await actions.submit()
    expect(onSubmitHandler).toBeCalledWith({ aaa: 'hello world' })
  })

  test('onSubmit async', async () => {
    const actions = createFormActions()
    const onSubmitEndHandler = jest.fn()
    const App = () => {
      return <div>
        <Form
        onSubmit={() => {
          return new Promise((resolve) => {
            setTimeout(resolve)
          })
        }}
        actions={actions}
      >
        <Input name="aaa" />        
        <FormSpy>
          {({ type }) => {
            return <button data-testid="submit" onClick={() => {
              actions.submit()
            }}>{type}</button>
          }}
        </FormSpy>
      </Form>
      </div>
    }
    const { getByTestId, queryByTestId } = render(<App />)
        
    expect(onSubmitEndHandler).toBeCalledTimes(0)
    fireEvent.click(queryByTestId('submit'))
    const submitEle = await waitForElement(
      () => getByTestId('submit')
    )

    expect(submitEle.textContent).not.toEqual(LifeCycleTypes.ON_FORM_INIT)
  })

  test('onSubmit unmount promise', async () => {
    const actions = createFormActions()
    const onSubmitEndHandler = jest.fn()
    const App = () => {
      const [visible, setVisible] = useState(true)
      return <div>
        {visible ? <Form
        onSubmit={() => {
          return new Promise((resolve) => {
            setVisible(false)
            setTimeout(resolve)
          })
        }}
        actions={actions}
      >
        <Input name="aaa" />        
        <FormSpy>
          {({ type }) => {
            return <button data-testid="submit" onClick={() => {
              actions.submit()
            }}>{type}</button>
          }}
        </FormSpy>
      </Form> : null }
      </div>
    }
    const { getByTestId, queryByTestId } = render(<App />)
        
    expect(onSubmitEndHandler).toBeCalledTimes(0)
    fireEvent.click(queryByTestId('submit'))
    const submitEle = await waitForElement(
      () => getByTestId('submit')
    )

    expect(submitEle.textContent).toEqual(LifeCycleTypes.ON_FORM_INIT)
  })
})

describe('major scenes', () => {
  //todo
  test('basic',()=>{
    //todo
  })
})

describe('bugfix', () => {
  //todo
  test('basic',()=>{
    //todo
  })
})
