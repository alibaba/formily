import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import renderHook from '../__test-utils__/renderHook'
import { useDirty } from '../hooks/useDirty'

Vue.use(VueCompositionAPI)

describe('useDirty hook', () => {
  test('empty input without fields', () => {
    const { vm } = renderHook(() => ({ result: useDirty() }))
    expect(vm.result).toEqual({
      num: 0,
      dirtys: {},
      data: {}
    })
  })

  test('empty input with fields', () => {
    const { vm } = renderHook(() => ({
      result: useDirty({}, ['username', 'age'])
    }))
    expect(vm.result).toEqual({
      num: 0,
      dirtys: {
        username: false,
        age: false
      },
      data: {}
    })
  })

  test('initial input', () => {
    const { vm } = renderHook(() => ({
      result: useDirty({ username: 'billy', age: 21 }, ['username', 'age'])
    }))
    expect(vm.result).toEqual({
      num: 0,
      dirtys: {
        username: false,
        age: false
      },
      data: { username: 'billy', age: 21 }
    })
  })

  test('fields change', async () => {
    const dirtyProps = { username: 'billy', age: 21 }
    const { vm } = renderHook(() => ({
      result: useDirty(dirtyProps, ['username', 'age'])
    }))
    expect(vm.result).toEqual({
      num: 0,
      dirtys: {
        username: false,
        age: false
      },
      data: dirtyProps
    })

    dirtyProps.username = 'lily'
    dirtyProps.age = 21
    await vm.$nextTick()

    expect(vm.result).toEqual({
      num: 1,
      dirtys: {
        username: true,
        age: false
      },
      data: dirtyProps
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
