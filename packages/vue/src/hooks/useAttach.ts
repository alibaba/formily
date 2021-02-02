import { onMounted, onBeforeUnmount, ref, watch } from 'vue-demi'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  const oldTargetRef = ref<IRecycleTarget | null>(null)

  const unmountOldTarget = (newTarget: T) => {
    if (oldTargetRef.value && newTarget !== oldTargetRef.value) {
      oldTargetRef.value.onUnmount()
    }
    oldTargetRef.value = newTarget
    newTarget.onMount()
  }

  watch(() => target, unmountOldTarget)

  onMounted(() => {
    unmountOldTarget(target)
  })

  onBeforeUnmount(() => {
    target.onUnmount()
  })
  return target
}
