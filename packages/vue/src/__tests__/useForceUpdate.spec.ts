import renderHook from './utils/renderHook'
import { useForceUpdate } from '../hooks/useForceUpdate'
import { getCurrentInstance, onBeforeUpdate } from '@vue/composition-api'

describe('useForceUpdate hook', () => {
  test('instance depency', async () => {
    const events = []
    const onEvent = cb => {
      events.push(cb)
    }
    const emitEvents = () => {
      events.forEach(cb => cb())
    }

    const instance = { count: 0 }
    function useDemo() {
      const forceUpdate = useForceUpdate()
      onEvent(() => {
        forceUpdate()
      })
      onBeforeUpdate(() => {
        const $vm = getCurrentInstance() as any
        $vm.count = instance.count
      })
      return {
        count: instance.count
      }
    }

    const { vm } = renderHook(() => useDemo())
    expect(vm.count).toEqual(0)

    instance.count = 1
    expect(vm.count).toEqual(0)
    emitEvents()
    await vm.$nextTick()
    expect(vm.count).toEqual(1)
  })
})
