import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Broadcast } from '../shared';
import { BroadcastContext } from '../context';
import { createForm } from '@uform/core'
import useForm from '../hooks/useForm'
import { createFormActions, createAsyncFormActions } from '..';


describe('useForm hook',()=>{
  test('return createForm instance', ()=>{
    const broadCastWrapper = ({ children }) => {
      return <BroadcastContext.Provider value={new Broadcast()}>{children}</BroadcastContext.Provider>
    }

    const opts = {}
    const form = createForm(opts)
    const { result } = renderHook(() => useForm({ form }), { wrapper: broadCastWrapper })
    expect(result.current).toEqual(form)
  })

  test('createForm instance binding api call with broadcast', ()=>{
    const fn = jest.fn()
    const typeArr = []
    const broadcastInstance = new Broadcast()
    broadcastInstance.subscribe(fn)
    broadcastInstance.subscribe((a: any) => {
      typeArr.push(a.type)
    })
    const broadCastWrapper = ({ children }) => {
      return <BroadcastContext.Provider value={broadcastInstance}>{children}</BroadcastContext.Provider>
    }
    
    // 第一次formChange: initialized, editable(从true -> undefined , 有问题)
    // 第二次formChange: mounted
    const { result } = renderHook(() => useForm({}), { wrapper: broadCastWrapper })
    expect(typeArr).toEqual([
      'onFormWillInit', 'onFormChange', 'onFormInit', 'onFormChange', 'onFormMount',
    ])
    expect(fn).toBeCalledTimes(5)

    const targetValues = { username: 'abcd' }
    result.current.setFormState(state => state.values = targetValues)

    // 第三次formChange: values
    expect(typeArr).toEqual([
      'onFormWillInit', 'onFormChange', 'onFormInit', 'onFormChange', 'onFormMount',
      'onFormChange', 'onFormValuesChange'
    ])
    expect(fn).toBeCalledTimes(7)
    expect(result.current.getFormState(state => state.values)).toEqual(targetValues)
  })

  test('useForm with initialValues', ()=>{
    const broadCastWrapper = ({ children }) => {
      return <BroadcastContext.Provider value={new Broadcast()}>{children}</BroadcastContext.Provider>
    }

    const targetValues = { username: 'abcd' }
    const values = { age: 20 }
    const { result } = renderHook(() => useForm({ initialValues: targetValues, value: values }), { wrapper: broadCastWrapper })
    expect(result.current.getFormState(state => state.initialValues)).toEqual(targetValues)
    expect(result.current.getFormState(state => state.values)).toEqual(values)    
  })

  test('useForm with defaultValue', ()=>{
    const broadCastWrapper = ({ children }) => {
      return <BroadcastContext.Provider value={new Broadcast()}>{children}</BroadcastContext.Provider>
    }

    const targetValues = { username: 'abcd' }
    const values = { age: 20 }
    const { result } = renderHook(() => useForm({ defaultValue: targetValues, value: values }), { wrapper: broadCastWrapper })
    expect(result.current.getFormState(state => state.initialValues)).toEqual(targetValues)
    expect(result.current.getFormState(state => state.values)).toEqual(values)    
  })

  test('useForm with values', ()=>{
    const broadCastWrapper = ({ children }) => {
      return <BroadcastContext.Provider value={new Broadcast()}>{children}</BroadcastContext.Provider>
    }

    const targetValues = { username: 'abcd' }
    const { result } = renderHook(() => useForm({ value: targetValues }), { wrapper: broadCastWrapper })
    expect(result.current.getFormState(state => state.initialValues)).toEqual({})
    expect(result.current.getFormState(state => state.values)).toEqual(targetValues)    
  })

  test('useForm with editable', ()=>{
    const broadCastWrapper = ({ children }) => {
      return <BroadcastContext.Provider value={new Broadcast()}>{children}</BroadcastContext.Provider>
    }

    const { result } = renderHook(() => useForm({ editable: false }), { wrapper: broadCastWrapper })
    expect(result.current.getFormState(state => state.editable)).toEqual(false)
  })

  test('FormState change', ()=>{
    const broadCastWrapper = ({ children }) => {
      return <BroadcastContext.Provider value={new Broadcast()}>{children}</BroadcastContext.Provider>
    }

    const form = createForm({})
    expect(form.getFormState(state => state.mounted)).toEqual(false)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(form.getFormState(state => state.editable)).toEqual(undefined)
    const { result } = renderHook(() => useForm({ form }), { wrapper: broadCastWrapper })
    expect(result.current.getFormState(state => state.mounted)).toEqual(true)
    expect(result.current.getFormState(state => state.initialized)).toEqual(true)
    expect(result.current.getFormState(state => state.editable)).toEqual(undefined)
  })

  test('FormActions will implemented(sync)', ()=>{
    const broadCastWrapper = ({ children }) => {
      return <BroadcastContext.Provider value={new Broadcast()}>{children}</BroadcastContext.Provider>
    }

    const actions = createFormActions()
    expect(actions.getFormState()).toEqual(undefined)
    const targetValues = { username: 'abcd' }
    actions.setFormState(state => state.values = targetValues)
    expect(actions.getFormState(state => state.values)).toEqual(undefined)
    const { result } = renderHook(() => useForm({ actions }), { wrapper: broadCastWrapper })
    expect(actions.getFormState()).not.toEqual(undefined)
    expect(result.current.getFormState()).toEqual(actions.getFormState())
    expect(actions.getFormState(state => state.values)).toEqual({})
  })

  test('FormActions will implemented(async)', async ()=>{
    const broadCastWrapper = ({ children }) => {
      return <BroadcastContext.Provider value={new Broadcast()}>{children}</BroadcastContext.Provider>
    }

    const actions = createAsyncFormActions()    
    const targetValues = { username: 'abcd' }    
    const { result } = renderHook(() => useForm({ actions }), { wrapper: broadCastWrapper })
    const initialValues = await actions.getFormState(state => state.values)
    expect(initialValues).toEqual({})
    await actions.setFormState(state => state.values = targetValues)
    
    const resultValues = await actions.getFormState(state => state.values)
    expect(resultValues).toEqual(targetValues)
    const actionResultValues = await result.current.getFormState(state => state.values)
    expect(actionResultValues).toEqual(resultValues)
  })

  // test('broadaast context', ()=>{
  //   const broadcastInstance = new Broadcast()
  //   const broadCastWrapper = ({ children }) => {
  //     return <BroadcastContext.Provider value={broadcastInstance}>{children}</BroadcastContext.Provider>
  //   }

  //   const form = createForm()
  //   expect(broadcastInstance.context).toEqual(undefined)
  //   renderHook(() => useForm({ form }), { wrapper: broadCastWrapper })

  //   expect(broadcastInstance.context).toEqual({
  //     ...form,
  //     dispatch: form.notify
  //   })
  })
})