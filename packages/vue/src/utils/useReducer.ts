import { Ref, shallowRef } from '@vue/composition-api'

// from react types
type Reducer<S, A> = (prevState: S, action: A) => S
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any>
  ? S
  : never
type Dispatch<A> = (value: A) => void
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<
  any,
  infer A
>
  ? A
  : never

export function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initialArg: I & ReducerState<R>,
  init?: (arg: I & ReducerState<R>) => ReducerState<R>
): [Ref<ReducerState<R>>, Dispatch<ReducerAction<R>>] {
  const state = shallowRef(init ? init(initialArg) : initialArg)
  const dispatch = (action: ReducerAction<R>) => {
    state.value = reducer(state.value, action)
  }

  return [state, dispatch]
}
