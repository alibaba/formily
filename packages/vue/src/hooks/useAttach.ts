import { Ref, shallowRef, watch } from 'vue-demi'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = <T extends IRecycleTarget>(creator: () => T, dependencies: Parameters<typeof watch>[0]): Ref<T> => {

  const oldTargetRef = shallowRef<T>(null)

  watch(dependencies, (cur, prev, onInvalidate) => {
    const target = creator()
    if (oldTargetRef.value && target !== oldTargetRef.value) {
      oldTargetRef.value.onUnmount()
    }
    oldTargetRef.value = target
    target.onMount()

    onInvalidate(() => {
      target.onUnmount()
    })
  }, { immediate: true })

  return oldTargetRef
}
