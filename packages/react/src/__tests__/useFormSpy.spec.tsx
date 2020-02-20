import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { createForm } from '@formily/core'
import { LifeCycleTypes, Form, useFormSpy, Field, createFormActions } from '..'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <input value={state.value || ''} onChange={mutators.change} />
    )}
  </Field>
)

function Deferred() {
  this.resolve = null
  this.reject = null
  this.promise = new Promise(
    function(resolve, reject) {
      this.resolve = resolve
      this.reject = reject
    }.bind(this)
  )
  Object.freeze(this)
}

describe('useFormSpy hook', () => {
  test('basic', async () => {
    const opts = {}
    const mountFlag = new Deferred()
    const endFlag = new Deferred()
    const form = createForm(opts)
    form.subscribe(({ type, payload }) => {
      if (type === LifeCycleTypes.ON_FORM_MOUNT) {
        mountFlag.resolve()
      }
    })

    const FormWrapper = props => {
      const { children } = props
      return (
        <Form form={form}>
          <InputField name="a" />
          {children}
        </Form>
      )
    }

    const typeList = []
    const Fragment = () => {
      const spyData = useFormSpy({ selector: '*', reducer: state => state })
      typeList.push(spyData.type)

      if (spyData.type === 'custom2') {
        endFlag.resolve()
      }
      return spyData
    }

    const { result, rerender, waitForNextUpdate } = renderHook(Fragment, {
      wrapper: FormWrapper
    })

    // return form instance
    expect(result.current.form).toEqual(form)
    expect(result.current.type).toEqual(LifeCycleTypes.ON_FORM_INIT)
    expect(result.current.state).toEqual({})
    expect(typeList.length).toEqual(1)

    await mountFlag.promise
    act(() => {
      result.current.form.notify('custom1')
    })
    await waitForNextUpdate()

    act(() => {
      result.current.form.notify('custom2')
    })
    await waitForNextUpdate()

    await endFlag.promise
    rerender()
    expect(typeList).toContain('custom1')
    expect(typeList).toContain('custom2')
  })

  test('selector', async () => {
    const opts = {}
    const mountFlag = new Deferred()
    const endFlag = new Deferred()
    const form = createForm(opts)
    form.subscribe(({ type, payload }) => {
      if (type === LifeCycleTypes.ON_FORM_MOUNT) {
        mountFlag.resolve()
      }

      if (type === 'custom2') {
        endFlag.resolve()
      }
    })
    const FormWrapper = props => {
      const { children } = props
      return (
        <Form form={form}>
          <InputField name="a" />
          {children}
        </Form>
      )
    }

    const typeList = []
    const Fragment = () => {
      const spyData = useFormSpy({
        selector: [LifeCycleTypes.ON_FORM_INIT, 'custom1'],
        reducer: state => state
      })

      typeList.push(spyData.type)
      return spyData
    }

    const { result, rerender, waitForNextUpdate } = renderHook(Fragment, {
      wrapper: FormWrapper
    })

    await mountFlag.promise
    act(() => {
      result.current.form.notify('custom1')
    })
    await waitForNextUpdate()

    act(() => {
      result.current.form.notify('custom2')
    })

    await endFlag.promise
    rerender()
    expect(typeList).toContain('custom1')
    expect(typeList).not.toContain('custom2')
  })

  test('reducer', async () => {
    const opts = {}
    const mountFlag = new Deferred()
    const endFlag = new Deferred()
    const form = createForm(opts)
    const actions = createFormActions()
    form.subscribe(({ type, payload }) => {
      if (type === LifeCycleTypes.ON_FORM_MOUNT) {
        mountFlag.resolve()
      }
    })
    const FormWrapper = props => {
      const { children } = props
      return (
        <Form actions={actions} form={form}>
          <InputField name="a" />
          {children}
        </Form>
      )
    }

    const typeList = []
    const Fragment = () => {
      const spyData = useFormSpy({
        selector: ['custom1', 'custom2', 'custom3'],
        reducer: state => {
          return {
            count: (state.count || 0) + 1
          }
        }
      })

      if (spyData.type === 'custom3') {
        endFlag.resolve()
      }

      typeList.push(spyData.type)
      return spyData
    }

    const { result, rerender, waitForNextUpdate } = renderHook(Fragment, {
      wrapper: FormWrapper
    })

    await mountFlag.promise
    act(() => {
      form.notify('custom1')
    })
    await waitForNextUpdate()

    act(() => {
      form.notify('custom2')
    })
    await waitForNextUpdate()

    act(() => {
      form.notify('custom3')
    })
    await waitForNextUpdate()
    await endFlag.promise
    rerender()
    expect(typeList).toContain('custom1')
    expect(typeList).toContain('custom2')
    expect(typeList).toContain('custom3')
    expect(result.current.state).toEqual({ count: 3 })
  })
})
