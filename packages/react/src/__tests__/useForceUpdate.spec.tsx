import { renderHook, act } from '@testing-library/react-hooks'
import { useForceUpdate } from '../hooks/useForceUpdate'
import { useEffect } from 'react'

describe('useForceUpdate hook',()=>{
  test('instance depency', ()=>{
    const events = []
    const onEvent = (cb) => {
      events.push(cb)
    }
    const emitEvents = () => {
      events.forEach(cb => cb())
    }

    const instance = { count: 0 }
    function useDemo() {
      const forceUpdate = useForceUpdate()
      useEffect(() => {
        onEvent(() => {
          forceUpdate()
        })
      }, [])
      return instance.count
    }

    const { result } = renderHook(() => useDemo())
    expect(result.current).toEqual(0)

    act(() => {
      instance.count = 1
    })    
    expect(result.current).toEqual(0)

    act(() => {
      emitEvents()
    })
    expect(result.current).toEqual(1)
  })
})