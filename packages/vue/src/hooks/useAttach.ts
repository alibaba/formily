import { onMounted, onBeforeUnmount, ref } from '@vue/composition-api'

interface IRecycleTarget {
  onMount: () => void
  onUnmount: () => void
}

export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  const currentRef = ref<IRecycleTarget>(null)
  const targetRef = ref<IRecycleTarget>(target)

  onMounted(() => {
    if (currentRef.value && targetRef.value !== currentRef.value) {
      currentRef.value.onUnmount()
    }
    targetRef.value.onMount()
    currentRef.value = targetRef.value
  })

  onBeforeUnmount(() => {
    targetRef.value.onUnmount()
  })
  return target
}
