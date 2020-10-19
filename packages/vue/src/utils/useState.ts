import { ref, Ref } from '@vue/composition-api'

export function useState<State = any>(
  initialState: State
): [State, (newState: State) => any] {
  const state = ref(initialState) as Ref<State>
  const setState = (newState: State) => void (state.value = newState)
  return [state.value, setState]
}
