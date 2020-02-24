import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import FormContext from '../context'
import useForm from '../hooks/useForm'
import useVirtualField from '../hooks/useVirtualField'
import { FormLifeCycle, LifeCycleTypes, createForm } from '@formily/core'

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
    const formWrapper = ({ children }) => {
      const form = useForm({
        form: formInstance
      })
      globalForm = form
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const { result } = renderHook(() => useVirtualField({ name: 'username' }), {
      wrapper: formWrapper
    })
    expect(result.current.form).toEqual(globalForm)
    expect(result.current.state.props).toEqual({})
    expect(result.current.state).toEqual({
      ...globalGraph.get('username').getState(),
      mounted: false
    })
  })

  test('update', () => {
    let globalForm
    const formWrapper = ({ children }) => {
      const form = useForm({})
      globalForm = form
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const { result } = renderHook(() => useVirtualField({ name: 'username' }), {
      wrapper: formWrapper
    })
    expect(result.current.state.visible).toEqual(true)
    act(() => {
      globalForm.setFieldState('username', state => (state.visible = false))
    })

    expect(result.current.state.visible).toEqual(false)
  })

  test('mounted change', async () => {
    const formWrapper = ({ children }) => {
      const form = useForm({})
      return (
        <FormContext.Provider value={form}>{children}</FormContext.Provider>
      )
    }

    const { result, rerender } = renderHook(
      () => useVirtualField({ name: 'username' }),
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
      props: { disabled: true }
    }
    const { result, rerender } = renderHook(
      () => useVirtualField(initialProps),
      { wrapper: formWrapper }
    )
    expect(result.current.props).toEqual({ disabled: true })
    initialProps.props = { disabled: false }

    expect(result.current.props).toEqual({ disabled: true })
    rerender()
    expect(result.current.props).toEqual(initialProps.props)
  })
})
