import { onBeforeUnmount, onMounted, shallowRef, Ref } from 'vue-demi'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = <T extends IRecycleTarget>(
  target: T
): [Ref<T>, (arg: T) => T] => {
  const oldTargetRef = shallowRef<T>(null)
  oldTargetRef.value = target
  onMounted(() => {
    target.onMount()
  })

  onBeforeUnmount(() => {
    oldTargetRef.value?.onUnmount()
  })

  const checker = (target: T) => {
    if (target !== oldTargetRef.value) {
      if (oldTargetRef.value) {
        oldTargetRef.value.onUnmount()
      }
      oldTargetRef.value = target
      target.onMount()
    }
    return oldTargetRef.value as T
  }

  return [oldTargetRef, checker]
}
