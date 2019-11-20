import { renderHook } from '@testing-library/react-hooks'
import { useDirty } from '../hooks/useDirty'

describe('useDirty hook',()=>{
  test('empty input without fields', ()=>{
    const { result } = renderHook(() => useDirty())
    expect(result.current).toEqual({
      num: 0,
      dirtys: {},
      data: {},
    })
  })

  test('empty input with fields', ()=>{
    const { result } = renderHook(() => useDirty({}, ['username', 'age']))
    expect(result.current).toEqual({
      num: 0,
      dirtys: {
        username: false,
        age: false,
      },
      data: {},
    })
  })

  test('initial input', ()=>{
    const { result } = renderHook(() => useDirty({ username: 'billy', age: 21 }, ['username', 'age']))
    expect(result.current).toEqual({
      num: 0,
      dirtys: {
        username: false,
        age: false,
      },
      data: { username: 'billy', age: 21 },
    })
  })

  test('fields change', ()=>{
    let dirtyProps = { username: 'billy', age: 21 }
    const { result, rerender } = renderHook(() => useDirty(dirtyProps, ['username', 'age']))
    expect(result.current).toEqual({
      num: 0,
      dirtys: {
        username: false,
        age: false,
      },
      data: dirtyProps,
    })

    dirtyProps = { username: 'lily', age: 21 } as any
    rerender()

    expect(result.current).toEqual({
      num: 1,
      dirtys: {
        username: true,
        age: false
      },
      data: dirtyProps,
    })
  })

  // test('fields change（object）', ()=>{
  //   let dirtyProps = { user: { username: 'abcd' } }
  //   const { result, rerender } = renderHook(() => useDirty(dirtyProps, ['user']))
  //   expect(result.current).toEqual({
  //     num: 0,
  //     dirtys: {
  //       user: false,
  //     },
  //     data: dirtyProps,
  //   })

  //   dirtyProps.user.username = 'edgh'
  //   rerender()

  //   expect(result.current).toEqual({
  //     num: 1,
  //     dirtys: {
  //       user: true
  //     },
  //     data: dirtyProps,
  //   })
  // })

})