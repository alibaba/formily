import { onBeforeUnmount, onMounted, Ref, shallowRef, watch } from 'vue-demi'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = <T extends IRecycleTarget>(
  creator: () => T,
  dependencies: Parameters<typeof watch>[0]
): Ref<T> => {
  const oldTargetRef = shallowRef<T>(null)
  const target = creator()
  oldTargetRef.value = target

  onMounted(() => {
    target.onMount()
  })

  onBeforeUnmount(() => {
    oldTargetRef.value?.onUnmount()
  })

  watch(dependencies, (cur, prev, onInvalidate) => {
    const target = creator()

    if (target !== oldTargetRef.value) {
      if (oldTargetRef.value) {
        oldTargetRef.value.onUnmount()
      }
      oldTargetRef.value = target
      target.onMount()

      onInvalidate(() => {
        oldTargetRef.value?.onUnmount()
      })
    }
  })

  return oldTargetRef
}
