import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { render } from '@testing-library/react'
import FormContext from '../context'
import useForm from '../hooks/useForm'
import useField from '../hooks/useField'
import { createForm } from '@formily/core'
import { FormLifeCycle, LifeCycleTypes } from '@formily/core'

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
    const formWrapper = ({ children }) => {
      const form = useForm({
        form: formInstance
      })
      globalForm = form
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const { result } = renderHook(() => useField({ name: 'username' }), {
      wrapper: formWrapper
    })
    expect(result.current.form).toEqual(globalForm)
    expect(result.current.state.props).toEqual({})
    expect(result.current.state).toEqual({
      ...globalGraph.get('username').getState(),
      errors: [],
      mounted: false
    })
  })

  test('update', async () => {
    let globalForm
    const formWrapper = ({ children }) => {
      const form = useForm({})
      globalForm = form
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const { result, rerender } = renderHook(
      () => useField({ name: 'username' }),
      {
        wrapper: formWrapper
      }
    )
    expect(result.current.state.value).toEqual(undefined)
    act(() => {
      globalForm.setFormState(state => (state.values.username = 'abcd'))
    })
    rerender()
    expect(result.current.state.value).toEqual('abcd')
  })

  test('mounted change', async () => {
    const formWrapper = ({ children }) => {
      const form = useForm({})
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const { result, rerender } = renderHook(
      () => useField({ name: 'username' }),
      { wrapper: formWrapper }
    )
    expect(result.current.state.mounted).toEqual(false)
    rerender()
    expect(result.current.state.mounted).toEqual(true)
  })

  test('dirty', async () => {
    const formWrapper = ({ children }) => {
      const formInstance = createForm({
        lifecycles: [
          new FormLifeCycle(LifeCycleTypes.ON_FIELD_CHANGE, field => {})
        ]
      })
      const form = useForm({
        form: formInstance
      })
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const initialProps = {
      name: 'username',
      props: { disabled: true },
      required: false,
      editable: true,
      rules: []
    }
    const { result, rerender } = renderHook(() => useField(initialProps), {
      wrapper: formWrapper
    })
    expect(result.current.props).toEqual({ disabled: true })
    expect(result.current.state.required).toEqual(false)
    expect(result.current.state.editable).toEqual(true)
    expect(result.current.state.rules).toEqual([])

    const rules = [() => ({ type: 'warning', message: 'warning msg' })]

    initialProps.required = true
    initialProps.editable = false
    initialProps.props = { disabled: false }
    initialProps.rules = [...rules]

    expect(result.current.props).toEqual({ disabled: true })
    expect(result.current.state.required).toEqual(false)
    expect(result.current.state.editable).toEqual(true)
    expect(result.current.state.rules).toEqual([])

    rerender()

    expect(result.current.props).toEqual(initialProps.props)
    expect(result.current.state.required).toEqual(initialProps.required)
    expect(result.current.state.editable).toEqual(initialProps.editable)
    expect(result.current.state.rules).toEqual([...rules, { required: true }])
  })

  test('extented mutator', () => {
    const formWrapper = ({ children }) => {
      const form = useForm({})
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const getValueFromEvent = e => e.target.value
    const eventValue = { target: { value: 'abc' } }
    const { result: result1, rerender: rerender1 } = renderHook(
      () => useField({ name: 'username' }),
      { wrapper: formWrapper }
    )
    expect(result1.current.state.value).toEqual(undefined)
    act(() => {
      result1.current.mutators.change(eventValue)
    })
    rerender1()
    expect(result1.current.state.value).toEqual(eventValue)

    const { result: result2, rerender: rerender2 } = renderHook(
      () => useField({ name: 'username', getValueFromEvent }),
      { wrapper: formWrapper }
    )
    expect(result2.current.state.value).toEqual(undefined)
    act(() => {
      result2.current.mutators.change(eventValue)
    })
    rerender2()
    expect(result2.current.state.value).toEqual('abc')
  })

  const sleep = (duration = 100) =>
    new Promise(resolve => {
      setTimeout(resolve, duration)
    })

  test('triggerType mutator onChange', async () => {
    const formWrapper = ({ children }) => {
      const form = useForm({})
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const fieldProps = { name: 'username', required: true }
    const { result: result1 } = renderHook(() => useField(fieldProps), {
      wrapper: formWrapper
    })
    expect(result1.current.state.errors).toEqual([])
    expect(result1.current.state.value).toEqual(undefined)
    act(() => {
      result1.current.mutators.change('123')
    })
    expect(result1.current.state.value).toEqual('123')
    expect(result1.current.state.errors).toEqual([])

    const { result: result2, waitForNextUpdate } = renderHook(
      () => useField({ ...fieldProps, triggerType: 'onChange' }),
      {
        wrapper: formWrapper
      }
    )
    expect(result2.current.state.errors).toEqual([])
    expect(result2.current.state.value).toEqual(undefined)

    act(() => {
      result2.current.mutators.change('')
    })
    await waitForNextUpdate()
    expect(result2.current.state.value).toEqual('')
    const { queryByText } = render(<div>{result2.current.state.errors}</div>)
    expect(queryByText('This field is required')).toBeVisible()
  })

  test('triggerType mutator onBlur', async () => {
    const formWrapper = ({ children }) => {
      const form = useForm({})
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const fieldProps = { name: 'username', required: true }
    const { result: result1, rerender } = renderHook(
      () => useField(fieldProps),
      { wrapper: formWrapper }
    )
    expect(result1.current.state.errors).toEqual([])
    rerender()
    act(() => {
      result1.current.mutators.blur()
    })

    expect(result1.current.state.errors).toEqual([])

    const {
      result: result2,
      waitForNextUpdate: waitForNextUpdate2
    } = renderHook(() => useField({ ...fieldProps, triggerType: 'onBlur' }), {
      wrapper: formWrapper
    })
    expect(result2.current.state.errors).toEqual([])

    act(() => {
      result2.current.mutators.blur()
    })
    await waitForNextUpdate2()
    const { queryByText } = render(<div>{result2.current.state.errors}</div>)
    expect(queryByText('This field is required')).toBeVisible()
  })
})
